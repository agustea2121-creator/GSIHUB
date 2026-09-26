# GSIHUB – Perumahan Griya Sanding Indah

Pusat Layanan & Informasi Warga  
**Nilai Inti:** Harmonis · Transparan · Kekeluargaan

---

## Struktur Project

```
gsihub/
├── index.html          # Website utama (publik)
├── admin.html          # Dashboard Admin RW (full access)
├── rt.html             # Dashboard User RT (terbatas)
├── css/
│   └── custom.css
├── js/
│   ├── data.js         # Shared data layer (localStorage)
│   └── main.js         # Logic halaman utama
├── assets/             # Siap isi gambar lokal
└── README.md
```

## Cara Menjalankan

1. Extract ZIP
2. Buka `index.html` di browser (disarankan pakai server lokal)
3. Atau:
   ```bash
   python -m http.server 8080
   ```
   Lalu buka http://localhost:8080

## Fitur Utama

### Website Publik (`index.html`)
- Top bar hemat ruang: Marquee + Jam + Imsakiyah + Cuaca
- Hero slider
- Dashboard Kas (chart) – data dari Admin
- Layanan: Iuran, Administrasi, Lapor, Jadwal Ronda
- Berita (dari Admin)
- Peta interaktif (Leaflet) – Muara Sanding, Garut
- Login → redirect ke dashboard

### Dashboard Admin RW (`admin.html`) – FULL
- Kelola Berita (tambah / hapus) → muncul di website
- Kas Masuk / Keluar (tambah transaksi) → update saldo & chart
- Data Iuran (set Lunas / Belum)
- Data Penduduk (tambah / hapus)
- Laporan Warga (ubah status Pending → Diproses → Selesai)
- Running Text (edit pengumuman atas)

### Dashboard User RT (`rt.html`) – TERBATAS
- Lihat data warga
- Status iuran
- Daftar laporan
- **Tidak bisa** edit berita, kas, atau running text

## Sinkronisasi Data
Semua data disimpan di **localStorage** browser.  
Perubahan di Admin/RT langsung terlihat di halaman utama (refresh / tab lain).

## Login Demo
- **User RT** / **Admin RW**: isi username & password apa saja → masuk dashboard
- Tidak ada autentikasi sungguhan (frontend demo)

## Teknologi
HTML5, Tailwind CSS, Vanilla JS, Chart.js, Swiper, Leaflet, Lucide Icons  
API: Aladhan (sholat), Open-Meteo (cuaca)

---
© 2026 GSIHUB – Perumahan Griya Sanding Indah
