import { WikiPage } from "@/components/WikiPage";
import { Section, InfoBox } from "@/components/WikiElements";
import { BookOpen, Layers, Cpu, Heart, Globe, Target, FileText } from "lucide-react";

const WikiTAMV = () => (
  <WikiPage
    title="WikiTAMV"
    subtitle="Documento Maestro Unificado — Arquitectura Conceptual, Narrativa, Operativa y Tecnológica"
  >
    <InfoBox type="info" title="Declaración de Consolidación">
      Este documento integra y estructura de manera coherente todos los componentes del proyecto TAMV:
      reportaje institucional, marco estratégico, introducción cinematográfica, lógica operativa,
      script técnico de ingeniería avanzada, arquitectura audiovisual digital, dimensión humana
      y proyección nacional e internacional.
    </InfoBox>

    {/* Sección 1: Naturaleza del Proyecto */}
    <Section title="Naturaleza del Proyecto TAMV" icon={BookOpen}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Definición Estructural</h3>
        <p className="text-muted-foreground leading-relaxed">
          TAMV Online Network es una iniciativa independiente orientada a la construcción de:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Infraestructura digital soberana",
            "Arquitectura tecnológica modular",
            "Ecosistema colaborativo",
            "Sistema de documentación estructural",
            "Red de conocimiento estratégico",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          No se presenta como startup tradicional ni como plataforma comercial masiva, sino como
          <strong className="text-foreground"> proyecto arquitectónico de largo plazo con identidad propia</strong>.
        </p>
      </div>
    </Section>

    {/* Sección 2: Posicionamiento Estratégico */}
    <Section title="Posicionamiento Estratégico" icon={Target}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Contexto</h3>
          <p className="text-muted-foreground leading-relaxed">
            En un entorno donde la inteligencia artificial redefine economías, la soberanía tecnológica
            es un eje geopolítico, y las grandes corporaciones concentran infraestructura digital,
            TAMV propone una alternativa independiente.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Diferenciación</h3>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left text-foreground font-medium">Aspecto</th>
                  <th className="px-4 py-2 text-left text-muted-foreground">Corporativo Tradicional</th>
                  <th className="px-4 py-2 text-left text-primary font-medium">TAMV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { aspect: "Financiamiento", corp: "Fondos y capital privado", tamv: "Independiente" },
                  { aspect: "Gobernanza", corp: "Centralizada", tamv: "Conceptualmente abierta" },
                  { aspect: "Identidad", corp: "Comercial", tamv: "Civilizatoria" },
                  { aspect: "Narrativa", corp: "Producto", tamv: "Infraestructura" },
                ].map((row) => (
                  <tr key={row.aspect}>
                    <td className="px-4 py-2 text-foreground font-medium">{row.aspect}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.corp}</td>
                    <td className="px-4 py-2 text-primary">{row.tamv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border/50 bg-card/30 p-4">
            <h4 className="font-semibold text-foreground mb-2">Fortalezas</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {["Visión coherente", "Arquitectura conceptual clara", "Independencia estratégica", "Capacidad de adaptación", "Identidad narrativa fuerte"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-primary">+</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/30 p-4">
            <h4 className="font-semibold text-foreground mb-2">Limitaciones Reales</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {["Falta de padrinazgo empresarial", "Recursos financieros limitados", "Ausencia de validación institucional formal", "Crecimiento orgánico"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-destructive">−</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>

    {/* Sección 3: WikiTAMV */}
    <Section title="WikiTAMV — Naturaleza y Función" icon={FileText}>
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          WikiTAMV es el <strong className="text-foreground">sistema documental oficial</strong> del ecosistema TAMV.
          Funciona como bitácora estructural, registro histórico, documento de legitimación y archivo técnico evolutivo.
        </p>

        <h4 className="font-semibold text-foreground">Capas Operativas</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Identidad y filosofía" },
            { num: "02", title: "Documentación técnica" },
            { num: "03", title: "Infraestructura conceptual" },
            { num: "04", title: "Proyección estratégica" },
            { num: "05", title: "Ecosistema comunitario" },
          ].map((capa) => (
            <div key={capa.num} className="flex items-center gap-3 rounded-md border border-border/50 bg-muted/20 px-3 py-2">
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{capa.num}</span>
              <span className="text-sm text-muted-foreground">{capa.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>

    {/* Sección 4: Introducción Cinematográfica */}
    <Section title="Introducción Cinematográfica" icon={Layers}>
      <div className="space-y-4">
        <InfoBox type="warning">
          <strong>Objetivo:</strong> No informar. Posicionar. No describir. Establecer magnitud.
        </InfoBox>

        <h4 className="font-semibold text-foreground">Estructura Narrativa — Seis Fases</h4>
        <div className="space-y-2">
          {[
            { phase: "Fase 1", name: "Vacío", desc: "Autoridad" },
            { phase: "Fase 2", name: "Origen", desc: "Humanización" },
            { phase: "Fase 3", name: "Infraestructura", desc: "Escala" },
            { phase: "Fase 4", name: "Inscripción histórica", desc: "Permanencia" },
            { phase: "Fase 5", name: "Dedicatoria", desc: "Anclaje emocional" },
            { phase: "Fase 6", name: "Expansión global", desc: "Proyección" },
          ].map((fase, idx) => (
            <div key={fase.phase} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-32">
                <span className="text-xs font-mono text-primary">{fase.phase}</span>
                <span className="text-sm font-medium text-foreground">{fase.name}</span>
              </div>
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-sm text-muted-foreground">{fase.desc}</span>
            </div>
          ))}
        </div>

        <h4 className="font-semibold text-foreground mt-4">Arquitectura Psicológica</h4>
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-center text-muted-foreground">
            Misterio <span className="text-primary mx-2">→</span>
            Origen <span className="text-primary mx-2">→</span>
            Construcción <span className="text-primary mx-2">→</span>
            Consolidación <span className="text-primary mx-2">→</span>
            Humanización <span className="text-primary mx-2">→</span>
            Escalamiento
          </p>
        </div>
      </div>
    </Section>

    {/* Sección 5: Script Técnico */}
    <Section title="Script Técnico de Ingeniería Avanzada" icon={Cpu}>
      <InfoBox type="info">
        La introducción no es animación decorativa. Es <strong>sistema determinístico</strong>.
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <h4 className="font-semibold text-foreground mb-3">Máquina de Estados</h4>
          <div className="rounded-lg border border-border/50 bg-muted/20 p-3 font-mono text-xs space-y-1">
            <div><span className="text-primary">S0:</span> Idle</div>
            <div><span className="text-primary">S1:</span> Activation</div>
            <div><span className="text-primary">S2:</span> Origin_Render</div>
            <div><span className="text-primary">S3:</span> Infrastructure_Projection</div>
            <div><span className="text-primary">S4:</span> Dedication_Anchor</div>
            <div><span className="text-primary">S5:</span> Global_Expansion</div>
            <div><span className="text-primary">S6:</span> Transition_To_Core</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-mono">Flujo: S0 → S1 → S2 → S3 → S4 → S5 → S6</p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3">Motor Visual</h4>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {["WebGL / Three.js", "Grafo dinámico tipo force-directed", "Sistema de partículas", "Shaders personalizados", "Render 60 FPS"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-foreground mb-3">Modelo Matemático Simplificado</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: "Repulsión nodal", formula: "Fr = k / d²" },
            { name: "Atracción estructural", formula: "Fa = k(d − L)" },
            { name: "Curvas Bezier", formula: "B(t) = (1−t)²P₀ + 2(1−t)tP₁ + t²P₂" },
            { name: "Interpolación suave", formula: "cubicEase(t) = 3t² − 2t³" },
          ].map((model) => (
            <div key={model.name} className="rounded-md border border-border/50 bg-card/30 p-3">
              <div className="text-xs text-muted-foreground mb-1">{model.name}</div>
              <div className="text-xs font-mono text-primary">{model.formula}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>

    {/* Sección 6: Dimensión Humana */}
    <Section title="Dimensión Humana" icon={Heart}>
      <InfoBox type="success">
        La dedicatoria no es ornamental. Cumple función de humanización, anclaje emocional,
        blindaje narrativo y diferenciación frente a estructuras corporativas impersonales.
        Reconoce origen, sacrificio y resiliencia.
      </InfoBox>
    </Section>

    {/* Sección 7: Proyección Institucional */}
    <Section title="Proyección Institucional" icon={Globe}>
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Si se integra en agenda nacional, TAMV podría aportar:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Documentación de infraestructura digital",
            "Modelo de soberanía conceptual",
            "Plataforma educativa tecnológica",
            "Marco colaborativo independiente",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-md border border-border/50 bg-muted/20 px-3 py-2">
              <span className="text-primary">◆</span>
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>

        <h4 className="font-semibold text-foreground mt-4">Arquitectura Futuro-Evolutiva</h4>
        <div className="space-y-2">
          {[
            "Consolidación como archivo histórico oficial",
            "Centro de investigación digital",
            "Plataforma base para infraestructura tecnológica nacional",
            "Integración público-privada híbrida",
          ].map((escenario, idx) => (
            <div key={escenario} className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">E{idx + 1}</span>
              <span className="text-sm text-muted-foreground">{escenario}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>

    {/* Síntesis Final */}
    <Section title="Síntesis Integral">
      <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-destructive mb-3">TAMV NO es:</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {["Producto aislado", "Campaña narrativa", "Propuesta especulativa"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-destructive">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-3">TAMV ES:</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {["Proyecto estructural independiente", "Sistema documental vivo", "Arquitectura conceptual soberana", "Intento de construcción civilizatoria desde periferia tecnológica"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>

    {/* Conclusión */}
    <Section title="Conclusión Final">
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Este documento consolida: <strong className="text-foreground">Narrativa, Estrategia, Ingeniería, Arquitectura, Posicionamiento y Dimensión humana.</strong>
        </p>

        <InfoBox type="success">
          El valor real de TAMV no reside únicamente en su tecnología potencial, sino en:
          <ul className="mt-2 space-y-1">
            <li>• Su coherencia estructural</li>
            <li>• Su capacidad de documentarse</li>
            <li>• Su narrativa fundacional</li>
            <li>• Su aspiración a permanencia</li>
          </ul>
        </InfoBox>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-medium text-foreground mb-2">
            La WikiTAMV representa el núcleo de legitimación del proyecto.
          </p>
          <p className="text-sm text-muted-foreground">
            No como espectáculo. No como marketing.<br />
            <strong className="text-primary">Sino como archivo estructural en evolución.</strong>
          </p>
        </div>
      </div>
    </Section>
  </WikiPage>
);

export default WikiTAMV;
