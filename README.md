# Holding Dashboard (skeleton)

Dashboard ringan, **read-only**, untuk melihat ringkasan semua perusahaan/divisi
di satu tempat — tanpa menyatukan sistem operasional mereka.

## Cara kerja

```
config/companies.json   ← daftar perusahaan + connector mana yang dipakai
connectors/*.js          ← satu file per jenis sistem, isinya: tarik data & rangkum
index.html               ← tampilan, cuma menjumlahkan & menampilkan hasil connector
```

Dashboard **tidak pernah** membaca database perusahaan langsung atau menjalankan
logic akuntansi mereka. Dia cuma memanggil fungsi connector dan menerima objek
ringkasan kecil:

```js
{
  status: "ok" | "stale" | "error",
  lastSynced: "2026-08-06T10:00:00Z",
  metrics: { pendapatan, beban, labaRugi, kas }
}
```

Karena kontraknya cuma bentuk objek ini, mengganti isi satu connector (misal
`inspira-ledger.js` dari data mock ke fetch API asli) **tidak memengaruhi**
connector perusahaan lain ataupun tampilan dashboard.

## Menambah perusahaan baru

1. Tambahkan entri baru di `config/companies.json`
2. Kalau sistemnya beda, bikin file connector baru di `connectors/`
   (copy `generic-export.js` sebagai contoh)
3. Daftarkan connector itu di `CONNECTOR_FNS` dalam `index.html`

Tidak perlu menyentuh kode perusahaan lain sama sekali.

## Menjalankan

Karena `index.html` memuat `config/companies.json` lewat `fetch()`, buka lewat
server lokal (bukan cuma double-click file), misalnya:

```bash
npx serve .
# atau
python3 -m http.server
```

Atau deploy langsung ke GitHub Pages seperti Inspira Ledger.

## Langkah lanjutan

- Ganti mock di tiap connector dengan pemanggilan nyata (endpoint kecil dari
  tiap app, atau file JSON yang di-export terjadwal oleh masing-masing sistem)
- "Lihat Detail" di tiap kartu bisa diarahkan ke URL app perusahaan tersebut
- Kalau makin banyak entitas, `config/companies.json` bisa dipecah per file
  dan digabung saat build, tapi belum perlu di tahap ini
