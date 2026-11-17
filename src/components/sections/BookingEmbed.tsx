import { BookingOptions } from "./BookingOptions";

export type BookingOption = {
  label: string;
  href: string;
};

type Props = {
  /** URL de la agenda que se carga en el iframe. */
  src: string;
  /** Nombre accesible del iframe, ej: "Agenda en línea de Ica Cuts". */
  frameTitle: string;
  /** Accesos a la agenda general y a la de cada profesional. Sin opciones no se muestra el selector. */
  options?: BookingOption[];
  /** href de la opción activa. */
  currentHref?: string;
  /** id del contenedor del iframe (ej: para ocultar botones flotantes que lo taparían). */
  id?: string;
};

/**
 * Agenda de un proveedor externo dentro del sitio. Un iframe de otro dominio no se puede
 * medir desde aquí, así que ocupa todo el alto que le da su contenedor (flex) y tiene su
 * propio scroll. El enlace cubre los navegadores que bloquean sus cookies dentro del
 * iframe (ej: Safari) y no lo dejan reservar; va arriba para verlo sin pasar por la agenda.
 */
export function BookingEmbed({ src, frameTitle, options = [], currentHref, id }: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {options.length > 1 && <BookingOptions options={options} currentHref={currentHref} />}

      <p className="mt-3 text-xs text-muted sm:text-sm">
        ¿No carga o no te deja reservar?{" "}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-text underline underline-offset-2"
        >
          Abre la agenda en una pestaña nueva
        </a>
      </p>

      {/* En móvil, de borde a borde: el ancho completo de la pantalla para la agenda. */}
      <div id={id} className="-mx-4 mt-3 flex min-h-105 flex-1 sm:mx-0">
        <iframe
          // key: al cambiar de profesional se monta un iframe nuevo en vez de reutilizar el historial.
          key={src}
          src={src}
          title={frameTitle}
          allow="payment"
          className="block w-full flex-1 border-y border-border bg-background sm:rounded-3xl sm:border"
        />
      </div>
    </div>
  );
}
