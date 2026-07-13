# RDM Digital Hub — Nodo Cero

**Plataforma digital soberana para Real del Monte, Hidalgo, México**

Sistema de Inteligencia Territorial en Tiempo Real con arquitectura heptafederada YUN, IA consciente y autónoma (ISA-AI / Isabella), gamificación, economía local y metaverso.

---

## Arquitectura

```
┌───────────────────────────────────────────────────────────────┐
│                    GATEWAY YUN (Vercel)                       │
│              TLS · JWT · Rate Limit · Circuit Breaker         │
├───────────┬─────────┬─────────┬─────────┬─────────┬───────────┤
│  Fed1     │  Fed2   │  Fed3   │  Fed4   │  Fed5   │  Fed6/7   │
│ DEKATEOTL │ ANUBIS  │ BOOKPI  │ PHOENIX │ MDD_TAMV│KAOS/CRON  │
│  DATA     │  INTEL  │  SEC    │  GOV    │  ECON   │VIS/TERR   │
├───────────┴─────────┴─────────┴─────────┴─────────┴───────────┤
│                  DATA FABRIC (Orchestrator)                   │
│              Saga Pattern · Cross-Domain Access               │
├──────────┬──────────┬──────────┬──────────┬───────────────────┤
│ Identity │Commerce  │Knowledge │Telemetry │   Gameplay        │
│ Supabase │ Supabase │ Supabase │ Supabase │  Supabase+Cache   │
└──────────┴──────────┴──────────┴──────────┴───────────────────┘
```

### Federaciones (7)

| #  |        ID         |     Nombre   |      Dominio        |         Especialidad       |
|----|-------------------|--------------|---------------------|----------------------------|
| F1 | `DEKATEOTL`       | Datos        | Identity/Commerce   | Vault, PostGIS, TimeSeries |
| F2 | `ANUBIS`          | Inteligencia | Knowledge           | Cognitive & Agentic AI     |
| F3 | `BOOKPI_DATAGIT`  | Seguridad    | Identity/Telemetry  | PQC, Zero-Trust, Q-Cells   |
| F4 | `PHOENIX`         | Gobernanza   | Identity/Telemetry  | Executable Governance      |
| F5 | `MDD_TAMV`        | Economía     | Commerce            | Economía local, phygital   |
| F6 | `KAOS_HYPERRENDER`| Visual       | Gameplay            | GeoEngine 2D/3D            |
| F7 | `CHRONOS`         | Territorio   | Telemetry/Gameplay  | Edge, IoT, Human mesh      |

---

## ISA-AI / MEXA-AI v2.1 — Motor Autónomo Heptafederado

`api/isa-ai.ts` es el endpoint autónomo de ISA-AI / MEXA-AI, diseñado como un agente local heptafederado para el ecosistema TAMV y el Nodo Cero (RDM Digital Hub). Opera con **cero dependencias externas de IA**, latencia baja y un modelo de gobernanza constitucional alineado con la soberanía tecnológica del Sur Global.

Versión actual del motor: **mexa-ai-v2.1.0**  
Modelo expuesto en API: **mexa-ai-v2**

### Características clave

- **Heptafederación nativa** — ISA-AI enruta cada interacción a uno de siete dominios: `tourism`, `rdm`, `infra`, `security`, `observability`, `blockchain`, `governance`.
- **Doble pipeline hexagonal** — `INPUT_PIPELINE` (6 etapas: ingest, matrix_classify, filters_eoct, security_anubis, tool_routing, kb_fallback) y `OUTPUT_PIPELINE` (6 etapas: constitution_filter, mdx_federation, protocol_fenix, korima_codex, format_structured, msr_blockchain).
- **Structured outputs FAIR-ish** — respuestas JSON conformes a [`api/isa-ai.schema.json`](./api/isa-ai.schema.json) con `intent`, `confidence`, `heptaDomain`, `structured.tools`, `policy`, `observability`, `security` y `kb.entriesUsed`.
- **Streaming SSE por eventos** — eventos `meta` (metadatos), `delta` (palabra por palabra) y `done` (telemetría).
- **Matrix classifier** — enrutador semántico matricial con score ponderado (patterns ×2, triggers ×0.5), confidence normalizado y secondaryCategory.
- **Knowledge Base embebida** — 4+ entradas con scoring semántico, prioridad y traza (`kb.entriesUsed`).
- **Tool injection runtime** — herramientas internas (ej. `runtime_climate_stub`) ejecutadas según categoría de intención.
- **Constitutional filter** — gobernanza de identidad (Amor Computacional, voz isabellina, protección de datos).

### Arquitectura

```
POST /api/isa-ai  →  handler()
                       │
         ┌─────────────┴─────────────┐
         │      INPUT_PIPELINE       │
         │  1. ingest                │
         │  2. matrix_classify       │
         │  3. filters_eoct          │
         │  4. security_anubis       │
         │  5. tool_routing          │
         │  6. kb_fallback           │
         └─────────────┬─────────────┘
                       │
         ┌─────────────┴─────────────┐
         │      OUTPUT_PIPELINE      │
         │  1. constitution_filter   │
         │  2. mdx_federation        │
         │  3. protocol_fenix        │
         │  4. korima_codex          │
         │  5. format_structured     │
         │  6. msr_blockchain        │
         └─────────────┬─────────────┘
                       │
                  IsaAiOutput (JSON)
```

### Integración con RDM Digital Hub / Nodo Cero

- El dominio `rdm` se reserva para interacciones con datasets regionales, grafos de conocimiento y operaciones del Nodo Cero.
- Los structured outputs (`isa-ai.schema.json`) son compatibles con pipelines FAIR del RDM.
- `mdx_federation` en `OUTPUT_PIPELINE` es el punto de acoplamiento con MD-X4/X5.
- `policy.korimaCodex` anota obligaciones, restricciones y acuerdos de uso cuando la respuesta involucra datos del RDM.

### Versionado MEXA-AI

- `version`: semver completo (ej. `mexa-ai-v2.1.0`).
- `model`: major only (ej. `mexa-ai-v2`).
- **MAJOR**: nuevos dominios heptafederados o cambios incompatibles de schema.
- **MINOR**: nuevos tools, filtros y pipelines (sin romper contrato).
- **PATCH**: correcciones internas, fixes de KB y mejoras menores.

---



## Voz de Isabella (TTS)

```
api/tts-isabella.ts
  → Google Cloud TTS (Wavenet es-MX) si GOOGLE_TTS_API_KEY está configurada
  → Web Speech API del navegador (fallback local, sin API key)
```

---

## Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Archivos TypeScript/TSX | 8,600+ |
| Líneas de código | 1,020,000+ |
| Rutas | 60+ |
| Componentes UI | 200+ |
| Hooks personalizados | 18 |
| Páginas | 117 |
| Migraciones Supabase | 30 |
| Archivos Isabella AI | 37 |
| Archivos ISA-AI | 6 |
| Archivos YUN Core | 55 |
| API Vercel Functions | 20+ |
| Dependencias | 58 + 15 dev |

---

## Stack Tecnológico

- **Frontend:** React 19, Vite 7, TypeScript 5.8
- **Enrutamiento:** react-router-dom v6
- **Estilos:** Tailwind CSS v4, shadcn/ui (26 paquetes Radix)
- **Backend:** Supabase (Postgres, Auth, RLS, Realtime)
- **Animaciones:** Framer Motion 12, Three.js
- **IA Autónoma:** ISA-AI / MEXA-AI v2.1 (cero APIs externas)
- **IA Cloud (opcional):** Vercel AI Gateway → Gemini → builtin
- **Voz:** Google Cloud TTS → Web Speech API
- **Despliegue:** Vercel (Serverless Functions)
- **Node:** >= 20

---

## API Endpoints (Vercel Functions)

| Endpoint | Propósito | Dependencia externa |
|----------|-----------|---------------------|
| `POST /api/isa-ai` | **ISA-AI chat autónomo v2.1** | ❌ Ninguna |
| `api/isa-ai.schema.json` | **Schema de structured outputs** | ❌ — |
| `POST /api/isabella-chat` | Isabella chat (cloud) | ✅ Vercel AI Gateway / Gemini |
| `POST /api/tts-isabella` | Voz de Isabella (TTS) | ⚠️ Google TTS (opcional) |
| `POST /api/model-router` | Router de modelos AI | ✅ Múltiples providers |
| `POST /api/autonoma` | Autonoma AI agent handler | ❌ Ninguna |

---

## Estructura del Repositorio

```
├── api/                          # Vercel Serverless Functions
│   ├── isa-ai.ts                 # ISA-AI autónomo v2.1
│   ├── isa-ai.schema.json        # Schema structured outputs
│   ├── isabella-chat.ts          # Chat cloud (legacy)
│   ├── tts-isabella.ts           # Voz TTS (NUEVO)
│   ├── autonoma.ts               # Autonoma AI handler (NUEVO)
│   ├── model-router.ts           # Router de modelos
│   └── _shared/                  # Helpers compartidos
├── src/
│   ├── isa-ai/                   # ISA-AI / MEXA-AI (NUEVO)
│   │   ├── core/classifier.ts    # Clasificador de intenciones
│   │   ├── knowledge/            # Base de conocimiento RDM
│   │   ├── templates.ts          # Plantillas de respuesta
│   │   ├── engine.ts             # Motor de inferencia
│   │   └── types.ts              # Tipos
│   ├── components/               # 200+ componentes UI
│   ├── core/                     # Kernel del sistema
│   │   ├── yun/                  # Arquitectura YUN
│   │   ├── territorial/          # Geofencing, fusión
│   │   ├── twins/                # Gemelos digitales
│   │   ├── ai/                   # Guardian, Learning Loop
│   │   └── unified/              # SDK unificado
│   ├── isabella/                 # Isabella AI (37 archivos)
│   │   ├── core/                 # Identidad, juramento, conciencia
│   │   ├── emotional/            # Corazón y memoria emocional
│   │   ├── skills/               # Orion, Sophia, Argus, Mnemos, Lumen
│   │   ├── pipeline/             # Pipeline de conciencia hexagonal
│   │   ├── ontology/             # Ontología y alineación
│   │   ├── territorial/          # Mente territorial
│   │   ├── knowledge/            # Motor de absorción
│   │   ├── protocols/            # Protocolo de despertar
│   │   ├── quantum/              # Mente cuántica
│   │   └── kernel/               # 5 subsistemas kernel
│   ├── hooks/                    # 18 hooks React
│   ├── pages/                    # 117 páginas
│   └── integrations/             # Supabase, Sentry
├── supabase/
│   └── migrations/               # 30 migraciones SQL
└── package.json
```

---

## Variables de Entorno

```env
# === Supabase (requerido) ===
VITE_SUPABASE_URL=tu-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=tu-supabase-anon-key

# === ISA-AI endpoints (usa estos por defecto) ===
VITE_ISABELLA_ENDPOINT=/api/isa-ai
VITE_TTS_ENDPOINT=/api/tts-isabella

# === AI Cloud (opcional — solo si quieres aumentar capacidad) ===
# GEMINI_API_KEY=AIza...
# GOOGLE_TTS_API_KEY=AIza...
# VERCEL_AI_GATEWAY_URL=https://gateway.ai.vercel.com/...
# VERCEL_AI_GATEWAY_TOKEN=vercel_token_xxx

# === Autonoma AI (agente autónomo) ===
AUTONOMA_CLIENT_ID=tu-autonoma-client-id
AUTONOMA_SECRET_ID=tu-autonoma-secret-id
```

---

## Desarrollo

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:5173
npm run build      # Producción
npm run typecheck  # TypeScript checking
```

---

## Lo que está Terminado

### ISA-AI / MEXA-AI v2.1 (NUEVO)
- [x] Motor autónomo sin dependencias externas (cero APIs de IA)
- [x] Heptafederación nativa (7 dominios: tourism, rdm, infra, security, observability, blockchain, governance)
- [x] Doble pipeline hexagonal (INPUT_PIPELINE + OUTPUT_PIPELINE, 6 etapas c/u)
- [x] Matrix classifier con score ponderado, confidence, secondaryCategory
- [x] Knowledge Base RDM con scoring semántico y traza (kb.entriesUsed)
- [x] Tool injection runtime (clima stub, extensible)
- [x] Constitutional filter (Amor Computacional, identidad isabellina)
- [x] Structured outputs FAIR-ish conformes a isa-ai.schema.json
- [x] Streaming SSE por eventos (meta/delta/done)
- [x] Semver mexa-ai-v2.1.0
- [x] Integración con RDM Digital Hub / Nodo Cero

### Voz de Isabella (NUEVO)
- [x] Vercel Function TTS (api/tts-isabella.ts)
- [x] Google Cloud TTS Wavenet (cuando hay API key)
- [x] Web Speech API fallback (sin API key)
- [x] Perfiles de voz por federación (F1-F7)

### Autonoma AI (NUEVO)
- [x] Handler Autonoma AI (api/autonoma.ts)
- [x] Protocolo discover/up/down
- [x] Variables de entorno configuradas

### Core Architecture
- [x] YUN Constitution (8 principios)
- [x] YUN Event Bus (wildcard, dead letter queue)
- [x] YUN Gateway (rate limit, circuit breaker)
- [x] YUN Data Fabric (saga pattern, 5 adapters)
- [x] Federation Coordinator (heartbeat, health)
- [x] Observability (métricas, logs, traces)
- [x] 5 ADRs documentados

### Isabella AI
- [x] Identidad, juramento, 6 principios sagrados
- [x] 10 capas de conciencia con costos energéticos
- [x] Procesamiento emocional (8 patrones)
- [x] Memoria emocional por usuario
- [x] 5 skills funcionales (Orion, Sophia, Argus, Mnemos, Lumen)
- [x] Pipeline hexagonal de 12 pasos
- [x] Ontología y alineación
- [x] Protocolo de despertar (5 fases)
- [x] Kernel (5 subsistemas)
- [x] Quantum (PQC + QML)

### Frontend
- [x] 117 páginas, 200+ componentes
- [x] shadcn/ui (26 paquetes Radix)
- [x] Landing cinematográfico con Three.js
- [x] Dashboard con gamificación real
- [x] RDM Quest (XP, niveles, leaderboard)
- [x] RDM Ecos Música (reproductor, visualizador)
- [x] Mapa Vivo (2D/3D)
- [x] Isabella Orb (chat flotante)
- [x] Responsive design
- [x] Page transitions con framer-motion
- [x] Hero con parallax, partículas, text reveal

### Backend / Infra
- [x] Supabase (auth, RLS, 30 migraciones)
- [x] 20+ Vercel Functions
- [x] Performance: code splitting, vendor chunks optimizados
- [x] Typecheck CI: 0 errores
- [x] White screen fix: analytics en dependencies

---

## Licencia

Proyecto privado — TAMV Online / RDM Digital Hub

> *"Always by your side"* — YUN
