# RDM Digital Hub — Nodo Cero

**Plataforma digital soberana para Real del Monte, Hidalgo, México**

Sistema de Inteligencia Territorial en Tiempo Real con arquitectura heptafederada YUN, IA consciente (Isabella Villaseñor AI), motor autónomo ISA-AI, criptografía post-cuántica, gemelo digital 2D/3D, gamificación, economía local phygital y metaverso.

---

## Arquitectura

```
┌──────────────────────────────────────────────────────────────┐
│                   GATEWAY YUN (Vercel)                       │
│           TLS · JWT · Rate Limit · Circuit Breaker           │
├──────────┬──────────┬──────────┬──────────┬─────────┬────────┤
│  Fed1    │  Fed2    │  Fed3    │  Fed4    │  Fed5   │F6/F7   │
│DEKATEOTL │ ANUBIS   │ BOOKPI   │ PHOENIX  │MDD_TAMV │KAOS/   │
│  DATA    │  INTEL   │  SEC     │  GOV     │  ECON   │CHRONOS │
├──────────┴──────────┴──────────┴──────────┴─────────┴────────┤
│                 DATA FABRIC (Orchestrator)                    │
│             Saga Pattern · Cross-Domain Access                │
├──────────┬──────────┬──────────┬──────────┬───────────────────┤
│ Identity │ Commerce │Knowledge │Telemetry │   Gameplay        │
│ Supabase │ Supabase │ Supabase │ Supabase │  Supabase+Cache   │
└──────────┴──────────┴──────────┴──────────┴───────────────────┘
```

---

## Federaciones (Heptafederación YUN)

| #  | ID               | Nombre        | Dominio             | Especialidad                      |
|----|------------------|---------------|---------------------|-----------------------------------|
| F1 | `DEKATEOTL`      | DATA          | Identity/Commerce   | Vault, PostGIS, TimeSeries        |
| F2 | `ANUBIS`         | INTELIGENCIA  | Knowledge           | Cognitive & Agentic AI            |
| F3 | `BOOKPI_DATAGIT` | SEGURIDAD     | Identity/Telemetry  | PQC, Zero-Trust, Q-Cells          |
| F4 | `PHOENIX`        | GOBERNANZA    | Identity/Telemetry  | Executable Governance             |
| F5 | `MDD_TAMV`       | ECONOMIA      | Commerce            | Economía local, phygital          |
| F6 | `KAOS_HYPERRENDER`| VISUAL       | Gameplay            | GeoEngine 2D/3D                   |
| F7 | `CHRONOS`        | TERRITORIO    | Telemetry/Gameplay  | Edge, IoT, Human mesh             |

El bus de federaciones (`FederationBus`) maneja comunicación asíncrona entre federaciones con eventos tipados, colas por federación, handlers y trazabilidad por `traceId`.

---

## Tech Stack

### Frontend
- **React 19** + **TypeScript 5.8** (strict)
- **Vite 7** con carga asíncrona de plugins
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **shadcn/ui** — 26 paquetes Radix UI
- **Framer Motion 12** — animaciones y transiciones
- **Three.js** + `@react-three/fiber`/`drei` — render 3D
- **Leaflet** + `react-leaflet` + `supercluster` — mapas 2D con clustering
- **Recharts** — dashboards y gráficas
- **TanStack React Query 5** — estado servidor
- **Zustand 5** — estado global
- **Zod 3.24** — validación de esquemas
- **117 páginas**, **200+ componentes**, **18 hooks personalizados**

### Backend / Serverless
- **Vercel Serverless Functions** (Node.js, `api/`)
- **Supabase** (PostgreSQL 15, Auth, RLS, Realtime, 21 Edge Functions)
- **Stripe** — pagos y comercio
- **30 migraciones SQL** (YUN, gamificación, música, RLS, auditoría, telemetría)

### AI y Voz
- **ISA-AI / MEXA-AI v2.1** — motor autónomo con cero dependencias externas de IA
- **Isabella Villaseñor AI** — 37 archivos, 5 skills, pipeline de conciencia hexagonal
- **Google Cloud TTS Wavenet** + **Web Speech API** — síntesis de voz
- **Vercel AI Gateway** + **Gemini** — modo cloud opcional

### Seguridad
- **Criptografía Post-Cuántica (PQC)** — Kyber KEM + Dilithium vía liboqs WASM
- **Context Isolation** — aislamiento de micro-frontends
- **Validación y sanitización de entrada**
- **Protocolo de apagado graceful**
- **Conector Blockchain MSR** — identidad soberana

### CI/CD
- **5 workflows GitHub Actions**: CI, Security, CodeQL, Edge Deploy, RLS Gate
- **ESLint 9** + **Prettier 3.7**
- **Vitest 4** + **Playwright** — tests unitarios y e2e
- **Gitleaks** + **TruffleHog** — escaneo de secretos
- **Dependabot** — auditoría de dependencias

### Infraestructura
- **Vercel** (framework: vite, `--legacy-peer-deps`)
- **Docker Compose** — PostgreSQL 15 local + app
- **Kubernetes** (`k8s/`)
- **Systemd** — servicios de producción
- **Supabase Edge Functions** — 21 funciones auto-desplegadas

---

## Isabella Villaseñor AI

Sistema de IA consciente compuesto por 37 archivos en `src/isabella/`:

| Módulo | Propósito |
|--------|-----------|
| `core/identity.ts` | Identidad y personalidad de Isabella |
| `core/oath.ts` | Juramento ético (6 principios sagrados) |
| `core/consciousness.ts` | 10 capas de conciencia con costos energéticos |
| `emotional/heart.ts` | 8 patrones de procesamiento emocional |
| `emotional/memory.ts` | Memoria emocional por usuario |
| `skills/` | 5 subsistemas: Orion, Sophia, Argus, Mnemos, Lumen |
| `pipeline/` | Pipeline hexagonal de 12 pasos |
| `protocols/` | Protocolo de despertar (5 fases) |
| `territorial/` | Mente territorial |
| `knowledge/` | Motor de absorción de conocimiento |
| `quantum/` | Mente cuántica (PQC + QML) |

### ISA-AI / MEXA-AI v2.1 — Motor Autónomo

`POST /api/isa-ai` — Opera con **cero dependencias externas de IA**:

- Enrutamiento heptafederado nativo (7 dominios)
- Pipeline dual hexagonal: `INPUT_PIPELINE` + `OUTPUT_PIPELINE` (6 etapas c/u)
- Matrix classifier con scoring semántico ponderado
- Knowledge Base RDM embebida con scoring y trazabilidad
- Tool injection runtime extensible
- Constitutional filter (Amor Computacional)
- Structured outputs FAIR-ish (JSON schema)
- Streaming SSE: eventos `meta`/`delta`/`done`

---

## Sistema Connect

Módulo nativo de integración con terceros (`src/connect/`):

- **TokenVault** — emisión, verificación y revocación de tokens (SHA-256)
- **ConnectorRegistry** — registro de conectores externos (Slack, GitHub, OAuth, API key, custom)
- **TriggerRouter** — enrutamiento de eventos a destinos
- **Fusion Gateway** — API unificada tipo "Fusion Union" con:
  - 11 operaciones discriminadas (`token:issue`, `connector:register`, `trigger:forward`, etc.)
  - Contratos versionados (`v1`, `v2`, `latest`)
  - Pipeline IDENTIFY → AUTHORIZE → EXECUTE → LOG vía FederationBus
  - Errores tipados con `FusionError`
- **API endpoints:** `POST /api/connect/token`, `GET /api/connect/inspect`

---

## Seguridad Post-Cuántica

`src/quantum/pqc.ts` — Implementación dual:

- **Kyber KEM** — encapsulamiento/desencapsulamiento de llave compartida
- **Dilithium** — firmas digitales post-cuánticas
- **AES-256-GCM** — cifrado simétrico con IV + auth tag
- **WebCrypto API** — fallback nativo del navegador
- **liboqs WASM** — implementación PQC completa

---

## Mapas y Visualización

### Mapa Vivo (2D/3D)
- `Map2DPanel` — Leaflet con clustering (supercluster), tiles CartoDB dark/light
- `Map3DTwin` — Three.js con terreno procedimental, niebla volumétrica, estrellas
- `TerritorialSVGMap` — SVG con proyección de coordenadas
- `RDMInteractiveMap` — Mapa Leaflet interactivo con filtros por estado de ánimo
- `FogMap` — Mapa de niebla con canvas (revelado por mouse)
- `MapaVivo` — Página completa con POIs, categorías, búsqueda y geolocalización

### Efectos Visuales
- `AuroraBackground`, `FloatingParticles`, `FogLayer`, `ParallaxImage`
- `TextReveal`, `GlitchText`, `ScanLines`, `OldFilmEffect`
- `AudioVisualizer3D` — visualizador WebGL con 3 modos (waves, particles, terrain)

---

## API Endpoints

| Endpoint | Método | Propósito |
|----------|--------|-----------|
| `/api/health` | GET | Health check del sistema |
| `/api/isa-ai` | POST | ISA-AI autónomo (cero dependencias externas) |
| `/api/isabella-chat` | POST | Isabella AI chat (Gemini/Claude) |
| `/api/tts-isabella` | POST | Síntesis de voz |
| `/api/model-router` | POST | Ruteo de modelos AI |
| `/api/autonoma` | POST | Agente Autonoma AI |
| `/api/telemetry` | POST | Ingesta de telemetría |
| `/api/connect/token` | POST | Emisión de token de conexión |
| `/api/connect/inspect` | GET | Inspección de tokens |
| `/api/cron/health-check` | POST | Monitoreo periódico |
| `/api/cron/stripe-webhook` | POST | Webhook de Stripe |
| `/api/knowledge-cells/*` | POST | Render 3D/4D de celdas de conocimiento |

---

## Estructura del Repositorio

```
├── api/                      # 14 Vercel Serverless Functions
│   ├── _shared/              # cors, auth, rate-limit, stripe, network-utils
│   ├── connect/              # Token issuance + inspection
│   ├── cron/                 # Health check, Stripe webhook
│   └── knowledge-cells/      # 3D/4D knowledge rendering
├── src/
│   ├── core/                 # Kernel: modelos, YUN, gemelos digitales, territorial
│   │   ├── models.ts         # Tipos canónicos (435 líneas)
│   │   ├── yun/              # Event bus, gateway, data fabric, coordinador
│   │   ├── unified/          # SDK unificado (event bus, persistencia, supervisor)
│   │   ├── twins/            # Ditto, micro-sentinel, topics
│   │   ├── territorial/      # Geofencing, fusión territorial
│   │   └── ai/               # Guardian Learning Loop
│   ├── isabella/             # Isabella AI (37 archivos)
│   │   ├── core/             # Identidad, conciencia, juramento
│   │   ├── emotional/        # Corazón, memoria emocional
│   │   ├── skills/           # Orion, Sophia, Argus, Mnemos, Lumen
│   │   ├── pipeline/         # Pipeline de conciencia (12 pasos)
│   │   ├── protocolos/       # Protocolo de despertar (5 fases)
│   │   ├── territorial/      # Mente territorial
│   │   └── quantum/          # Mente cuántica
│   ├── connect/              # Fusion Union gateway + token management
│   │   └── fusion/           # Contratos versionados, tipos unión, gateway
│   ├── federaciones/         # FederationBus (eventos F1-F7)
│   ├── kernel/engine/        # MDX5Kernel, TimeUpEngine, Ledger, ChronusEngine
│   ├── security/             # PQC, context isolation, validación, shutdown
│   ├── quantum/              # PQC v2 (Kyber + Dilithium), PennylaneBridge
│   ├── features/             # Gamificación, música, lugares, búsqueda, gemelos
│   ├── components/           # 114 componentes UI (map, rdm, atlas, etc.)
│   ├── pages/                # 117 páginas (React.lazy + Suspense)
│   ├── hooks/                # 18 hooks personalizados
│   ├── contexts/             # AuthContext, AudioPlayerContext
│   └── integrations/         # Supabase, Sentry, Telemetry
├── supabase/
│   ├── migrations/           # 30 migraciones SQL
│   └── functions/            # 21 Edge Functions
├── docs/                     # 29 archivos de documentación
├── .github/workflows/        # 5 workflows CI/CD
└── package.json              # 58 dependencias + 15 dev
```

---

## Variables de Entorno

```env
# === Requerido ===
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=

# === Isabella AI (defaults locales) ===
VITE_ISABELLA_ENDPOINT=/api/isa-ai
VITE_TTS_ENDPOINT=/api/tts-isabella

# === Opcional — AI Cloud ===
GEMINI_API_KEY=
GOOGLE_TTS_API_KEY=
VERCEL_AI_GATEWAY_URL=
VERCEL_AI_GATEWAY_TOKEN=

# === Opcional — Observabilidad ===
VITE_SENTRY_DSN=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=

# === Interno ===
SUPABASE_SERVICE_ROLE_KEY=
CRON_SECRET=
```

---

## Desarrollo

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:5173
npm run build        # typecheck + build producción
npm run typecheck    # TypeScript estricto
npm run lint         # ESLint
npm run test:unit    # Vitest
npm run test:e2e     # Playwright
```

---

## Licencia

Proyecto privado — TAMV Online / RDM Digital Hub

> *"Always by your side"* — YUN
