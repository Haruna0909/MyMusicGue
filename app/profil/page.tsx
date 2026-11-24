"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiEdit2, FiUser } from "react-icons/fi";
import { useLibrary } from "@/components/Providers";
import { PlaylistCard, SectionHead, Thumb } from "@/components/ui";

const stats = [
  { label: "WAKTU DENGAR", value: "128", unit: "jam", note: "Bulan ini" },
  { label: "LAGU DIPUTAR", value: "386", unit: "", note: "Bulan ini" },
  { label: "ARTIS BARU", value: "24", unit: "", note: "Ditemukan bulan ini" },
];
const genres = [["Indie", 82], ["Pop", 68], ["Elektronik", 45]] as const;
const favArtists = ["Aruna", "Bima", "Nara"];

export default function Profil() {
  const { name, setName, playlists } = useLibrary();
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(name);
  return (
    <>
      <section className="card profile">
        <div className="big-avatar"><FiUser /></div>
        <div style={{ flex: 1 }}>
          <div className="eyebrow">PROFIL PENDENGAR / 05</div>
          {edit ? (
            <input className="input name-input" value={val} autoFocus onChange={(e) => setVal(e.target.value)} />
          ) : (
            <h1 className="h1" style={{ margin: "4px 0" }}>{name}</h1>
          )}
          <div className="muted xs">Mendengarkan sejak 2024 · {playlists.length} playlist tersimpan</div>
        </div>
        <button className="btn" onClick={() => { if (edit) setName(val); else setVal(name); setEdit(!edit); }}>
          <FiEdit2 /> {edit ? "Simpan" : "Edit profil"}
        </button>
      </section>

      <h2 style={{ margin: "26px 0 12px" }}>Statistik mendengarkan</h2>
      <div className="grid-3">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <div className="eyebrow">{s.label}</div>
            <div className="stat-val">{s.value}<small>{s.unit && ` ${s.unit}`}</small></div>
            <div className="muted xs">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="two-col even" style={{ marginTop: 26 }}>
        <div>
          <h2 style={{ marginBottom: 12 }}>Genre favorit</h2>
          <div className="card pad">
            {genres.map(([g, p]) => (
              <div key={g} className="bar-row">
                <div><strong className="xs">{g}</strong><span className="muted xs">{p}%</span></div>
                <div className="bar"><i style={{ width: `${p}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ marginBottom: 12 }}>Artis favorit</h2>
          <div className="card list">
            {favArtists.map((a, i) => (
              <div className="row" key={a}>
                <span className="muted xs num">{String(i + 1).padStart(2, "0")}</span>
                <Thumb />
                <div className="row-info"><strong className="xs">{a}</strong><div className="muted xs">Artis</div></div>
                <Link href={`/jelajahi?q=${a}`} className="row-arrow"><FiArrowUpRight /></Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <SectionHead title="Playlist tersimpan" href="/koleksi" link="Buka koleksi" />
        <div className="grid-3">
          {playlists.slice(0, 3).map((p) => <PlaylistCard key={p.id} pl={p} />)}
        </div>
      </div>
    </>
  );
}
