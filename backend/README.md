# PILAR Backend API

Modul ini memuat seluruh layanan *backend* (API) untuk aplikasi PILAR. Dibangun menggunakan performa tinggi dari **FastAPI**, arsitektur berbasis komponen ini menangani komputasi matriks RIASEC, algoritma rekomendasi Cosine Similarity, dan manajemen data menggunakan **SQLModel** (gabungan Pydantic & SQLAlchemy).

## Tumpukan Teknologi (*Tech Stack*)

*   **Framework**: FastAPI
*   **Web Server**: Uvicorn
*   **Database ORM**: SQLModel & SQLAlchemy
*   **Driver Database**: PyMySQL & Cryptography
*   **Migrasi Database**: Alembic
*   **Validasi**: Pydantic v2 & Pydantic-Settings

## Struktur Direktori

```text
backend/
├── alembic/              # Konfigurasi dan riwayat migrasi struktur database
├── app/                  # Direktori utama kode sumber aplikasi
│   ├── api/v1/           # Pendefinisian endpoint (Routing)
│   ├── core/             # Konfigurasi inti dan utilitas database
│   ├── models/           # Definisi skema tabel (SQLModel)
│   ├── schemas/          # Definisi skema data keluar-masuk (Pydantic)
│   └── services/         # Algoritma bisnis dan mesin pemrosesan komputasi
├── main.py               # Titik masuk eksekusi (Entry point) aplikasi
└── requirements.txt      # Daftar dependensi Python
```

## Menjalankan Tanpa Docker (Pengembangan Lokal)

Jika Anda ingin menjalankan *backend* tanpa lingkungan Docker (misalnya untuk keperluan *debugging* lokal):

1.  **Persiapan Lingkungan Virtual**
    Pastikan Anda memiliki Python 3.11+. Kami merekomendasikan penggunaan `uv` atau `venv`.
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # Untuk Linux/macOS
    ```

2.  **Instalasi Dependensi**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Menjalankan Server Lokal**
    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```

## Manajemen Database (Alembic)

Sistem migrasi database diatur secara spesifik agar dapat dijalankan secara modular (*per tabel*). Untuk membuat revisi migrasi baru ketika terdapat perubahan model, gunakan perintah:

```bash
TARGET_TABLE=<nama_tabel> alembic revision --autogenerate -m "Pesan revisi"
```
Kemudian eksekusi perubahan ke basis data dengan:
```bash
alembic upgrade head
```

## Dokumentasi API (Swagger)

FastAPI secara otomatis menghasilkan dokumentasi yang interaktif. Anda dapat mengaksesnya dengan menjalankan server dan membuka peramban web pada alamat:
`http://localhost:8000/docs`
