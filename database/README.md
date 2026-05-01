# Basis Data Sistem PILAR

Direktori ini menaungi seluruh berkas instrumen yang dikhususkan untuk keperluan inisialisasi (*seeding*) dan konstruksi skema awal basis data relasional MySQL pada arsitektur PILAR.

## Struktur Repositori Basis Data

*   `schemas/`: Subdirektori strategis yang berisi sekumpulan skrip SQL. Berkas di dalam direktori ini dirancang untuk dieksekusi secara terotomatisasi oleh layanan kontainer MySQL saat inisiasi perdana (*first initialization*).
    *   **`01_question_db.sql`**: Skrip skema yang bertugas menginisialisasi arsitektur tabel pertanyaan kuesioner psikometri RIASEC beserta data mentah fundamentalnya.
    *   **`02_universitas_db.sql`**: Skrip skema yang memuat dataset referensi program studi (jurusan) pendidikan tinggi dan institusi terkait, mencakup struktur nilai matriks target O*NET yang difungsikan untuk algoritma kecocokan spasial.

## Mekanisme Eksekusi (*Seeding*) Terotomatisasi

Ketika instruksi orkestrasi `docker compose up -d` dieksekusi, layanan `db` akan mendeteksi apakah *volume* persisten `aset_data_mysql` sudah memiliki data yang tervalidasi atau belum. Apabila kondisi volume masih kosong (*fresh setup*), kontainer secara hierarkis akan memuat dan mengeksekusi seluruh berkas berekstensi `.sql` di dalam direktori `schemas/`. 

Secara teknis, direktori lokal ini dipetakan (*mounted*) secara sinkron ke rute internal kontainer pada `/docker-entrypoint-initdb.d`.

## Panduan Modifikasi dan Rekonstruksi

Jika Anda melakukan pembaruan skema atau memodifikasi nilai dataset di dalam berkas `schemas/` dan menghendaki agar sistem mengintegrasikan pembaruan tersebut dari awal, maka siklus inisialisasi ulang harus dipicu dengan menghancurkan *volume* data eksisting.

Jalankan perintah berikut pada terminal:
```bash
docker compose down -v
docker compose up -d --build
```

**Peringatan Konsekuensi Destruktif**:
Perintah di atas akan meruntuhkan seluruh arsitektur basis data yang berjalan dan secara permanen menghapus segala catatan transaksional (termasuk respons analitik partisipan eksisting). Pastikan Anda telah melakukan proksi penyalinan data (*backup*) jika sistem sedang berjalan pada fase produksi.
