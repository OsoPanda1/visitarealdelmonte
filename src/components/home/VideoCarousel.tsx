/**
 * Video Carousel TAMV - Horizonte 3D inmersivo
 * Órbita de contenidos con profundidad, tilt y cristal cuántico
 */

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Eye, Heart, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  creator: string;
  views: number;
  likes: number;
  duration: string;
  isLive?: boolean;
  type: "trailer" | "xr" | "course" | "social";
}

interface VideoCarouselProps {
  videos: VideoItem[];
  title: string;
  subtitle?: string;
}

interface VideoCardProps {
  video: VideoItem;
  offset: number; // posición relativa al centro (0 = centro absoluto)
  isCenter: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, offset, isCenter }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // valores de tilt en función del ratón
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // profundidad orbital
  const depthFactor = 1 - Math.min(Math.abs(offset) * 0.18, 0.75);
  const baseRotateY = offset * -16;
  const translateZ = depthFactor * 140;
  const scale = 0.85 + depthFactor * 0.25;
  const blurBackground = 1.8 - depthFactor * 1.2;
  const opacity = 0.25 + depthFactor * 0.75;

  const typeAccent =
    video.type === "xr"
      ? "from-cyan-400 to-emerald-400"
      : video.type === "course"
      ? "from-violet-400 to-cyan-400"
      : video.type === "trailer"
      ? "from-cyan-400 to-blue-500"
      : "from-fuchsia-400 to-cyan-400";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative flex-shrink-0 w-[18rem] md:w-[20rem]"
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        whileHover={{ y: -6 }}
      >
        <motion.div
          style={{
            transform: `
              translateZ(${translateZ}px)
              rotateY(${baseRotateY}deg)
              scale(${scale})
            `,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-[1.35rem] overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.95)]"
        >
          {/* capa soporte tipo tarjeta/video TAMV */}
          <div className="tamv-card-video relative aspect-video">
            {/* thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover saturate-[1.15] contrast-[1.05]"
            />

            {/* overlay de profundidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-slate-900/40" />

            {/* glow dinámico según tipo */}
            <div
              className={`
                pointer-events-none absolute inset-0 mix-blend-screen opacity-70
                bg-radial-[circle_at_20%_0%] from-cyan-400/40 via-transparent to-transparent
              `}
            />
            <div
              className={`
                pointer-events-none absolute inset-0 mix-blend-screen opacity-60
                bg-radial-[circle_at_90%_0%] from-fuchsia-400/35 via-transparent to-transparent
              `}
            />

            {/* botón play flotante */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full bg-cyan-400/35 blur-xl" />
                <div className="relative w-14 h-14 rounded-full bg-cyan-500/90 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.9)]">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            </motion.div>

            {/* duración */}
            <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] text-slate-50 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.duration}
            </div>

            {/* live */}
            {video.isLive && (
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-red-500/90 text-[11px] text-white font-semibold tracking-[0.16em] uppercase flex items-center gap-1 animate-pulse">
                <span className="inline-flex w-[6px] h-[6px] rounded-full bg-white" />
                En Vivo
              </div>
            )}

            {/* borde iridiscente TAMV */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] border border-transparent bg-[conic-gradient(from_150deg,rgba(59,245,255,0.65),rgba(192,132,252,0.7),rgba(59,245,255,0.65))] mix-blend-soft-light opacity-60" />

            {/* marco interno sutil */}
            <div className="pointer-events-none absolute inset-[1px] rounded-[1.25rem] border border-white/8" />
          </div>

          {/* información */}
          <div className="relative mt-3 px-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm md:text-[15px] leading-snug line-clamp-2 text-slate-50">
                  <span className="bg-gradient-to-r from-slate-50 via-slate-200 to-cyan-200 bg-clip-text text-transparent">
                    {video.title}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">{video.creator}</p>
              </div>

              {/* chip de tipo */}
              <div className="flex-shrink-0">
                <div
                  className={`
                    inline-flex items-center rounded-full border border-cyan-300/40
                    bg-slate-950/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]
                    text-cyan-200 bg-gradient-to-r ${typeAccent}
                    bg-clip-text text-transparent
                  `}
                >
                  {video.type === "xr"
                    ? "XR"
                    : video.type === "course"
                    ? "Curso"
                    : video.type === "trailer"
                    ? "Trailer"
                    : "Social"}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {video.likes.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, title, subtitle }) => {
  const [centerIndex, setCenterIndex] = useState(2);

  if (!videos || videos.length === 0) return null;

  const move = (dir: "left" | "right") => {
    setCenterIndex((prev) => {
      const next = dir === "left" ? prev - 1 : prev + 1;
      const len = videos.length;
      return (next + len) % len;
    });
  };

  return (
    <section className="relative py-6">
      {/* header TAMV */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-8 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_18px_rgba(56,189,248,0.8)]" />
          <div>
            <h2 className="text-lg md:text-xl font-semibold tracking-[0.18em] uppercase text-slate-100">
              <span className="bg-gradient-to-r from-slate-50 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {subtitle && (
              <p className="mt-1 text-xs md:text-sm text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="w-8 h-8 rounded-full border-cyan-300/60 bg-slate-950/80 text-cyan-200 hover:bg-slate-900/90 hover:text-cyan-100 shadow-[0_0_16px_rgba(56,189,248,0.6)]"
            onClick={() => move("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="w-8 h-8 rounded-full border-cyan-300/60 bg-slate-950/80 text-cyan-200 hover:bg-slate-900/90 hover:text-cyan-100 shadow-[0_0_16px_rgba(56,189,248,0.6)]"
            onClick={() => move("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* horizonte 3D */}
      <div className="relative mt-2 [perspective:1300px]">
        {/* pista orbital */}
        <div className="pointer-events-none absolute inset-x-6 -bottom-4 h-16 rounded-full bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent blur-2xl opacity-80" />

        <div className="relative flex items-stretch justify-center gap-4 md:gap-6">
          {videos.map((video, index) => {
            const offsetRaw = index - centerIndex;
            const len = videos.length;
            const offset =
              offsetRaw > len / 2
                ? offsetRaw - len
                : offsetRaw < -len / 2
                ? offsetRaw + len
                : offsetRaw;

            return (
              <AnimatePresence key={video.id}>
                <VideoCard
                  video={video}
                  offset={offset}
                  isCenter={offset === 0}
                />
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
