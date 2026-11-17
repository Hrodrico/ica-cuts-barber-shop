import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BookingEmbed } from "./BookingEmbed";

const src = "https://agenda.test/sucursal/1";
const options = [
  { label: "Cualquiera", href: "/reservar" },
  { label: "Ana", href: "/reservar/ana" },
];

describe("BookingEmbed", () => {
  it("carga la agenda en un iframe con nombre accesible", () => {
    render(<BookingEmbed src={src} frameTitle="Agenda en línea" />);
    expect(screen.getByTitle("Agenda en línea")).toHaveAttribute("src", src);
  });

  it("ofrece abrir la misma agenda en una pestaña nueva", () => {
    render(<BookingEmbed src={src} frameTitle="Agenda en línea" />);
    const link = screen.getByRole("link", { name: /pestaña nueva/ });
    expect(link).toHaveAttribute("href", src);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("marca la opción activa del selector de profesionales", () => {
    render(<BookingEmbed src={src} frameTitle="Agenda" options={options} currentHref="/reservar/ana" />);
    expect(screen.getByRole("link", { name: "Ana" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Cualquiera" })).not.toHaveAttribute("aria-current");
  });

  it("no muestra el selector con una sola opción", () => {
    render(<BookingEmbed src={src} frameTitle="Agenda" options={options.slice(0, 1)} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});

describe("BookingEmbed: carga", () => {
  it("muestra el estado de carga hasta que la agenda termina de cargar", () => {
    render(<BookingEmbed src={src} frameTitle="Agenda en línea" />);
    const frame = screen.getByTitle("Agenda en línea");
    expect(screen.getByRole("status")).toHaveTextContent("Cargando agenda");
    expect(frame).toHaveClass("opacity-0");

    fireEvent.load(frame);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(frame).toHaveClass("opacity-100");
  });
});
