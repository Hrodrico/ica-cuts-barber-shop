import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { BookingDialog } from "./BookingDialog";

const src = "https://agenda.test/sucursal/1";
const options = [
  { label: "Cualquiera", src },
  { label: "Ana", src: "https://agenda.test/sucursal/1/profesional/7" },
];

beforeAll(() => {
  // jsdom no implementa showModal/close.
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

function setup(href = src) {
  render(
    <>
      <a href={href}>Reservar</a>
      <BookingDialog title="Agenda tu hora" frameTitle="Agenda" src={src} options={options} />
    </>,
  );
  return { link: screen.getByRole("link", { name: "Reservar" }) };
}

const dialog = () => document.querySelector("dialog")!;

describe("BookingDialog", () => {
  it("no carga la agenda hasta abrirse", () => {
    setup();
    expect(dialog().open).toBe(false);
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("abre el pop-up con la agenda al hacer clic en un enlace a ella", async () => {
    const { link } = setup();
    expect(fireEvent.click(link)).toBe(false); // navegación cancelada
    await act(() => new Promise((resolve) => setTimeout(resolve)));
    expect(dialog().open).toBe(true);
    expect(document.querySelector("iframe")).toHaveAttribute("src", src);
    expect(screen.getByRole("link", { name: /pestaña nueva/, hidden: true })).toHaveAttribute("href", src);
  });

  it("abre la agenda del profesional enlazado y la marca en el selector", async () => {
    const { link } = setup(options[1].src);
    fireEvent.click(link);
    await act(() => new Promise((resolve) => setTimeout(resolve)));
    expect(document.querySelector("iframe")).toHaveAttribute("src", options[1].src);
    expect(screen.getByRole("button", { name: "Ana", hidden: true })).toHaveAttribute("aria-pressed", "true");
  });

  it("cambia de agenda con el selector", async () => {
    const { link } = setup();
    fireEvent.click(link);
    fireEvent.click(screen.getByRole("button", { name: "Ana", hidden: true }));
    await act(() => new Promise((resolve) => setTimeout(resolve)));
    expect(document.querySelector("iframe")).toHaveAttribute("src", options[1].src);
  });

  it("deja pasar Ctrl/⌘ + clic y los enlaces a otras páginas", () => {
    const { link } = setup();
    expect(fireEvent.click(link, { metaKey: true })).toBe(true);
    expect(dialog().open).toBe(false);
  });

  it("ignora enlaces que no son a la agenda", () => {
    const { link } = setup("https://otro.test/");
    expect(fireEvent.click(link)).toBe(true);
    expect(dialog().open).toBe(false);
  });
});
