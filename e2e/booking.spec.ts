import { expect, test } from "@playwright/test";
import { config } from "./site";

const booking = config.contact.booking?.embed ? config.contact.booking : undefined;
const professionals = booking?.professionals ?? [];

test.describe("agenda en pop-up", () => {
  test.skip(!booking, "el negocio no tiene agenda embebida");

  // La agenda es de un tercero: se verifica qué se carga, sin depender de su servicio.
  test.beforeEach(async ({ page }) => {
    const agendaHost = new URL(booking!.url).hostname;
    await page.route((url) => url.hostname === agendaHost, (route) => route.abort());
  });

  test("el botón del hero abre la agenda en un pop-up, sin salir del sitio", async ({ page }) => {
    await page.goto("/");
    await page.locator("main").getByRole("link", { name: booking!.label }).first().click();
    const dialog = page.getByRole("dialog", { name: booking!.label });
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
    await expect(dialog.locator("iframe")).toHaveAttribute("src", booking!.url);
    await expect(dialog.getByRole("link", { name: /pestaña nueva/ })).toHaveAttribute("href", booking!.url);
  });

  // También en móvil: el botón del header es la acción principal a mano en toda la página.
  test("el botón del header abre el pop-up", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("banner").getByRole("link", { name: booking!.label }).click();
    await expect(page.getByRole("dialog", { name: booking!.label })).toBeVisible();
  });

  // Un solo scroll: la agenda cabe en la pantalla y la página de atrás no se mueve.
  test("la agenda cabe completa en la pantalla", async ({ page }) => {
    await page.goto("/");
    await page.locator("main").getByRole("link", { name: booking!.label }).first().click();
    const frame = await page.getByRole("dialog").locator("iframe").boundingBox();
    const viewport = page.viewportSize()!;
    expect(frame).not.toBeNull();
    expect(frame!.y + frame!.height).toBeLessThanOrEqual(viewport.height + 1);
    expect(frame!.height).toBeGreaterThan(viewport.height / 2);
  });

  test("se cierra con el botón y con Esc", async ({ page }) => {
    await page.goto("/");
    const open = page.locator("main").getByRole("link", { name: booking!.label }).first();
    const dialog = page.getByRole("dialog", { name: booking!.label });

    await open.click();
    await dialog.getByRole("button", { name: "Cerrar agenda" }).click();
    await expect(dialog).toBeHidden();

    await open.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("el selector cambia a la agenda de cada profesional", async ({ page }) => {
    test.skip(professionals.length === 0, "sin profesionales configurados");
    const [professional] = professionals;
    await page.goto("/");
    await page.locator("main").getByRole("link", { name: booking!.label }).first().click();
    const dialog = page.getByRole("dialog", { name: booking!.label });
    const option = dialog.getByRole("group", { name: "Elige profesional" }).getByRole("button", { name: professional.name });
    await option.click();
    await expect(option).toHaveAttribute("aria-pressed", "true");
    await expect(dialog.locator("iframe")).toHaveAttribute("src", professional.url);
  });

  test("la antigua página /reservar ya no existe", async ({ page }) => {
    await page.goto("/reservar");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página no encontrada");
  });
});
