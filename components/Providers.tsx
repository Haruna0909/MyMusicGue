"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { songs, seedPlaylists, Playlist, Song } from "@/lib/data";

/* ---------------- Player ---------------- */
type PlayerCtx = {
  current: Song;
  playing: boolean;
  time: number;
  duration: number;
  volume: number;
  play: (id: number, queue?: number[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (t: number) => void;
  setVolume: (v: number) => void;
};
const PlayerContext = createContext<PlayerCtx | null>(null);
export const usePlayer = () => {
  const c = useContext(PlayerContext);
  if (!c) throw new Error("usePlayer harus di dalam Providers");
  return c;
};

/* ---------------- Library ---------------- */
type LibCtx = {
  playlists: Playlist[];
  favorites: number[];
  name: string;
  setName: (n: string) => void;
  toggleFav: (id: number) => void;
  createPlaylist: (name: string) => void;
  deletePlaylist: (id: string) => void;
  addToPlaylist: (pid: string, sid: number) => void;
};
const LibContext = createContext<LibCtx | null>(null);
export const useLibrary = () => {
  const c = useContext(LibContext);
  if (!c) throw new Error("useLibrary harus di dalam Providers");
  return c;
};

const KEY = "mmg-library-v1";

export default function Providers({ children }: { children: ReactNode }) {
  /* player state */
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentId, setCurrentId] = useState(songs[0].id);
  const [queue, setQueue] = useState<number[]>(songs.map((s) => s.id));
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVol] = useState(0.7);
  const current = songs.find((s) => s.id === currentId) ?? songs[0];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, currentId]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = useCallback(
    (id: number, q?: number[]) => {
      if (q) setQueue(q);
      if (id === currentId) {
        setPlaying((p) => !p);
      } else {
        setCurrentId(id);
        setTime(0);
        setDuration(0);
        setPlaying(true);
      }
    },
    [currentId]
  );
  const step = useCallback(
    (dir: 1 | -1) => {
      const q = queue.includes(currentId) ? queue : songs.map((s) => s.id);
      const i = q.indexOf(currentId);
      setCurrentId(q[(i + dir + q.length) % q.length]);
      setTime(0);
      setDuration(0);
      setPlaying(true);
    },
    [queue, currentId]
  );
  const seek = (t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
    setTime(t);
  };

  /* library state */
  const [playlists, setPlaylists] = useState<Playlist[]>(seedPlaylists);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [name, setNameState] = useState("Adi Gunawan");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.playlists) setPlaylists(d.playlists);
        if (d.favorites) setFavorites(d.favorites);
        if (d.name) setNameState(d.name);
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify({ playlists, favorites, name }));
  }, [playlists, favorites, name, ready]);

  const lib: LibCtx = {
    playlists,
    favorites,
    name,
    setName: (n) => setNameState(n.trim() || "Pendengar"),
    toggleFav: (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    createPlaylist: (n) =>
      setPlaylists((p) => [...p, { id: "u" + Date.now(), name: n.trim() || "Playlist baru", owner: "Untuk kamu", songIds: [] }]),
    deletePlaylist: (id) => setPlaylists((p) => p.filter((x) => x.id !== id)),
    addToPlaylist: (pid, sid) =>
      setPlaylists((p) => p.map((x) => (x.id === pid && !x.songIds.includes(sid) ? { ...x, songIds: [...x.songIds, sid] } : x))),
  };

  return (
    <PlayerContext.Provider
      value={{
        current,
        playing,
        time,
        duration: duration || current.duration,
        volume,
        play,
        toggle: () => setPlaying((p) => !p),
        next: () => step(1),
        prev: () => step(-1),
        seek,
        setVolume: setVol,
      }}
    >
      <LibContext.Provider value={lib}>
        {children}
        <audio
          ref={audioRef}
          src={current.src}
          preload="metadata"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => step(1)}
        />
      </LibContext.Provider>
    </PlayerContext.Provider>
  );
}
