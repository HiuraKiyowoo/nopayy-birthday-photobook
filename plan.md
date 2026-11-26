# Plan — Birthday Memories Photobook

## Implementasi
React + Vite statis, dengan lima spread yang berisi dua halaman berbeda. Setelah cover, surat dan ucapan menjadi spread pembuka, tiga spread menampilkan pasangan foto, dan spread terakhir berisi penutup. Swipe satu arah membalik satu daun buku 3D; tombol panah desktop melakukan hal yang sama. Dua sisi buku tetap terlihat pada layar HP dengan layout kompak.

## Struktur
`src/main.jsx` menjalankan aplikasi; `src/App.jsx` mendefinisikan lima spread, konten kiri-kanan, gesture, kontrol, dan indikator; `src/styles.css` memuat desain editorial, tekstur kertas, spine, tata letak responsif, dan animasi flip; `public/assets/` memuat aset lokal; `public/manus-routes.json` mendeklarasikan route root.

## Desain
Alternatif: (1) editorial romantis vintage, 0.07; (2) scrapbook pastel playful, 0.06; (3) minimal modern monochrome, 0.05. Pilihan: editorial romantis vintage. Kertas ivory, rose/berry dan emas, serif elegan dengan sans bersih. Objek buku punya dua halaman berhadapan, spine/shadow, dan swipe membalik satu lembar fisik dengan gerak perspektif. Brand: kenang-kenangan personal untuk Nopayy; intim, hangat, abadi. Nada lembut, logotype monogram bintang, warna khas dusty rose.
