import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RDM_TERRITORY_POIS, type TerritoryPOI } from "@/data/atlas/territory-pois";

/**
 * TerritorialSVGMap — Mapa SVG inmersivo y soberano del Nodo Cero.
 *
 * Mejoras vs. v1:
 *  - Accesible: roving tabindex (← → ↑ ↓), Enter/Space selecciona, foco visible,
 *    `role="application"` + `aria-activedescendant`, etiquetas claras.
 *  - Performance: marcadores memoizados (rerender solo del POI activo),
 *    throttling rAF del hover, listeners limpiados en unmount.
 *  - Sin acoplar al deep-link: padre controla `selectedId` y `onSelect`.
 */

const FACET_TONES: Record<string, { ring: string; glow: string; tag: string }> = {
  gubernamental: { ring: "hsl(210,100%,55%)", glow: "hsla(210,100%,55%,0.45)", tag: "Gubernamental" },
  cultural: { ring: "hsl(43,80%,55%)", glow: "hsla(43,80%,55%,0.45)", tag: "Cultural" },
  economica: { ring: "hsl(145,55%,45%)", glow: "hsla(145,55%,45%,0.4)", tag: "Económica" },
  tecnologica: { ring: "hsl(280,70%,60%)", glow: "hsla(280,70%,60%,0.45)", tag: "Tecnológica" },
  educativa: { ring: "hsl(195,80%,55%)", glow: "hsla(195,80%,55%,0.4)", tag: "Educativa" },
  salud: { ring: "hsl(160,55%,45%)", glow: "hsla(160,55%,45%,0.4)", tag: "Salud" },
};

const PAD = 0.012;

function useProjection(pois: TerritoryPOI[]) {
  return useMemo(() => {
    const lats = pois.map((p) => p.lat);
    const lngs = pois.map((p) => p.lng);
    const minLat = Math.min(...lats) - PAD;
    const maxLat = Math.max(...lats) + PAD;
    const minLng = Math.min(...lngs) - PAD;
    const maxLng = Math.max(...lngs) + PAD;
    const W = 1000;
    const H = 620;
    const project = (lat: number, lng: number) => {
      const x = ((lng - minLng) / (maxLng - minLng)) * W;
      const y = H - ((lat - minLat) / (maxLat - minLat)) * H;
      return { x, y };
    };
    return { W, H, project };
  }, [pois]);
}

interface MarkerProps {
  poi: TerritoryPOI;
  x: number;
  y: number;
  active: boolean;
  onActivate: (id: string) => void;
  onSelect: (id: string) => void;
}

/** Marcador memoizado: solo el POI activo y el previo re-renderizan. */
const POIMarker = memo(function POIMarker({ poi, x, y, active, onActivate, onSelect }: MarkerProps) {
  const tone = FACET_TONES[(poi as unknown as { federationId?: string }).federationId ?? ""] ?? FACET_TONES.gubernamental;
  const r = poi.relevance === "core-node" ? 14 : 10;

  return (
    <g
      id={`poi-${poi.id}`}
      transform={`translate(${x} ${y})`}
      onMouseEnter={() => onActivate(poi.id)}
      onFocus={() => onActivate(poi.id)}
      onClick={() => onSelect(poi.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(poi.id);
        }
      }}
      tabIndex={active ? 0 : -1}
      role="button"
      aria-label={`${poi.name} — ${poi.significance}`}
      aria-pressed={active}
      className="cursor-pointer focus:outline-none [&:focus-visible>circle:last-of-type]:stroke-[hsl(var(--electric))]"
    >
      <circle r={r * 2.4} fill={tone.glow} opacity={active ? 0.9 : 0.4} pointerEvents="none" />
      <circle
        r={r + 6}
        fill="none"
        stroke={tone.ring}
        strokeWidth={active ? 1.6 : 1}
        strokeDasharray="2 4"
        opacity={active ? 0.9 : 0.5}
        pointerEvents="none"
      >
        {active && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="24s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <circle r={r} fill="hsla(220,20%,99%,0.9)" stroke={tone.ring} strokeWidth={1.6} />
      <circle r={r * 0.45} fill={tone.ring} opacity={0.9} />
      <text
        y={r + 16}
        textAnchor="middle"
        fontSize={11}
        fontWeight={active ? 700 : 500}
        fill="hsl(var(--foreground))"
        style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
        pointerEvents="none"
      >
        {poi.name.length > 22 ? poi.name.slice(0, 21) + "…" : poi.name}
      </text>
    </g>
  );
});

export interface TerritorialSVGMapProps {
  pois?: TerritoryPOI[];
  /** POI a destacar (ej. ?poi=...). */
  highlightId?: string;
  /** POI seleccionado actual (modo controlado). */
  selectedId?: string | null;
  /** Callback al elegir un POI (click / Enter). */
  onSelect?: (id: string) => void;
}

export default function TerritorialSVGMap({
  pois = RDM_TERRITORY_POIS,
  highlightId,
  selectedId,
  onSelect,
}: TerritorialSVGMapProps) {
  const { W, H, project } = useProjection(pois);
  const [hover, setHover] = useState<string | null>(highlightId ?? selectedId ?? null);
  const rafRef = useRef<number | null>(null);
  const nextHoverRef = useRef<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Sync con prop externa (deep-link / selección externa)
  useEffect(() => {
    if (selectedId) setHover(selectedId);
    else if (highlightId) setHover(highlightId);
  }, [selectedId, highlightId]);

  // Throttle de hover con requestAnimationFrame
  const activate = useCallback((id: string) => {
    nextHoverRef.current = id;
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      setHover(nextHoverRef.current);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const select = useCallback(
    (id: string) => {
      setHover(id);
      onSelect?.(id);
    },
    [onSelect],
  );

  const projected = useMemo(() => pois.map((p) => ({ poi: p, ...project(p.lat, p.lng) })), [pois, project]);

  const active = useMemo(() => pois.find((p) => p.id === hover) ?? null, [pois, hover]);

  // Roving tabindex con flechas (vecino más cercano euclidiano)
  const handleKey = useCallback(
    (e: React.KeyboardEvent<SVGSVGElement>) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const current = projected.find((p) => p.poi.id === hover) ?? projected[0];
      if (!current) return;
      const dirX = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      const dirY = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
      let best: { id: string; score: number } | null = null;
      for (const p of projected) {
        if (p.poi.id === current.poi.id) continue;
        const dx = p.x - current.x;
        const dy = p.y - current.y;
        const aligned = dirX * dx + dirY * dy; // proyección en la dirección
        if (aligned <= 0) continue;
        const lateral = Math.abs(dirX ? dy : dx);
        const score = aligned - lateral * 0.5;
        if (!best || score > best.score) best = { id: p.poi.id, score };
      }
      if (best) {
        setHover(best.id);
        // mover foco al nodo
        const el = svgRef.current?.querySelector<SVGGElement>(`#poi-${CSS.escape(best.id)}`);
        el?.focus();
      }
    },
    [hover, projected],
  );

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[hsl(var(--gold)/0.2)] glass-card shadow-premium">
      <div className="absolute inset-0 aurora-bg opacity-70 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 grid-paper opacity-50 pointer-events-none" aria-hidden />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="relative w-full h-auto block focus:outline-none"
        role="application"
        aria-label="Mapa territorial inmersivo del Nodo Cero Real del Monte. Use las flechas para navegar entre puntos y Enter para abrir su ficha."
        aria-activedescendant={hover ? `poi-${hover}` : undefined}
        tabIndex={0}
        onKeyDown={handleKey}
      >
        <defs>
          <radialGradient id="terrain" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="hsl(220, 30%, 96%)" />
            <stop offset="55%" stopColor="hsl(220, 25%, 90%)" />
            <stop offset="100%" stopColor="hsl(220, 30%, 80%)" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#terrain)" />

        {[0.25, 0.45, 0.65, 0.85].map((r, i) => (
          <ellipse
            key={i}
            cx={W * 0.5}
            cy={H * 0.55}
            rx={W * r * 0.55}
            ry={H * r * 0.55}
            fill="none"
            stroke="hsla(220,45%,18%,0.06)"
            strokeWidth={1}
            strokeDasharray="2 6"
          />
        ))}

        {projected
          .filter(({ poi }) => poi.relevance === "core-node")
          .map(({ poi, x, y }, i, arr) => {
            const next = arr[(i + 1) % arr.length];
            return (
              <line
                key={poi.id + "-edge"}
                x1={x}
                y1={y}
                x2={next.x}
                y2={next.y}
                stroke="hsla(43,80%,55%,0.35)"
                strokeWidth={1.2}
                strokeDasharray="3 5"
              />
            );
          })}

        {projected.map(({ poi, x, y }) => (
          <POIMarker
            key={poi.id}
            poi={poi}
            x={x}
            y={y}
            active={hover === poi.id}
            onActivate={activate}
            onSelect={select}
          />
        ))}
      </svg>

      {active && (
        <motion.aside
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm bottom-4 sm:bottom-6 rounded-2xl glass-card border border-[hsl(var(--gold)/0.3)] shadow-premium p-4 z-10"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full"
              style={{
                background:
                  FACET_TONES[(active as unknown as { federationId?: string }).federationId ?? ""]?.glow ?? "hsla(0,0%,50%,0.2)",
                color:
                  FACET_TONES[(active as unknown as { federationId?: string }).federationId ?? ""]?.ring ?? "hsl(var(--foreground))",
              }}
            >
              {FACET_TONES[(active as unknown as { federationId?: string }).federationId ?? ""]?.tag ?? "Federación"}
            </span>
            <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
              {active.lat.toFixed(4)}, {active.lng.toFixed(4)}
            </span>
          </div>
          <h3 className="font-display text-xl leading-tight">{active.name}</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
            {active.municipality} · {active.altitudeM} m
          </p>
          <p className="text-sm mt-2 text-[hsl(var(--foreground)/0.85)]">{active.description}</p>
          <p className="text-xs italic mt-2 text-[hsl(var(--foreground)/0.7)]">«{active.significance}»</p>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onSelect?.(active.id)}
              className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[hsl(var(--electric)/0.4)] text-[hsl(var(--electric))] hover:bg-[hsl(var(--electric)/0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--electric))]"
            >
              Ver ficha completa
            </button>
            <Link
              to="/rutas"
              className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[hsl(var(--gold)/0.5)] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold)/0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--electric))]"
            >
              Rutas cercanas
            </Link>
          </div>
        </motion.aside>
      )}
    </div>
  );
}
