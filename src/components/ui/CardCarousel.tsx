"use client";

import { Children, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useSwipeTrack } from "@/lib/useSwipeTrack";

type Props = {
  /** Nombre accesible del carrusel. */
  label: string;
  /** Una tarjeta por elemento (con `key`). */
  children: ReactNode;
  /** Milisegundos entre páginas con una sola tarjeta (móvil). */
  interval?: number;
  /** Milisegundos entre páginas con varias tarjetas (tablet y escritorio): hay más que leer. */
  groupInterval?: number;
};

// Tarjetas por página: 1 en móvil, 2×2 desde md y 3×2 desde lg (breakpoints de Tailwind).
const QUERIES = { lg: "(min-width: 64rem)", md: "(min-width: 48rem)" };

function subscribe(onChange: () => void) {
  const lists = Object.values(QUERIES).map((query) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

const getPageSize = () =>
  window.matchMedia(QUERIES.lg).matches ? 6 : window.matchMedia(QUERIES.md).matches ? 4 : 1;

const controlClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-background active:scale-95";

/**
 * Carrusel de tarjetas por páginas. En el servidor se asume móvil (1 por página) y al
 * hidratar se ajusta al ancho de pantalla; al cambiar de tamaño vuelve a la primera página.
 */
export function CardCarousel({ label, children, interval = 4000, groupInterval = 8000 }: Props) {
  const pageSize = useSyncExternalStore(subscribe, getPageSize, () => 1);
  const cards = Children.toArray(children);
  const pages = Array.from({ length: Math.ceil(cards.length / pageSize) }, (_, i) =>
    cards.slice(i * pageSize, (i + 1) * pageSize),
  );

  // Con otro tamaño de página cambia la cantidad de páginas: se reinicia el estado del gesto.
  return (
    <Pages
      key={pageSize}
      label={label}
      pages={pages}
      interval={pageSize === 1 ? interval : groupInterval}
    />
  );
}

type PagesProps = {
  label: string;
  pages: ReactNode[][];
  interval: number;
};

/**
 * Avanza solo (la barra se llena mientras tanto), pero se detiene con el puntero encima,
 * con foco de teclado, al arrastrar, fuera de pantalla, con el botón de pausa o si el
 * sistema pide reducir el movimiento (WCAG 2.2.2). Se desliza con el dedo o el mouse.
 */
function Pages({ label, pages, interval }: PagesProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { viewportRef, handlers, slideStyle, step, dragging } = useSwipeTrack({
    count: pages.length,
    index: current,
    onIndexChange: setCurrent,
    loop: true,
    reducedMotion,
  });

  // Fuera de pantalla no avanza: al llegar a la sección se ve desde donde quedó.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const multiple = pages.length > 1;
  const autoplay = multiple && !paused && !interacting && !dragging && !reducedMotion && visible;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      {/* Las páginas comparten la misma celda: el alto lo fija la más alta y no salta al
          cambiar. El margen negativo con padding deja un espacio entre páginas al deslizar. */}
      <div
        ref={viewportRef}
        {...handlers}
        aria-live={autoplay ? "off" : "polite"}
        className="-mx-3 grid cursor-grab touch-pan-y touch-pinch-zoom overflow-hidden select-none active:cursor-grabbing"
      >
        {pages.map((page, index) => (
          <div
            key={index}
            data-slide
            role="group"
            aria-roledescription="página"
            aria-label={`${index + 1} de ${pages.length}`}
            aria-hidden={index !== current}
            inert={index !== current}
            className="grid grid-rows-1 gap-6 px-3 will-change-transform [grid-area:1/1] md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3"
            style={slideStyle(index)}
          >
            {page}
          </div>
        ))}
      </div>

      {multiple && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
            className={controlClass}
          >
            {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
          </button>

          <div className="flex items-center gap-3">
            <span className="relative h-1.5 w-20 overflow-hidden rounded-full bg-border">
              {/* El fin de la animación avanza de página: barra y cambio nunca se desfasan,
                  y al pausar (animation-play-state) se retoma desde donde quedó. */}
              <span
                key={current}
                data-carousel-progress
                onAnimationEnd={() => step(1)}
                className="absolute inset-0 origin-left rounded-full bg-primary"
                style={
                  reducedMotion
                    ? undefined
                    : {
                        animation: `carousel-progress ${interval}ms linear forwards`,
                        animationPlayState: autoplay ? "running" : "paused",
                      }
                }
              />
            </span>
            <span className="text-sm text-muted tabular-nums" aria-hidden>
              {current + 1} / {pages.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} aria-label="Página anterior" className={controlClass}>
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Página siguiente" className={controlClass}>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
