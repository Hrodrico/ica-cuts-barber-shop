import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CardCarousel } from "./CardCarousel";

// matches: media queries que se cumplen (ej. ancho de escritorio o movimiento reducido).
function mockMedia(matching: string[] = []) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: matching.some((m) => query.includes(m)),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

const cards = Array.from({ length: 7 }, (_, i) => <p key={i}>Tarjeta {i + 1}</p>);

const visiblePage = () => screen.getByRole("group");
const progress = (container: HTMLElement) =>
  container.querySelector<HTMLElement>("[data-carousel-progress]")!;
// jsdom no ejecuta animaciones CSS: se simula el fin de la barra (con el prefijo que usa React en jsdom).
const finishProgress = (container: HTMLElement) =>
  fireEvent(progress(container), new Event("webkitAnimationEnd", { bubbles: true }));

describe("CardCarousel", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("en móvil muestra una tarjeta por página y navega con los botones en bucle", () => {
    mockMedia();
    render(<CardCarousel label="Reseñas">{cards}</CardCarousel>);

    expect(visiblePage()).toHaveAccessibleName("1 de 7");
    expect(visiblePage()).toHaveTextContent("Tarjeta 1");

    fireEvent.click(screen.getByRole("button", { name: "Página anterior" }));
    expect(visiblePage()).toHaveAccessibleName("7 de 7");
    fireEvent.click(screen.getByRole("button", { name: "Página siguiente" }));
    expect(visiblePage()).toHaveAccessibleName("1 de 7");
  });

  it("en escritorio agrupa 6 tarjetas por página", () => {
    mockMedia(["64rem", "48rem"]);
    render(<CardCarousel label="Reseñas">{cards}</CardCarousel>);

    expect(visiblePage()).toHaveAccessibleName("1 de 2");
    expect(visiblePage().children).toHaveLength(6);
  });

  it("da más tiempo a las páginas con varias tarjetas", () => {
    mockMedia(["64rem", "48rem"]);
    const { container } = render(
      <CardCarousel label="Reseñas" interval={4000} groupInterval={8000}>
        {cards}
      </CardCarousel>,
    );
    expect(progress(container).style.animation).toContain("8000ms");
  });

  it("avanza al completarse la barra y la congela con el botón de pausa", () => {
    mockMedia();
    const { container } = render(
      <CardCarousel label="Reseñas" interval={4000}>
        {cards}
      </CardCarousel>,
    );

    expect(progress(container).style.animation).toContain("4000ms");
    finishProgress(container);
    expect(visiblePage()).toHaveAccessibleName("2 de 7");

    fireEvent.click(screen.getByRole("button", { name: "Pausar carrusel" }));
    expect(progress(container).style.animationPlayState).toBe("paused");
  });

  it("no avanza solo si el sistema pide reducir el movimiento", () => {
    mockMedia(["reduce"]);
    const { container } = render(<CardCarousel label="Reseñas">{cards}</CardCarousel>);
    expect(progress(container).style.animation).toBe("");
  });

  it("sin controles si todo cabe en una página", () => {
    mockMedia(["64rem", "48rem"]);
    render(<CardCarousel label="Reseñas">{cards.slice(0, 3)}</CardCarousel>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
