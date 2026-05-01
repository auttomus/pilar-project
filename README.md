# PILAR (Pilihan Arah & Rekomendasi)

Selamat datang di repositori resmi **PILAR**, sebuah sistem penunjang keputusan (Decision Support System) yang dirancang untuk memetakan kecenderungan kognitif dan merekomendasikan lintasan akademik atau karir berdasarkan pemodelan matriks RIASEC (Holland Codes).

## Arsitektur Sistem

Proyek ini dibangun menggunakan arsitektur modern yang memisahkan antarmuka pengguna (*Frontend*) dengan logika pemrosesan data (*Backend*), serta dikemas menggunakan teknologi kontainerisasi untuk memastikan keandalan di berbagai lingkungan *deployment*.

* **Frontend**: React.js, Vite, TailwindCSS
* **Backend**: Python, FastAPI, SQLModel
* **Database**: MySQL 8.0
* **Infrastruktur**: Docker & Docker Compose

## Struktur Repositori

```text
website-pak-karma/
├── backend/          # Berisi seluruh logika REST API, ORM, dan mesin komputasi (FastAPI)
├── frontend/         # Berisi antarmuka pengguna interaktif (React & Vite)
├── database/         # Berisi skema awal (Data Seeding) untuk inisialisasi MySQL
├── docker-compose.yml# Konfigurasi orkestrasi kontainer
└── README.md         # Dokumentasi utama (Berkas ini)
```

## Prasyarat Lingkungan

Sebelum menjalankan aplikasi, pastikan sistem Anda telah memiliki:

1. **Docker** (v24.0.0 atau lebih baru)
2. **Docker Compose** (v2.20.0 atau lebih baru)
3. **Git**

## Panduan Instalasi & Eksekusi

Proyek ini dirancang agar dapat berjalan dengan satu perintah operasional melalui Docker.

1. **Kloning Repositori**

   ```bash
   git clone <url-repositori>
   cd website-pak-karma
   ```
2. **Konfigurasi Variabel Lingkungan (*Environment Variables*)**
   Secara bawaan, sistem akan membaca file `.env.example` yang tersedia di masing-masing direktori. Untuk penyesuaian khusus, Anda dapat menyalin file tersebut:

   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
3. **Menjalankan Sistem**
   Jalankan perintah berikut untuk membangun (*build*) seluruh citra (*image*) dan menyalakan kontainer:

   ```bash
   docker compose up -d --build
   ```
4. **Akses Layanan**
   Setelah semua kontainer berstatus *Healthy*, sistem dapat diakses melalui:

   * **Antarmuka Pengguna (Frontend)**: [http://localhost:5173](http://localhost:5173)
   * **Layanan API (Backend)**: [http://localhost:8000](http://localhost:8000)
   * **Dokumentasi API Terbuka (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Operasi Lanjutan

Untuk menghapus seluruh data yang ada di *database* dan mengembalikan sistem ke kondisi awal (sesuai *seed* data), jalankan:

```bash
docker compose down -v
docker compose up -d --build
```

*(Peringatan: Perintah ini bersifat destruktif dan akan menghapus seluruh data partisipan yang telah terekam).*

---

*Dokumentasi ini dikelola secara internal untuk keperluan pengembangan dan pemeliharaan Sistem PILAR.*
