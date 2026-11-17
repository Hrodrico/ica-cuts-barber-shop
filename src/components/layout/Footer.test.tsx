import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

const props = {
  name: "Negocio",
  tagline: "Lema",
  navigation: [{ label: "Servicios", href: "/#servicios" }],
  social: [{ network: "instagram" as const, url: "https://instagram.com/negocio" }],
  contactLines: [
    { label: "+56 9 1234 5678", href: "tel:+56912345678" },
    { label: "Calle 1, Ciudad", href: "https://maps.test/calle-1", external: true },
    { label: "Solo texto" },
  ],
  year: 2026,
};

describe("Footer", () => {
  it("enlaza las líneas de contacto que tienen destino", () => {
    render(<Footer {...props} />);
    expect(screen.getByRole("link", { name: "+56 9 1234 5678" })).toHaveAttribute("href", "tel:+56912345678");
    const map = screen.getByRole("link", { name: "Calle 1, Ciudad" });
    expect(map).toHaveAttribute("target", "_blank");
    expect(map).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("Solo texto").closest("a")).toBeNull();
  });

  it("por defecto usa el color de marca y los íconos toman el color del texto", () => {
    render(<Footer {...props} />);
    expect(screen.getByRole("contentinfo")).toHaveClass("bg-primary");
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveClass("text-current");
  });

  it("con variant surface usa el fondo neutro y los íconos en acento", () => {
    render(<Footer {...props} variant="surface" />);
    expect(screen.getByRole("contentinfo")).toHaveClass("bg-surface");
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveClass("text-accent");
  });
});
