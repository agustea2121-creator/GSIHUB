/**
 * GSIHUB Shared Data Layer (localStorage)
 * Data tersinkron antara halaman utama, Admin RW, dan User RT
 */

const STORAGE_KEY = 'gsihub_data_v1';

const DEFAULT_DATA = {
  // Pengaturan RT/RW (bisa diubah Admin)
  settings: {
    rtList: ['01', '02', '03', '04'],
    rwLabel: '01',
    keamananLabel: '24/7'
  },
  // Branding & Logo
  site: {
    brandName: 'GSIHUB',
    tagline: 'Griya Sanding Indah',
    logo: null // base64 atau null = huruf G default
  },
  // Banner hero (slider)
  banners: [
    {
      id: 'BN-1',
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
      title: 'Selamat Datang di GSIHUB',
      subtitle: 'Pusat Layanan & Informasi Warga Perumahan Griya Sanding Indah.',
      badge: 'Harmonis · Transparan · Kekeluargaan',
      cta: 'Lapor RT/RW',
      ctaLink: '#layanan',
      color: 'emerald'
    },
    {
      id: 'BN-2',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
      title: 'Transparansi Keuangan Warga',
      subtitle: 'Pantau kas RT/RW secara real-time. Setiap rupiah dapat dipertanggungjawabkan.',
      badge: '',
      cta: 'Lihat Dashboard Kas',
      ctaLink: '#transparansi',
      color: 'teal'
    },
    {
      id: 'BN-3',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
      title: 'Lingkungan Aman & Asri',
      subtitle: 'Keamanan 24 jam, pos ronda aktif, pengelolaan sampah teratur.',
      badge: '',
      cta: 'Lihat Peta Digital',
      ctaLink: '#peta',
      color: 'cyan'
    }
  ],
  // Pengaturan pembayaran online (fleksibel - Admin bisa tambah/edit/hapus item)
  payment: {
    periodeLabel: 'September 2026',
    ewallet: ['DANA', 'GoPay', 'OVO'],
    qrisNote: 'Scan QRIS / transfer ke rekening di bawah',
    qrisCode: '',
    qrisImage: '',
    bankName: 'BRI',
    bankAccount: '',
    accountName: 'Bendahara RW Griya Sanding Indah',
    items: [
      { id: 'PAY-1', nama: 'Iuran Keamanan', jumlah: 50000, deskripsi: 'Bulanan', aktif: true },
      { id: 'PAY-2', nama: 'Iuran Kebersihan', jumlah: 30000, deskripsi: 'Bulanan', aktif: true }
    ]
  },
  // Kontak darurat SOS
  sos: [
    { id: 'SOS-1', label: 'Satpam', nomor: '0812-3456-7890', icon: 'phone' },
    { id: 'SOS-2', label: 'Damkar', nomor: '113', icon: 'flame' },
    { id: 'SOS-3', label: 'Ambulance', nomor: '118 / 119', icon: 'ambulance' },
    { id: 'SOS-4', label: 'Ketua RW', nomor: '0813-9876-5432', icon: 'user' },
    { id: 'SOS-5', label: 'Ketua RT 01', nomor: '0812-1111-2222', icon: 'user' },
    { id: 'SOS-6', label: 'Polisi', nomor: '110', icon: 'shield' }
  ],
  marquee: [
    'Jadwal Kerja Bakti Hari Minggu Pukul 07.00 WIB di Area Taman',
    'Pengumuman: Pembayaran Iuran Bulan Ini Paling Lambat Tanggal 10',
    'Jadwal Ronda Malam: RT 01 & RT 02 (Shift 22.00 - 02.00)',
    'Rapat Warga Bulanan: Sabtu, 28 September 2026 Pukul 19.30 WIB'
  ],
  kas: {
    totalMasuk: 48750000,
    totalKeluar: 32180000,
    saldo: 16570000,
    bulanan: {
      labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep'],
      masuk: [5200,5100,5400,5300,5500,5600,5450,5700,5800],
      keluar: [3800,3200,4100,2900,3600,3400,3900,3100,3500]
    },
    kategori: {
      labels: ['Keamanan','Kebersihan','Pembangunan','Baksos','Operasional'],
      values: [12000,8500,6500,3200,1980]
    },
    transaksi: [
      { id: 'TRX-001', tgl: '2026-09-20', ket: 'Iuran Keamanan Sept', jenis: 'masuk', jumlah: 16000000 },
      { id: 'TRX-002', tgl: '2026-09-18', ket: 'Gaji Satpam', jenis: 'keluar', jumlah: 4500000 },
      { id: 'TRX-003', tgl: '2026-09-15', ket: 'Perbaikan Jalan Blok B', jenis: 'keluar', jumlah: 2800000 },
      { id: 'TRX-004', tgl: '2026-09-10', ket: 'Iuran Kebersihan Sept', jenis: 'masuk', jumlah: 9600000 }
    ]
  },
  berita: [
    {
      id: 'BR-001',
      judul: 'Kerja Bakti Bersama Bulanan',
      kategori: 'Kegiatan',
      tgl: '2026-09-20',
      isi: 'Seluruh warga RT 01–04 gotong royong membersihkan lingkungan dan menanam pohon di area taman.',
      img: 'https://images.unsplash.com/photo-1517457373958-b7bdd458fd52?w=600&q=80'
    },
    {
      id: 'BR-002',
      judul: 'Rapat Koordinasi Pengurus RT/RW',
      kategori: 'Pengumuman',
      tgl: '2026-09-15',
      isi: 'Pembahasan program kerja semester II dan evaluasi anggaran keamanan serta kebersihan.',
      img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80'
    },
    {
      id: 'BR-003',
      judul: 'Santunan Anak Yatim & Dhuafa',
      kategori: 'Baksos',
      tgl: '2026-09-05',
      isi: 'Kegiatan sosial rutin yang digelar setiap 3 bulan sekali di Balai Warga GSI.',
      img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80'
    }
  ],
  penduduk: [
    { id: 'P-001', nama: 'Budi Santoso', nik: '3205011501750001', noKk: '3205012201200001', tglLahir: '1975-01-15', jk: 'L', wa: '081234567890', blok: 'A-12', rt: '01', rw: '01', alamat: 'Blok A No. 12, Perumahan Griya Sanding Indah', status: 'Aktif', catatan: 'Kepala keluarga' },
    { id: 'P-002', nama: 'Siti Aminah', nik: '3205015204800002', noKk: '3205012201200002', tglLahir: '1980-04-12', jk: 'P', wa: '081298765432', blok: 'B-05', rt: '02', rw: '01', alamat: 'Blok B No. 05, Perumahan Griya Sanding Indah', status: 'Aktif', catatan: '' },
    { id: 'P-003', nama: 'Ahmad Fauzi', nik: '3205011008900003', noKk: '3205012201200003', tglLahir: '1990-08-10', jk: 'L', wa: '081355512345', blok: 'C-18', rt: '03', rw: '01', alamat: 'Blok C No. 18, Perumahan Griya Sanding Indah', status: 'Aktif', catatan: '' },
    { id: 'P-004', nama: 'Dewi Lestari', nik: '3205014502000004', noKk: '3205012201200004', tglLahir: '2000-05-05', jk: 'P', wa: '081277788899', blok: 'D-03', rt: '04', rw: '01', alamat: 'Blok D No. 03, Perumahan Griya Sanding Indah', status: 'Aktif', catatan: '' },
    { id: 'P-005', nama: 'Rudi Hermawan', nik: '3205011805600005', noKk: '3205012201200005', tglLahir: '1960-05-18', jk: 'L', wa: '081211122233', blok: 'A-07', rt: '01', rw: '01', alamat: 'Blok A No. 07, Perumahan Griya Sanding Indah', status: 'Aktif', catatan: 'Lansia' },
    { id: 'P-006', nama: 'Aisyah Putri', nik: '3205016505240006', noKk: '3205012201200001', tglLahir: '2024-05-25', jk: 'P', wa: '081234567890', blok: 'A-12', rt: '01', rw: '01', alamat: 'Blok A No. 12, Perumahan Griya Sanding Indah', status: 'Aktif', catatan: 'Anak / balita' }
  ],
  iuran: [
    { id: 'I-001', blok: 'A-12', nama: 'Budi Santoso', bulan: '2026-09', keamanan: 50000, kebersihan: 30000, status: 'Lunas' },
    { id: 'I-002', blok: 'B-05', nama: 'Siti Aminah', bulan: '2026-09', keamanan: 50000, kebersihan: 30000, status: 'Belum' },
    { id: 'I-003', blok: 'C-18', nama: 'Ahmad Fauzi', bulan: '2026-09', keamanan: 50000, kebersihan: 30000, status: 'Lunas' },
    { id: 'I-004', blok: 'D-03', nama: 'Dewi Lestari', bulan: '2026-09', keamanan: 50000, kebersihan: 30000, status: 'Belum' }
  ],
  laporan: [
    { id: 'GSI-0924', judul: 'Lampu jalan mati Blok C', kategori: 'Infrastruktur', status: 'Diproses', tgl: '2026-09-24' },
    { id: 'GSI-0918', judul: 'Usulan penambahan tempat sampah', kategori: 'Kebersihan', status: 'Selesai', tgl: '2026-09-18' },
    { id: 'GSI-0912', judul: 'Anjing liar di area taman', kategori: 'Keamanan', status: 'Pending', tgl: '2026-09-12' }
  ],
  // Jadwal ronda malam (bisa diedit Admin & User RT)
  ronda: {
    shiftLabel: 'Shift 22.00 – 05.00 WIB',
    items: [
      { id: 'RN-1', hari: 'Senin', tanggal: '2026-09-22', rt: '01', pos: 'Pos A', petugas: 'Pak Budi, Pak Andi' },
      { id: 'RN-2', hari: 'Selasa', tanggal: '2026-09-23', rt: '02', pos: 'Pos B', petugas: 'Pak Rudi, Pak Joko' },
      { id: 'RN-3', hari: 'Rabu', tanggal: '2026-09-24', rt: '03', pos: 'Pos C', petugas: 'Pak Hendra, Pak Agus' },
      { id: 'RN-4', hari: 'Kamis', tanggal: '2026-09-25', rt: '04', pos: 'Pos D', petugas: 'Pak Slamet, Pak Dedi' },
      { id: 'RN-5', hari: 'Jumat', tanggal: '2026-09-26', rt: '01', pos: 'Pos A', petugas: 'Pak Wawan, Pak Eko' },
      { id: 'RN-6', hari: 'Sabtu', tanggal: '2026-09-27', rt: '02', pos: 'Pos B', petugas: 'Pak Tono, Pak Bambang' },
      { id: 'RN-7', hari: 'Minggu', tanggal: '2026-09-28', rt: '03', pos: 'Pos C', petugas: 'Pak Agus, Pak Dedi' }
    ]
  },
  // Pengajuan surat administrasi warga
  surat: [
    // { id, jenis, nama, nik, blok, rt, keperluan, status, tgl, catatanAdmin }
  ],
  // Bukti pembayaran iuran - hanya terlihat Admin (setelah upload oleh warga)
  buktiBayar: [
    // contoh: { id, blok, nama, bulan, jumlah, tgl, img (base64), status: 'Menunggu'|'Disetujui'|'Ditolak' }
  ],
  // Akun login - Admin master default: admin / GSIHUB2026
  users: [
    {
      id: 'U-ADMIN',
      username: 'admin',
      password: 'GSIHUB2026',
      role: 'admin',
      nama: 'Admin RW Master',
      rt: null,
      aktif: true
    }
  ]
};

const SESSION_KEY = 'gsihub_session';

function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function setSession(user) {
  // Jangan simpan password di session
  const safe = { id: user.id, username: user.username, role: user.role, nama: user.nama, rt: user.rt };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function login(username, password) {
  const d = getData();
  if (!d.users) d.users = JSON.parse(JSON.stringify(DEFAULT_DATA.users));
  const user = d.users.find(u =>
    u.username.toLowerCase() === username.toLowerCase() &&
    u.password === password &&
    u.aktif !== false
  );
  if (!user) return { ok: false, msg: 'Username atau password salah' };
  setSession(user);
  return { ok: true, user: { id: user.id, username: user.username, role: user.role, nama: user.nama, rt: user.rt } };
}

function requireAuth(role) {
  const s = getSession();
  if (!s) return false;
  if (role && s.role !== role) return false;
  return s;
}

// Helper baca file gambar → base64 (max ~800KB biar localStorage tidak penuh)
function readImageAsBase64(file, maxWidth = 800) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('File harus berupa gambar'));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('Ukuran gambar maksimal 2 MB'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxWidth) {
          h = Math.round(h * maxWidth / w);
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.onerror = () => reject(new Error('Gagal memuat gambar'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      // Migrasi data lama
      if (!d.buktiBayar) d.buktiBayar = [];
      if (!d.berita) d.berita = DEFAULT_DATA.berita;
      if (Array.isArray(d.penduduk)) d.penduduk = d.penduduk.map(migratePenduduk);
      if (!d.settings) d.settings = JSON.parse(JSON.stringify(DEFAULT_DATA.settings));
      if (!d.settings.rtList) d.settings.rtList = ['01','02','03','04'];
      if (!d.ronda) d.ronda = JSON.parse(JSON.stringify(DEFAULT_DATA.ronda));
      if (!d.ronda.items) d.ronda.items = [];
      if (!d.surat) d.surat = [];
      recomputeKasTotals(d);

      if (!d.site) d.site = JSON.parse(JSON.stringify(DEFAULT_DATA.site));
      if (!d.banners || !d.banners.length) d.banners = JSON.parse(JSON.stringify(DEFAULT_DATA.banners));
      if (!d.payment) d.payment = JSON.parse(JSON.stringify(DEFAULT_DATA.payment));
      if (d.payment.qrisCode === undefined) d.payment.qrisCode = '';
      if (d.payment.qrisImage === undefined) d.payment.qrisImage = '';
      if (d.payment.bankName === undefined) d.payment.bankName = '';
      if (d.payment.bankAccount === undefined) d.payment.bankAccount = '';
      if (d.payment.accountName === undefined) d.payment.accountName = '';
      // Migrasi format lama (keamanan/kebersihan tetap) → items[]
      if (d.payment && !d.payment.items) {
        d.payment.items = [];
        if (d.payment.keamanan != null) {
          d.payment.items.push({ id: 'PAY-1', nama: 'Iuran Keamanan', jumlah: d.payment.keamanan, deskripsi: 'Bulanan', aktif: true });
        }
        if (d.payment.kebersihan != null) {
          d.payment.items.push({ id: 'PAY-2', nama: 'Iuran Kebersihan', jumlah: d.payment.kebersihan, deskripsi: 'Bulanan', aktif: true });
        }
        if (!d.payment.items.length) d.payment.items = JSON.parse(JSON.stringify(DEFAULT_DATA.payment.items));
      }
      if (!d.sos || !d.sos.length) d.sos = JSON.parse(JSON.stringify(DEFAULT_DATA.sos));
      if (!d.users || !d.users.length) {
        d.users = JSON.parse(JSON.stringify(DEFAULT_DATA.users));
      }
      // Pastikan admin master selalu ada
      const hasAdmin = d.users.some(u => u.role === 'admin' && u.username === 'admin');
      if (!hasAdmin) {
        d.users.unshift({
          id: 'U-ADMIN',
          username: 'admin',
          password: 'GSIHUB2026',
          role: 'admin',
          nama: 'Admin RW Master',
          rt: null,
          aktif: true
        });
      }
      return d;
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch event agar halaman lain bisa refresh
  window.dispatchEvent(new CustomEvent('gsihub-data-updated'));
}

function resetData(mode) {
  // mode: 'default' = sample data, 'empty' = kosong total (mulai dari awal)
  localStorage.removeItem(STORAGE_KEY);
  if (mode === 'empty') {
    const empty = JSON.parse(JSON.stringify(DEFAULT_DATA));
    empty.marquee = ['Selamat datang di GSIHUB — silakan lengkapi data melalui Dashboard Admin RW'];
    empty.kas = { totalMasuk: 0, totalKeluar: 0, saldo: 0, bulanan: { labels: [], masuk: [], keluar: [] }, kategori: { labels: [], values: [] }, transaksi: [] };
    empty.berita = [];
    empty.penduduk = [];
    empty.iuran = [];
    empty.laporan = [];
    empty.buktiBayar = [];
    empty.surat = [];
    empty.ronda = { shiftLabel: 'Shift 22.00 – 05.00 WIB', items: [] };
    empty.banners = empty.banners.slice(0, 1);
    // tetap simpan admin master
    empty.users = JSON.parse(JSON.stringify(DEFAULT_DATA.users));
    saveData(empty);
    return empty;
  }
  saveData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
  return getData();
}

function getRTList() {
  const d = getData();
  return (d.settings && d.settings.rtList && d.settings.rtList.length)
    ? d.settings.rtList
    : ['01', '02', '03', '04'];
}

function rtOptionsHtml(selected) {
  return getRTList().map(rt =>
    `<option value="${rt}" ${selected === rt ? 'selected' : ''}>${rt}</option>`
  ).join('');
}

/** Hitung ulang total kas dari daftar transaksi (supaya sinkron) */
function recomputeKasTotals(d) {
  if (!d.kas) {
    d.kas = { totalMasuk: 0, totalKeluar: 0, saldo: 0, transaksi: [], bulanan: { labels: [], masuk: [], keluar: [] }, kategori: { labels: [], values: [] } };
    return d;
  }
  if (!Array.isArray(d.kas.transaksi)) d.kas.transaksi = [];
  let masuk = 0, keluar = 0;
  d.kas.transaksi.forEach(t => {
    const j = Math.abs(Number(t.jumlah) || 0);
    t.jumlah = j; // normalisasi
    if (t.jenis === 'masuk') masuk += j;
    else keluar += j;
  });
  d.kas.totalMasuk = masuk;
  d.kas.totalKeluar = keluar;
  d.kas.saldo = masuk - keluar;
  return d;
}

// Helpers format
function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function formatTgl(str) {
  if (!str) return '-';
  const d = new Date(str);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ===== Toast notifications (clean, non-blocking) =====
function ensureToastContainer() {
  let c = document.getElementById('toastContainer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toastContainer';
    document.body.appendChild(c);
  }
  return c;
}

/**
 * showToast(message, type?, title?)
 * type: 'success' | 'error' | 'info' | 'warn'
 */
function showToast(message, type = 'success', title) {
  const titles = {
    success: 'Berhasil',
    error: 'Gagal',
    info: 'Info',
    warn: 'Perhatian'
  };
  const icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    warn: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
  };
  const c = ensureToastContainer();
  const el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-body">
      <div class="toast-title">${title || titles[type] || 'Notifikasi'}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button type="button" class="toast-close" aria-label="Tutup">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  `;
  el.querySelector('.toast-close').onclick = () => dismissToast(el);
  c.appendChild(el);
  const timer = setTimeout(() => dismissToast(el), type === 'error' ? 5000 : 3500);
  el._timer = timer;
  return el;
}

function dismissToast(el) {
  if (!el || el._dismissing) return;
  el._dismissing = true;
  clearTimeout(el._timer);
  el.classList.add('hide');
  setTimeout(() => el.remove(), 300);
}

// Override alert default untuk UX lebih bersih (opsional di dashboard)
function notify(message, type = 'success', title) {
  showToast(message, type, title);
}

// ===== Usia & kategori penduduk =====
function hitungUsia(tglLahir) {
  if (!tglLahir) return null;
  const lahir = new Date(tglLahir);
  if (isNaN(lahir.getTime())) return null;
  const now = new Date();
  let usia = now.getFullYear() - lahir.getFullYear();
  const m = now.getMonth() - lahir.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < lahir.getDate())) usia--;
  return usia;
}

/** Balita: 0–5 th, Anak: 6–17, Dewasa: 18–59, Lansia: ≥60 */
function kategoriUsia(tglLahir) {
  const usia = hitungUsia(tglLahir);
  if (usia === null) return { label: '—', key: 'unknown', usia: null };
  if (usia <= 5) return { label: 'Balita', key: 'balita', usia };
  if (usia <= 17) return { label: 'Anak', key: 'anak', usia };
  if (usia <= 59) return { label: 'Dewasa', key: 'dewasa', usia };
  return { label: 'Lansia', key: 'lansia', usia };
}

function ringkasanPenduduk(list) {
  const r = { total: list.length, balita: 0, anak: 0, dewasa: 0, lansia: 0, laki: 0, perempuan: 0 };
  list.forEach(p => {
    const k = kategoriUsia(p.tglLahir);
    if (k.key === 'balita') r.balita++;
    else if (k.key === 'anak') r.anak++;
    else if (k.key === 'dewasa') r.dewasa++;
    else if (k.key === 'lansia') r.lansia++;
    if (p.jk === 'L') r.laki++;
    else if (p.jk === 'P') r.perempuan++;
  });
  return r;
}

function migratePenduduk(p) {
  // Normalisasi data lama → struktur lengkap
  return {
    id: p.id || ('P-' + Date.now()),
    nama: p.nama || '',
    nik: p.nik || '',
    noKk: p.noKk || '',
    tglLahir: p.tglLahir || '',
    jk: p.jk || '',
    wa: p.wa || '',
    blok: p.blok || '',
    rt: p.rt || '01',
    rw: p.rw || '01',
    alamat: p.alamat || '',
    status: p.status || 'Aktif',
    catatan: p.catatan || '',
    // kompatibilitas field lama
    kk: p.kk || 1
  };
}

/** Cetak kwitansi / bukti pembayaran sebagai pegangan (PDF via print browser) */
function cetakBuktiPembayaran(buktiId) {
  const d = getData();
  const list = d.buktiBayar || [];
  const b = typeof buktiId === 'object' ? buktiId : list.find(x => x.id === buktiId);
  if (!b) {
    if (typeof showToast === 'function') showToast('Bukti tidak ditemukan', 'error');
    else alert('Bukti tidak ditemukan');
    return;
  }
  const site = d.site || {};
  const brand = site.brandName || 'GSIHUB';
  const tag = site.tagline || 'Perumahan Griya Sanding Indah';
  const statusColor = b.status === 'Disetujui' ? '#059669' : b.status === 'Ditolak' ? '#e11d48' : '#d97706';
  const noKwitansi = 'KW-' + (b.id || '').replace(/\D/g, '').slice(-8) || String(Date.now()).slice(-8);
  const itemsHtml = b.items
    ? `<tr><td colspan="2" style="padding:6px 0;color:#64748b;font-size:12px">Item: ${b.items}</td></tr>`
    : '';
  const imgHtml = b.img
    ? `<div style="margin-top:16px;text-align:center"><p style="font-size:11px;color:#64748b;margin:0 0 6px">Bukti transfer</p><img src="${b.img}" style="max-width:280px;max-height:200px;border:1px solid #e2e8f0;border-radius:8px" /></div>`
    : '';
  const w = window.open('', '_blank');
  if (!w) {
    if (typeof showToast === 'function') showToast('Izinkan pop-up untuk mencetak', 'warn');
    return;
  }
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Kwitansi ${noKwitansi} — ${brand}</title>
<style>
  *{box-sizing:border-box}
  body{font-family:system-ui,-apple-system,sans-serif;color:#0f172a;padding:32px;max-width:640px;margin:0 auto}
  .sheet{border:2px solid #059669;border-radius:12px;padding:28px;position:relative}
  .badge{position:absolute;top:20px;right:20px;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;color:#fff;background:${statusColor}}
  .head{display:flex;align-items:center;gap:12px;border-bottom:2px solid #ecfdf5;padding-bottom:16px;margin-bottom:16px}
  .head img{height:48px;width:auto}
  .head h1{margin:0;font-size:18px;color:#065f46}
  .head p{margin:2px 0 0;font-size:11px;color:#64748b}
  .title{text-align:center;font-size:14px;font-weight:700;letter-spacing:.06em;color:#065f46;margin:8px 0 20px;text-transform:uppercase}
  table{width:100%;border-collapse:collapse;font-size:13px}
  td{padding:8px 0;vertical-align:top}
  td:first-child{color:#64748b;width:38%}
  td:last-child{font-weight:600;text-align:right}
  .total{border-top:2px dashed #cbd5e1;margin-top:8px;padding-top:12px;font-size:16px}
  .total td:last-child{color:#059669;font-size:18px}
  .foot{margin-top:28px;display:flex;justify-content:space-between;gap:24px;font-size:12px;color:#64748b}
  .sign{text-align:center;min-width:140px}
  .sign .line{margin-top:56px;border-top:1px solid #94a3b8;padding-top:6px}
  .note{margin-top:20px;font-size:10px;color:#94a3b8;text-align:center}
  @media print{body{padding:12px}.no-print{display:none}}
</style></head><body>
<div class="sheet">
  <span class="badge">${b.status || 'Menunggu'}</span>
  <div class="head">
    <img src="assets/logo/logo-icon.png" alt="Logo" onerror="this.style.display='none'" />
    <div>
      <h1>${brand}</h1>
      <p>${tag}</p>
      <p>Kwitansi / Bukti Pembayaran · No. ${noKwitansi}</p>
    </div>
  </div>
  <div class="title">Bukti Pembayaran Iuran / Transaksi</div>
  <table>
    <tr><td>Tanggal</td><td>${b.tgl ? (typeof formatTgl === 'function' ? formatTgl(b.tgl) : b.tgl) : '—'}</td></tr>
    <tr><td>Nama</td><td>${b.nama || '—'}</td></tr>
    <tr><td>Blok / No. Rumah</td><td>${b.blok || '—'}</td></tr>
    <tr><td>Periode</td><td>${b.bulan || '—'}</td></tr>
    ${itemsHtml}
    <tr class="total"><td>Jumlah dibayar</td><td>${typeof formatRupiah === 'function' ? formatRupiah(b.jumlah || 0) : ('Rp ' + (b.jumlah || 0))}</td></tr>
  </table>
  ${imgHtml}
  <div class="foot">
    <div class="sign"><div class="line">Yang membayar<br><strong>${b.nama || '—'}</strong></div></div>
    <div class="sign"><div class="line">Mengetahui<br><strong>Pengurus RT/RW</strong></div></div>
  </div>
  <p class="note">Dokumen ini digenerate dari sistem ${brand}. Dapat disimpan sebagai PDF melalui dialog cetak browser (Ctrl+P → Save as PDF).</p>
</div>
<p class="no-print" style="text-align:center;margin-top:20px">
  <button onclick="window.print()" style="padding:10px 20px;background:#059669;color:#fff;border:0;border-radius:8px;font-weight:600;cursor:pointer">Cetak / Simpan PDF</button>
</p>
<script>setTimeout(function(){try{window.print()}catch(e){}},400)<\/script>
</body></html>`);
  w.document.close();
}


/** Cetak Surat Pengantar RW ke Desa / Kelurahan */
function cetakSuratPengantar(suratId) {
  const d = getData();
  const list = d.surat || [];
  const s = typeof suratId === 'object' ? suratId : list.find(x => x.id === suratId);
  if (!s) {
    if (typeof showToast === 'function') showToast('Surat tidak ditemukan', 'error');
    return;
  }
  const site = d.site || {};
  const brand = site.brandName || 'GSIHUB';
  const tag = site.tagline || 'Perumahan Griya Sanding Indah';
  const noSurat = 'SP/' + (s.id || '').replace(/\D/g, '').slice(-6) + '/RW/' + new Date().getFullYear();
  const tglCetak = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const tglAjuan = s.tgl ? (typeof formatTgl === 'function' ? formatTgl(s.tgl) : s.tgl) : tglCetak;
  const w = window.open('', '_blank');
  if (!w) {
    if (typeof showToast === 'function') showToast('Izinkan pop-up untuk mencetak', 'warn');
    return;
  }
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Surat ${noSurat}</title>
<style>
  body{font-family:'Times New Roman',Times,serif;color:#111;padding:40px 48px;max-width:800px;margin:0 auto;font-size:12pt;line-height:1.5}
  .kop{text-align:center;border-bottom:3px double #0f172a;padding-bottom:12px;margin-bottom:4px}
  .kop img{height:56px;margin-bottom:6px}
  .kop h1{margin:0;font-size:14pt;letter-spacing:.04em}
  .kop p{margin:2px 0;font-size:10pt}
  .judul{text-align:center;margin:24px 0 8px;font-size:13pt;font-weight:bold;text-decoration:underline}
  .nosurat{text-align:center;margin:0 0 24px;font-size:11pt}
  .isi{text-align:justify;margin-bottom:12px}
  .data{margin:16px 0 16px 24px}
  .data tr td{padding:3px 8px;vertical-align:top}
  .data tr td:first-child{width:140px}
  .ttd{margin-top:40px;display:flex;justify-content:flex-end}
  .ttd-box{text-align:center;width:220px}
  .ttd-space{height:72px}
  .status-print{font-size:9pt;color:#64748b;margin-top:32px;border-top:1px solid #e2e8f0;padding-top:8px}
  @media print{.no-print{display:none} body{padding:20px}}
</style></head><body>
<div class="kop">
  <img src="assets/logo/logo-icon.png" alt="Logo" onerror="this.style.display='none'" />
  <h1>PENGURUS RW ${brand}</h1>
  <p>${tag}</p>
  <p>Kelurahan / Desa setempat · Kabupaten Garut · Jawa Barat</p>
</div>
<p class="judul">SURAT PENGANTAR</p>
<p class="nosurat">Nomor: ${noSurat}</p>
<p class="isi">Yang bertanda tangan di bawah ini, Ketua RW ${tag}, dengan ini menerangkan bahwa:</p>
<table class="data">
  <tr><td>Nama</td><td>: <strong>${s.nama || '—'}</strong></td></tr>
  <tr><td>NIK</td><td>: ${s.nik || '—'}</td></tr>
  <tr><td>Blok / No. Rumah</td><td>: ${s.blok || '—'}</td></tr>
  <tr><td>RT / RW</td><td>: RT ${s.rt || '—'} / RW 01</td></tr>
  <tr><td>Jenis surat</td><td>: ${s.jenis || 'Surat Pengantar RT/RW'}</td></tr>
  <tr><td>Keperluan</td><td>: ${s.keperluan || '—'}</td></tr>
</table>
<p class="isi">Adalah benar warga kami yang berdomisili di wilayah Perumahan Griya Sanding Indah. Surat ini dibuat sebagai <strong>pengantar ke pihak Desa / Kelurahan</strong> untuk keperluan sebagaimana tersebut di atas.</p>
<p class="isi">Demikian surat pengantar ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.</p>
<div class="ttd">
  <div class="ttd-box">
    <p>${tglCetak}<br>Ketua RW</p>
    <div class="ttd-space"></div>
    <p><strong>( ............................ )</strong><br><span style="font-size:10pt">Pengurus RW ${brand}</span></p>
  </div>
</div>
<p class="status-print">Status pengajuan: ${s.status || '—'} · Diajukan: ${tglAjuan}${s.catatanAdmin ? ' · Catatan: ' + s.catatanAdmin : ''} · Digenerate dari sistem ${brand}</p>
<p class="no-print" style="text-align:center;margin-top:24px;font-family:system-ui,sans-serif">
  <button onclick="window.print()" style="padding:10px 20px;background:#0d9488;color:#fff;border:0;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px">Cetak / Simpan PDF</button>
</p>
<script>setTimeout(function(){try{window.print()}catch(e){}},500)<\/script>
</body></html>`);
  w.document.close();
}
