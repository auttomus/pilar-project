# PILAR Frontend Application

Modul ini merupakan bagian antarmuka pengguna (*Frontend*) dari sistem PILAR. Dibangun menggunakan pustaka **React.js** dan lingkungan kompilasi **Vite** untuk memberikan performa memuat yang luar biasa cepat dan *Hot Module Replacement* (HMR) yang mulus selama masa pengembangan.

## Tumpukan Teknologi (*Tech Stack*)

*   **Pustaka Inti**: React 18, TypeScript
*   **Manajemen Rute**: React Router DOM
*   **Styling**: Tailwind CSS (Versi 4)
*   **Ikonografi**: Lucide React
*   **Alat Kompilasi**: Vite

## Struktur Direktori

```text
frontend/
├── public/               # Berkas statis (favicon, gambar, aset publik)
├── src/                  # Direktori utama kode sumber aplikasi
│   ├── components/       # Komponen UI yang dapat digunakan kembali (Navbar, Slider, dll)
│   ├── config/           # Konfigurasi variabel seperti konfigurasi Endpoint API
│   ├── hooks/            # Logika kustom React (Custom Hooks) pemisah logika & tampilan
│   ├── page/             # Komponen level halaman (LandingPage, QuestiongPage, StatisticPage)
│   ├── App.tsx           # Manajer rute (Routing) utama
│   └── main.tsx          # Titik masuk eksekusi antarmuka
├── package.json          # Manifest dependensi dan skrip Node
└── vite.config.ts        # Konfigurasi kompilator Vite
```

## Panduan Pengembangan Lokal

Walaupun aplikasi dirancang untuk berjalan di dalam Docker, eksekusi secara lokal seringkali lebih disukai untuk pengembangan antarmuka (UI).

1.  **Instalasi Dependensi**
    Kami merekomendasikan `pnpm` sebagai pengelola paket utama.
    ```bash
    npm install -g pnpm
    pnpm install
    ```

2.  **Menjalankan Lingkungan Pengembangan**
    ```bash
    pnpm run dev
    ```
    Perintah ini akan memulai server Vite. Antarmuka dapat diakses di `http://localhost:5173`. Perubahan sekecil apapun pada kode akan langsung terlihat pada peramban web tanpa perlu memuat ulang secara manual.

## Konvensi Kode (*Code Convention*)

*   **Pemisahan Tanggung Jawab (Separation of Concerns)**: Logika pengambilan data (*data fetching*) dan kalkulasi tidak boleh digabungkan dalam komponen UI. Seluruh operasi eksternal ditangani melalui `Custom Hooks` di dalam folder `/hooks`.
*   **Gaya Responsif**: Setiap tampilan wajib mengaplikasikan pendekatan *Mobile-First*. Gunakan prefiks bawaan Tailwind (seperti `md:` dan `lg:`) untuk menyesuaikan antarmuka di layar gawai yang lebih besar.
