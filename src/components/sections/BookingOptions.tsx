"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Option = { label: string; href: string };

type Props = {
  options: Option[];
  currentHref?: string;
};

/**
 * Selector de profesional. En móvil es una fila con scroll horizontal: al cargar se desplaza
 * hasta la opción activa para que no quede cortada en el borde.
 */
export function BookingOptions({ options, currentHref }: Props) {
  const currentRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Opcional: jsdom (tests) no lo implementa.
    currentRef.current?.scrollIntoView?.({ block: "nearest", inline: "center" });
  }, [currentHref]);

  return (
    <nav aria-label="Elige profesional" className="-mx-4 sm:mx-0">
      <ul className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:flex-wrap sm:overflow-visible sm:px-0">
        {options.map((option) => {
          const current = option.href === currentHref;
          return (
            <li key={option.href} className="shrink-0">
              <Link
                ref={current ? currentRef : undefined}
                href={option.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                  current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-accent hover:text-accent-text"
                }`}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
