"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { songs, GENRES, MOODS, ACTIVITIES } from "@/lib/data";
import { PageHead, SectionHead, SongCard } from "@/components/ui";

function Content() {
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");
  const [act, setAct] = useState("");

  const result = songs.filter(
    (s) =>
      (!genre || s.genre === genre) &&
      (!mood || s.mood === mood) &&
      (!act || s.activity === act) &&
      (!q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q))
  );
  const active = [genre, mood, act, q && `"${q}"`].filter(Boolean) as string[];
  const reset = () => { setGenre(""); setMood(""); setAct(""); };

  const Sel = ({ label, value, set, opts, all }: { label: string; value: string; set: (v: string) => void; opts: string[]; all: string }) => (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => set(e.target.value)}>
        <option value="">{all}</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );

  return (
    <>
      <PageHead eyebrow="TEMUKAN / 02" title="Jelajahi musik" sub="Suara baru untuk suasana yang kamu cari." />
      <div className="card filters">
        <div className="grid-3">
          <Sel label="Genre" value={genre} set={setGenre} opts={GENRES} all="Semua genre" />
          <Sel label="Suasana" value={mood} set={setMood} opts={MOODS} all="Semua suasana" />
          <Sel label="Aktivitas" value={act} set={setAct} opts={ACTIVITIES} all="Semua aktivitas" />
        </div>
        <div className="filter-active">
          <span className="eyebrow">FILTER AKTIF</span>
          {active.length ? active.map((a) => <span className="chip" key={a}>{a}</span>) : <span className="chip">Semua musik</span>}
          <button className="link-accent ghost" onClick={reset}>Atur ulang</button>
        </div>
      </div>
      <div className="section-head">
        <h2>Hasil pilihan</h2>
        <span className="muted xs">{result.length} lagu ditemukan</span>
      </div>
      {result.length ? (
        <div className="grid-4">{result.map((s) => <SongCard key={s.id} song={s} full queue={result.map((r) => r.id)} />)}</div>
      ) : (
        <div className="card empty">Tidak ada lagu yang cocok. Coba atur ulang filter.</div>
      )}
    </>
  );
}

export default function Jelajahi() {
  return <Suspense fallback={null}><Content /></Suspense>;
}
