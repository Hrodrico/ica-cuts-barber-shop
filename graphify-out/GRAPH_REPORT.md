# Graph Report - ica-cuts-barber-shop  (2026-11-16)

## Corpus Check
- 87 files · ~20,322 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 4, .example 1, .ico 1)

## Summary
- 444 nodes · 920 edges · 22 communities (14 shown, 8 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c88bbf1f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Páginas y metadatos SEO
- Workflow de CI
- icons.tsx
- Arquitectura y reglas (docs)
- index.ts
- Layout raíz, navegación y tema
- next
- Config de TypeScript
- Scripts npm
- Tema, tipos y validación de contenido
- Reglas de graphify
- Fuente única de datos
- Convenciones de código
- Tipos globales de rutas
- Registro de negocios
- [slug]/page.tsx
- ContactSection.tsx
- useSwipeTrack.ts
- package.json

## God Nodes (most connected - your core abstractions)
1. `vitest` - 23 edges
2. `next` - 22 edges
3. `Container()` - 19 edges
4. `react` - 17 edges
5. `ContactSection()` - 16 edges
6. `compilerOptions` - 16 edges
7. `@testing-library/react` - 14 edges
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

## Communities (22 total, 8 thin omitted)

### Community 0 - "Páginas y metadatos SEO"
Cohesion: 0.10
Nodes (35): HomePage(), metadata, Container(), Props, AboutSection(), Props, HeroSection(), isExternal() (+27 more)

### Community 2 - "Workflow de CI"
Cohesion: 0.05
Nodes (44): if, name, needs, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress (+36 more)

### Community 3 - "icons.tsx"
Cohesion: 0.11
Nodes (21): dependencies, next@16.4.3, react@19.3.0, react, base, ChevronLeftIcon(), ChevronRightIcon(), CloseIcon() (+13 more)

### Community 4 - "Arquitectura y reglas (docs)"
Cohesion: 0.06
Nodes (24): generate-agent-files.js (next dev re-adds block), node_modules/next/dist/docs (local Next.js docs), Active business flow (sites/index.ts -> lib/site.ts, lib/data.ts), Project architecture (app/components/lib/sites/types), business-web-starter (template base), Cache Components (use cache, cacheLife, connection), CI workflow (.github/workflows/ci.yml), E2E tests (Playwright, e2e/, Pixel 7 + desktop) (+16 more)

### Community 5 - "index.ts"
Cohesion: 0.09
Nodes (19): files, imagesDir, listImages(), output, placeholders, root, optional(), withPlaceholder() (+11 more)

### Community 6 - "Layout raíz, navegación y tema"
Cohesion: 0.13
Nodes (20): geistSans, metadata, RootLayout(), MoonIcon(), SunIcon(), applyTheme(), isDarkNow(), isDarkOnServer() (+12 more)

### Community 7 - "next"
Cohesion: 0.08
Nodes (27): @playwright/test@^1.64.1, @playwright/test, getCurrentYear(), SiteLayout(), Footer(), Props, HashlessSectionLinks(), renderPage() (+19 more)

### Community 8 - "Config de TypeScript"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Scripts npm"
Cohesion: 0.18
Nodes (11): scripts, build, dev, images:placeholders, lint, prebuild, predev, start (+3 more)

### Community 12 - "Tema, tipos y validación de contenido"
Cohesion: 0.33
Nodes (4): src/sites/sites.test.ts content validation, Theme flow (config.theme -> themeToCssVars -> --brand-* -> globals.css @theme inline), Colocated unit tests (Vitest + Testing Library), Tests (README)

### Community 19 - "[slug]/page.tsx"
Cohesion: 0.12
Nodes (23): next, metadata, ProjectsPage(), generateMetadata(), generateStaticParams(), Params, parentCrumbs, ProjectDetail() (+15 more)

### Community 20 - "ContactSection.tsx"
Cohesion: 0.17
Nodes (18): NotFound(), ContactSection(), Item(), Props, ButtonLink(), Props, Variant, variants (+10 more)

### Community 21 - "useSwipeTrack.ts"
Cohesion: 0.34
Nodes (12): criticalSpring(), PointerSample, projectMomentum(), releaseTarget(), releaseVelocity(), rubberband(), SpringState, wrapIndex() (+4 more)

### Community 22 - "package.json"
Cohesion: 0.05
Nodes (43): eslintConfig, nextConfig, react-dom@19.3.0, devDependencies, eslint@^10.13.0, eslint-config-next@16.4.3, jsdom@^30.1.3, sharp@^0.35.5 (+35 more)

## Knowledge Gaps
- **17 isolated node(s):** `{ config, content }`, `Theme flow (config.theme -> themeToCssVars -> --brand-* -> globals.css @theme inline)`, `Colocated unit tests (Vitest + Testing Library)`, `graphify skill (project)`, `graphify usage rules (query before grep, update after edits)` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 157 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `[slug]/page.tsx` to `Páginas y metadatos SEO`, `icons.tsx`, `Layout raíz, navegación y tema`, `next`, `ContactSection.tsx`, `package.json`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **What connects `{ config, content }`, `Theme flow (config.theme -> themeToCssVars -> --brand-* -> globals.css @theme inline)`, `Colocated unit tests (Vitest + Testing Library)` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Páginas y metadatos SEO` be split into smaller, more focused modules?**
  _Cohesion score 0.09653092006033183 - nodes in this community are weakly interconnected._
- **Why does `react` connect `icons.tsx` to `Páginas y metadatos SEO`, `Layout raíz, navegación y tema`, `next`, `[slug]/page.tsx`, `ContactSection.tsx`, `useSwipeTrack.ts`, `package.json`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `Workflow de CI` be split into smaller, more focused modules?**
  _Cohesion score 0.049494949494949494 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `package.json` to `Páginas y metadatos SEO`, `icons.tsx`, `index.ts`, `Layout raíz, navegación y tema`, `next`, `[slug]/page.tsx`, `ContactSection.tsx`, `useSwipeTrack.ts`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `icons.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11174242424242424 - nodes in this community are weakly interconnected._