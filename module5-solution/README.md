# Module 5 - Solusi Tugas

## Deskripsi

Folder ini berisi solusi lengkap untuk tugas Module 5, yaitu implementasi fitur restoran dengan:
- **HTML** - Struktur halaman yang semantik
- **CSS** - Desain responsif dengan layout grid modern
- **JavaScript** - Logika interaktif untuk filter dan detail hidangan

## File-file

| File | Deskripsi |
|------|----------|
| `index.html` | Struktur halaman utama dengan header, filter, dan daftar menu |
| `style.css` | Desain responsif dengan warna tema dan animasi |
| `script.js` | Logika JavaScript untuk filter, render menu, dan detail hidangan |
| `README.md` | Dokumentasi folder solusi |

## Fitur

✅ **Filter Kategori** - Filter menu berdasarkan kategori (Pembuka, Hidangan Utama, Penutup)
✅ **Detail Hidangan** - Tampilkan informasi lengkap hidangan saat diklik
✅ **Format Harga Rupiah** - Harga ditampilkan dalam format Rupiah (IDR)
✅ **Desain Responsif** - Tampilan optimal di desktop dan mobile
✅ **Data Makanan** - 6 hidangan dengan kategori, harga, bahan, dan alergen

## Cara Menggunakan

1. Buka file `index.html` di browser
2. Gunakan dropdown filter untuk menyaring menu berdasarkan kategori
3. Klik pada item menu untuk melihat detail lengkap termasuk:
   - Kategori
   - Harga
   - Deskripsi
   - Bahan-bahan
   - Informasi alergen

## Data Menu

Terdapat 6 hidangan dalam database:

### Hidangan Utama
- Ribeye Panggang (Rp 185.000)
- Salmon Asap (Rp 165.000)

### Pembuka
- Bruschetta Tomat (Rp 45.000)
- Sup Ayam Tradisional (Rp 35.000)

### Penutup
- Tiramisu (Rp 55.000)
- Cokelat Lava Cake (Rp 48.000)

## Struktur Kode

### JavaScript Objects

```javascript
const dishes = [
    {
        id: number,
        name: string,
        category: 'appetizer' | 'main' | 'dessert',
        price: number,
        description: string,
        ingredients: string[],
        allergens: string[]
    }
]
```

### Fungsi Utama

- `renderMenu(filteredDishes)` - Render menu ke halaman
- `filterByCategory(category)` - Filter menu berdasarkan kategori
- `showDishDetail(dish)` - Tampilkan detail hidangan
- `formatPrice(price)` - Format harga ke Rupiah
- `getCategoryLabel(category)` - Ubah kategori ke label bahasa Indonesia

## Responsivitas

- **Desktop** - Grid 3 kolom
- **Tablet** - Grid 2 kolom
- **Mobile** - Grid 1 kolom

## Teknologi

- HTML5 semantik
- CSS3 (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (ES6+)
- Intl API untuk format mata uang

---

**Created for BARA Kitchen & Grill Module 5 Task**