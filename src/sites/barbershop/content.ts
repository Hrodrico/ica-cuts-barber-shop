import type { SiteContent } from "@/types/content";

export const content: SiteContent = {
  hero: {
    eyebrow: "Barbería en Maipú",
    title: "Tu estilo, con la mejor atención",
    description:
      "Cortes, barba, color y limpieza facial con barberos profesionales. Abierto todos los días: de lunes a sábado de 10:00 a 21:30 y domingo hasta las 21:00.",
    // Imagen provisional (la portada de AgendaPro); reemplazar por fotos del local.
    images: [
      {
        src: "/images/hero/corte-tijera.webp",
        alt: "Barbero cortando el pelo con tijera y peineta",
      },
    ],
    // La agenda (AgendaPro) se configura en config.contact.booking y se muestra en /reservar.
    primaryCta: { label: "Agenda tu hora", href: "/reservar" },
    secondaryCta: { label: "Ver servicios", href: "/#servicios" },
  },
  about: {
    title: "Profesionalismo, estilo y comodidad",
    paragraphs: [
      "En Ica Cuts cada cliente recibe la mejor atención en un ambiente agradable. Trabajamos degradados, cortes tradicionales a tijera, diseños, barba y color.",
      "También somos academia de barbería y salón de manicure.",
    ],
    highlights: [
      { value: "5,0", label: "valoración en 37 reseñas" },
      { value: "5", label: "barberos" },
      { value: "7 días", label: "de atención a la semana" },
    ],
  },
  services: [
    {
      id: "corte",
      title: "Corte de cabello",
      price: "$14.000",
      duration: "40 min",
      description:
        "Degradé, tradicional o a tijera. Incluye moldeado térmico y finalización con producto.",
    },
    {
      id: "corte-tradicional",
      title: "Corte tradicional",
      price: "$14.000",
      duration: "30 min",
      description: "El clásico de siempre, prolijo y a tu medida.",
    },
    {
      id: "corte-diseno",
      title: "Corte + diseño",
      price: "$15.000",
      duration: "35 min",
      description: "Corte con diseño a elección.",
    },
    {
      id: "corte-cejas",
      title: "Corte + cejas",
      price: "$16.000",
      duration: "35 min",
      description: "Corte de cabello con perfilado de cejas.",
    },
    {
      id: "corte-barba",
      title: "Corte + barba",
      price: "$19.000",
      duration: "50 min",
      description: "El servicio completo: corte y perfilado de barba.",
    },
    {
      id: "corte-cejas-diseno",
      title: "Corte + cejas + diseño",
      price: "$19.000",
      duration: "35 min",
      description: "Corte, perfilado de cejas y diseño a elección.",
    },
    {
      id: "barba",
      title: "Perfilado de barba",
      price: "$8.000",
      duration: "20 min",
      description:
        "Perfilado y amoldamiento tradicional con navaja y shaving gel. Finalización con aceite hidratante.",
    },
    {
      id: "limpieza-facial",
      title: "Limpieza facial",
      price: "$7.000",
      duration: "30 min",
      description: "Limpieza y exfoliación con vapozono. Incluye mascarilla a elección.",
    },
    {
      id: "lavado",
      title: "Lavado de cabello",
      price: "$5.000",
      duration: "15 min",
      description: "Lavado para complementar tu corte.",
    },
    {
      id: "bloque-color",
      title: "Bloque de color",
      price: "$30.000",
      duration: "2 h",
      description: "Decoloración + color a elección.",
    },
    {
      id: "visos",
      title: "Visos",
      price: "$50.000",
      duration: "2 h",
      description: "Decoloración + coloración a elección.",
    },
    {
      id: "color-completo",
      title: "Color completo",
      price: "$70.000",
      duration: "2 h",
      description:
        "Decoloración + coloración a elección. El precio puede variar según el largo y el diseño final.",
    },
  ],
  projects: [],
  // Reseñas reales de clientes en AgendaPro (todas con 5 estrellas).
  reviews: [
    {
      id: "emilio-2026-09",
      author: "Emilio",
      role: "Corte de cabello",
      rating: 5,
      text: "Excelente servicio. Mi barbero trabaja con mucha dedicación y atención a los detalles. Siempre deja el corte tal como uno lo pide y se preocupa de que el resultado quede impecable. Además, el ambiente es muy agradable y el trato es excelente. 100% recomendado.",
      date: "2026-09-13",
    },
    {
      id: "ivan-2026-08",
      author: "Iván",
      role: "Corte de cabello",
      rating: 5,
      text: "Excelente atención de Alonso Santana, sin duda el mejor barbero. Se nota la dedicación, el profesionalismo y el cuidado en cada detalle.",
      date: "2026-08-29",
    },
    {
      id: "gustavo-2026-09",
      author: "Gustavo",
      role: "Corte de cabello",
      rating: 5,
      text: "Realmente los mejores de Maipú. 100% recomendable.",
      date: "2026-09-09",
    },
    {
      id: "jose-2026-09",
      author: "José",
      role: "Corte + cejas + diseño",
      rating: 5,
      text: "Muy bueno, buen corte, barberos amables, puntuales, barato y confiable.",
      date: "2026-09-09",
    },
    {
      id: "andres-2026-10",
      author: "Andrés",
      role: "Corte de cabello",
      rating: 5,
      text: "Siempre es un placer ir a la barbería. La mejor atención.",
      date: "2026-10-07",
    },
    {
      id: "alvaro-2026-08",
      author: "Álvaro",
      role: "Corte + diseño",
      rating: 5,
      text: "Muy buena experiencia, full recomendado. Amable, de confianza, y también corta excelente.",
      date: "2026-08-16",
    },
  ],
};
