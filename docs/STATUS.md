# RDM Digital LTOS — Estado de Madurez por Módulo

Modelo: **M0** Conceptual · **M1** Scaffolded · **M2** Functional · **M3** Stable · **M4** Verified · **M5** Frozen

Actualizado: **Etapas 1-3 del refactor federado completadas** (façades en `packages/`, `services/` y `apps/`).

## Capas y aliases activos

| Alias | Capa | Apunta a | Etapa |
|---|---|---|---|
| `@` | Legacy | `src/*` | 0 |
| `@geo-engine` | Foundations | `packages/geo-engine/src` | 1 ✅ |
| `@core-kernel` | Foundations | `packages/core-kernel/src` | 1 ✅ |
| `@data-models` | Foundations | `packages/data-models/src` | 1 ✅ |
| `@ui-kit` | Foundations | `packages/ui-kit/src` | 1 ✅ |
| `@ai-core` | Services | `services/ai-core/src` | 2 ✅ |
| `@twin` | Services | `services/territorial-twin/src` | 2 ✅ |
| `@economy` | Services | `services/economy/src` | 2 ✅ |
| `@analytics` | Services | `services/analytics/src` | 2 ✅ |
| `@culture` | Services | `services/culture/src` | 2 ✅ |
| `@app-web/*` | Apps | `apps/web/src/*` | 3 ✅ |
| `@app-admin/*` | Apps | `apps/admin/src/*` | 3 ✅ |

## Matriz de madurez

| Capa | Módulo | Façade | Estado | Notas |
|---|---|---|---|---|
| Foundations | geo-engine | `@geo-engine` | **M4** | LRU+TTL, haversine, bbox, spatial index. |
| Foundations | core-kernel | `@core-kernel` | **M3** | Kernel + modos + auditoría unificados. |
| Foundations | data-models | `@data-models` | **M3** | `Intent` canónico desde `core/models`; legacy expuesto como `LegacyIntent`. |
| Foundations | ui-kit | `@ui-kit` | **M2** | Primitives RDM expuestas; shadcn aún directo. |
| Intelligence | ai-core (Isabella/Realito) | `@ai-core` | **M3** | Decision engine + guardian + tamv base por namespace. |
| Territorial | territorial-twin | `@twin` | **M3** | Orchestrators v1/v2 + scoring v1/v2 + realito gen4 por namespace para evitar colisiones. |
| Economy | economy | `@economy` | **M2** | Catálogo + tipo `AwardPointsRequest`. Stripe live pendiente (Bloque C). |
| Economy | auth + roles + gamificación | — | **M3** | Cerrado bloque previo. |
| Governance | analytics | `@analytics` | **M2** | `CoreMetrics`, `InfraMetrics`, `Monitoring` segregados por namespace. |
| Culture | culture engine | `@culture` | **M3** | Corpus, dichos, tesis TAMV, federations, ecosystem. |
| Experience | apps/web | `@app-web/*` | **M3** | 5 dominios (rdm/community/economy/governance/intelligence) + shared. Manifest lazy. |
| Experience | apps/admin | `@app-admin/*` | **M2** | Surface separada, expone Dashboard. |
| Infra | supabase | _(Etapa 4)_ | **M3** | Migraciones y edge functions desplegadas. |
| Infra | metrics | _(Etapa 4)_ | **M2** | Prometheus + monitoring registrados. |

## Decisiones de diseño Etapa 2-3

- **Namespaces frente a `export *`**: módulos con APIs solapadas (dos `ScoringEngine`, dos `ExperienceOrchestrator`, dos `prometheus`) se exponen como `export * as X` para evitar colisión de símbolos. La selección de la versión canónica se difiere a Etapa 4.
- **App.tsx intacto**: los manifests de dominio (`apps/web/src/domains/*/pages.ts`) son lazy-imports estables. El routing actual sigue funcionando; en Etapa 4 se sustituyen los `lazy(() => import("@/pages/X"))` por moves físicos sin tocar App.tsx.
- **No se introdujo runtime nuevo**: cero dependencias añadidas, cero archivos movidos físicamente, cero rutas modificadas. Sólo aliases + manifests + docs.

## Deuda técnica

- `@ts-nocheck` activo: `ExplorerView`, `Dashboard`, `Auth`, `experience.orchestrator`, varios `data/imported/*`.
- `src/integrations/supabase/{client,types}.ts` autogenerados — nunca editar.
- Dos versiones de `ScoringEngine`, `ExperienceOrchestrator`, `prometheus`: consolidar en Etapa 4.
- Pendientes funcionales: Bloque A (cableado mapa+comercios) · Bloque B (páginas /federation, /nodocero, /realito-ai, /mitos, /transporte) · Bloque C (Stripe live).

## Próxima Etapa (4)

- Mover `supabase/` → `infra/supabase/`.
- Consolidar `infra/metrics/`.
- Resolver duplicidades de scoring/orchestrator/prometheus eligiendo versión canónica.
- Eliminar re-exports puente legacy en `src/core/geo/index.ts`, `src/lib/kernel.ts`, etc.
- Mover archivos físicamente de `src/` → `packages/*/src/` y `services/*/src/`.
