"use client";
import { useState } from "react";
import { FiPlay, FiPlus } from "react-icons/fi";
import { songs } from "@/lib/data";
import { useLibrary, usePlayer } from "@/components/Providers";
import { PageHead, PlaylistCard, SongRow } from "@/components/ui";
import { LuListMusic } from "react-icons/lu";

export default function Koleksi() {
  const { playlists, createPlaylist, deletePlaylist } = useLibrary();
  const { play } = usePlayer();
  const [sel, setSel] = useState(playlists[0]?.id);
  const [modal, setModal] = useState(false);
  const [nm, setNm] = useState("");
  const cur = playlists.find((p) => p.id === sel) ?? playlists[0];
  const curSongs = cur ? cur.songIds.map((id) => songs.find((s) => s.id === id)!).filter(Boolean) : [];

  return (
    <>
      <PageHead eyebrow="SIMPAN / 03" title="Koleksi kamu" dot="#f472b6" sub="Semua playlist dalam satu ruang dengarkan.">
        <button className="btn primary" onClick={() => setModal(true)}><FiPlus /> Buat playlist</button>
      </PageHead>

      <div className="coll">
        <aside className="card side-list">
          <div className="eyebrow">PLAYLIST KAMU</div>
          {playlists.map((p) => (
            <button key={p.id} className={"pl-item" + (cur?.id === p.id ? " on" : "")} onClick={() => setSel(p.id)}>
              <LuListMusic /> <span>{p.name}</span> <span className="muted">›</span>
            </button>
          ))}
        </aside>

        <div>
          {cur && (
            <>
              <div className="card selected-bar">
                <div>
                  <div className="eyebrow">DIPILIH</div>
                  <strong>{cur.name}</strong>
                  <div className="muted xs">{cur.songIds.length} lagu · {cur.owner}</div>
                </div>
                <button className="btn" disabled={!curSongs.length} onClick={() => play(curSongs[0].id, cur.songIds)}><FiPlay /> Putar</button>
              </div>
              {curSongs.length > 0 && (
                <div className="card list" style={{ marginTop: 14 }}>
                  {curSongs.map((s, i) => <SongRow key={s.id} song={s} index={i + 1} queue={cur.songIds} />)}
                </div>
              )}
            </>
          )}
          <h2 style={{ margin: "26px 0 12px" }}>Semua playlist</h2>
          <div className="grid-3">
            {playlists.map((p) => (
              <PlaylistCard
                key={p.id}
                pl={p}
                selected={p.id === cur?.id}
                onSelect={() => setSel(p.id)}
                onMore={() => { if (confirm(`Hapus playlist "${p.name}"?`)) deletePlaylist(p.id); }}
              />
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal-bg" onClick={() => setModal(false)}>
          <form
            className="card modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => { e.preventDefault(); createPlaylist(nm); setNm(""); setModal(false); }}
          >
            <h2>Buat playlist</h2>
            <input autoFocus className="input" value={nm} onChange={(e) => setNm(e.target.value)} placeholder="Nama playlist" />
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setModal(false)}>Batal</button>
              <button className="btn primary">Simpan</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
