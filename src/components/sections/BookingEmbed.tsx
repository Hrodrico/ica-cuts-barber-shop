import Link from "next/link";
import { CalendarIcon } from "@/components/ui/icons";

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
};

/**
 * Agenda de un proveedor externo dentro del sitio. Un iframe de otro dominio no se puede
 * medir desde aquí, así que tiene alto fijo y su propio scroll. El enlace final cubre los
 * navegadores que bloquean sus cookies dentro del iframe (ej: Safari) y no lo dejan reservar.
 */
export function BookingEmbed({ src, frameTitle, options = [], currentHref }: Props) {
  return (
    <div>
      {options.length > 1 && (
        <nav aria-label="Elige profesional">
          <ul className="flex flex-wrap gap-2">
            {options.map((option) => {
              const current = option.href === currentHref;
              return (
                <li key={option.href}>
                  <Link
                    href={option.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition ${
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
      )}

      <iframe
        // key: al cambiar de profesional se monta un iframe nuevo en vez de reutilizar el historial.
        key={src}
        src={src}
        title={frameTitle}
        allow="payment"
        className="mt-6 block h-[75dvh] min-h-[560px] w-full rounded-3xl border border-border bg-background"
      />

      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <CalendarIcon className="h-4 w-4 shrink-0" />
        <span>
          ¿No carga o no te deja reservar?{" "}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-text underline underline-offset-2"
          >
            Abre la agenda en una pestaña nueva
          </a>
        </span>
      </p>
    </div>
  );
}
