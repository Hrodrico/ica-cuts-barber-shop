import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { bookingPath, professionalPath } from "@/lib/booking";
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
    <section className="py-10 sm:py-14">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-lg text-muted">{description}</p>}
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}
