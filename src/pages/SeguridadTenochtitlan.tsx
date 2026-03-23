import { WikiPage } from "@/components/WikiPage";
import { Section, InfoBox } from "@/components/WikiElements";
import { Shield, Eye, Lock, AlertTriangle, Users, Fingerprint } from "lucide-react";

const centinelas = [
  {
    name: "ANUBIS CENTINEL",
    subtitle: "Sistema Primario",
    capas: "4 capas encriptadas obligatorias",
    items: ["Identidad criptográfica (DID + claves rotativas)", "Análisis de tráfico y comportamiento", "Control de acceso por propósito", "Registro probatorio inmutable"],
    color: "text-primary",
  },
  {
    name: "HORUS CENTINEL",
    subtitle: "Standby Evolutivo",
    capas: "6+2+2 capas de protección",
    items: ["Arquitectura independiente de ANUBIS", "Modelos de amenaza actualizados", "Activación solo con aprobación humana", "Redundancia total ante fallo primario"],
    color: "text-yellow-500",
  },
  {
    name: "DEKATEOTL",
    subtitle: "Orquestación Suprema",
    capas: "11 capas de verificación",
    items: ["Consenso mínimo requerido", "Kill-Switch ético", "Cumplimiento constitucional", "Coordinación de todos los centinelas"],
    color: "text-secondary",
  },
  {
    name: "AZTEK GODS",
    subtitle: "Standby Absoluto",
    capas: "22 capas para continuidad",
    items: ["Última línea de defensa", "Activación ante catástrofe total", "Preservación del núcleo inmortal", "Recuperación autónoma del ecosistema"],
    color: "text-destructive",
  },
];

const radares = [
  { icon: "🐍", name: "QUETZALCOATL", desc: "Anti-fraude económico — detecta patrones de lavado y manipulación" },
  { icon: "👁️", name: "OJO DE RA", desc: "Anti-contenido ilegal — no censura ideas, protege dignidad" },
  { icon: "👥", name: "MOS GEMELOS", desc: "Validación cruzada — A valida, B cuestiona, consenso decide" },
];

const SeguridadTenochtitlan = () => (
  <WikiPage
    title="Sistema TENOCHTITLAN"
    subtitle="Arquitectura Defensiva Avanzada — Seguridad Multicapa Civilizatoria"
  >
    <InfoBox type="warning" title="Principio Fundamental">
      "TAMV no se defiende atacando. Se defiende siendo imposible de capturar."
    </InfoBox>

    <Section title="Arquitectura de Centinelas" icon={Shield}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {centinelas.map((c) => (
          <div key={c.name} className="rounded-lg border border-border/50 bg-card/30 p-5">
            <div className="flex items-center gap-3 mb-1">
              <Shield className={`h-5 w-5 ${c.color}`} />
              <h3 className={`font-bold ${c.color}`}>{c.name}</h3>
            </div>
            <div className="text-xs text-muted-foreground mb-3">{c.subtitle} — {c.capas}</div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {c.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Radares Especializados" icon={Eye}>
      <div className="space-y-3">
        {radares.map((r) => (
          <div key={r.name} className="flex items-start gap-4 rounded-md border border-border/50 bg-muted/20 px-4 py-3">
            <span className="text-2xl">{r.icon}</span>
            <div>
              <div className="font-semibold text-foreground">{r.name}</div>
              <div className="text-sm text-muted-foreground">{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Guardianía Humana" icon={Users}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["Técnico", "Ético", "Legal", "Económico"].map((tipo) => (
          <div key={tipo} className="rounded-md border border-border/50 bg-primary/5 p-3 text-center">
            <div className="text-sm font-semibold text-foreground">Guardián {tipo}</div>
            <div className="text-xs text-muted-foreground mt-1">Supervisión paralela</div>
          </div>
        ))}
      </div>
      <InfoBox type="info">
        Ninguna IA tiene autoridad final. Todas las decisiones críticas requieren supervisión humana redundante.
      </InfoBox>
    </Section>

    <Section title="Configuración de Seguridad" icon={Lock}>
      <div className="rounded-lg border border-border/50 bg-card/30 p-4 font-mono text-xs space-y-3">
        <div>
          <div className="text-muted-foreground mb-1"># Encriptación</div>
          <div><span className="text-primary">at_rest:</span> AES-256</div>
          <div><span className="text-primary">in_transit:</span> TLS 1.3</div>
          <div><span className="text-primary">key_rotation:</span> 90 días</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1"># Autenticación</div>
          <div><span className="text-primary">method:</span> DID + JWT</div>
          <div><span className="text-primary">mfa:</span> obligatorio</div>
          <div><span className="text-primary">session_timeout:</span> 1 hora</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1"># Autorización</div>
          <div><span className="text-primary">model:</span> RBAC + ABAC</div>
          <div><span className="text-primary">principle:</span> least privilege</div>
        </div>
      </div>
    </Section>

    <Section title="Métricas de Seguridad" icon={Fingerprint}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Detección", value: "< 1s" },
          { label: "Falsos Positivos", value: "< 0.1%" },
          { label: "Cobertura Amenazas", value: "99.9%" },
          { label: "Resolución", value: "< 1 hora" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-border/50 bg-card/30 p-4 text-center">
            <div className="text-xl font-bold text-primary">{m.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </Section>
  </WikiPage>
);

export default SeguridadTenochtitlan;
