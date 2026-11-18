"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BookingOption } from "@/lib/booking";
import { CloseIcon } from "@/components/ui/icons";
import { BookingFrame } from "./BookingFrame";
import { BookingOptions } from "./BookingOptions";

type Props = {
  title: string;
  description?: string;
  /** Nombre accesible del iframe, ej: "Agenda en línea de Ica Cuts". */
  frameTitle: string;
  /** Agenda general del negocio. */
  src: string;
  /** Agenda general y la de cada profesional. Con menos de dos no se muestra el selector. */
  options?: BookingOption[];
};

function normalize(url: string) {
  try {
    return new URL(url).href;
  } catch {
    return url;
  }
}

/**
 * Agenda de un proveedor externo en un pop-up (`<dialog>` modal). Los botones de reserva son
 * enlaces comunes a la agenda: con JavaScript, un clic en cualquier enlace a `src` o a la
 * agenda de un profesional abre el pop-up con esa agenda; sin él (o con Ctrl/⌘ + clic), el
 * enlace abre la agenda externa. Así los componentes que muestran el botón no dependen de este.
 *
 * El pop-up ocupa la pantalla en móvil y la página de atrás no se desplaza: la agenda es lo
 * único con scroll. El iframe se monta al abrirlo por primera vez y se conserva al cerrarlo,
 * para no perder una reserva a medias si se cierra sin querer.
 */
export function BookingDialog({ title, description, frameTitle, src: defaultSrc, options = [] }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [src, setSrc] = useState<string>();
  const titleId = useId();

  useEffect(() => {
    const sources = new Set([defaultSrc, ...options.map((option) => option.src)].map(normalize));

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || !sources.has(anchor.href)) return;
      const dialog = dialogRef.current;
      // El enlace de respaldo del propio pop-up sí debe abrir la pestaña nueva.
      if (!dialog || dialog.contains(anchor)) return;

      event.preventDefault();
      setSrc(anchor.href);
      if (!dialog.open) dialog.showModal();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [defaultSrc, options]);

  const current = src ?? defaultSrc;
  const currentOption = options.find((option) => normalize(option.src) === normalize(current));

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="modal-dialog booking-dialog m-0 h-dvh max-h-none w-screen max-w-none bg-background p-0 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm sm:m-auto sm:h-[min(calc(100dvh-4rem),56rem)] sm:w-[min(calc(100vw-4rem),64rem)] sm:rounded-3xl sm:border sm:border-border sm:shadow-2xl"
    >
      <div className="flex h-full flex-col px-4 pt-3 sm:px-6 sm:pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 pt-1.5">
            <h2 id={titleId} className="text-xl font-bold tracking-tight sm:text-2xl">
              {title}
            </h2>
            {description && <p className="mt-1 hidden text-muted sm:block">{description}</p>}
          </div>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Cerrar agenda"
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition hover:bg-accent/15 active:scale-95 active:bg-accent/15 motion-reduce:active:scale-100"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </form>
        </div>

        {options.length > 1 && (
          <div className="mt-3">
            <BookingOptions options={options} current={currentOption?.src} onSelect={setSrc} />
          </div>
        )}

        <p className="mt-3 text-xs text-muted sm:text-sm">
          ¿No carga o no te deja reservar?{" "}
          <a
            href={current}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-text underline underline-offset-2"
          >
            Abre la agenda en una pestaña nueva
          </a>
        </p>

        {/* En móvil, de borde a borde; en escritorio, con margen inferior dentro del panel. */}
        <div className="-mx-4 mt-3 flex min-h-0 flex-1 sm:mx-0 sm:mb-6">
          {/* key: al cambiar de profesional se monta un iframe nuevo en vez de reutilizar su historial. */}
          {src && <BookingFrame key={src} src={src} title={frameTitle} />}
        </div>
      </div>
    </dialog>
  );
}
