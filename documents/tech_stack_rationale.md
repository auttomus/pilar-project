# Landasan Pemilihan Teknologi

Bagian ini merinci alasan di balik pemilihan setiap teknologi yang digunakan dalam pengembangan Sistem PILAR. Pemilihan didasarkan pada prinsip efisiensi, skalabilitas, dan kemudahan pemeliharaan.

## 1. Frontend
*   **React.js**: Dipilih karena arsitektur berbasis komponennya yang memungkinkan penggunaan kembali kode (*code reusability*) dan ekosistem library yang luas. Ini sangat membantu dalam membangun antarmuka kuesioner yang interaktif.
*   **Vite**: Sebagai *build tool* modern, Vite menawarkan kecepatan pengembangan yang jauh lebih tinggi dibandingkan Webpack tradisional, terutama melalui fitur *Hot Module Replacement* (HMR) yang instan.
*   **TypeScript**: Digunakan untuk menambahkan *static typing* pada JavaScript. Hal ini krusial untuk mencegah bug di sisi klien, terutama saat menangani struktur data kompleks seperti pemetaan Program Studi dan skor RIASEC.
*   **TailwindCSS**: Pendekatan *utility-first* memungkinkan pengembangan antarmuka yang estetis dan responsif secara cepat tanpa harus menulis banyak baris CSS kustom yang sulit dipelihara.

## 2. Backend
*   **Python**: Merupakan bahasa standar untuk pemrosesan data dan komputasi ilmiah. Keunggulannya dalam menangani operasi matematika (seperti kalkulasi *Cosine Similarity*) menjadikannya pilihan utama untuk mesin rekomendasi PILAR.
*   **FastAPI**: Dipilih karena performanya yang tinggi (berbasis Starlette dan Pydantic) serta kemampuannya menghasilkan dokumentasi API (Swagger UI) secara otomatis. Hal ini mempercepat integrasi antara Frontend dan Backend.
*   **SQLModel**: Library ini dipilih karena menggabungkan kekuatan SQLAlchemy (ORM) dan Pydantic (validasi data). Ini memungkinkan penggunaan satu model tunggal untuk skema database sekaligus skema validasi API, sehingga mengurangi redundansi kode.

## 3. Database
*   **MySQL**: Sebagai sistem manajemen basis data relasional (RDBMS) yang matang dan stabil. Versi 8.0 mendukung tipe data JSON secara efisien, yang sangat berguna bagi PILAR untuk menyimpan *snapshot* jawaban kuesioner tanpa harus membuat skema tabel yang terlalu kaku.

## 4. Infrastruktur
*   **Docker**: Menjamin konsistensi lingkungan pengembangan (*environment consistency*). Dengan Docker, risiko masalah "berjalan di komputer saya tapi tidak di server" dapat minimalkan.
*   **Docker Compose**: Memungkinkan orkestrasi seluruh layanan (Frontend, Backend, Database) melalui satu file konfigurasi tunggal. Hal ini menyederhanakan proses *deployment* dan *scaling* layanan di masa depan.
