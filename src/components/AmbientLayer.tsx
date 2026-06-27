import { useEffect, useRef } from "react"

export default function AmbientLayer() {
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const root = document.documentElement

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`)
        root.style.setProperty("--my", `${e.clientY}px`)
        root.style.setProperty("--mx-pct", `${mouseRef.current.x * 100}%`)
        root.style.setProperty("--my-pct", `${mouseRef.current.y * 100}%`)
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    root.classList.add("cursor-ambient")

    return () => {
      window.removeEventListener("pointermove", onMove)
      root.classList.remove("cursor-ambient")
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora layer 1 — deep shift */}
      <div className="absolute inset-0 aurora-bg opacity-70" />

      {/* Aurora layer 2 — conic shimmer */}
      <div className="absolute inset-0 aurora-conic opacity-50" />

      {/* Grid paper fine */}
      <div className="absolute inset-0 grid-paper-fine opacity-40" />

      {/* Floating particles */}
      <div className="absolute inset-0 ambient-particles" />

      {/* Shooting stars */}
      <div className="absolute inset-0 shooting-stars" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  )
}
