# MMG · My Music Gue

Website musik dinamis — Next.js 14 (App Router) + TypeScript + react-icons.

## Menjalankan
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Menambah / mengganti musik
1. Taruh file audio (mp3/wav/ogg) di `public/music/`.
2. Edit array `songs` di `lib/data.ts` (`src: "/music/nama-file.mp3"`, `duration` dalam detik).
File `.wav` di folder itu hanyalah nada contoh — ganti dengan lagu kamu.

## Mengganti logo
Timpa `public/logo.svg` (atau ubah `src` di `components/Shell.tsx` jika pakai PNG).

## Fitur
- Player global (putar/jeda, next/prev, seek, volume) tetap jalan antar halaman
- Pencarian di topbar + filter genre/suasana/aktivitas di Jelajahi
- Simpan lagu, buat/hapus playlist, tambah lagu ke playlist, edit nama profil (disimpan di localStorage)
"# MyMusicGue" 
