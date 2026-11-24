"use client";
import Link from "next/link";
import { FiCompass } from "react-icons/fi";
import { songs, artists } from "@/lib/data";
import { useLibrary } from "@/components/Providers";
import { Cover, SectionHead, SongCard, SongRow, Thumb, Waveform, queueAll } from "@/components/ui";

export default function Beranda() {
  const { name, playlists } = useLibrary();
  const first = name.split(" ")[0];
  const trending = [songs[1], songs[2], songs[3], songs[4]];
  return (
    <>
      <section className="hero">
        <div className="hero-main">
          <div className="eyebrow">SELAMAT DATANG KEMBALI / {first.toUpperCase()}</div>
          <h1 className="hero-title">
            Setiap <span className="hl">rasa</span> punya <span className="hl">suara</span>.
          </h1>
          <p className="sub">Mulai dari yang familiar. Temukan sesuatu yang baru di antaranya.</p>
          <Link href="/jelajahi" className="btn primary"><FiCompass /> Jelajahi musik</Link>
        </div>
        <div className="hero-side">
          <div className="eyebrow">MMG / FREKUENSI HARI INI</div>
          <Waveform bars={34} animated />
          <div className="eyebrow">01 — TEMUKAN IRAMAMU</div>
        </div>
      </section>

      <SectionHead title="Lagu terakhir diputar" href="/jelajahi" link="Lihat semua" />
      <div className="grid-4">
        {songs.slice(0, 4).map((s) => <SongCard key={s.id} song={s} queue={queueAll} />)}
      </div>

      <div className="two-col">
        <div>
          <SectionHead title="Sedang tren" href="/jelajahi" link="Jelajahi" />
          <div className="card list">
            {trending.map((s, i) => <SongRow key={s.id} song={s} index={i + 2} queue={queueAll} />)}
          </div>
        </div>
        <div>
          <SectionHead title="Artis populer" href="/profil" link="Lihat profil" />
          <div className="card artists">
            {artists.map((a) => (
              <Link key={a} href={`/jelajahi?q=${a}`} className="artist">
                <Cover label="ARTIS" round />
                <strong>{a}</strong>
                <span className="muted xs">Artis</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SectionHead title="Playlist rekomendasi" href="/koleksi" link="Buka koleksi" />
      <div className="grid-3">
        {playlists.slice(0, 3).map((p) => (
          <Link key={p.id} href="/koleksi" className="card mini-pl">
            <Thumb />
            <div>
              <div className="song-title">{p.name}</div>
              <div className="muted xs">{p.songIds.length} lagu · {p.owner}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
