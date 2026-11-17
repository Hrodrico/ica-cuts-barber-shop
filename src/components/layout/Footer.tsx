import Link from "next/link";
import type { NavItem } from "@/lib/navigation";
import type { SocialLink } from "@/types/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container } from "./Container";

export type FooterContactLine = {
  label: string;
  /** tel:, mailto: o mapa. Sin href, se muestra como texto. */
  href?: string;
  external?: boolean;
};

type Variant = "primary" | "surface";

type Props = {
  name: string;
  tagline: string;
  navigation: NavItem[];
  social: SocialLink[];
  contactLines: FooterContactLine[];
  year: number;
  variant?: Variant;
  /** Espacio al final para que un botón flotante (ej: WhatsApp) no tape el último texto en móvil. */
  floatingButtonSpace?: boolean;
};

/**
 * Clases por variante. En "surface" el texto secundario usa el token muted (no opacidad,
 * que sobre un fondo de color da tonos apagados) y los íconos conservan el acento.
 * En modo oscuro el primary es muy llamativo para un bloque grande: también usa surface.
 */
const variants: Record<Variant, { root: string; secondary: string; link: string; social: string; divider: string }> = {
  primary: {
    root: "focus-on-dark bg-primary text-primary-foreground dark:border-t dark:border-border dark:bg-surface dark:text-foreground",
    secondary: "opacity-80 dark:text-muted dark:opacity-100",
    link: "opacity-80 hover:opacity-100 active:opacity-100 dark:text-muted dark:opacity-100 dark:hover:text-foreground dark:active:text-foreground",
    // El acento sobre el primary no contrasta: los íconos toman el color del texto.
    social: "text-current dark:text-accent",
    divider: "border-primary-foreground/15 dark:border-border",
  },
  surface: {
    root: "border-t border-border bg-surface text-foreground",
    secondary: "text-muted",
    link: "text-muted hover:text-foreground active:text-foreground",
    social: "text-accent",
    divider: "border-border",
  },
};

export function Footer({
  name,
  tagline,
  navigation,
  social,
  contactLines,
  year,
  variant = "primary",
  floatingButtonSpace = false,
}: Props) {
  const styles = variants[variant];
  const linkClass = `${styles.link} transition`;

  return (
    <footer className={styles.root}>
      {/* Columnas solo desde lg: en tablet no caben bien y se apilan como en móvil.
          La marca toma el espacio libre (flex-1) y las otras columnas miden lo que su contenido. */}
      <Container className="flex flex-col gap-10 py-12 lg:flex-row lg:gap-24 xl:gap-32">
        <div className="lg:flex-1">
          <p className="text-lg font-bold">{name}</p>
          <p className={`mt-2 text-sm ${styles.secondary}`}>{tagline}</p>
          <SocialLinks links={social} label="Síguenos" className="mt-6" iconClassName={styles.social} />
        </div>

        <nav aria-label="Pie de página">
          {/* -mt-3 compensa el py-3 de los enlaces (área táctil) para alinear el primero con las otras columnas. */}
          <ul className="-mt-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`inline-block py-3 ${linkClass}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {contactLines.length > 0 && (
          // Mismo alto táctil que la navegación (py-3, compensado con -mt-3).
          <ul className="-mt-3 text-sm">
            {contactLines.map((line) => (
              <li key={line.label}>
                {line.href ? (
                  <a
                    href={line.href}
                    className={`inline-block py-3 ${linkClass}`}
                    {...(line.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {line.label}
                  </a>
                ) : (
                  <span className={`inline-block py-3 ${styles.secondary}`}>{line.label}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>

      <div className={`border-t ${styles.divider}`}>
        <Container className={`py-6 text-xs ${styles.secondary} ${floatingButtonSpace ? "pb-24 sm:pb-6" : ""}`}>
          © {year} {name}. Todos los derechos reservados.
        </Container>
      </div>
    </footer>
  );
}
