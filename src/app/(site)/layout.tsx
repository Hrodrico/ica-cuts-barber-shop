import { cacheLife } from "next/cache";
import { site } from "@/lib/site";
import { bookingOptions } from "@/lib/booking";
import { whatsappUrl } from "@/lib/contact";
import { buildNavigation, heroId, sectionIds } from "@/lib/navigation";
import { Footer, type FooterContactLine } from "@/components/layout/Footer";
import { HashlessSectionLinks } from "@/components/layout/HashlessSectionLinks";
import { Header } from "@/components/layout/Header";
import { TouchActiveStates } from "@/components/layout/TouchActiveStates";
import { BookingDialog } from "@/components/sections/BookingDialog";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Layout del sitio público. Áreas privadas futuras (login, panel) van en
 * su propio grupo de rutas, por ejemplo src/app/(dashboard)/, con su layout.
 */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const navigation = buildNavigation(site);
  const { phone, email, address, city, whatsapp } = site.contact;
  const location = [address, city].filter(Boolean).join(", ");
  // Solo texto, a pedido del negocio: los enlaces (correo, teléfono, mapa) están en la sección de contacto.
  const contactLines: FooterContactLine[] = [];
  if (email) contactLines.push({ label: email });
  if (phone) contactLines.push({ label: phone });
  if (location) contactLines.push({ label: location });
  // Con agenda en línea, el botón principal lleva a reservar (en el pop-up, si va embebida);
  // si no, a la sección de contacto.
  const { booking } = site.contact;
  const cta = booking
    ? { label: booking.label, href: booking.url }
    : site.sections.contact
      ? { label: site.actions?.quote ?? site.labels.contact, href: `/#${sectionIds.contact}` }
      : undefined;

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <HashlessSectionLinks />
      <TouchActiveStates />
      <Header
        name={site.name}
        logo={site.branding.logo}
        logoDark={site.themeDark ? site.branding.logoDark : undefined}
        navigation={navigation}
        cta={cta}
        themeToggle={Boolean(site.themeDark)}
      />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer
        name={site.name}
        tagline={site.tagline}
        navigation={navigation}
        social={site.social}
        contactLines={contactLines}
        year={await getCurrentYear()}
        variant={site.branding.footer}
        floatingButtonSpace={Boolean(whatsapp)}
      />
      {whatsapp && (
        <WhatsAppButton
          href={whatsappUrl(whatsapp)}
          // El hero tiene sus propios botones (en móvil el flotante tapaba los del carrusel) y
          // la sección de contacto ya muestra WhatsApp: el botón se oculta mientras se vean.
          hideWhenVisible={[heroId, ...(site.sections.contact ? [sectionIds.contact] : [])]}
        />
      )}
      {booking?.embed && (
        <BookingDialog
          title={booking.label}
          description={booking.description}
          frameTitle={`Agenda en línea de ${site.name}`}
          src={booking.url}
          options={bookingOptions(booking)}
        />
      )}
    </>
  );
}
