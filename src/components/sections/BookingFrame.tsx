"use client";

import { useEffect, useState } from "react";

type Props = {
  src: string;
  title: string;
  /** Texto visible mientras carga, ej: "Cargando agenda de Gael…". */
  loadingLabel?: string;
};

/** Si `load` no llega (bloqueo o red lenta), la agenda se muestra igual pasado este tiempo. */
const FALLBACK_MS = 6000;

/**
 * iframe que aparece con un fundido cuando termina de cargar. Mientras tanto se ve un
 * esqueleto con el color del sitio y un indicador de carga (también al cambiar de profesional):
 * evita el salto brusco de un recuadro vacío a la página (blanca) del proveedor. Se monta en el cliente para no perder el evento `load` si la
 * agenda carga antes de hidratar. El padre le pone `key={src}`, así cada agenda parte de cero.
 */
export function BookingFrame({ src, title, loadingLabel = "Cargando agenda…" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Montaje en el cliente: el iframe no va en el HTML del servidor (ver arriba).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const timer = window.setTimeout(() => setLoaded(true), FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-1">
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface transition-opacity duration-300 motion-reduce:transition-none sm:rounded-3xl ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary motion-reduce:animate-none"
        />
        <p role="status" className="text-sm text-muted">
          {loaded ? "" : loadingLabel}
        </p>
      </div>
      {mounted && (
        <iframe
          src={src}
          title={title}
          allow="payment"
          onLoad={() => setLoaded(true)}
          className={`relative block w-full flex-1 border-y border-border bg-transparent transition-opacity duration-300 ease-out motion-reduce:transition-none sm:rounded-3xl sm:border ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
