import type { BookingProfessional, ContactInfo } from "@/types/site";

type Booking = NonNullable<ContactInfo["booking"]>;

/** Ruta pública de la agenda embebida. */
export const bookingPath = "/reservar";

export function professionalPath(slug: string): string {
  return `${bookingPath}/${slug}`;
}

/** Destino de los botones de reserva: la página interna si la agenda va embebida; si no, la externa. */
export function bookingHref(booking: Booking): string {
  return booking.embed ? bookingPath : booking.url;
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function findProfessional(booking: Booking, slug: string): BookingProfessional | undefined {
  return booking.professionals?.find((professional) => professional.slug === slug);
}
