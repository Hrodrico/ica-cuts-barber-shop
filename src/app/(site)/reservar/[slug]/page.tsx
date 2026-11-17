import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { findProfessional, professionalPath } from "@/lib/booking";
import { BookingPage, BookingShell, embeddedBooking } from "../booking-page";

// Con Cache Components, generateStaticParams debe devolver al menos un valor.
const EMPTY_PLACEHOLDER = "__sin-profesionales__";

export function generateStaticParams() {
  const professionals = embeddedBooking?.professionals ?? [];
  return professionals.length > 0
    ? professionals.map((professional) => ({ slug: professional.slug }))
    : [{ slug: EMPTY_PLACEHOLDER }];
}

export async function generateMetadata(props: PageProps<"/reservar/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const professional = embeddedBooking && findProfessional(embeddedBooking, slug);
  if (!embeddedBooking || !professional) return {};

  return {
    title: `${embeddedBooking.label} con ${professional.name}`,
    description: embeddedBooking.description,
    alternates: { canonical: professionalPath(professional.slug) },
  };
}

// Lo que lee `params` va dentro de <Suspense> para no bloquear la navegación.
export default function ProfessionalBookingPage(props: PageProps<"/reservar/[slug]">) {
  return (
    <Suspense fallback={<BookingSkeleton />}>
      <ProfessionalBooking params={props.params} />
    </Suspense>
  );
}

async function ProfessionalBooking({ params }: { params: PageProps<"/reservar/[slug]">["params"] }) {
  const { slug } = await params;
  const professional = embeddedBooking && findProfessional(embeddedBooking, slug);
  if (!embeddedBooking || !professional) notFound();

  return (
    <BookingPage
      booking={embeddedBooking}
      title={`${embeddedBooking.label} con ${professional.name}`}
      src={professional.url}
      currentHref={professionalPath(professional.slug)}
    />
  );
}

function BookingSkeleton() {
  return (
    <BookingShell title={embeddedBooking?.label ?? ""} description={embeddedBooking?.description}>
      <div aria-busy="true" className="-mx-4 flex-1 animate-pulse bg-surface motion-reduce:animate-none sm:mx-0 sm:rounded-3xl">
        <span className="sr-only">Cargando agenda…</span>
      </div>
    </BookingShell>
  );
}
