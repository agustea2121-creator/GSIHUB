/**
 * GSIHUB - Main Page Scripts
 */

function initIcons() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Mobile menu
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    const icon = btn.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', menu.classList.contains('hidden') ? 'menu' : 'x');
      initIcons();
    }
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
}

// Modal
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('hidden'); document.body.style.overflow = 'hidden'; initIcons(); }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('hidden'); document.body.style.overflow = ''; }
}
window.openModal = openModal;
window.closeModal = closeModal;

function initModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal.id); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal:not(.hidden)').forEach(m => closeModal(m.id));
  });
}

// Clock
function updateClock() {
  const now = new Date();
  const t = document.getElementById('liveClock');
  const d = document.getElementById('liveDate');
  if (t) t.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  if (d) d.textContent = now.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
}

// Prayer times
async function fetchPrayerTimes() {
  try {
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=-7.2342&longitude=107.8995&method=11`);
    const data = await res.json();
    if (data.code === 200) {
      const t = data.data.timings;
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v.substring(0,5); };
      set('imsakTime', t.Imsak); set('subuhTime', t.Fajr); set('dzuhurTime', t.Dhuhr);
      set('asharTime', t.Asr); set('maghribTime', t.Maghrib); set('isyaTime', t.Isha);

      const prayers = [
        { name: 'Imsak', time: t.Imsak }, { name: 'Subuh', time: t.Fajr },
        { name: 'Dzuhur', time: t.Dhuhr }, { name: 'Ashar', time: t.Asr },
        { name: 'Maghrib', time: t.Maghrib }, { name: 'Isya', time: t.Isha }
      ];
      const now = new Date();
      let next = null;
      for (const p of prayers) {
        const [h, m] = p.time.split(':').map(Number);
        const pd = new Date(now); pd.setHours(h, m, 0, 0);
        if (pd > now) { next = { name: p.name, date: pd }; break; }
      }
      const label = document.getElementById('nextPrayerLabel');
      if (label && next) {
        const diff = Math.floor((next.date - now) / 60000);
        const hrs = Math.floor(diff / 60), mins = diff % 60;
        label.textContent = `${next.name} ${hrs > 0 ? hrs+'j ' : ''}${mins}m`;
      } else if (label) label.textContent = 'Selesai';
    }
  } catch (e) {
    const fb = { imsakTime:'04:20', subuhTime:'04:30', dzuhurTime:'11:50', asharTime:'15:10', maghribTime:'17:50', isyaTime:'19:00' };
    Object.entries(fb).forEach(([id,v]) => { const el = document.getElementById(id); if (el) el.textContent = v; });
  }
}

// Weather
async function fetchWeather() {
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-7.2342&longitude=107.8995&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FJakarta');
    const data = await res.json();
    const c = data.current;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('weatherTemp', Math.round(c.temperature_2m) + '°');
    set('weatherHumidity', c.relative_humidity_2m);
    set('weatherWind', Math.round(c.wind_speed_10m));
    const codes = { 0:'Cerah',1:'Cerah berawan',2:'Berawan',3:'Mendung',45:'Berkabut',51:'Gerimis',61:'Hujan ringan',63:'Hujan',65:'Hujan lebat',80:'Hujan lokal',95:'Badai' };
    set('weatherDesc', codes[c.weather_code] || 'Cerah');
  } catch (e) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('weatherTemp','26°'); set('weatherDesc','Cerah berawan'); set('weatherHumidity','78'); set('weatherWind','8');
  }
}

// Swiper
let heroSwiperInstance = null;
function initSwiper() {
  if (typeof Swiper === 'undefined') return;
  if (heroSwiperInstance) {
    try { heroSwiperInstance.destroy(true, true); } catch (e) {}
  }
  heroSwiperInstance = new Swiper('.heroSwiper', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    effect: 'fade',
    fadeEffect: { crossFade: true }
  });
}

function toggleSos() {
  const p = document.getElementById('sosPanel');
  if (p) p.classList.toggle('hidden');
}
window.toggleSos = toggleSos;

function updatePayTotal() {
  let total = 0;
  document.querySelectorAll('.pay-item-cb:checked').forEach(cb => {
    total += Number(cb.dataset.jumlah) || 0;
  });
  const el = document.getElementById('payTotal');
  if (el) el.textContent = formatRupiah(total);
  return total;
}
window.updatePayTotal = updatePayTotal;

function getSelectedPayItems() {
  const items = [];
  document.querySelectorAll('.pay-item-cb:checked').forEach(cb => {
    const label = cb.closest('label');
    const nama = label?.querySelector('.font-semibold')?.textContent || '';
    items.push({ id: cb.dataset.id, nama, jumlah: Number(cb.dataset.jumlah) || 0 });
  });
  return items;
}

// Charts from data
function initCharts() {
  if (typeof Chart === 'undefined') return;
  const data = getData();

  const barCanvas = document.getElementById('barChart');
  if (barCanvas) {
    new Chart(barCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: data.kas.bulanan.labels,
        datasets: [
          { label: 'Penerimaan', data: data.kas.bulanan.masuk, backgroundColor: 'rgba(16,185,129,0.8)', borderRadius: 6 },
          { label: 'Pengeluaran', data: data.kas.bulanan.keluar, backgroundColor: 'rgba(244,63,94,0.7)', borderRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true, ticks: { callback: v => 'Rp '+v+'rb' } } }
      }
    });
  }

  const donutCanvas = document.getElementById('donutChart');
  if (donutCanvas) {
    new Chart(donutCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: data.kas.kategori.labels,
        datasets: [{
          data: data.kas.kategori.values,
          backgroundColor: ['rgba(16,185,129,0.85)','rgba(20,184,166,0.85)','rgba(6,182,212,0.85)','rgba(251,191,36,0.85)','rgba(148,163,184,0.85)'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } }, cutout: '60%' }
    });
  }
}

// Update UI from data
function renderFromData() {
  const data = getData();
  const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

  // Logo & brand
  if (data.site) {
    setText('siteBrandName', data.site.brandName || 'GSIHUB');
    setText('siteTagline', data.site.tagline || 'Griya Sanding Indah');
    const logoImg = document.getElementById('siteLogoImg');
    // Custom logo dari Admin (jika ada), selain itu tetap logo resmi
    if (logoImg && data.site.logo) logoImg.src = data.site.logo;
  }

  // Hero banners
  const heroSlides = document.getElementById('heroSlides');
  if (heroSlides && data.banners && data.banners.length) {
    const colorMap = {
      emerald: { from: 'from-emerald-900/90', via: 'via-emerald-800/70', accent: 'text-emerald-300', btn: 'bg-emerald-500 hover:bg-emerald-400', badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30', sub: 'text-emerald-100' },
      teal: { from: 'from-teal-900/90', via: 'via-teal-800/70', accent: 'text-teal-300', btn: 'bg-teal-500 hover:bg-teal-400', badge: 'bg-teal-500/20 text-teal-200 border-teal-400/30', sub: 'text-teal-100' },
      cyan: { from: 'from-cyan-900/90', via: 'via-cyan-800/70', accent: 'text-cyan-300', btn: 'bg-cyan-500 hover:bg-cyan-400', badge: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30', sub: 'text-cyan-100' }
    };
    heroSlides.innerHTML = data.banners.map(b => {
      const c = colorMap[b.color] || colorMap.emerald;
      return `<div class="swiper-slide relative">
        <div class="absolute inset-0 bg-gradient-to-r ${c.from} ${c.via} to-transparent z-10"></div>
        <img src="${b.img}" alt="${b.title}" class="w-full h-full object-cover" loading="lazy" />
        <div class="absolute inset-0 z-20 flex items-center">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="max-w-xl">
              ${b.badge ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${c.badge} text-[11px] font-semibold border mb-3"><i data-lucide="heart" class="w-3 h-3"></i> ${b.badge}</span>` : ''}
              <h2 class="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-3">${b.title}</h2>
              <p class="${c.sub} text-sm md:text-base mb-5 max-w-md">${b.subtitle || ''}</p>
              ${b.cta ? `<a href="${b.ctaLink || '#'}" class="inline-flex items-center gap-1.5 px-4 py-2.5 ${c.btn} text-white text-sm font-semibold rounded-xl btn-glow shadow-lg">${b.cta}</a>` : ''}
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
    initSwiper();
  }

  // Payment settings (item dinamis)
  if (data.payment) {
    setText('payPeriodeLabel', (data.payment.periodeLabel || 'Periode berjalan') + ' · centang item yang dibayar');
    setText('payQrisNote', data.payment.qrisNote || 'Scan QRIS / transfer rekening');
    // Gambar QRIS / generate dari kode + rekening (dari Admin)
    const qImg = document.getElementById('payQrisImage');
    const qPh = document.getElementById('payQrisPlaceholder');
    const qrisImgData = (data.payment.qrisImage || '').trim();
    const qCode = (data.payment.qrisCode || '').trim();
    if (qImg && qPh) {
      if (qrisImgData) {
        qImg.src = qrisImgData;
        qImg.classList.remove('hidden');
        qPh.classList.add('hidden');
      } else if (qCode) {
        // Generate QR dari teks kode QRIS (API publik, tanpa API key)
        qImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=' + encodeURIComponent(qCode);
        qImg.classList.remove('hidden');
        qPh.classList.add('hidden');
        qImg.onerror = function () {
          qImg.classList.add('hidden');
          qPh.classList.remove('hidden');
        };
      } else {
        qImg.removeAttribute('src');
        qImg.classList.add('hidden');
        qPh.classList.remove('hidden');
      }
    }
    const qBox = document.getElementById('payQrisCodeBox');
    if (qBox) {
      if (qCode) {
        qBox.classList.remove('hidden');
        setText('payQrisCode', qCode);
      } else qBox.classList.add('hidden');
    }
    const rek = (data.payment.bankAccount || '').trim();
    const rBox = document.getElementById('payRekeningBox');
    if (rBox) {
      if (rek || (data.payment.bankName || '').trim()) {
        rBox.classList.remove('hidden');
        setText('payBankName', data.payment.bankName || '—');
        setText('payBankAccount', rek || '—');
        setText('payAccountName', data.payment.accountName || '—');
      } else rBox.classList.add('hidden');
    }
    const list = document.getElementById('payItemsList');
    const items = (data.payment.items || []).filter(i => i.aktif !== false);
    const bgColors = ['bg-emerald-50 border-emerald-100', 'bg-teal-50 border-teal-100', 'bg-cyan-50 border-cyan-100', 'bg-amber-50 border-amber-100', 'bg-violet-50 border-violet-100'];
    const textColors = ['text-emerald-700', 'text-teal-700', 'text-cyan-700', 'text-amber-700', 'text-violet-700'];
    if (list) {
      list.innerHTML = items.map((item, idx) => `
        <label class="${bgColors[idx % bgColors.length]} rounded-xl p-3 border flex items-center gap-3 cursor-pointer">
          <input type="checkbox" class="pay-item-cb rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" data-id="${item.id}" data-jumlah="${item.jumlah}" checked onchange="updatePayTotal()" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-slate-800">${item.nama}</p>
            <p class="text-[11px] text-slate-500">${item.deskripsi || ''}</p>
          </div>
          <p class="font-bold ${textColors[idx % textColors.length]} shrink-0">${formatRupiah(item.jumlah)}</p>
        </label>
      `).join('') || '<p class="text-sm text-slate-400 text-center py-2">Belum ada item pembayaran. Hubungi Admin.</p>';
    }
    updatePayTotal();
    const ew = document.getElementById('payEwalletBtns');
    if (ew && data.payment.ewallet) {
      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
      ew.innerHTML = data.payment.ewallet.map((name, i) =>
        `<button type="button" class="px-3 py-1.5 ${colors[i % colors.length]} text-white text-xs font-medium rounded-lg">${name}</button>`
      ).join('');
    }
  }

  // SOS contacts
  const sosList = document.getElementById('sosList');
  const footerSos = document.getElementById('footerSosList');
  const iconColor = { phone: 'text-emerald-400', flame: 'text-orange-400', ambulance: 'text-red-400', user: 'text-teal-400', shield: 'text-blue-400' };
  if (data.sos && data.sos.length) {
    const html = data.sos.map(s => {
      const ic = s.icon || 'phone';
      const tel = String(s.nomor).replace(/[^0-9+]/g, '');
      return `<li class="flex items-center justify-between gap-2 py-1 border-b border-slate-50 last:border-0">
        <span class="flex items-center gap-1.5"><i data-lucide="${ic}" class="w-3.5 h-3.5 ${iconColor[ic]||'text-slate-400'}"></i> ${s.label}</span>
        <a href="tel:${tel}" class="font-semibold text-rose-600 hover:underline">${s.nomor}</a>
      </li>`;
    }).join('');
    if (sosList) sosList.innerHTML = html;
    if (footerSos) {
      footerSos.innerHTML = data.sos.map(s => {
        const ic = s.icon || 'phone';
        return `<li class="flex items-center gap-2"><i data-lucide="${ic}" class="w-3.5 h-3.5 ${iconColor[ic]||'text-slate-400'}"></i> ${s.label}: ${s.nomor}</li>`;
      }).join('');
    }
  }

  // Kas summary (hitung ulang dari transaksi agar sinkron Admin)
  if (typeof recomputeKasTotals === 'function') recomputeKasTotals(data);
  setText('kasMasuk', formatRupiah(data.kas.totalMasuk || 0));
  setText('kasKeluar', formatRupiah(data.kas.totalKeluar || 0));
  setText('kasSaldo', formatRupiah(data.kas.saldo || 0));
  setText('kasUpdateLabel', 'Data tersinkron dari Admin RW · Update: ' + new Date().toLocaleDateString('id-ID'));

  // Statistik profil (sinkron data admin)
  const rtList = (data.settings && data.settings.rtList) ? data.settings.rtList : getRTList();
  const penduduk = data.penduduk || [];
  const ring = typeof ringkasanPenduduk === 'function' ? ringkasanPenduduk(penduduk.map(migratePenduduk)) : { total: penduduk.length, lansia: 0 };
  setText('statRT', String(rtList.length));
  setText('statKK', String(ring.total != null ? ring.total : penduduk.length));
  setText('statRW', '1');
  setText('statLansia', String(ring.lansia != null ? ring.lansia : 0));

  // Marquee
  const marquee = document.getElementById('marqueeText');
  if (marquee && data.marquee.length) {
    const items = data.marquee.map(t => `<span class="mx-6 flex items-center gap-2"><i data-lucide="megaphone" class="w-3.5 h-3.5"></i>${t}</span>`).join('');
    marquee.innerHTML = items + items;
  }

  // Jadwal ronda (modal)
  const rondaList = document.getElementById('rondaList');
  if (rondaList && data.ronda) {
    const shiftEl = document.getElementById('rondaShiftLabel');
    if (shiftEl) shiftEl.textContent = data.ronda.shiftLabel || 'Shift malam';
    const today = new Date().toISOString().slice(0, 10);
    const items = data.ronda.items || [];
    rondaList.innerHTML = items.map(r => {
      const isToday = r.tanggal === today;
      return `<div class="flex items-center justify-between p-2.5 rounded-xl ${isToday ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50'}">
        <div>
          <p class="font-semibold text-sm">${r.hari}${r.tanggal ? ', ' + formatTgl(r.tanggal) : ''}${isToday ? ' <span class="text-[10px] text-emerald-600">(Hari ini)</span>' : ''}</p>
          <p class="text-[11px] text-slate-500">RT ${r.rt} · ${r.pos || ''}</p>
        </div>
        <span class="text-xs font-medium text-emerald-600 text-right max-w-[45%]">${r.petugas || '—'}</span>
      </div>`;
    }).join('') || '<p class="text-sm text-slate-400 text-center py-4">Belum ada jadwal ronda.</p>';
  }

  // Berita
  const beritaGrid = document.getElementById('beritaGrid');
  if (beritaGrid) {
    const catColor = { Kegiatan:'emerald', Pengumuman:'teal', Baksos:'amber' };
    beritaGrid.innerHTML = data.berita.slice(0,3).map(b => {
      const c = catColor[b.kategori] || 'slate';
      return `<article class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm card-hover">
        <img src="${b.img}" alt="${b.judul}" class="w-full h-44 object-cover" loading="lazy" />
        <div class="p-5">
          <span class="text-xs font-semibold text-${c}-600 bg-${c}-50 px-2 py-0.5 rounded">${b.kategori}</span>
          <h3 class="font-bold text-slate-800 mt-2 mb-2">${b.judul}</h3>
          <p class="text-sm text-slate-600 line-clamp-2">${b.isi}</p>
          <p class="text-xs text-slate-400 mt-3">${formatTgl(b.tgl)}</p>
        </div>
      </article>`;
    }).join('');
  }
  initIcons();

  // Laporan table
  const laporanBody = document.getElementById('laporanBody');
  if (laporanBody) {
    const statusClass = { Pending:'status-pending', Diproses:'status-process', Selesai:'status-done' };
    laporanBody.innerHTML = data.laporan.map(l => `
      <tr>
        <td class="py-3 font-mono text-xs">#${l.id}</td>
        <td class="py-3">${l.judul}</td>
        <td class="py-3">${l.kategori}</td>
        <td class="py-3"><span class="${statusClass[l.status]||''} px-2.5 py-1 rounded-full text-xs font-medium">${l.status}</span></td>
        <td class="py-3 text-slate-500">${formatTgl(l.tgl)}</td>
      </tr>
    `).join('');
  }
}

// Map - improved
let gsiMapInstance = null;
function initMap() {
  if (typeof L === 'undefined') {
    console.warn('Leaflet belum termuat');
    return;
  }
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  if (gsiMapInstance) {
    try { gsiMapInstance.remove(); } catch (e) {}
    gsiMapInstance = null;
  }

  // Koordinat Perumahan Griya Sanding Indah
  const center = [-7.216023, 107.827762];
  const map = L.map('map', {
    scrollWheelZoom: true,
    zoomControl: true,
    maxZoom: 19
  }).setView(center, 17);
  gsiMapInstance = map;

  // Tile GRATIS tanpa API key (Esri + OSM mirror)
  // Hindari: tile.openstreetmap.org (sering Access blocked)
  // Hindari: basemaps.cartocdn.com tanpa key (API KEY REQUIRED)
  const streets = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 19
    }
  );
  const topo = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 19
    }
  );
  const sat = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 19
    }
  );
  // Cadangan OSM (mirror Jerman — biasanya lebih longgar dari osm.org)
  const osmDe = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  });

  streets.addTo(map);
  L.control.layers(
    {
      'Peta Jalan': streets,
      'Topografi': topo,
      'Satelit': sat,
      'OSM (cadangan)': osmDe
    },
    null,
    { position: 'topright' }
  ).addTo(map);

  const o = (dlat, dlng) => [center[0] + dlat, center[1] + dlng];

  const rtBounds = [
    o(0.0014, -0.0016),
    o(0.0014, 0.0016),
    o(-0.0014, 0.0016),
    o(-0.0014, -0.0016)
  ];
  L.polygon(rtBounds, {
    color: '#059669',
    weight: 2.5,
    fillColor: '#10b981',
    fillOpacity: 0.12,
    dashArray: '6 4'
  }).addTo(map).bindPopup(
    '<b>Perumahan Griya Sanding Indah</b><br>' +
    'Garut, Jawa Barat<br>' +
    '<small>RT 01 – RT 04 · ' + center[0] + ', ' + center[1] + '</small>'
  );

  L.marker(center, {
    icon: L.divIcon({
      className: '',
      html: '<div style="background:#059669;width:22px;height:22px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35)"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 22]
    })
  }).addTo(map).bindPopup(
    '<b>GSIHUB · Griya Sanding Indah</b><br>' +
    'Pusat komunitas warga<br>' +
    '<a href="https://www.google.com/maps?q=' + center[0] + ',' + center[1] + '" target="_blank" rel="noopener">Buka di Google Maps →</a>'
  );

  const markers = [
    { off: [0.0006, -0.0008], title: 'Gerbang Utama', color: '#3b82f6', desc: 'Pintu masuk utama + Pos Satpam' },
    { off: [0.0004, 0.0003], title: 'Pos Ronda A (RT 01–02)', color: '#ef4444', desc: 'Pos keamanan Blok A–B · Shift malam' },
    { off: [-0.0005, -0.0006], title: 'Pos Ronda B (RT 03–04)', color: '#ef4444', desc: 'Pos keamanan Blok C–D · Shift malam' },
    { off: [0.0008, 0.0007], title: 'TPS Blok A', color: '#f59e0b', desc: 'Titik sampah · Angkut: Senin & Kamis' },
    { off: [-0.0007, 0.0005], title: 'TPS Blok C', color: '#f59e0b', desc: 'Titik sampah · Angkut: Selasa & Jumat' },
    { off: [0.0001, -0.0002], title: 'Balai Warga', color: '#10b981', desc: 'Rapat, kegiatan, posko warga' },
    { off: [0.0009, 0.0001], title: 'Taman Bermain', color: '#10b981', desc: 'Area rekreasi & RTH' },
    { off: [-0.0003, 0.0009], title: 'Mushola', color: '#8b5cf6', desc: 'Tempat ibadah warga' },
    { off: [0.0005, -0.0003], title: 'Area RT 01', color: '#0d9488', desc: 'Blok A' },
    { off: [0.0002, 0.0006], title: 'Area RT 02', color: '#0d9488', desc: 'Blok B' },
    { off: [-0.0004, -0.0004], title: 'Area RT 03', color: '#0d9488', desc: 'Blok C' },
    { off: [-0.0008, 0.0008], title: 'Area RT 04', color: '#0d9488', desc: 'Blok D' }
  ];

  markers.forEach(m => {
    const latlng = o(m.off[0], m.off[1]);
    const icon = L.divIcon({
      className: '',
      html: '<div style="background:' + m.color + ';width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35)"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
    L.marker(latlng, { icon })
      .addTo(map)
      .bindPopup('<strong>' + m.title + '</strong><br><span style="font-size:12px;color:#64748b">' + m.desc + '</span>');
  });

  const fixSize = () => { try { map.invalidateSize(); } catch (e) {} };
  setTimeout(fixSize, 150);
  setTimeout(fixSize, 600);
  setTimeout(fixSize, 1500);
  window.addEventListener('resize', fixSize);

  const sec = document.getElementById('peta');
  if (sec && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) fixSize(); });
    }, { threshold: 0.1 });
    io.observe(sec);
  }
}

// Nav highlight
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    links.forEach(l => {
      l.classList.remove('active','text-emerald-700');
      l.classList.add('text-slate-600');
      if (l.getAttribute('href') === '#'+current) {
        l.classList.add('active','text-emerald-700');
        l.classList.remove('text-slate-600');
      }
    });
  });
}

// Forms + pembayaran + bukti transfer
let buktiImgBase64 = null;
let payInfo = { nama: '', blok: '' };

function resetIuranModal() {
  document.getElementById('iuranStep1')?.classList.remove('hidden');
  document.getElementById('iuranStep2')?.classList.add('hidden');
  const f = document.getElementById('buktiFile');
  if (f) f.value = '';
  const prev = document.getElementById('buktiPreview');
  if (prev) prev.classList.add('hidden');
  buktiImgBase64 = null;
  payInfo = { nama: '', blok: '' };
}
window.resetIuranModal = resetIuranModal;

function initForms() {
  document.getElementById('formLoginUserRT')?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('rtUsername')?.value?.trim() || '';
    const password = document.getElementById('rtPassword')?.value || '';
    const errEl = document.getElementById('rtLoginError');
    const res = login(username, password);
    if (!res.ok || res.user.role !== 'rt') {
      if (errEl) {
        errEl.textContent = res.ok ? 'Akun ini bukan User RT. Gunakan Login Admin RW.' : res.msg;
        errEl.classList.remove('hidden');
      }
      return;
    }
    if (errEl) errEl.classList.add('hidden');
    window.location.href = 'rt.html';
  });
  document.getElementById('formLoginAdminRW')?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('adminUsername')?.value?.trim() || '';
    const password = document.getElementById('adminPassword')?.value || '';
    const errEl = document.getElementById('adminLoginError');
    const res = login(username, password);
    if (!res.ok || res.user.role !== 'admin') {
      if (errEl) {
        errEl.textContent = res.ok ? 'Akun ini bukan Admin RW.' : res.msg;
        errEl.classList.remove('hidden');
      }
      return;
    }
    if (errEl) errEl.classList.add('hidden');
    window.location.href = 'admin.html';
  });

  // Step 1 → Step 2 upload bukti
  document.getElementById('btnBayarIuran')?.addEventListener('click', () => {
    const nama = document.getElementById('payNama')?.value?.trim();
    const blok = document.getElementById('payBlok')?.value?.trim();
    if (!nama || !blok) {
      showToast('Isi nama dan blok/no. rumah terlebih dahulu.', 'warn');
      return;
    }
    const selected = getSelectedPayItems();
    if (!selected.length) {
      showToast('Pilih minimal satu item pembayaran.', 'warn');
      return;
    }
    payInfo = { nama, blok, items: selected, total: updatePayTotal() };
    document.getElementById('iuranStep1')?.classList.add('hidden');
    document.getElementById('iuranStep2')?.classList.remove('hidden');
    initIcons();
  });

  // Preview bukti
  document.getElementById('buktiFile')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      buktiImgBase64 = await readImageAsBase64(file);
      const prev = document.getElementById('buktiPreview');
      if (prev) {
        prev.querySelector('img').src = buktiImgBase64;
        prev.classList.remove('hidden');
      }
    } catch (err) {
      showToast(err.message || 'Gagal memuat gambar', 'error');
      e.target.value = '';
    }
  });

  // Kirim bukti → hanya Admin yang lihat
  document.getElementById('btnUploadBukti')?.addEventListener('click', () => {
    if (!buktiImgBase64) {
      showToast('Pilih foto bukti transfer terlebih dahulu.', 'warn');
      return;
    }
    const data = getData();
    if (!data.buktiBayar) data.buktiBayar = [];
    data.buktiBayar.unshift({
      id: 'BYR-' + Date.now().toString().slice(-5),
      blok: payInfo.blok,
      nama: payInfo.nama,
      bulan: new Date().toISOString().slice(0, 7),
      jumlah: updatePayTotal(),
      items: getSelectedPayItems().map(i => i.nama).join(', '),
      tgl: new Date().toISOString().slice(0, 10),
      img: buktiImgBase64,
      status: 'Menunggu'
    });
    saveData(data);
    showToast('Admin akan memverifikasi (ACC). Bukti hanya terlihat Admin.', 'success', 'Bukti terkirim');
    closeModal('modalIuran');
    resetIuranModal();
  });

  document.getElementById('formAdministrasi')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    if (!data.surat) data.surat = [];
    const jenis = document.getElementById('suratJenis')?.value || '';
    const nama = document.getElementById('suratNama')?.value?.trim() || '';
    const nik = document.getElementById('suratNIK')?.value?.trim() || '';
    const blok = document.getElementById('suratBlok')?.value?.trim() || '';
    const rt = document.getElementById('suratRT')?.value || '01';
    const keperluan = document.getElementById('suratKeperluan')?.value?.trim() || '';
    if (!jenis || !nama || !blok || !keperluan) {
      showToast('Lengkapi data pengajuan surat', 'warn');
      return;
    }
    data.surat.unshift({
      id: 'SR-' + Date.now().toString().slice(-6),
      jenis, nama, nik, blok, rt, keperluan,
      status: 'Menunggu',
      tgl: new Date().toISOString().slice(0, 10),
      catatanAdmin: ''
    });
    saveData(data);
    showToast('Pengajuan masuk ke Admin RW untuk diproses & dicetak.', 'success', 'Surat diajukan');
    closeModal('modalAdmin');
    e.target.reset();
  });
  document.getElementById('formLapor')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    const judul = e.target.querySelector('input[type=text]')?.value || 'Laporan baru';
    const kat = e.target.querySelector('select')?.value || 'Lainnya';
    data.laporan.unshift({
      id: 'GSI-' + Date.now().toString().slice(-4),
      judul, kategori: kat, status: 'Pending',
      tgl: new Date().toISOString().slice(0,10)
    });
    saveData(data);
    showToast('Laporan akan muncul di daftar status.', 'success', 'Laporan terkirim');
    closeModal('modalLapor');
    renderFromData();
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initMobileMenu();
  initModals();
  updateClock();
  setInterval(updateClock, 1000);
  fetchPrayerTimes();
  fetchWeather();
  initSwiper();
  renderFromData();
  initCharts();
  initMap();
  initNavHighlight();
  initForms();

  // Listen for data updates from other tabs/pages
  window.addEventListener('gsihub-data-updated', () => {
    renderFromData();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) renderFromData();
  });
});
