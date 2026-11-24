"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiHeart, FiPause, FiPlay, FiPlus } from "react-icons/fi";
import { songs, fmt } from "@/lib/data";
import { useLibrary, usePlayer } from "@/components/Providers";
import { Cover, SectionHead, SongRow, Waveform, queueAll } from "@/components/ui";

export default function DetailLagu() {
  const { id } = useParams<{ id: string }>();
  const song = songs.find((s) => s.id === Number(id));
  const { current, playing, time, duration, play, seek } = usePlayer();
  const { favorites, toggleFav, playlists, addToPlaylist } = useLibrary();
  const [menu, setMenu] = useState(false);
  const [added, setAdded] = useState("");

  if (!song) return <div className="card empty">Lagu tidak ditemukan. <Link href="/jelajahi" className="link-accent">Kembali jelajahi</Link></div>;

  const isCur = current.id === song.id;
  const fav = favorites.includes(song.id);
  const related = songs.filter((s) => s.id !== song.id).sort((a, b) => Number(b.genre === song.genre) - Number(a.genre === song.genre)).slice(0, 4);
  const rows: [string, string][] = [
    ["Artis", song.artist], ["Genre", song.genre], ["Suasana", song.mood], ["Durasi", fmt(song.duration)], ["Aktivitas", song.activity],
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">MUSIK / 04</div>
          <div className="muted xs" style={{ marginTop: 8 }}>Jelajahi / Lagu / {song.title}</div>
        </div>
        <Link href="/jelajahi" className="link-accent"><FiArrowLeft /> Kembali jelajahi</Link>
      </div>

      <section className="card detail">
        <Cover label="SAMPUL ALBUM" />
        <div className="detail-info">
          <div className="eyebrow">DETAIL LAGU / MMG</div>
          <h1 className="detail-title">{song.title}</h1>
          <div className="detail-artist"><span>{song.artist}</span> · {song.year}</div>
          <div className="muted xs">{song.genre} / {song.mood} / {fmt(song.duration)}</div>
          <div className="btn-row">
            <button className="btn primary" onClick={() => play(song.id, queueAll)}>
              {isCur && playing ? <FiPause /> : <FiPlay />} {isCur && playing ? "Jeda" : "Putar"}
            </button>
            <button className={"btn" + (fav ? " fav" : "")} onClick={() => toggleFav(song.id)}><FiHeart /> {fav ? "Disimpan" : "Simpan"}</button>
            <div style={{ position: "relative" }}>
              <button className="btn" onClick={() => setMenu(!menu)}><FiPlus /> Tambahkan playlist</button>
              {menu && (
                <div className="popover left">
                  {playlists.map((p) => (
                    <button key={p.id} className="pop-item" onClick={() => { addToPlaylist(p.id, song.id); setAdded(p.name); setMenu(false); }}>{p.name}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {added && <div className="muted xs" style={{ marginTop: 8 }}>Ditambahkan ke “{added}”.</div>}
          <div className="timeline">
            <div className="eyebrow">GARIS WAKTU AUDIO</div>
            <div className="timeline-row">
              <span className="muted xs">{fmt(isCur ? time : 0)}</span>
              <Waveform bars={44} progress={isCur ? time / duration : 0} onSeek={(p) => { if (!isCur) play(song.id, queueAll); setTimeout(() => seek(p * (isCur ? duration : song.duration)), 50); }} />
              <span className="muted xs">{fmt(isCur ? duration : song.duration)}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="two-col even">
        <div className="card pad">
          <h2>Info lagu</h2>
          {rows.map(([k, v]) => (
            <div className="info-row" key={k}><span className="muted xs">{k}</span><strong>{v}</strong></div>
          ))}
        </div>
        <div className="card pad">
          <h2>Tentang lagu</h2>
          <p className="muted xs" style={{ lineHeight: 1.7 }}>{song.about}</p>
          <div className="skeleton" style={{ width: "100%" }} />
          <div className="skeleton" style={{ width: "78%" }} />
          <div className="skeleton" style={{ width: "96%" }} />
          <div className="skeleton" style={{ width: "55%" }} />
        </div>
      </div>

      <SectionHead title="Lagu terkait" href="/jelajahi" link="Lihat semua" />
      <div className="card list">
        {related.map((s, i) => <SongRow key={s.id} song={s} index={i + 2} queue={queueAll} />)}
      </div>
    </>
  );
}
