import { useCallback, useState } from "react";

export interface RealitoMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  intent?: string;
  suggestedActions?: SuggestedAction[];
}

export interface SuggestedAction {
  label: string;
  action: string;
  payload?: Record<string, unknown>;
}

interface RealitoChatResponse {
  reply: string;
  intent?: string;
  suggestedActions?: SuggestedAction[];
  trace?: {
    interactionId: string;
    source: string;
  };
  gaSuggestion?: {
    id: string;
    label: string;
    fitnessScore: number;
    confidenceScore: number;
    geneticGen: string;
    explanation: string;
    objectives: {
      distanceKm: number;
      diversityScore: number;
      crowdPenalty: number;
      merchantBalance: number;
      totalDurationMinutes: number;
    };
    stops: Array<{
      twinId: string;
      name: string;
      order: number;
      etaMinutes: number;
      dwellMinutes: number;
      type: string;
      crowdLevel: number;
      immersion: string;
    }>;
  } | null;
  engine?: string;
  twinNodesQueried?: number;
}

interface ChatMessageDTO {
  from: "user" | "realito";
  text: string;
}

export function useRealitoChat() {
  const [messages, setMessages] = useState<RealitoMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Soy Realito, el núcleo cognitivo del gemelo digital de Real del Monte.\n\n" +
        "Puedo ayudarte a:\n" +
        "🗺️ **Diseñar rutas** optimizadas con IA y telemetría en tiempo real\n" +
        "🥟 **Descubrir gastronomía** — pastes, carnitas, mole y más\n" +
        "⛏️ **Explorar historia** — 5 siglos de minería y herencia británica\n" +
        "🏔️ **Planear aventura** — senderismo, rappel, miradores\n\n" +
        "¿Qué experiencia buscas hoy?",
      suggestedActions: [
        { label: "🗺️ Sugerir ruta", action: "SUGGEST_ROUTE" },
        { label: "🥟 Dónde comer", action: "FIND_FOOD" },
        { label: "⛏️ Contar historia", action: "TELL_HISTORY" },
        { label: "🏔️ Aventura", action: "FIND_ADVENTURE" },
      ],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastTraceId, setLastTraceId] = useState<string | null>(null);

  const send = useCallback(
    async (content: string) => {
      const text = content.trim();
      if (!text) return;

      const userMessage: RealitoMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const contextHistory: ChatMessageDTO[] = messages.slice(-6).map((m) => ({
          from: m.role === "user" ? ("user" as const) : ("realito" as const),
          text: m.content,
        }));

        const response = await fetch("/api/realito/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            contextHistory,
            userPreferences: {},
          }),
        });

        if (response.ok) {
          const payload = (await response.json()) as RealitoChatResponse;
          if (payload.trace?.interactionId) {
            setLastTraceId(payload.trace.interactionId);
          }

          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: payload.reply ?? "Estoy preparando recomendaciones precisas para tu visita.",
              intent: payload.intent,
              suggestedActions: payload.suggestedActions,
            },
          ]);
        } else {
          throw new Error("API error");
        }
      } catch {
        // Fallback to local intelligence
        const lowerText = text.toLowerCase();
        let fallbackReply: string;
        let fallbackActions: SuggestedAction[] = [];

        if (/ruta|tour|recorrido|caminar/.test(lowerText)) {
          fallbackReply =
            "Te recomiendo iniciar en el Centro Histórico, visitar la Mina de Acosta y cerrar en el Panteón Inglés. Es la ruta del patrimonio más popular y toma aproximadamente 1.5 horas.";
          fallbackActions = [
            { label: "🗺️ Ver en mapa", action: "OPEN_ROUTE" },
            { label: "🥟 Agregar gastronomía", action: "ADJUST_INTERESTS", payload: { add: "GASTRONOMIA" } },
          ];
        } else if (/comer|paste|restaurante|comida/.test(lowerText)) {
          fallbackReply =
            "Los pastes son imperdibles — la Pastería El Portal frente a la plaza tiene la receta original córnica de 1824. Para comida completa, Los Portales sirve mole y barbacoa hidalguense.";
          fallbackActions = [
            { label: "🥟 Ruta gastronómica", action: "REQUEST_FOOD_ROUTE" },
            { label: "📋 Ver catálogo", action: "OPEN_CATALOG" },
          ];
        } else if (/historia|mina|museo/.test(lowerText)) {
          fallbackReply =
            "Real del Monte tiene más de 5 siglos de historia. En 1766 ocurrió aquí la primera huelga laboral de América. La Mina de Acosta te permite descender 400m bajo tierra.";
          fallbackActions = [
            { label: "⛏️ Ruta patrimonial", action: "REQUEST_HERITAGE_ROUTE" },
            { label: "📜 Leer leyendas", action: "NAVIGATE", payload: { path: "/relatos" } },
          ];
        } else {
          fallbackReply =
            "Estoy en modo local pero puedo ayudarte. Te recomiendo iniciar en el Centro Histórico y la Mina de Acosta. ¿Buscas historia, gastronomía o aventura?";
          fallbackActions = [
            { label: "🗺️ Sugerir ruta", action: "SUGGEST_ROUTE" },
            { label: "🥟 Dónde comer", action: "FIND_FOOD" },
          ];
        }

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: fallbackReply,
            suggestedActions: fallbackActions,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages],
  );

  return { messages, isLoading, send, lastTraceId };
}
