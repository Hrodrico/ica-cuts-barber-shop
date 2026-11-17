import type { SiteConfig } from "@/types/site";

// IcaCuts: datos tomados de su página de AgendaPro (sucursal 28448) y del afiche del local.
export const config: SiteConfig = {
  name: "Ica Cuts",
  tagline: "Barbería y academia de barbería en Maipú",
  description:
    "Barbería, salón de manicure y academia de barbería en Maipú. Profesionalismo, estilo, comodidad y la mejor atención.",
  // Provisional hasta tener dominio propio.
  url: "https://ica-cuts-barber-shop.vercel.app",
  locale: "es-CL",
  contact: {
    phone: "+56 9 7841 3652",
    email: "ica.cutscl@gmail.com",
    whatsapp: {
      number: "+56 9 7841 3652",
      message: "¡Hola! Vi su sitio web y quiero agendar una hora.",
    },
    // AgendaPro permite embeberse (sin X-Frame-Options); ids tomados de su página pública.
    booking: {
      url: "https://icacuts.site.agendapro.com/cl/sucursal/28448",
      label: "Agenda tu hora",
      embed: true,
      description:
        "Elige servicio, barbero y horario. Te llegará la confirmación por correo.",
      professionals: [
        { slug: "alonso-santana", name: "Alonso Santana", url: "https://icacuts.site.agendapro.com/cl/sucursal/28448/profesional/99987" },
        { slug: "gael", name: "Gael", url: "https://icacuts.site.agendapro.com/cl/sucursal/28448/profesional/432441" },
        { slug: "vito", name: "Vito", url: "https://icacuts.site.agendapro.com/cl/sucursal/28448/profesional/579216" },
        { slug: "jotta", name: "Jotta", url: "https://icacuts.site.agendapro.com/cl/sucursal/28448/profesional/331377" },
        { slug: "juanca", name: "Juanca", url: "https://icacuts.site.agendapro.com/cl/sucursal/28448/profesional/280184" },
      ],
    },
    address: "Parque Central Poniente 149",
    city: "Maipú, Santiago",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Parque+Central+Poniente+149%2C+Maip%C3%BA%2C+Santiago",
    // Según la agenda de los barberos en AgendaPro: el domingo el último turno termina a las 21:00.
    hours: [
      { label: "Lunes a sábado", value: "10:00 – 21:30" },
      { label: "Domingo", value: "10:00 – 21:00" },
    ],
  },
  social: [{ network: "instagram", url: "https://instagram.com/ica.cuts" }],
  branding: {
    // Vectorizado del logo de AgendaPro (200 px); reemplazar si el dueño entrega el original.
    logo: "/logos/logo-icacuts.svg",
    // El dorado es el color de las acciones: el footer va en surface para no usarlo en un bloque de texto.
    footer: "surface",
  },
  // Negro y dorado, como el afiche del local.
  theme: {
    primary: "#D4A84B",
    primaryForeground: "#111111",
    accent: "#E8C374",
    accentForeground: "#111111",
    accentText: "#E8C374",
    background: "#0E0E0E",
    foreground: "#F5F1E8",
    surface: "#1A1917",
    muted: "#A8A196",
    border: "#2E2C28",
  },
  seo: {
    title: "Ica Cuts | Barbería en Maipú",
    description:
      "Cortes, barba, color y limpieza facial en Maipú. Abierto todos los días desde las 10:00. Agenda tu hora en línea.",
    ogImage: "/og-image.png",
    keywords: ["barbería Maipú", "corte de pelo Maipú", "barbería Santiago", "academia de barbería"],
  },
  sections: {
    about: true,
    services: true,
    // Sin fotos reales de cortes todavía.
    projects: false,
    reviews: true,
    contact: true,
  },
  labels: {
    about: "La barbería",
    services: "Servicios y precios",
    projects: "Nuestros cortes",
    reviews: "Reseñas",
    contact: "Contacto",
  },
};
