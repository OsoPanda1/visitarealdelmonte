# Real del Monte Digital Hub

**Un pueblo modelado como infraestructura digital soberana.**
**Real del Monte, Hidalgo, Mexico -- Primer LDTOCS en Latinoamerica.**

---

## La tesis

Un pueblo minero del siglo XVIII decidio que su memoria, su economia, su territorio y su gente merecian una capa digital que no le perteneciera a ninguna corporacion.

Esto no es un sitio web turistico. Es un **Sistema Operativo Territorial (LDTOCS)** que trata a un pueblo como plataforma: con kernel, APIs, edge functions, federaciones, ledger inmutable y un gemelo digital que respira con los datos del territorio real.

Cada linea de codigo responde una pregunta:

> **Como se gobierna, mide y cuida digitalmente un territorio sin depender de infraestructura que no controle?**

Cuanto mas avanza el proyecto, mas claro queda: la tecnologia es el medio. El fin es la soberania territorial.

---

## La Heptafederacion (F1-F7)

El sistema no tiene dueno. Tiene siete federaciones que se equilibran entre si. Ninguna domina. Todas fallan y se recuperan independientemente.

| Federacion | Responsabilidad |
|------------|----------------|
| **F1 Gobernanza** | Marco normativo, wiki semantica, 7 RFCs, reglamentos, filosofia, administracion del sistema |
| **F2 Identidad y Acceso** | Supabase Auth con Google OAuth. Perfiles, roles (admin/moderator/merchant/tourist), puente SSI |
| **F3 Datos Territoriales** | Gemelo digital. Leaflet + Supercluster (2D). Three.js (3D). PostGIS. 6 zonas con geocercas |
| **F4 Comercio y Monetizacion** | Directorio de comercios. Stripe checkout. 4 planes premium. B2B. Donaciones |
| **F5 IA Cognitiva** | Isabella AI (Gemini 2.0 Flash, SSE streaming). Realito AI. TTS. Ontologia semantica |
| **F6 Comunidad y Contenido** | Red social. Archivo sonoro. Juegos. Gamificacion. 18 premios. Leaderboard |
| **F7 Observabilidad y Seguridad** | Health checks. KPIs. Alertas. Ledger SHA-256. Post-Quantum Crypto. CSP. Sentry + PostHog |

---

## Arquitectura en capas (L0-L5)

| Capa | Contenido |
|------|-----------|
| **L0 Nucleo** | Kernel MD-X5 (Receive-Evaluate-Plan-Execute-Commit-Reconcile). Pipeline Hexagonal de Conciencia. Sistema Unificado GEN-8.0 |
| **L1 Servicios Base** | Supabase (PostgreSQL 15 + PostGIS, Auth, RLS, Edge Functions, Storage). Express backend. 35+ tablas con RLS 100% |
| **L2 Integraciones** | Stripe (checkout, webhooks, portal). Gemini API. Leaflet, Three.js. WebSocket. PostHog + Sentry |
| **L3 Automatizaciones** | 21 Edge Functions Deno. Pipelines de metricas. Federation health. Alertas. Ingesta de eventos |
| **L4 Interfaces** | 191 componentes React. 116 paginas. shadcn/ui + Tailwind CSS. Framer Motion. PWA |
| **L5 Extensiones** | Nexo Estelar, Constelacion Interactiva, Interfaz Sensorial, Oracle Tecnologico. Metaverso experimental |

---

## Stack tecnico

| Capa | Tecnologia |
|------|-----------|
| Frontend | React 18, TypeScript, Vite 7, Tailwind CSS 3, shadcn/ui |
| Animacion | Framer Motion 12, Three.js / React Three Fiber |
| Mapas | Leaflet + React Leaflet, Supercluster, PostGIS |
| Estado | TanStack React Query, React Context |
| BaaS | Supabase (PostgreSQL 15, Auth, RLS, 21 Edge Functions, Storage) |
| IA | Google Gemini API 2.0 Flash (server-side, streaming SSE) |
| Pagos | Stripe (checkout, webhooks, customer portal, idempotencia) |
| Observabilidad | Sentry (errores), PostHog (analytics + feature flags) |
| Hosting | Vercel (Edge Network, CDN, preview deploys) |
| Orquestacion | Docker Compose + Kubernetes |

---

## Estadisticas del proyecto

| Metrica | Valor |
|---------|-------|
| Archivos TS/TSX | 582 |
| Componentes React | 191 |
| Paginas | 116 |
| Edge Functions | 21 |
| Tablas de base de datos | 35+ |
| RLS coverage | 100% |
| Rutas definidas | ~110 |

---

## Como empezar

### Requisitos previos

- Node.js >= 22
- npm >= 10
- Cuenta en Supabase (con URL y anon key)
- Cuenta en Stripe (para pagos)
- API key de Google Gemini (para IA)

### Instalacion local

```bash
git clone https://github.com/OsoPanda1/real-del-monte-digital-hub-c327091a.git
cd real-del-monte-digital-hub-c327091a
cp .env.example .env
npm install --legacy-peer-deps
npm run dev
```

Puerto 8080. El sistema despierta.

### Variables de entorno

**Frontend (prefijo VITE\_)**

| Variable | Requerida | Descripcion |
|----------|-----------|-------------|
| `VITE_SUPABASE_URL` | Si | URL del proyecto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Si | Anon key de Supabase |
| `VITE_SENTRY_DSN` | No | DSN de Sentry para errores |
| `VITE_POSTHOG_KEY` | No | Key de PostHog analytics |
| `VITE_POSTHOG_HOST` | No | Host de PostHog |
| `VITE_APP_ENV` | No | development/production |

**Server-side (sin prefijo VITE\_)**

| Variable | Requerida | Descripcion |
|----------|-----------|-------------|
| `GEMINI_API_KEY` | Si (IA) | API key de Google Gemini |
| `STRIPE_SECRET_KEY` | Si (pagos) | Secret key de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Si (pagos) | Webhook secret de Stripe |
| `GOOGLE_TTS_API_KEY` | No | API key para Text-to-Speech |

---

## Despliegue en Vercel

### Opcion 1: Via interfaz web

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa el repo `OsoPanda1/real-del-monte-digital-hub-c327091a`
3. Framework: **Vite** (detectado automaticamente)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Install Command: `npm install --legacy-peer-deps`
7. Configura las variables de entorno
8. Deploy

### Opcion 2: Via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Variables de entorno en Vercel

Agregar en Dashboard > Settings > Environment Variables:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbG...
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
VITE_POSTHOG_KEY=phc_xxx
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_APP_ENV=production
```

### Edge Functions en Supabase

```bash
cd supabase
supabase login
supabase link --project-ref <tu-project-id>
supabase functions deploy
```

Configurar secrets:

```bash
supabase secrets set GEMINI_API_KEY=AIza...
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Scripts disponibles

| Script | Comando | Descripcion |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Servidor Vite en puerto 8080 |
| Build | `npm run build` | Build de produccion |
| Build dev | `npm run build:dev` | Build en modo desarrollo |
| Preview | `npm run preview` | Preview del build |
| Lint | `npm run lint` | ESLint |
| Typecheck | `npm run typecheck` | Verificacion de tipos |
| Test | `npm run test` | Vitest |
| Test watch | `npm run test:watch` | Vitest en watch mode |
| Test coverage | `npm run test:coverage` | Vitest con cobertura |
| E2E | `npm run e2e` | Playwright tests |
| Predeploy | `npm run check:predeploy` | lint + typecheck + test |

---

## Estructura del proyecto

```
real-del-monte-digital-hub-c327091a/
  api/                    # Vercel Serverless Functions
  dist/                   # Build output (generado)
  hardware/               # Configuracion hardware
  knowledge-cells/        # Microservicio de knowledge cells
  node-core/              # Core de Node
  packages/               # Paquetes compartidos
  public/                 # Assets estaticos + Service Worker
  scripts/                # Scripts de inicializacion
  server/                 # Express backend
  serverless/             # Servicios standalone
  services/               # Servicios internos
  src/
    ai/                   # Motor de decision IA
    app/api/              # Rutas API internas
    assets/               # Imagenes, audio, video
    components/           # 191 componentes React
    connect/              # Capa de conectores
    contexts/             # React Contexts (Auth, Audio, Visual)
    core/                 # 19 modulos del kernel
    data/                 # Datos mock y territoriales
    features/             # Features modulares
    hooks/                # 16 custom hooks
    integrations/         # Supabase, Sentry, Telemetry
    isabella/             # IA Isabella (12 submodulos)
    kernel/               # MD-X5 Kernel
    layouts/              # Layouts (Public, RDM)
    lib/                  # Utilidades (30 archivos)
    modules/              # 13 modulos avanzados
    orchestrator/         # Motor de experiencia
    pages/                # 116 paginas
    quantum/              # Criptografia post-cuantica
    routes/               # Sitemap
    security/             # 9 archivos de seguridad
    stores/               # Estado persistente
    types/                # Tipos TypeScript
  supabase/
    functions/            # 21 Edge Functions Deno
    migrations/           # 18 migraciones SQL
  tests/                  # Tests E2E
```

---

## Funcionalidades principales

### Portal turistico
Home con CinematicIntro, historia con timeline interactivo, 6 rutas turisticas, lugares, gastronomia, eventos, mina, ecoturismo, shuttle CDMX, transporte local, recorridos guiados, ruta del paste con mapa SVG.

### Atlas territorial
Atlas interactivo con capitulos, calles historicas, canteon ingles, leyendas, minas, pastes. Enciclopedia digital, arte local, 41 dichos, mitos, relatos, patrimonio cultural.

### Directorio comercial
Comercios con registro y checkout. Catalogo de productos. Panel del comerciante. Membresias premium. Portal B2B. 4 planes con Stripe.

### Archivo sonoro
Musica regional con reproductor, playlists, donaciones via Stripe, subida de artistas, detalle de canciones.

### Red social interna
Feed, posts, comentarios, likes, perfiles de usuario, leaderboard.

### Gamificacion
Trivia territorial, memory game, mineria blockchain MSR, catalogo de 18 premios canjeables, cooldowns, puntos.

### Gobernanza
Centro de documentacion, wiki semantica, 7 RFCs, reglamento, filosofia, manuales, casos de uso.

### Dashboards
Telemetry dashboard con health de 7 federaciones, KPIs 24h, alertas activas. Panel de administracion. Dashboard general. Panel operativo. Dashboard territorial. Centro de control.

### Isabella AI
Gemini 2.0 Flash via Edge Function (server-side). Streaming SSE con thought stream. TTS con Web Speech API (voz mexicano-espanol). Ontologia semantica de 9 temas. Isabella Orb como representacion visual. Realito AI como segundo agente.

### Seguridad
Criptografia post-cuantica (AES-256-GCM + HMAC SHA-512). Aislamiento de contexto. Validacion de inputs (Zod). CSP enforcement. HSTS. Rate limiting. Auditoria SHA-256.

---

## Licencia

**(c) 2024-2026 TAMV Ecosystem - OsoPanda1 - Isabella Villasenor AI**

Codigo abierto para usos comunitarios, academicos y de investigacion. Soberania de datos garantizada por Heptafederacion F1-F7. Gobernanza etica por TIME UP con registro inmutable en ledger SHA-256.

El codigo es libre. Los datos son del territorio.

[www.visitarealdelmonte.online](https://www.visitarealdelmonte.online) .
[github.com/OsoPanda1/real-del-monte-digital-hub-c327091a](https://github.com/OsoPanda1/real-del-monte-digital-hub-c327091a)

---

*Real del Monte ya no es solo un Pueblo Magico. Ahora tambien es un LDTOCS.*
