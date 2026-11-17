import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookingPath } from "@/lib/booking";
import { BookingPage, embeddedBooking } from "./booking-page";

export const metadata: Metadata = embeddedBooking
  ? {
      title: embeddedBooking.label,
      description: embeddedBooking.description,
      alternates: { canonical: bookingPath },
    }
  : {};

export default function ReservePage() {
  if (!embeddedBooking) notFound();

  return (
    <BookingPage
      booking={embeddedBooking}
      title={embeddedBooking.label}
      src={embeddedBooking.url}
      currentHref={bookingPath}
    />
  );
}
