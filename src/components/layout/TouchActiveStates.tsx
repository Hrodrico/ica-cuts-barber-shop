"use client";

import { useEffect } from "react";

/**
 * Safari en iOS no aplica `:active` al tocar si la página no escucha `touchstart`: sin esto,
 * los estados `active:` (respuesta al presionar) no se ven en iPhone. El listener es pasivo
 * y vacío, así que no bloquea ni retrasa el scroll.
 */
export function TouchActiveStates() {
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);
  return null;
}
