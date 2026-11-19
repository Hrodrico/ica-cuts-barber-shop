import type { Review } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "./ReviewCard";

type Props = {
  id: string;
  label: string;
  reviews: Review[];
};

export function ReviewsSection({ id, label, reviews }: Props) {
  if (reviews.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-24">
      <Container>
        <SectionHeading id={`${id}-title`} title={label} />
        <CardCarousel label={label}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </CardCarousel>
      </Container>
    </section>
  );
}
