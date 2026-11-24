"use client";
import Link from "next/link";
import { FiArrowUpRight, FiMoreHorizontal, FiPause, FiPlay } from "react-icons/fi";
import { Song, Playlist, fmt, songs } from "@/lib/data";
import { usePlayer } from "./Providers";

export function Cover({ label = "SAMPUL LAGU", round = false }: { label?: string; round?: boolean }) {
  return (
    <div className={"cover" + (round ? " round" : "")}>
      <div className="disc" />
      <span className="cover-label">{label}</span>
    </div>
  );
}

export function Thumb() {
  return <div className="thumb"><div className="disc" /></div>;
}

export function SectionHead({ title, href, link }: { title: string; href?: string; link?: string }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {href && (
        <Link href={href} className="link-accent">
          {link} <FiArrowUpRight />
        </Link>
      )}
    </div>
  );
}

export function PageHead({ eyebrow, title, dot = "var(--accent)", sub, children }: { eyebrow: string; title: string; dot?: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="page-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="h1">{title}<span style={{ color: dot }}>.</span></h1>
        {sub && <p className="sub">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function PlayBtn({ song, queue, size = 30 }: { song: Song; queue?: number[]; size?: number }) {
  const { current, playing, play } = usePlayer();
  const on = current.id === song.id && playing;
  return (
    <button className="icon-btn round" style={{ width: size, height: size }} aria-label={on ? "Jeda" : "Putar"} onClick={() => play(song.id, queue)}>
      {on ? <FiPause /> : <FiPlay />}
    </button>
  );
}

export function SongCard({ song, full = false, queue }: { song: Song; full?: boolean; queue?: number[] }) {
  const { current, playing } = usePlayer();
  const active = current.id === song.id && playing;
  return (
    <div className={"card song-card" + (active ? " active" : "")}>
      <Link href={`/lagu/${song.id}`}><Cover /></Link>
      <div className="song-meta">
        <div>
          <Link href={`/lagu/${song.id}`} className="song-title">{song.title}</Link>
          <div className="muted xs">{full ? `${song.artist} · ${song.genre}` : song.artist}</div>
        </div>
        {!full && <Link href={`/lagu/${song.id}`} className="muted" aria-label="Detail"><FiArrowUpRight /></Link>}
      </div>
      {full && (
        <div className="song-foot">
          <span className="muted xs">{fmt(song.duration)}</span>
          <PlayBtn song={song} queue={queue} />
        </div>
      )}
    </div>
  );
}

export function SongRow({ song, index, queue }: { song: Song; index: number; queue?: number[] }) {
  const { play } = usePlayer();
  return (
    <div className="row">
      <span className="muted xs num">{String(index).padStart(2, "0")}</span>
      <button className="thumb-btn" onClick={() => play(song.id, queue)} aria-label={`Putar ${song.title}`}><Thumb /></button>
      <div className="row-info">
        <Link href={`/lagu/${song.id}`} className="song-title">{song.title}</Link>
        <div className="muted xs">{song.artist}</div>
      </div>
      <span className="muted xs">{fmt(song.duration)}</span>
      <Link href={`/lagu/${song.id}`} className="row-arrow" aria-label="Detail"><FiArrowUpRight /></Link>
    </div>
  );
}

export function PlaylistCard({ pl, onSelect, selected, onMore }: { pl: Playlist; onSelect?: () => void; selected?: boolean; onMore?: () => void }) {
  return (
    <div className={"card pl-card" + (selected ? " selected" : "")}>
      <div onClick={onSelect} style={{ cursor: onSelect ? "pointer" : "default" }}><Cover label="SAMPUL PLAYLIST" /></div>
      <div className="song-meta">
        <div>
          <div className="song-title">{pl.name}</div>
          <div className="muted xs">{pl.songIds.length} lagu · {pl.owner}</div>
        </div>
        <button className="muted ghost" aria-label="Lainnya" onClick={onMore}><FiMoreHorizontal /></button>
      </div>
    </div>
  );
}

export function Waveform({ bars = 48, progress = 0, onSeek, animated = false }: { bars?: number; progress?: number; onSeek?: (p: number) => void; animated?: boolean }) {
  const hs = Array.from({ length: bars }, (_, i) => 18 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 70);
  return (
    <div className={"wave" + (animated ? " animated" : "")}>
      {hs.map((h, i) => (
        <span
          key={i}
          className={i / bars < progress ? "on" : ""}
          style={{ height: `${h}%`, animationDelay: `${(i % 12) * 0.08}s` }}
          onClick={() => onSeek?.((i + 0.5) / bars)}
        />
      ))}
    </div>
  );
}

export const queueAll = songs.map((s) => s.id);
