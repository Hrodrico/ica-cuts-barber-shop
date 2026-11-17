# Graph Report - ica-cuts-barber-shop  (2026-11-17)

## Corpus Check
- 96 files · ~40,639 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .example 1, .css 1)

## Summary
- 479 nodes · 1023 edges · 29 communities (19 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `43b18aff`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Páginas y metadatos SEO
- devDependencies
- Workflow de CI
- icons.tsx
- Arquitectura y reglas (docs)
- index.ts
- Layout raíz, navegación y tema
- next
- Config de TypeScript
- vitest
- Scripts npm
- eslint.config.mjs
- Tema, tipos y validación de contenido
- Reglas de graphify
- Fuente única de datos
- Convenciones de código
- Tipos globales de rutas
- Registro de negocios
- next
- ImageCarousel.test.tsx
- trabajos/[slug]/page.tsx
- package.json
- Header.tsx
- navigation.ts
- dependencies
- Rating.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 25 edges
2. `vitest` - 25 edges
3. `Container()` - 21 edges
4. `react` - 20 edges
5. `ContactSection()` - 17 edges
6. `compilerOptions` - 16 edges
7. `@testing-library/react` - 15 edges
8. `ButtonLink()` - 13 edges
9. `HomePage()` - 12 edges
10. `Media()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `graphify skill (project)` --conceptually_related_to--> `graphify usage rules (query before grep, update after edits)`  [INFERRED]
  .claude/CLAUDE.md → CLAUDE.md
- `How to grow a project (outside base)` --semantically_similar_to--> `Scaling a clone (demos removal, sections, pages, login, DB/CMS, forms, e-commerce, remote images)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Tests (README)` --semantically_similar_to--> `Colocated unit tests (Vitest + Testing Library)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Continuous integration and ruleset setup` --semantically_similar_to--> `CI workflow (.github/workflows/ci.yml)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Pre-publish checklist` --semantically_similar_to--> `Minimum quality (a11y, mobile-first, next/image Media, SEO, real content)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Six non-breakable architecture rules** — claude_rule_agnostic_components, claude_rule_data_layer, claude_rule_single_source, claude_rule_generic_vocabulary, claude_rule_color_tokens, claude_rule_types_first [EXTRACTED 1.00]
- **Next.js 16 project particularities** — claude_cache_components, claude_generate_static_params, claude_global_route_types, claude_per_user_data, claude_server_components_default, claude_proxy_ts [INFERRED 0.85]
- **Testing and CI quality gate** — claude_unit_tests_colocated, claude_e2e_playwright, claude_sites_test, claude_ci_workflow, claude_main_branch_protection, claude_verification_workflow [INFERRED 0.85]

## Communities (29 total, 10 thin omitted)

### Community 0 - "Páginas y metadatos SEO"
Cohesion: 0.10
Nodes (33): HomePage(), metadata, ProjectsPage(), Container(), Props, AboutSection(), Props, HeroSection() (+25 more)

### Community 1 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, jsdom@^30.1.3, @playwright/test@^1.64.1, sharp@^0.35.5, tailwindcss@^4, @tailwindcss/turbopack@^4, @types/react@^19, @types/react-dom@^19 (+8 more)

### Community 2 - "Workflow de CI"
Cohesion: 0.05
Nodes (44): if, name, needs, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress (+36 more)

### Community 3 - "icons.tsx"
Cohesion: 0.16
Nodes (24): ChevronLeftIcon(), ExpandIcon(), PauseIcon(), PlayIcon(), ImageCarousel(), Props, ImageGallery(), Props (+16 more)

### Community 4 - "Arquitectura y reglas (docs)"
Cohesion: 0.06
Nodes (24): generate-agent-files.js (next dev re-adds block), node_modules/next/dist/docs (local Next.js docs), Active business flow (sites/index.ts -> lib/site.ts, lib/data.ts), Project architecture (app/components/lib/sites/types), business-web-starter (template base), Cache Components (use cache, cacheLife, connection), CI workflow (.github/workflows/ci.yml), E2E tests (Playwright, e2e/, Pixel 7 + desktop) (+16 more)

### Community 5 - "index.ts"
Cohesion: 0.09
Nodes (19): files, imagesDir, listImages(), output, placeholders, root, optional(), withPlaceholder() (+11 more)

### Community 6 - "Layout raíz, navegación y tema"
Cohesion: 0.14
Nodes (19): react, geistSans, metadata, RootLayout(), MoonIcon(), SunIcon(), applyTheme(), isDarkNow() (+11 more)

### Community 7 - "next"
Cohesion: 0.07
Nodes (38): next, getCurrentYear(), SiteLayout(), Footer(), Props, HashlessSectionLinks(), renderPage(), ContactSection() (+30 more)

### Community 8 - "Config de TypeScript"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "vitest"
Cohesion: 0.15
Nodes (10): @testing-library/jest-dom@^7.0.1, @testing-library/react@^16.3.3, @vitejs/plugin-react@^6.1.2, vitest@^5.0.5, @testing-library/jest-dom, @testing-library/react, @vitejs/plugin-react, vitest (+2 more)

### Community 10 - "Scripts npm"
Cohesion: 0.18
Nodes (11): scripts, build, dev, images:placeholders, lint, prebuild, predev, start (+3 more)

### Community 11 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^10.15.0, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 12 - "Tema, tipos y validación de contenido"
Cohesion: 0.33
Nodes (4): src/sites/sites.test.ts content validation, Theme flow (config.theme -> themeToCssVars -> --brand-* -> globals.css @theme inline), Colocated unit tests (Vitest + Testing Library), Tests (README)

### Community 19 - "next"
Cohesion: 0.14
Nodes (21): BookingPage(), BookingShell(), embeddedBooking, Props, metadata, ReservePage(), BookingSkeleton(), generateMetadata() (+13 more)

### Community 21 - "trabajos/[slug]/page.tsx"
Cohesion: 0.13
Nodes (20): metadata, generateMetadata(), generateStaticParams(), Params, parentCrumbs, ProjectDetail(), ProjectPage(), ProjectSkeleton() (+12 more)

### Community 22 - "package.json"
Cohesion: 0.15
Nodes (12): nextConfig, @testing-library/dom@^10.4.2, @testing-library/user-event@^14.6.8, @types/node@^24.19.2, engines, node, name, private (+4 more)

### Community 23 - "Header.tsx"
Cohesion: 0.17
Nodes (14): NotFound(), Header(), Props, MobileMenu(), Props, navigation, ButtonLink(), Props (+6 more)

### Community 24 - "navigation.ts"
Cohesion: 0.23
Nodes (4): @playwright/test, heroId, sectionIds, labels

### Community 25 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, next@16.4.6, react@19.3.0, react-dom@19.3.0, react-dom

## Knowledge Gaps
- **17 isolated node(s):** `{ config, content }`, `Theme flow (config.theme -> themeToCssVars -> --brand-* -> globals.css @theme inline)`, `Colocated unit tests (Vitest + Testing Library)`, `graphify skill (project)`, `graphify usage rules (query before grep, update after edits)` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 166 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Páginas y metadatos SEO`, `icons.tsx`, `Layout raíz, navegación y tema`, `next`, `trabajos/[slug]/page.tsx`, `package.json`, `Header.tsx`, `dependencies`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `{ config, content }`, `Theme flow (config.theme -> themeToCssVars -> --brand-* -> globals.css @theme inline)`, `Colocated unit tests (Vitest + Testing Library)` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Páginas y metadatos SEO` be split into smaller, more focused modules?**
  _Cohesion score 0.10175763182238667 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Layout raíz, navegación y tema` to `Páginas y metadatos SEO`, `icons.tsx`, `next`, `next`, `trabajos/[slug]/page.tsx`, `package.json`, `Header.tsx`, `dependencies`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `Páginas y metadatos SEO`, `icons.tsx`, `index.ts`, `Layout raíz, navegación y tema`, `next`, `next`, `ImageCarousel.test.tsx`, `trabajos/[slug]/page.tsx`, `package.json`, `Header.tsx`, `navigation.ts`, `Rating.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `Workflow de CI` be split into smaller, more focused modules?**
  _Cohesion score 0.049494949494949494 - nodes in this community are weakly interconnected._