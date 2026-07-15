import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";

const Index = lazy(() => import("@/pages/Index"));
const Lugares = lazy(() => import("@/pages/Lugares"));
const Directorio = lazy(() => import("@/pages/Directorio"));
const Eventos = lazy(() => import("@/pages/Eventos"));
const Comunidad = lazy(() => import("@/pages/Comunidad"));
const Mapa = lazy(() => import("@/pages/Mapa"));
const Historia = lazy(() => import("@/pages/Historia"));
const Cultura = lazy(() => import("@/pages/Cultura"));
const Relatos = lazy(() => import("@/pages/Relatos"));
const Ecoturismo = lazy(() => import("@/pages/Ecoturismo"));
const Gastronomia = lazy(() => import("@/pages/Gastronomia"));
const Arte = lazy(() => import("@/pages/Arte"));
const Rutas = lazy(() => import("@/pages/Rutas"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Auth = lazy(() => import("@/pages/Auth"));
const Apoya = lazy(() => import("@/pages/Apoya"));
const Reglamento = lazy(() => import("@/pages/Reglamento"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminMusica = lazy(() => import("@/pages/admin/Musica"));
const Musica = lazy(() => import("@/pages/Musica"));
const Dichos = lazy(() => import("@/pages/Dichos"));
const Catalogo = lazy(() => import("@/pages/Catalogo"));
const NegociosPortal = lazy(() => import("@/pages/NegociosPortal"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Comercios = lazy(() => import("@/pages/Comercios"));
const Paquetes = lazy(() => import("@/pages/Paquetes"));
const TransporteLocal = lazy(() => import("@/pages/TransporteLocal"));
const ShuttleCDMX = lazy(() => import("@/pages/ShuttleCDMX"));
const QuienesSomos = lazy(() => import("@/pages/QuienesSomos"));
const Donar = lazy(() => import("@/pages/Donar"));
const GraciasDonativo = lazy(() => import("@/pages/GraciasDonativo"));
const ComerciosPanel = lazy(() => import("@/pages/ComerciosPanel"));
const RegistroComercio = lazy(() => import("@/pages/RegistroComercio"));
const Introduccion = lazy(() => import("@/pages/Introduccion"));
const Arquitectura = lazy(() => import("@/pages/Arquitectura"));
const Estrategia = lazy(() => import("@/pages/Estrategia"));
const Filosofia = lazy(() => import("@/pages/Filosofia"));
const DevHub = lazy(() => import("@/pages/DevHub"));
const Documentacion = lazy(() => import("@/pages/Documentacion"));
const Gobernanza = lazy(() => import("@/pages/Gobernanza"));
const Heptafederation = lazy(() => import("@/pages/Heptafederation"));
const ImpactoCivilizatorio = lazy(() => import("@/pages/ImpactoCivilizatorio"));
const IAAgentes = lazy(() => import("@/pages/IAAgentes"));
const IsabellaAI = lazy(() => import("@/pages/IsabellaAI"));
const KitAPIs = lazy(() => import("@/pages/KitAPIs"));
const MetaverseHome = lazy(() => import("@/pages/MetaverseHome"));
const PatrimonioCultural = lazy(() => import("@/pages/PatrimonioCultural"));
const QuantumComputing = lazy(() => import("@/pages/QuantumComputing"));
const RedSocial = lazy(() => import("@/pages/RedSocial"));
const SistemasAvanzados = lazy(() => import("@/pages/SistemasAvanzados"));
const TerritorialDataCollector = lazy(() => import("@/pages/TerritorialDataCollector"));
const XRTecnologia = lazy(() => import("@/pages/XRTecnologia"));
const BiografiaCEO = lazy(() => import("@/pages/BiografiaCEO"));
const Despliegue = lazy(() => import("@/pages/Despliegue"));
const EconomiaFederada = lazy(() => import("@/pages/EconomiaFederada"));
const Manuales = lazy(() => import("@/pages/Manuales"));
const BlockchainMSR = lazy(() => import("@/pages/BlockchainMSR"));
const SeguridadTenochtitlan = lazy(() => import("@/pages/SeguridadTenochtitlan"));
const Estacionamientos = lazy(() => import("@/pages/Estacionamientos"));
const SecurityDashboard = lazy(() => import("@/pages/SecurityDashboard"));
const SecurityDashboardAntifragil = lazy(() => import("@/pages/SecurityDashboardAntifragil"));
const SecurityLogs = lazy(() => import("@/pages/SecurityLogs"));
const FusionRepos = lazy(() => import("@/pages/FusionRepos"));
const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const CasosDeUso = lazy(() => import("@/pages/CasosDeUso"));
const Admin = lazy(() => import("@/pages/Admin"));
const VisualEffects = lazy(() => import("@/pages/VisualEffects"));
const DomainPage = lazy(() => import("@/pages/DomainPage"));
const Timeline = lazy(() => import("@/pages/Timeline"));
const SearchOverlayPage = lazy(() => import("@/pages/SearchOverlay"));
const Feed = lazy(() => import("@/pages/Feed"));
const RDMPageShell = lazy(() => import("@/pages/RDMPageShell"));
const AtlasPastes = lazy(() => import("@/pages/AtlasPastes"));
const AtlasCementerio = lazy(() => import("@/pages/AtlasCementerio"));
const AtlasCalles = lazy(() => import("@/pages/AtlasCalles"));
const AtlasLeyendas = lazy(() => import("@/pages/AtlasLeyendas"));
const AtlasMaximus = lazy(() => import("@/pages/AtlasMaximus"));
const EcosistemaLTOS = lazy(() => import("@/pages/EcosistemaLTOS"));
const Perfil = lazy(() => import("@/pages/Perfil"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
const TerritorialDashboard = lazy(() => import("@/pages/TerritorialDashboard"));
const Wiki = lazy(() => import("@/pages/Wiki"));
const ControlCenter = lazy(() => import("@/pages/ControlCenter"));
const B2BPortal = lazy(() => import("@/pages/B2BPortal"));
const GamePortal = lazy(() => import("@/pages/GamePortal"));
const GameHub = lazy(() => import("@/pages/GameHub"));
const Juegos = lazy(() => import("@/pages/Juegos"));
const LTOS = lazy(() => import("@/pages/LTOS"));
const Mitos = lazy(() => import("@/pages/Mitos"));
const MusicDetail = lazy(() => import("@/pages/MusicDetail"));
const Recorridos = lazy(() => import("@/pages/Recorridos"));
const RutaDelPaste = lazy(() => import("@/pages/RutaDelPaste"));
const AdminPanel = lazy(() => import("@/pages/Admin"));
const DemoChecklist = lazy(() => import("@/pages/DemoChecklist"));
const RealitoAIPage = lazy(() => import("@/pages/RealitoAI"));
const ArchivoSonoro = lazy(() => import("@/pages/ArchivoSonoro"));
const ComerciosCheckout = lazy(() => import("@/pages/ComerciosCheckout"));
const ComerciosRegistroPage = lazy(() => import("@/pages/ComerciosRegistro"));
const Evolucion = lazy(() => import("@/pages/Evolucion"));
const FAQPage = lazy(() => import("@/pages/FAQ"));
const FusionEcosystem = lazy(() => import("@/pages/FusionEcosystem"));
const Membresias = lazy(() => import("@/pages/Membresias"));
const PremiumPlans = lazy(() => import("@/pages/PremiumPlans"));
const Mina = lazy(() => import("@/pages/Mina"));
const Operativo = lazy(() => import("@/pages/Operativo"));
const TAMVApiExplorer = lazy(() => import("@/pages/TAMVApiExplorer"));
const TAMVHub = lazy(() => import("@/pages/TAMVHub"));
const TAMVStatus = lazy(() => import("@/pages/TAMVStatus"));
const TAMVThesis = lazy(() => import("@/pages/TAMVThesis"));
const RFCList = lazy(() => import("@/pages/RFCList"));
const RFCDetail = lazy(() => import("@/pages/RFCDetail"));
const TelemetryDashboardPage = lazy(() => import("@/pages/TelemetryDashboard"));
const Tenochtitlan = lazy(() => import("@/pages/Tenochtitlan"));

const RouteFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background" aria-label="Cargando contenido">
    <div className="animate-pulse text-muted-foreground">Cargando experiencia territorial…</div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<RouteErrorBoundary route="/"><Index /></RouteErrorBoundary>} />
            <Route path="/mapa" element={<RouteErrorBoundary route="/mapa"><Mapa /></RouteErrorBoundary>} />
            <Route path="/explorar" element={<Navigate to="/mapa" replace />} />
            <Route path="/lugares" element={<RouteErrorBoundary route="/lugares"><Lugares /></RouteErrorBoundary>} />
            <Route path="/directorio" element={<RouteErrorBoundary route="/directorio"><Directorio /></RouteErrorBoundary>} />
            <Route path="/eventos" element={<RouteErrorBoundary route="/eventos"><Eventos /></RouteErrorBoundary>} />
            <Route path="/comunidad" element={<RouteErrorBoundary route="/comunidad"><Comunidad /></RouteErrorBoundary>} />
            <Route path="/historia" element={<RouteErrorBoundary route="/historia"><Historia /></RouteErrorBoundary>} />
            <Route path="/cultura" element={<RouteErrorBoundary route="/cultura"><Cultura /></RouteErrorBoundary>} />
            <Route path="/relatos" element={<RouteErrorBoundary route="/relatos"><Relatos /></RouteErrorBoundary>} />
            <Route path="/ecoturismo" element={<RouteErrorBoundary route="/ecoturismo"><Ecoturismo /></RouteErrorBoundary>} />
            <Route path="/gastronomia" element={<RouteErrorBoundary route="/gastronomia"><Gastronomia /></RouteErrorBoundary>} />
            <Route path="/arte" element={<RouteErrorBoundary route="/arte"><Arte /></RouteErrorBoundary>} />
            <Route path="/rutas" element={<RouteErrorBoundary route="/rutas"><Rutas /></RouteErrorBoundary>} />
            <Route path="/auth" element={<RouteErrorBoundary route="/auth"><Auth /></RouteErrorBoundary>} />
            <Route path="/apoya" element={<RouteErrorBoundary route="/apoya"><Apoya /></RouteErrorBoundary>} />
            <Route path="/reglamento" element={<RouteErrorBoundary route="/reglamento"><Reglamento /></RouteErrorBoundary>} />
            <Route path="/dashboard" element={<RouteErrorBoundary route="/dashboard"><Dashboard /></RouteErrorBoundary>} />
            <Route path="/comercios" element={<RouteErrorBoundary route="/comercios"><Comercios /></RouteErrorBoundary>} />
            <Route path="/paquetes" element={<RouteErrorBoundary route="/paquetes"><Paquetes /></RouteErrorBoundary>} />
            <Route path="/transporte-local" element={<RouteErrorBoundary route="/transporte-local"><TransporteLocal /></RouteErrorBoundary>} />
            <Route path="/shuttle-cdmx" element={<RouteErrorBoundary route="/shuttle-cdmx"><ShuttleCDMX /></RouteErrorBoundary>} />
            <Route path="/quienes-somos" element={<RouteErrorBoundary route="/quienes-somos"><QuienesSomos /></RouteErrorBoundary>} />
            <Route path="/donar" element={<RouteErrorBoundary route="/donar"><Donar /></RouteErrorBoundary>} />
            <Route path="/gracias-donativo" element={<RouteErrorBoundary route="/gracias-donativo"><GraciasDonativo /></RouteErrorBoundary>} />
            <Route path="/comercios-panel" element={<RouteErrorBoundary route="/comercios-panel"><ComerciosPanel /></RouteErrorBoundary>} />
            <Route path="/registro-comercio" element={<RouteErrorBoundary route="/registro-comercio"><RegistroComercio /></RouteErrorBoundary>} />
            <Route path="/musica" element={<RouteErrorBoundary route="/musica"><Musica /></RouteErrorBoundary>} />
            <Route path="/musica/:slug" element={<RouteErrorBoundary route="/musica/:slug"><MusicDetail /></RouteErrorBoundary>} />
            <Route path="/dichos" element={<RouteErrorBoundary route="/dichos"><Dichos /></RouteErrorBoundary>} />
            <Route path="/catalogo" element={<RouteErrorBoundary route="/catalogo"><Catalogo /></RouteErrorBoundary>} />
            <Route path="/negocios" element={<RouteErrorBoundary route="/negocios"><NegociosPortal /></RouteErrorBoundary>} />
            <Route path="/introduccion" element={<RouteErrorBoundary route="/introduccion"><Introduccion /></RouteErrorBoundary>} />
            <Route path="/arquitectura" element={<RouteErrorBoundary route="/arquitectura"><Arquitectura /></RouteErrorBoundary>} />
            <Route path="/estrategia" element={<RouteErrorBoundary route="/estrategia"><Estrategia /></RouteErrorBoundary>} />
            <Route path="/filosofia" element={<RouteErrorBoundary route="/filosofia"><Filosofia /></RouteErrorBoundary>} />
            <Route path="/devhub" element={<RouteErrorBoundary route="/devhub"><DevHub /></RouteErrorBoundary>} />
            <Route path="/documentacion" element={<RouteErrorBoundary route="/documentacion"><Documentacion /></RouteErrorBoundary>} />
            <Route path="/gobernanza" element={<RouteErrorBoundary route="/gobernanza"><Gobernanza /></RouteErrorBoundary>} />
            <Route path="/heptafederation" element={<RouteErrorBoundary route="/heptafederation"><Heptafederation /></RouteErrorBoundary>} />
            <Route path="/impacto-civilizatorio" element={<RouteErrorBoundary route="/impacto-civilizatorio"><ImpactoCivilizatorio /></RouteErrorBoundary>} />
            <Route path="/ia-agentes" element={<RouteErrorBoundary route="/ia-agentes"><IAAgentes /></RouteErrorBoundary>} />
            <Route path="/isabella-ai" element={<RouteErrorBoundary route="/isabella-ai"><IsabellaAI /></RouteErrorBoundary>} />
            <Route path="/kit-apis" element={<RouteErrorBoundary route="/kit-apis"><KitAPIs /></RouteErrorBoundary>} />
            <Route path="/metaverso" element={<RouteErrorBoundary route="/metaverso"><MetaverseHome /></RouteErrorBoundary>} />
            <Route path="/patrimonio-cultural" element={<RouteErrorBoundary route="/patrimonio-cultural"><PatrimonioCultural /></RouteErrorBoundary>} />
            <Route path="/quantum-computing" element={<RouteErrorBoundary route="/quantum-computing"><QuantumComputing /></RouteErrorBoundary>} />
            <Route path="/red-social" element={<RouteErrorBoundary route="/red-social"><RedSocial /></RouteErrorBoundary>} />
            <Route path="/sistemas-avanzados" element={<RouteErrorBoundary route="/sistemas-avanzados"><SistemasAvanzados /></RouteErrorBoundary>} />
            <Route path="/territorial-data" element={<RouteErrorBoundary route="/territorial-data"><TerritorialDataCollector /></RouteErrorBoundary>} />
            <Route path="/xr-tecnologia" element={<RouteErrorBoundary route="/xr-tecnologia"><XRTecnologia /></RouteErrorBoundary>} />
            <Route path="/biografia-ceo" element={<RouteErrorBoundary route="/biografia-ceo"><BiografiaCEO /></RouteErrorBoundary>} />
            <Route path="/despliegue" element={<RouteErrorBoundary route="/despliegue"><Despliegue /></RouteErrorBoundary>} />
            <Route path="/economia-federada" element={<RouteErrorBoundary route="/economia-federada"><EconomiaFederada /></RouteErrorBoundary>} />
            <Route path="/manuales" element={<RouteErrorBoundary route="/manuales"><Manuales /></RouteErrorBoundary>} />
            <Route path="/blockchain-msr" element={<RouteErrorBoundary route="/blockchain-msr"><BlockchainMSR /></RouteErrorBoundary>} />
            <Route path="/seguridad-tenochtitlan" element={<RouteErrorBoundary route="/seguridad-tenochtitlan"><SeguridadTenochtitlan /></RouteErrorBoundary>} />
            <Route path="/estacionamientos" element={<RouteErrorBoundary route="/estacionamientos"><Estacionamientos /></RouteErrorBoundary>} />
            <Route path="/security-dashboard" element={<RouteErrorBoundary route="/security-dashboard"><SecurityDashboard /></RouteErrorBoundary>} />
            <Route path="/security-antifragil" element={<RouteErrorBoundary route="/security-antifragil"><SecurityDashboardAntifragil /></RouteErrorBoundary>} />
            <Route path="/security-logs" element={<RouteErrorBoundary route="/security-logs"><SecurityLogs /></RouteErrorBoundary>} />
            <Route path="/fusion-repos" element={<RouteErrorBoundary route="/fusion-repos"><FusionRepos /></RouteErrorBoundary>} />
            <Route path="/register" element={<RouteErrorBoundary route="/register"><Register /></RouteErrorBoundary>} />
            <Route path="/login" element={<RouteErrorBoundary route="/login"><Login /></RouteErrorBoundary>} />
            <Route path="/auth/callback" element={<RouteErrorBoundary route="/auth/callback"><AuthCallback /></RouteErrorBoundary>} />
            <Route path="/casos-de-uso" element={<RouteErrorBoundary route="/casos-de-uso"><CasosDeUso /></RouteErrorBoundary>} />
            <Route path="/admin" element={<RouteErrorBoundary route="/admin"><Admin /></RouteErrorBoundary>} />
            <Route path="/admin/musica" element={<RouteErrorBoundary route="/admin/musica"><AdminMusica /></RouteErrorBoundary>} />
            <Route path="/admin/dashboard" element={<RouteErrorBoundary route="/admin/dashboard"><AdminDashboard /></RouteErrorBoundary>} />
            <Route path="/visual-effects" element={<RouteErrorBoundary route="/visual-effects"><VisualEffects /></RouteErrorBoundary>} />
            <Route path="/domain/:domainName" element={<RouteErrorBoundary route="/domain/:domainName"><DomainPage /></RouteErrorBoundary>} />
            <Route path="/timeline" element={<RouteErrorBoundary route="/timeline"><Timeline /></RouteErrorBoundary>} />
            <Route path="/search" element={<RouteErrorBoundary route="/search"><SearchOverlayPage /></RouteErrorBoundary>} />
            <Route path="/feed" element={<RouteErrorBoundary route="/feed"><Feed /></RouteErrorBoundary>} />
            <Route path="/rdm-page" element={<RouteErrorBoundary route="/rdm-page"><RDMPageShell /></RouteErrorBoundary>} />
            <Route path="/atlas/pastes" element={<RouteErrorBoundary route="/atlas/pastes"><AtlasPastes /></RouteErrorBoundary>} />
            <Route path="/atlas/cementerio" element={<RouteErrorBoundary route="/atlas/cementerio"><AtlasCementerio /></RouteErrorBoundary>} />
            <Route path="/atlas/calles" element={<RouteErrorBoundary route="/atlas/calles"><AtlasCalles /></RouteErrorBoundary>} />
            <Route path="/atlas/leyendas" element={<RouteErrorBoundary route="/atlas/leyendas"><AtlasLeyendas /></RouteErrorBoundary>} />
            <Route path="/atlas" element={<RouteErrorBoundary route="/atlas"><AtlasMaximus /></RouteErrorBoundary>} />
            <Route path="/ecosistema-ltos" element={<RouteErrorBoundary route="/ecosistema-ltos"><EcosistemaLTOS /></RouteErrorBoundary>} />
            <Route path="/perfil" element={<RouteErrorBoundary route="/perfil"><Perfil /></RouteErrorBoundary>} />
            <Route path="/leaderboard" element={<RouteErrorBoundary route="/leaderboard"><Leaderboard /></RouteErrorBoundary>} />
            <Route path="/territorial-dashboard" element={<RouteErrorBoundary route="/territorial-dashboard"><TerritorialDashboard /></RouteErrorBoundary>} />
            <Route path="/wiki/:slug" element={<RouteErrorBoundary route="/wiki/:slug"><Wiki /></RouteErrorBoundary>} />
            <Route path="/control-center" element={<RouteErrorBoundary route="/control-center"><ControlCenter /></RouteErrorBoundary>} />
            <Route path="/b2b" element={<RouteErrorBoundary route="/b2b"><B2BPortal /></RouteErrorBoundary>} />
            <Route path="/game-portal" element={<RouteErrorBoundary route="/game-portal"><GamePortal /></RouteErrorBoundary>} />
            <Route path="/game-hub" element={<RouteErrorBoundary route="/game-hub"><GameHub /></RouteErrorBoundary>} />
            <Route path="/juegos" element={<RouteErrorBoundary route="/juegos"><Juegos /></RouteErrorBoundary>} />
            <Route path="/ltos" element={<RouteErrorBoundary route="/ltos"><LTOS /></RouteErrorBoundary>} />
            <Route path="/mitos" element={<RouteErrorBoundary route="/mitos"><Mitos /></RouteErrorBoundary>} />
            <Route path="/recorridos" element={<RouteErrorBoundary route="/recorridos"><Recorridos /></RouteErrorBoundary>} />
            <Route path="/ruta-del-paste" element={<RouteErrorBoundary route="/ruta-del-paste"><RutaDelPaste /></RouteErrorBoundary>} />
            <Route path="/admin-panel" element={<RouteErrorBoundary route="/admin-panel"><AdminPanel /></RouteErrorBoundary>} />
            <Route path="/demo-checklist" element={<RouteErrorBoundary route="/demo-checklist"><DemoChecklist /></RouteErrorBoundary>} />
            <Route path="/realito-ai" element={<RouteErrorBoundary route="/realito-ai"><RealitoAIPage /></RouteErrorBoundary>} />
            <Route path="/archivo-sonoro" element={<RouteErrorBoundary route="/archivo-sonoro"><ArchivoSonoro /></RouteErrorBoundary>} />
            <Route path="/comercios-checkout" element={<RouteErrorBoundary route="/comercios-checkout"><ComerciosCheckout /></RouteErrorBoundary>} />
            <Route path="/comercios-registro" element={<RouteErrorBoundary route="/comercios-registro"><ComerciosRegistroPage /></RouteErrorBoundary>} />
            <Route path="/evolucion" element={<RouteErrorBoundary route="/evolucion"><Evolucion /></RouteErrorBoundary>} />
            <Route path="/faq" element={<RouteErrorBoundary route="/faq"><FAQPage /></RouteErrorBoundary>} />
            <Route path="/fusion-ecosystem" element={<RouteErrorBoundary route="/fusion-ecosystem"><FusionEcosystem /></RouteErrorBoundary>} />
            <Route path="/membresias" element={<RouteErrorBoundary route="/membresias"><Membresias /></RouteErrorBoundary>} />
            <Route path="/premium" element={<RouteErrorBoundary route="/premium"><PremiumPlans /></RouteErrorBoundary>} />
            <Route path="/mina" element={<RouteErrorBoundary route="/mina"><Mina /></RouteErrorBoundary>} />
            <Route path="/operativo" element={<RouteErrorBoundary route="/operativo"><Operativo /></RouteErrorBoundary>} />
            <Route path="/api-explorer" element={<RouteErrorBoundary route="/api-explorer"><TAMVApiExplorer /></RouteErrorBoundary>} />
            <Route path="/tamv-hub" element={<RouteErrorBoundary route="/tamv-hub"><TAMVHub /></RouteErrorBoundary>} />
            <Route path="/tamv-status" element={<RouteErrorBoundary route="/tamv-status"><TAMVStatus /></RouteErrorBoundary>} />
            <Route path="/tamv-thesis" element={<RouteErrorBoundary route="/tamv-thesis"><TAMVThesis /></RouteErrorBoundary>} />
            <Route path="/rfc" element={<RouteErrorBoundary route="/rfc"><RFCList /></RouteErrorBoundary>} />
            <Route path="/rfc/:slug" element={<RouteErrorBoundary route="/rfc/:slug"><RFCDetail /></RouteErrorBoundary>} />
            <Route path="/telemetry" element={<RouteErrorBoundary route="/telemetry"><TelemetryDashboardPage /></RouteErrorBoundary>} />
            <Route path="/tenochtitlan" element={<RouteErrorBoundary route="/tenochtitlan"><Tenochtitlan /></RouteErrorBoundary>} />
            <Route path="*" element={<RouteErrorBoundary route="*"><NotFound /></RouteErrorBoundary>} />
            <Route path="/registrar-comercio" element={<RouteErrorBoundary route="/registrar-comercio"><RegistroComercio /></RouteErrorBoundary>} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
