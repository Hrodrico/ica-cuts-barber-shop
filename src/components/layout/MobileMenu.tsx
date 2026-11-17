"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/navigation";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

type Props = {
  navigation: NavItem[];
};

/** Píxeles de scroll que cierran el menú (evita cerrarlo por un rebote mínimo al abrir). */
const SCROLL_CLOSE_DISTANCE = 12;

/**
 * Menú desplegable para móvil. Siempre está montado para animar entrada y salida por el
 * mismo camino (baja desde el header y vuelve a subir); cerrado queda `inert` e invisible.
 * Se cierra con Esc, al tocar fuera, al hacer scroll o al elegir un enlace.
 */
export function MobileMenu({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > SCROLL_CLOSE_DISTANCE) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const iconClass =
    "absolute h-6 w-6 transition duration-200 ease-out motion-reduce:transition-none";

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="relative flex h-11 w-11 items-center justify-center rounded-full transition active:scale-95 active:bg-accent/15 motion-reduce:active:scale-100"
      >
        {/* Los dos íconos se cruzan girando: el cambio se lee como una transformación, no un salto. */}
        <MenuIcon className={`${iconClass} ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
        <CloseIcon className={`${iconClass} ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
      </button>

      <nav
        id="mobile-menu"
        aria-label="Principal"
        inert={!open}
        data-open={open}
        // Sale desde el borde del header (origen arriba) y vuelve por el mismo camino.
        className={`absolute inset-x-0 top-16 origin-top border-b border-border bg-background shadow-lg transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-[opacity,visibility] ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="-mx-2 block rounded-lg px-2 py-3 text-base font-medium transition hover:bg-accent/15 hover:text-accent-text active:bg-accent/15 active:text-accent-text"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
