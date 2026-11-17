import { expect, test } from "@playwright/test";
import { config } from "./site";

const booking = config.contact.booking?.embed ? config.contact.booking : undefined;
const professionals = booking?.professionals ?? [];

test.describe("agenda embebida", () => {
  test.skip(!booking, "el negocio no tiene agenda embebida");

  // La agenda es de un tercero: se verifica qué se carga, sin depender de su servicio.
  test.beforeEach(async ({ page }) => {
    const agendaHost = new URL(booking!.url).hostname;
    await page.route((url) => url.hostname === agendaHost, (route) => route.abort());
  });

  test("/reservar carga la agenda del negocio con su enlace de respaldo", async ({ page }) => {
    await page.goto("/reservar");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(booking!.label);
    await expect(page.locator("iframe:visible")).toHaveAttribute("src", booking!.url);
    await expect(page.getByRole("link", { name: /pestaña nueva/ })).toHaveAttribute("href", booking!.url);
  });

  // La agenda tiene su propio scroll: si no cabe en pantalla, en móvil el dedo queda atrapado
  // en ella y no se alcanza su parte inferior.
  test("la agenda cabe completa en la pantalla", async ({ page }) => {
    await page.goto("/reservar");
    const frame = await page.locator("iframe:visible").boundingBox();
    const viewport = page.viewportSize()!;
    expect(frame).not.toBeNull();
    expect(frame!.y + frame!.height).toBeLessThanOrEqual(viewport.height + 1);
    expect(frame!.height).toBeGreaterThan(viewport.height / 2);
  });

  test("el WhatsApp flotante no tapa la agenda", async ({ page }) => {
    test.skip(!config.contact.whatsapp, "sin WhatsApp");
    await page.goto("/reservar");
    await expect(page.getByRole("link", { name: "Escribir por WhatsApp" })).toBeHidden();
  });

  test("el botón del header lleva a /reservar", async ({ page, isMobile }) => {
    test.skip(isMobile, "en móvil el botón del header se oculta");
    await page.goto("/");
    await page.getByRole("banner").getByRole("link", { name: booking!.label }).click();
    await expect(page).toHaveURL(/\/reservar$/);
  });

  test("el selector cambia a la agenda de cada profesional", async ({ page }) => {
    test.skip(professionals.length === 0, "sin profesionales configurados");
    const [professional] = professionals;
    await page.goto("/reservar");
    await page.getByRole("navigation", { name: "Elige profesional" }).getByRole("link", { name: professional.name }).click();
    await expect(page).toHaveURL(new RegExp(`/reservar/${professional.slug}$`));
    await expect(page.locator("iframe:visible")).toHaveAttribute("src", professional.url);
    await expect(page.getByRole("link", { name: professional.name })).toHaveAttribute("aria-current", "page");
  });

  test("un profesional inexistente muestra not-found", async ({ page }) => {
    await page.goto("/reservar/profesional-que-no-existe");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página no encontrada");
  });

  test("sitemap.xml incluye la página de reservas", async ({ request }) => {
    const text = await (await request.get("/sitemap.xml")).text();
    expect(text).toContain(`<loc>${config.url}/reservar</loc>`);
  });
});
