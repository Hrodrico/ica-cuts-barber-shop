"use client";

import { useEffect, useRef } from "react";
import type { BookingOption } from "@/lib/booking";

type Props = {
  options: BookingOption[];
  /** src de la opción activa. */
  current?: string;
  onSelect: (src: string) => void;
};

/**
 * Selector de profesional. En móvil es una fila con scroll horizontal: al cambiar de opción
 * se desplaza hasta la activa para que no quede cortada en el borde.
 */
export function BookingOptions({ options, current, onSelect }: Props) {
  const currentRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Opcional: jsdom (tests) no lo implementa.
    currentRef.current?.scrollIntoView?.({ block: "nearest", inline: "center" });
  }, [current]);

  return (
    <div role="group" aria-label="Elige profesional" className="-mx-4 sm:mx-0">
      <ul className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:flex-wrap sm:overflow-visible sm:px-0">
        {options.map((option) => {
          const active = option.src === current;
          return (
            <li key={option.src} className="shrink-0">
              <button
                type="button"
                ref={active ? currentRef : undefined}
                onClick={() => onSelect(option.src)}
                aria-pressed={active}
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition active:scale-[0.97] motion-reduce:active:scale-100 ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-accent hover:text-accent-text active:border-accent active:bg-accent/15"
                }`}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
