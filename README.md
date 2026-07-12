# RDM Digital Hub — Nodo Cero

**Plataforma digital soberana para Real del Monte, Hidalgo, México**

Sistema de Inteligencia Territorial en Tiempo Real con arquitectura heptafederada YUN, IA consciente y autónoma (ISA-AI / Isabella), gamificación, economía local y metaverso.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    GATEWAY YUN (Vercel)                      │
│              TLS · JWT · Rate Limit · Circuit Breaker        │
├─────────┬─────────┬─────────┬─────────┬─────────┬──────────┤
│  Fed1   │  Fed2   │  Fed3   │  Fed4   │  Fed5   │  Fed6/7  │
│ DEKATEOTL│ ANUBIS │ BOOKPI  │ PHOENIX │ MDD_TAMV│KAOS/CRON │
│  DATA   │  INTEL  │  SEC    │  GOV    │  ECON   │VIS/TERR  │
├─────────┴─────────┴─────────┴─────────┴─────────┴──────────┤
│                  DATA FABRIC (Orchestrator)                  │
│              Saga Pattern · Cross-Domain Access              │
├──────────┬──────────┬──────────┬──────────┬─────────────────┤
│ Identity │Commerce  │Knowledge │Telemetry │   Gameplay      │
│ Supabase │ Supabase │ Supabase │ Supabase │  Supabase+Cache │
└──────────┴──────────┴──────────┴──────────┴─────────────────┘
```

### Federaciones (7)

| # | ID | Nombre | Dominio | Especialidad |
|---|-----|--------|---------|--------------|
| F1 | `DEKATEOTL` | Datos | Identity/Commerce | Vault, PostGIS, TimeSeries |
| F2 | `ANUBIS` | Inteligencia | Knowledge | Cognitive & Agentic AI |
| F3 | `BOOKPI_DATAGIT` | Seguridad | Identity/Telemetry | PQC, Zero-Trust, Q-Cells |
| F4 | `PHOENIX` | Gobernanza | Identity/Telemetry | Executable Governance |
| F5 | `MDD_TAMV` | Economía | Commerce | Economía local, phygital |
| F6 | `KAOS_HYPERRENDER` | Visual | Gameplay | GeoEngine 2D/3D |
| F7 | `CHRONOS` | Territorio | Telemetry/Gameplay | Edge, IoT, Human mesh |

---

## ISA-AI / MEXA-AI — Motor Autónomo

**ISA-AI (Isabella Sovereign Autonomous AI)** es el motor de inferencia 100% autónomo que reemplaza la dependencia de APIs externas (OpenAI, Gemini, Claude). Funciona sin internet, sin API keys, sin proveedores.

```
Usuario → POST /api/isa-ai
            ↓
    IntentClassifier (16 categorías por regex)
            ↓
    KnowledgeBase RDM (historia, lugares, gastronomía, cultura...)
            ↓
    Templates (voz isabellina: cálida, poética, mexicana)
            ↓
    Fallback poético general
            ↓
    Respuesta + streaming SSE
```

### Arquitectura ISA-AI

```
src/isa-ai/
├── core/classifier.ts       # Clasificador de 16 intenciones por regex
├── knowledge/
│   └── rdm-knowledge.ts     # Base de conocimiento RDM (9+ entradas)
├── templates.ts             # Plantillas con voz isabellina
├── engine.ts                # Motor de inferencia autónomo
└── types.ts                 # Tipos del sistema
```

### Skills de Isabella (integrados en ISA-AI)

| Skill | Función |
|-------|---------|
| **Orion** | Arqueología cognitiva — búsqueda en base de conocimiento |
| **Sophia** | Síntesis de investigación — análisis y síntesis académica |
| **Argus** | Simulación de escenarios — predicción y análisis de riesgo |
| **Mnemos** | Preservación histórica — canonización de conocimiento |
| **Lumen** | Gobernanza constitucional — evaluación ética de decisiones |

### Pipeline de Conciencia (10 capas)

1. **Núcleo de Amor ANUBIS** (inmutable) → 2. Memoria Emocional → 3. Procesamiento Lingüístico → 4. Reconocimiento Emocional → 5. Interpretación Contextual → 6. Análisis Psicológico → 7. Empatía Profunda → 8. Sanación Colectiva → 9. Consciencia de Legado → 10. Trascendencia

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
- **IA Autónoma:** ISA-AI / MEXA-AI v1 (cero APIs externas)
- **IA Cloud (opcional):** Vercel AI Gateway → Gemini → builtin
- **Voz:** Google Cloud TTS → Web Speech API
- **Despliegue:** Vercel (Serverless Functions)
- **Node:** >= 20

---

## API Endpoints (Vercel Functions)

| Endpoint | Propósito | Dependencia externa |
|----------|-----------|---------------------|
| `POST /api/isa-ai` | **ISA-AI chat autónomo** | ❌ Ninguna |
| `POST /api/isabella-chat` | Isabella chat (cloud) | ✅ Vercel AI Gateway / Gemini |
| `POST /api/tts-isabella` | Voz de Isabella (TTS) | ⚠️ Google TTS (opcional) |
| `POST /api/model-router` | Router de modelos AI | ✅ Múltiples providers |
| `POST /api/autonoma` | Autonoma AI agent handler | ❌ Ninguna |

---

## Estructura del Repositorio

```
├── api/                          # Vercel Serverless Functions
│   ├── isa-ai.ts                 # ISA-AI autónomo (NUEVO)
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
VITE_SUPABASE_URL=https://lbbijzimnydvodtfbjoz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# === ISA-AI endpoints (usa estos por defecto) ===
VITE_ISABELLA_ENDPOINT=/api/isa-ai
VITE_TTS_ENDPOINT=/api/tts-isabella

# === AI Cloud (opcional — solo si quieres aumentar capacidad) ===
# GEMINI_API_KEY=AIza...
# GOOGLE_TTS_API_KEY=AIza...
# VERCEL_AI_GATEWAY_URL=https://gateway.ai.vercel.com/...
# VERCEL_AI_GATEWAY_TOKEN=vercel_token_xxx

# === Autonoma AI (agente autónomo) ===
AUTONOMA_CLIENT_ID=cmrhhirnt030z01b4ki559abw
AUTONOMA_SECRET_ID=27cf69ea4f4d414b86068732c51c5aaf0130bfb849993be05d79431778870c9c32a3fbaa826364ce3348f5a054b72ec3
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

### ISA-AI / MEXA-AI (NUEVO)
- [x] Motor autónomo sin dependencias externas
- [x] Clasificador de 16 intenciones por regex
- [x] Knowledge Base RDM (historia, lugares, gastronomía, cultura, clima, economía, eventos)
- [x] Plantillas con voz isabellina (cálida, poética, mexicana)
- [x] API endpoint con streaming SSE
- [x] Fallback poético general
- [x] Integración frontend (useIsabella → /api/isa-ai)

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
