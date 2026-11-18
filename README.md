# Ica Cuts — sitio web

Sitio de **Ica Cuts**, barbería y academia de barbería en Maipú (Parque Central Poniente 149). Muestra servicios con precio y duración, reseñas, horario y contacto, y permite **agendar hora sin salir del sitio**: la agenda de AgendaPro se abre en un pop-up.

Hecho con **Next.js**, **TypeScript** y **Tailwind CSS**, para desplegar en **Vercel**. Parte de la plantilla [`business-web-starter`](https://github.com/Hrodrico/business-web-starter) y evoluciona por separado: no se sincroniza con ella.

## Qué tiene el sitio

- **Home:** hero, quiénes somos, servicios (precio y duración), reseñas y contacto.
- **Reservas en pop-up:** los botones "Agenda tu hora" (header, hero y contacto) abren AgendaPro en un `<dialog>` a pantalla completa en móvil. Dentro se puede elegir barbero. AgendaPro sigue siendo la agenda real y es quien envía las confirmaciones.
- **WhatsApp** flotante con mensaje precargado; se oculta mientras se ven el hero o la sección de contacto.
- **Tema oscuro** con el dorado de la marca. El negocio no define paleta clara, así que no hay botón sol/luna.
- **Footer** con el contacto como texto. Los enlaces (correo, teléfono, mapa) están en la sección de contacto, a pedido del negocio.
- **Trabajos** (`/trabajos`) existe pero está **desactivado** hasta tener fotos reales de cortes.

### Datos del negocio

Los datos son reales y salen de la página pública de AgendaPro (sucursal 28448) y del afiche del local. No reemplazarlos por datos de ejemplo.

| Qué | Dónde |
| --- | --- |
| Nombre, contacto, horario, redes, colores, SEO, secciones activas | `src/sites/barbershop/config.ts` |
| Agenda de AgendaPro y barberos (`contact.booking`) | `src/sites/barbershop/config.ts` |
| Hero, quiénes somos, servicios, reseñas | `src/sites/barbershop/content.ts` |
| Logo | `public/logos/logo-icacuts.svg` |
| Ícono y vista previa al compartir | `src/app/icon.png`, `src/app/apple-icon.png`, `public/og-image.png` |

El id del negocio sigue siendo `barbershop` a propósito, para portar cambios desde la plantilla o hacia ella sin conflictos.

### Agenda (AgendaPro)

- `contact.booking.url` es la agenda de la sucursal y `professionals` la de cada barbero (`/profesional/<id>`). Los ids se toman de la página pública de AgendaPro (`__NEXT_DATA__`).
- **Agregar o quitar un barbero:** editar `professionals` en `config.ts`; aparece o desaparece solo en el selector del pop-up.
- **Cómo se abre el pop-up:** `BookingDialog` (montado en `src/app/(site)/layout.tsx`) intercepta los clics a cualquier enlace a esas URLs. Los botones son enlaces comunes: sin JavaScript, o con Ctrl/⌘ + clic, abren AgendaPro en otra pestaña.
- **Respaldo:** el pop-up tiene el enlace "Abre la agenda en una pestaña nueva", porque algunos navegadores (Safari) pueden bloquear las cookies de AgendaPro dentro del iframe.
- **Selector de barbero:** marca la agenda que cargó el sitio. Si dentro de AgendaPro se elige otro barbero, el selector no cambia: un iframe de otro dominio no deja leer lo que pasa adentro.
- Antes la agenda estaba en una página `/reservar`; se cambió al pop-up porque el scroll de la página y el de la agenda competían.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Cache Components)
- [React 19](https://react.dev/) y [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) para hosting

Requiere **Node.js 24 LTS** (obligatorio). Con `nvm use` se activa la versión de `.nvmrc`. Con otra versión, `npm install` falla (`engine-strict` en `.npmrc`) y `dev`/`build`/`start` se detienen con un aviso.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run start      # sirve el build
npm run lint
npm run images:placeholders   # vistas previas de las fotos (corre solo antes de dev y build)
```

## Tests

```bash
npm test                          # unitarios (Vitest), una pasada
npm run test:watch                # unitarios en modo watch
npx playwright install chromium   # solo la primera vez
npm run test:e2e                  # E2E (Playwright) contra el build de producción
```

- Los tests unitarios viven **junto a cada archivo** (`Rating.tsx` + `Rating.test.tsx`).
- Los E2E viven en `e2e/` y recorren el sitio en móvil (Pixel 7) y escritorio. Los de la agenda bloquean AgendaPro: verifican qué se carga sin depender de su servicio.
- `src/sites/sites.test.ts` valida el contenido: slugs, fechas, reseñas, textos `alt`, que existan las fotos y el logo (y su vista previa), las URLs de la agenda y el contraste de los colores del tema. Es la red de seguridad al editar `config.ts` o `content.ts`.
- Antes de cerrar un cambio: `npm run lint`, `npm test` y `npm run build` sin errores, y `npm run test:e2e` si toca rutas, layouts o páginas.

### Integración continua

`.github/workflows/ci.yml` corre en GitHub Actions en cada push a `main` y en cada pull request: lint y tests unitarios, build + E2E del sitio, y al final el job **CI completo**, que solo pasa si todo lo anterior pasó. Si falla un E2E, el reporte de Playwright queda como artefacto del run.

Vercel no ejecuta los tests: solo hace el build y publica. Para que no llegue nada roto a `main`, la rama está protegida con la regla versionada en [`.github/rulesets/main.json`](.github/rulesets/main.json) (**Settings → Rules → Rulesets → Import a ruleset**): exige PR, bloquea force push y borrado, pide la rama al día y los checks **`Lint y tests unitarios`** y **`CI completo`**. No renombrar esos jobs.

## Estructura

```text
src/
  app/
    layout.tsx               Layout raíz: <html>, fuente, tema y metadatos SEO
    (site)/
      layout.tsx             Header, footer, WhatsApp flotante y pop-up de reservas
      page.tsx               Home: hero + secciones activas
      trabajos/              Listado y detalle de trabajos (sección desactivada)
    not-found.tsx
    robots.ts, sitemap.ts
  components/
    layout/                  Header, Footer, MobileMenu, Container, HashlessSectionLinks
    sections/                Hero, About, Services, Projects, Reviews, Contact,
                             BookingDialog (+ BookingOptions, BookingFrame)
    ui/                      ButtonLink, Media, ImageCarousel, ImageGallery, Rating,
                             SocialLinks, WhatsAppButton, iconos…
  lib/
    data.ts                  Capa de acceso a datos (getServices, getReviews…)
    site.ts                  Configuración del negocio
    booking.ts               Opciones del selector de barbero
    contact.ts               Enlaces wa.me, tel: y mailto:
    navigation.ts            Menú derivado de las secciones activas
    theme.ts                 Colores → variables CSS
    images.ts                Aplica las vistas previas generadas al contenido
    swipe.ts, useSwipeTrack  Gesto de deslizar del carrusel y la galería
  sites/
    index.ts                 Registro del negocio (solo barbershop)
    barbershop/              config.ts + content.ts de Ica Cuts
  types/
    site.ts                  Contrato de configuración (SiteConfig)
    content.ts               Contrato de contenido (Service, Review, Project…)
  generated/
    image-placeholders.json  Vistas previas generadas (se versiona)
```

### Reglas de la arquitectura

- **Los componentes no conocen al negocio.** Reciben todo por props. Solo `src/app/` importa la configuración (`@/lib/site`) y los datos (`@/lib/data`).
- **El contenido se lee solo a través de `src/lib/data.ts`.** Si más adelante se usa base de datos o CMS, se reescriben esas funciones (misma firma) y el resto no cambia.
- **Los colores se definen una sola vez** en `config.ts` y llegan a Tailwind como clases: `bg-primary`, `text-muted`, `border-border`, `bg-surface`, etc.
- **Vocabulario genérico en el código, etiquetas en la config.** En el código se habla de `projects`, `services` y `reviews`; lo que ve el usuario sale de `labels`.

El detalle (y lo propio de Next.js 16) está en [`CLAUDE.md`](CLAUDE.md).

## Imágenes

Las fotos van en `public/images/...` (`.webp` o `.jpg`) y se referencian en `content.ts` con un `alt` descriptivo. Las de cada trabajo van en `/images/projects/<año>/<slug>/` (lo verifica `sites.test.ts`).

Mientras cargan, las fotos locales muestran una vista previa difuminada que genera `npm run images:placeholders` en `src/generated/image-placeholders.json` (se versiona; corre solo antes de `dev` y `build`).

La foto del hero es **provisional** (la portada de AgendaPro) hasta tener fotos del local.

## Despliegue en Vercel

1. Importar el repositorio en Vercel (detecta Next.js automáticamente). No hace falta `SITE_ID`.
2. Asignar el dominio y actualizar `url` en `src/sites/barbershop/config.ts` (hoy es provisional: `https://ica-cuts-barber-shop-id3i.vercel.app`).

Vercel publica cada push a `main` en producción y cada PR como vista previa.

> Nota: con Cache Components, una URL de trabajo inexistente (`/trabajos/no-existe`) muestra la página 404 con `noindex`, pero responde HTTP 200 porque la página se transmite por streaming. Es el comportamiento esperado de Next.js 16.

## graphify (opcional)

El repositorio incluye un grafo del código en `graphify-out/`, que Claude Code usa para orientarse. Para mantenerlo al día, instala la CLI una vez por máquina:

```bash
uv tool install graphifyy   # o: pipx install graphifyy
graphify hook install       # hook post-commit que actualiza el grafo
```

## Pendientes

- Probar una reserva completa desde un iPhone con la agenda en el pop-up (después del primer despliegue).
- Fotos reales del local para el hero y para activar Trabajos (`sections.projects`).
- Dominio propio.
- Medir cuántas personas abren la agenda (por ejemplo, con Vercel Analytics).
