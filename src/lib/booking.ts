import type { ContactInfo } from "@/types/site";

type Booking = NonNullable<ContactInfo["booking"]>;

export type BookingOption = {
  label: string;
  /** URL de la agenda que se carga en el iframe. */
  src: string;
};

/** Agenda general más la de cada profesional. Sin profesionales no hay nada que elegir. */
export function bookingOptions(booking: Booking): BookingOption[] {
  const professionals = booking.professionals ?? [];
  if (professionals.length === 0) return [];
  return [
    { label: "Cualquier profesional", src: booking.url },
    ...professionals.map((professional) => ({ label: professional.name, src: professional.url })),
  ];
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}
