export type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  activity: string;
  duration: number; // detik (label di daftar lagu)
  year: number;
  src: string; // file di /public/music
  about: string;
};

export type Playlist = {
  id: string;
  name: string;
  owner: string;
  songIds: number[];
};

export const GENRES = ["Indie", "Pop", "Elektronik"];
export const MOODS = ["Tenang", "Semangat", "Fokus"];
export const ACTIVITIES = ["Santai", "Belajar", "Olahraga"];

const about =
  "Ruang untuk deskripsi singkat, cerita lagu, atau cuplikan lirik. Edit teks ini di lib/data.ts.";

export const songs: Song[] = [
  { id: 1, title: "Malam di Kota", artist: "Aruna", genre: "Indie", mood: "Tenang", activity: "Santai", duration: 222, year: 2025, src: "/music/malam-di-kota.wav", about },
  { id: 2, title: "Ruang Dengarkan", artist: "Bima", genre: "Elektronik", mood: "Fokus", activity: "Belajar", duration: 248, year: 2025, src: "/music/ruang-dengarkan.wav", about },
  { id: 3, title: "Langit Biru", artist: "Nara", genre: "Pop", mood: "Semangat", activity: "Olahraga", duration: 198, year: 2024, src: "/music/langit-biru.wav", about },
  { id: 4, title: "Sisi Lain", artist: "Kala", genre: "Indie", mood: "Tenang", activity: "Santai", duration: 236, year: 2024, src: "/music/sisi-lain.wav", about },
  { id: 5, title: "Pukul Enam", artist: "Senja", genre: "Pop", mood: "Semangat", activity: "Olahraga", duration: 179, year: 2025, src: "/music/pukul-enam.wav", about },
  { id: 6, title: "Gelombang", artist: "Aruna", genre: "Elektronik", mood: "Fokus", activity: "Belajar", duration: 261, year: 2023, src: "/music/gelombang.wav", about },
  { id: 7, title: "Jeda Sebentar", artist: "Bima", genre: "Indie", mood: "Tenang", activity: "Santai", duration: 214, year: 2023, src: "/music/jeda-sebentar.wav", about },
  { id: 8, title: "Ke Mana Kita", artist: "Nara", genre: "Pop", mood: "Semangat", activity: "Santai", duration: 207, year: 2024, src: "/music/ke-mana-kita.wav", about },
];

export const artists = ["Aruna", "Bima", "Nara", "Kala"];

export const seedPlaylists: Playlist[] = [
  { id: "p1", name: "Koleksi Fokus", owner: "MMG", songIds: [2, 6, 1, 7] },
  { id: "p2", name: "Mix Akhir Pekan", owner: "Untuk kamu", songIds: [3, 5, 8, 4, 1] },
  { id: "p3", name: "Energi Pagi", owner: "MMG", songIds: [5, 3, 8] },
  { id: "p4", name: "Nada Malam", owner: "Aruna", songIds: [1, 6, 7] },
  { id: "p5", name: "Perjalanan Jauh", owner: "Untuk kamu", songIds: [4, 8, 2, 3, 7] },
  { id: "p6", name: "Ruang Tenang", owner: "MMG", songIds: [7, 1, 4] },
];

export const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};
