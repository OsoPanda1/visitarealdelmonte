import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from "react"

export interface Track {
  id: string
  title: string
  artist: string
  description: string
  src: string
  duration: number
  bpm?: number
  mood?: string
}

interface AudioPlayerState {
  currentTrack: Track | null
  playlist: Track[]
  isPlaying: boolean
  progress: number
  currentTime: number
  volume: number
  play: (track: Track, playlist?: Track[]) => void
  togglePlay: () => void
  pause: () => void
  next: () => void
  prev: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
}

const AudioPlayerContext = createContext<AudioPlayerState | null>(null)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const trackIndexRef = useRef(-1)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = "auto"
    }
    const audio = audioRef.current
    audio.volume = volume

    const onTime = () => {
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
      setCurrentTime(audio.currentTime)
    }
    const onEnd = () => {
      next()
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnd)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)

    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("ended", onEnd)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
    }
  }, [])

  const play = useCallback((track: Track, newPlaylist?: Track[]) => {
    const audio = audioRef.current
    if (!audio) return

    if (newPlaylist) {
      setPlaylist(newPlaylist)
      trackIndexRef.current = newPlaylist.findIndex(t => t.id === track.id)
    } else {
      const idx = playlist.findIndex(t => t.id === track.id)
      if (idx >= 0) trackIndexRef.current = idx
    }

    audio.src = track.src
    audio.currentTime = 0
    audio.play().catch(() => {})
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress(0)
    setCurrentTime(0)
  }, [playlist])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [currentTrack])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const next = useCallback(() => {
    if (playlist.length === 0) return
    const nextIdx = (trackIndexRef.current + 1) % playlist.length
    trackIndexRef.current = nextIdx
    const nextTrack = playlist[nextIdx]
    if (nextTrack) play(nextTrack)
  }, [playlist, play])

  const prev = useCallback(() => {
    if (playlist.length === 0) return
    const prevIdx = (trackIndexRef.current - 1 + playlist.length) % playlist.length
    trackIndexRef.current = prevIdx
    const prevTrack = playlist[prevIdx]
    if (prevTrack) play(prevTrack)
  }, [playlist, play])

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time
  }, [])

  const setVolumeFn = useCallback((v: number) => {
    setVolumeState(v)
    if (audioRef.current) audioRef.current.volume = v
  }, [])

  return (
    <AudioPlayerContext.Provider value={{
      currentTrack,
      playlist,
      isPlaying,
      progress,
      currentTime,
      volume,
      play,
      togglePlay,
      pause,
      next,
      prev,
      seek,
      setVolume: setVolumeFn,
    }}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider")
  return ctx
}
