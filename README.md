# Birthday Memories — Nopayy

Photobook digital interaktif bergaya editorial romantis, dibuat dengan React dan Vite. Menggunakan aset foto lokal di `public/assets`, sehingga dapat dibuild dan dideploy mandiri di Vercel tanpa bergantung pada project storage Manus.

## Development

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
pnpm preview
```

Hasil produksi berada di `dist/`.

## Deploy ke Vercel

Impor repository ini di Vercel dan gunakan pengaturan berikut (Vercel biasanya mendeteksi Vite otomatis):

- Framework Preset: Vite
- Build Command: `pnpm build`
- Output Directory: `dist`
- Install Command: `pnpm install`

Tidak memerlukan environment variables atau backend.
