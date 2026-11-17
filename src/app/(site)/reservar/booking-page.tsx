import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { bookingEmbedId, bookingPath, professionalPath } from "@/lib/booking";
import { Container } from "@/components/layout/Container";
import { BookingEmbed, type BookingOption } from "@/components/sections/BookingEmbed";

/** La agenda embebida solo existe si el negocio la activó en config.contact.booking. */
export const embeddedBooking = site.contact.booking?.embed ? site.contact.booking : undefined;

const options: BookingOption[] = embeddedBooking?.professionals?.length
  ? [
      { label: "Cualquier profesional", href: bookingPath },
      ...embeddedBooking.professionals.map((professional) => ({
        label: professional.name,
        href: professionalPath(professional.slug),
      })),
    ]
  : [];

type Props = {
  booking: NonNullable<typeof embeddedBooking>;
  title: string;
  src: string;
  currentHref: string;
};

/** Contenido común de /reservar y /reservar/[slug]. */
export function BookingPage({ booking, title, src, currentHref }: Props) {
  return (
    <BookingShell title={title} description={booking.description}>
      <BookingEmbed
        src={src}
        id={bookingEmbedId}
        frameTitle={`Agenda en línea de ${site.name}`}
        options={options}
        currentHref={currentHref}
      />
    </BookingShell>
  );
}

export function BookingShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    // Ocupa exactamente la pantalla bajo el header (h-16 + borde): así la agenda, que tiene
    // su propio scroll, no compite con el de la página. En móvil el encabezado es compacto.
    <section className="flex h-[calc(100dvh-4rem-1px)] min-h-140 flex-col pt-4 sm:py-8">
      <Container className="flex min-h-0 flex-1 flex-col">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 hidden max-w-2xl text-lg text-muted sm:block">{description}</p>}
        <div className="mt-4 flex min-h-0 flex-1 flex-col sm:mt-6">{children}</div>
      </Container>
    </section>
  );
}
