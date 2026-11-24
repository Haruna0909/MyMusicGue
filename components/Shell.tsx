"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, ReactNode } from "react";
import {
  FiBell, FiCompass, FiHome, FiMusic, FiPause, FiPlay, FiSearch, FiSkipBack, FiSkipForward, FiUser, FiVolume2, FiVolumeX,
} from "react-icons/fi";
import { LuLibrary } from "react-icons/lu";
import { usePlayer, useLibrary } from "./Providers";
import { Thumb } from "./ui";
import { fmt } from "@/lib/data";

function Sidebar() {
  const path = usePathname();
  const { current } = usePlayer();
  const items = [
    { href: "/", label: "Beranda", icon: <FiHome />, on: path === "/" },
    { href: "/jelajahi", label: "Jelajahi", icon: <FiCompass />, on: path.startsWith("/jelajahi") },
    { href: "/koleksi", label: "Koleksi", icon: <LuLibrary />, on: path.startsWith("/koleksi") },
    { href: `/lagu/${current.id}`, label: "Lagu", icon: <FiMusic />, on: path.startsWith("/lagu") },
    { href: "/profil", label: "Profil", icon: <FiUser />, on: path.startsWith("/profil") },
  ];
  return (
    <aside className="sidebar">
      <Link href="/" className="logo-wrap">
        <Image src="/logo.svg" alt="MMG My Music Gue" width={160} height={120} priority unoptimized />
      </Link>
      <nav>
        <div className="eyebrow nav-label">MENU UTAMA</div>
        {items.map((i) => (
          <Link key={i.label} href={i.href} className={"nav-item" + (i.on ? " on" : "")}>
            {i.icon}
            <span>{i.label}</span>
          </Link>
        ))}
      </nav>
      <div className="side-foot">
        <strong>MMG / MY MUSIC GUE</strong>
        <p>Ruang untuk menemukan suara yang terasa seperti kamu.</p>
        <span className="muted xs">V1.0</span>
      </div>
    </aside>
  );
}

function Topbar() {
  const router = useRouter();
  const { name } = useLibrary();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <header className="topbar">
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(q.trim() ? `/jelajahi?q=${encodeURIComponent(q.trim())}` : "/jelajahi");
        }}
      >
        <FiSearch />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari musik, artis, playlist..." />
      </form>
      <div className="top-actions">
        <div style={{ position: "relative" }}>
          <button className="icon-btn" aria-label="Notifikasi" onClick={() => setOpen(!open)}><FiBell /></button>
          {open && (
            <div className="popover">
              <strong>Notifikasi</strong>
              <p className="muted xs">Belum ada notifikasi baru.</p>
            </div>
          )}
        </div>
        <Link href="/profil" className="avatar">{initials || "AG"}</Link>
      </div>
    </header>
  );
}

function Player() {
  const { current, playing, time, duration, volume, toggle, next, prev, seek, setVolume } = usePlayer();
  return (
    <footer className="player">
      <div className="player-left">
        <Thumb />
        <div>
          <div className="song-title">{current.title}</div>
          <div className="muted xs">{current.artist}</div>
        </div>
      </div>
      <div className="player-mid">
        <button className="icon-btn ghost" onClick={prev} aria-label="Sebelumnya"><FiSkipBack /></button>
        <button className="icon-btn round big" onClick={toggle} aria-label={playing ? "Jeda" : "Putar"}>{playing ? <FiPause /> : <FiPlay />}</button>
        <button className="icon-btn ghost" onClick={next} aria-label="Berikutnya"><FiSkipForward /></button>
        <input className="range seekbar" type="range" min={0} max={duration || 1} step={0.1} value={time} onChange={(e) => seek(Number(e.target.value))} aria-label="Posisi lagu" />
      </div>
      <div className="player-right">
        <span className="muted xs">{fmt(time)} / {fmt(duration)}</span>
        <button className="icon-btn ghost" onClick={() => setVolume(volume ? 0 : 0.7)} aria-label="Volume">{volume ? <FiVolume2 /> : <FiVolumeX />}</button>
        <input className="range vol" type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label="Volume" />
      </div>
    </footer>
  );
}

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main-col">
        <Topbar />
        <main className="content">{children}</main>
      </div>
      <Player />
    </div>
  );
}
