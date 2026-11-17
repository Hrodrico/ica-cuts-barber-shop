import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/#contacto" },
];

// Cerrado, el menú sigue montado (para animar la salida) pero inerte: no se puede usar.
const menu = () => document.getElementById("mobile-menu")!;

async function openMenu() {
  const user = userEvent.setup();
  render(
    <div>
      <p>Fuera del menú</p>
      <MobileMenu navigation={navigation} />
    </div>,
  );
  await user.click(screen.getByRole("button", { name: "Abrir menú" }));
  return user;
}

describe("MobileMenu", () => {
  it("abre y cierra el menú con el botón", async () => {
    const user = userEvent.setup();
    render(<MobileMenu navigation={navigation} />);
    const button = screen.getByRole("button", { name: "Abrir menú" });

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(menu()).toHaveAttribute("inert");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Cerrar menú");
    expect(menu()).not.toHaveAttribute("inert");
    expect(screen.getAllByRole("link")).toHaveLength(2);

    await user.click(button);
    expect(menu()).toHaveAttribute("inert");
  });

  it("se cierra al elegir un enlace", async () => {
    const user = await openMenu();
    await user.click(screen.getByRole("link", { name: "Servicios" }));
    expect(menu()).toHaveAttribute("inert");
  });

  it("se cierra con Esc y devuelve el foco al botón", async () => {
    const user = await openMenu();
    await user.keyboard("{Escape}");
    expect(menu()).toHaveAttribute("inert");
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveFocus();
  });

  it("se cierra al tocar fuera", async () => {
    const user = await openMenu();
    await user.click(screen.getByText("Fuera del menú"));
    expect(menu()).toHaveAttribute("inert");
  });

  it("se cierra al hacer scroll", async () => {
    await openMenu();
    window.scrollY = 100;
    fireEvent.scroll(window);
    expect(menu()).toHaveAttribute("inert");
    window.scrollY = 0;
  });
});
