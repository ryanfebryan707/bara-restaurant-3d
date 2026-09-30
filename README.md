# BARA — Kitchen & Grill

Situs restoran berbahasa Indonesia dengan efek perspektif 3D, dibuat oleh **Moch Rizky Febryanto**.

**Website publik:** https://ryanfebryan707.github.io/bara-restaurant-3d/

## Fitur

- Sajian utama mengambang dengan perspektif 3D; mendukung penunjuk, sentuhan, dan tombol panah.
- Tiga pilihan sajian utama dan sembilan menu dengan filter kategori.
- Detail hidangan, komposisi, harga Rupiah, dan informasi alergen dalam dialog yang mendukung keyboard.
- Navigasi responsif, FAQ, mode gerakan minimal, dan tombol jeda animasi.
- Gambar WebP dan font Manrope disimpan lokal; tidak memakai layanan font atau gambar eksternal.
- HTML semantik, metadata, favicon, halaman 404, dan tautan yang cocok untuk subdirektori GitHub Pages.
- Server dan build menggunakan Node.js bawaan, tanpa dependensi produksi.

## Jalankan di komputer

Gunakan Node.js 22 atau lebih baru.

```bash
npm ci
npm start
```

Buka `http://localhost:3000`. Perintah `npm run dev` mengaktifkan pemantauan perubahan server. Muat ulang halaman untuk melihat perubahan HTML/CSS/JavaScript.

```bash
npm run check
npm run build
npm run preview
```

Build menyalin hanya berkas publik ke folder `dist/`. Server hanya menyajikan halaman dan aset publik; berkas konfigurasi dan kode server tidak dapat diakses melalui URL.

## Struktur

| Berkas | Fungsi |
| --- | --- |
| `index.html` | Konten utama, menu, navigasi, FAQ, dan dialog |
| `style.css` | Desain responsif, perspektif 3D, dan animasi |
| `script.js` | Filter menu, detail hidangan, navigasi, dan kontrol 3D |
| `assets/` | Tiga gambar sajian, font lokal, dan lisensi font |
| `server.mjs` | Server HTTP Node.js untuk penggunaan lokal atau hosting Node.js |
| `scripts/build.mjs` | Build aset statis untuk produksi |
| `scripts/validate.mjs` | Validasi berkas lokal, anchor, dan target DOM |

## GitHub Pages

Situs diterbitkan dari cabang **main**, folder **/ (root)**. Push berikutnya ke `main` memicu publikasi ulang otomatis oleh GitHub Pages. Jalankan `npm run check` dan `npm run build` sebelum push.

GitHub Pages menjalankan HTML/CSS/JavaScript statis. Node.js dipakai untuk pengembangan dan build, serta bisa dijalankan di hosting yang mendukung Node.js. GitHub Pages tidak menjalankan `server.mjs` atau backend Node.js.

## Ubah nama dan menu

1. Ubah nama, teks, harga yang tampil, dan daftar hidangan dalam `index.html`.
2. Sesuaikan informasi hidangan dalam objek `dishes` di `script.js`, termasuk harga numerik, bahan, alergen, dan gambar.
3. Ganti warna melalui variabel pada `:root` di `style.css`.
4. Simpan gambar pengganti di `assets/` dengan nama yang sesuai, lalu jalankan `npm run check` dan `npm run build` sebelum push.

## Status konten

**BARA adalah merek konsep. Nama hidangan, resep, dan harga merupakan contoh.** Informasi alergen bukan jaminan resep restoran sebenarnya. Konfirmasikan resep serta kontak silang dengan pengelola restoran sebelum digunakan untuk operasional.

Situs tidak mengirim pesanan, menerima pembayaran, atau membuat reservasi. Tidak ada alamat, nomor telepon, ulasan pelanggan, maupun jam operasional fiktif yang ditampilkan. Pemesanan/reservasi perlu dihubungkan ke layanan operasional yang benar jika diminta kemudian.

Gambar sajian dibuat khusus menggunakan image generation. Font Manrope berasal dari repositori resmi Google Fonts dan menggunakan SIL Open Font License; lisensi lengkap ada di `assets/FONT-LICENSE.txt`.

## Brief aset

Ketiga gambar memakai prompt fotografi makanan premium, tampak atas, piring bundar utuh, latar transparan, pencahayaan hangat, tanpa teks atau antarmuka: (1) ribeye panggang iris dengan kentang, rosemary, dan saus; (2) dua paha ayam panggang dengan kentang dan garnish hijau; (3) Basque cheesecake dengan saus berry. Hasil disimpan sebagai WebP 1024 × 1024 dengan alpha.
