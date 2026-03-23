import { WikiPage } from "@/components/WikiPage";
import { Section, InfoCard } from "@/components/WikiElements";
import { Layers, Shield, Brain, Globe, Network } from "lucide-react";

const Arquitectura = () => (
  <WikiPage
    title="Arquitectura TAMV MD‑X4"
    subtitle="Capas, módulos y la red de dominios y guardianías"
  >
    <Section title="Visión general">
      <p className="text-muted-foreground leading-relaxed">
        TAMV MD‑X4 se organiza como una red de dominios y guardianías conectadas bajo el{" "}
        <strong className="text-primary">Códice Maestro</strong>, un conjunto de principios técnicos, éticos y
        simbólicos que unifican diseño, código y gobernanza. La arquitectura contempla 11 dominios activos y 48
        nodos federados operando con seguridad Zero‑Trust.
      </p>
    </Section>

    <Section title="Capas arquitectónicas">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon={Brain}
          title="Núcleo Sentiente (Isabella AI)"
          description="Orquestación neural con propósito ético, integrada con modelos de IA avanzada."
          variant="cyan"
        />
        <InfoCard
          icon={Shield}
          title="Ledger de Confianza (EOCT Blockchain)"
          description="Infraestructura para inmutabilidad y transparencia gestionada vía MSR API."
          variant="gold"
        />
        <InfoCard
          icon={Network}
          title="Red de Seguridad (Anubis Sentinel)"
          description="Defensa proactiva y monitoreo multi-sensorial con honeypots y Zero‑Trust."
          variant="gold"
        />
        <InfoCard
          icon={Globe}
          title="Interfaz Dimensional (4D)"
          description="Inmersión sensorial consciente a través de DreamSpaces y experiencias XR."
          variant="cyan"
        />
      </div>
    </Section>

    <Section title="CITEMESH">
      <p className="text-muted-foreground leading-relaxed">
        El concepto <strong className="text-secondary">CITEMESH</strong> (Ciudad-Malla Civilizatoria) define
        la topología de TAMV: cada nodo federado opera de forma autónoma pero comparte identidad, estándares
        y protocolos de gobernanza con el resto del ecosistema. Esto permite escalabilidad horizontal sin
        perder coherencia civilizatoria.
      </p>
    </Section>

    <Section title="Stack tecnológico">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {["React 18", "TypeScript", "Three.js", "Supabase", "Zustand", "Vite", "Tailwind", "Framer Motion"].map((tech) => (
          <div key={tech} className="text-center py-3 px-2 rounded-md border border-border/50 bg-muted/20 text-sm text-foreground">
            {tech}
          </div>
        ))}
      </div>
    </Section>
  </WikiPage>
);

export default Arquitectura;
