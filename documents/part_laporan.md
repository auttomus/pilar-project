# Perancangan dan Implementasi Sistem Rekomendasi Program Studi Berbasis Algoritma Vektor RIASEC

Penyusunan sistem rekomendasi pendidikan ini merupakan sebuah proses multidisiplin yang mengintegrasikan rekayasa perangkat lunak, ilmu data, dan psikometrik. Untuk mencapai tingkat presisi yang optimal, perancangan sistem ini dibagi ke dalam tiga domain utama: metodologi pengumpulan data empiris, pembangunan infrastruktur teknologi, serta pemodelan matematis algoritma rekomendasi.

## 1. Metodologi Pengumpulan Data dan Pemetaan Program Studi

Tahap fundamental dalam perancangan sistem ini adalah pengumpulan dan pemrosesan data institusi pendidikan tinggi. Untuk memfasilitasi proses pendataan yang terukur dan terstruktur pada fase awal pengembangan, ruang lingkup data dibatasi secara geografis pada wilayah Provinsi Bali. Pembatasan skala ini diimplementasikan secara intensional guna mengeliminasi risiko eskalasi volume data yang tidak terkendali (*data overload*) apabila pemetaan langsung dieksekusi pada seluruh entitas perguruan tinggi di Indonesia.

Proses seleksi menghasilkan 20 institusi pendidikan tinggi di Bali yang dipilih secara strategis untuk memenuhi variasi tipologi perguruan tinggi, yang mencakup Universitas Negeri, Universitas Swasta, Institut, dan Politeknik. Melalui penelusuran dan ekstraksi data secara manual dari portal resmi masing-masing institusi tersebut, kami mengidentifikasi dan memetakan 107 Fakultas yang menaungi total 430 Program Studi.

Setiap entitas program studi yang telah dipetakan selanjutnya melalui tahap kuantifikasi profil minat berdasarkan tipologi RIASEC (Realistic, Investigative, Artistic, Social, Enterprising, Conventional). Mengingat besarnya volume data yang mencakup ratusan entitas program studi, proses anotasi metrik awal diakselerasi menggunakan instrumen Large Language Model (LLM). Model kecerdasan buatan berbasis pemrosesan bahasa alami ini dikonfigurasi melalui rekayasa prompt yang ketat untuk meninjau orientasi kurikulum masing-masing program studi. Output dari proses ini menghasilkan matriks skalar pada rentang 0 hingga 7. Guna mereduksi bias halusinasi model dan memastikan tingkat reliabilitas data, sistem mengeksekusi teknik komputasi ansambel (ensemble computation), di mana nilai final didapatkan melalui agregasi nilai rata-rata dari beberapa iterasi inferensi independen.Pendekatan ini memungkinkan kami mengeksekusi pelabelan data awal secara masif dan terstandarisasi, sebelum himpunan keluaran tersebut kami teruskan pada tahapan inspeksi dan kalibrasi manual untuk mengesahkan presisi serta validitas akhirnya. Berikut adalah representasi skema penyisipan data pada entitas basis data:

```sql
INSERT INTO `fakultas` (`id_fakultas`, `nama_fakultas`, `id_univ`, `r_score`, `i_score`, `a_score`, `s_score`, `e_score`, `c_score`) VALUES
(1,   'Kedokteran', 2, 3.20, 6.90, 0.80, 6.50, 2.10, 5.80),
(2,   'Ekonomi dan Bisnis', 2, 1.40, 4.60, 2.80, 4.80, 6.90, 6.60),
(3,   'Ilmu Budaya', 2, 1.50, 4.80, 6.70, 6.10, 2.40, 1.80),
(4,   'Hukum', 2, 1.00, 6.60, 2.20, 4.80, 6.50, 6.10),
(5,   'Teknik', 2, 6.90, 6.40, 1.80, 1.40, 4.00, 5.50),
```

Rentang skala penilaian yang digunakan didasarkan pada standar metrik O\*NET (*Occupational Information Network*). O\*NET adalah sebuah pangkalan data okupasi komprehensif yang dikembangkan dan dikelola secara berkelanjutan oleh Departemen Tenaga Kerja Amerika Serikat (*U.S. Department of Labor*). Pangkalan data ini menyediakan metrik standar untuk berbagai atribut evaluasi, termasuk kecocokan minat berbasis RIASEC. Standar asli dari O\*NET menggunakan skala nilai yang berkisar dari 1 hingga 7. Namun, dalam komputasi sistem ini, dilakukan modifikasi ekspansi skala menjadi $0$ hingga $7$. Modifikasi batas bawah menjadi nol ini dilakukan secara intensional guna memperlebar variansi jangkauan nilai (*range*) dan mengakomodasi normalisasi komputasi matematis pada tahapan kalkulasi algoritma.

## 2. Sintesis dan Perancangan Instrumen Kuesioner (RIASEC)

Bersamaan dengan proses pemetaan basis data, perancangan antarmuka (*User Interface*) sistem juga mulai dikembangkan. Setelah kerangka visual terbentuk, langkah esensial berikutnya adalah perumusan instrumen asesmen RIASEC yang akan disajikan pada antarmuka.

Item-item pertanyaan pada instrumen asesmen minat ini tidak dikonstruksi secara arbitrer, melainkan disintesis dari dua referensi akademik institusional yang terstandar, yaitu:

1. **Hawaii State Department of Education (Hawaii Public Schools)**
   Dokumen ini digunakan sebagai parameter acuan utama karena instrumen tersebut dipublikasikan secara langsung oleh otoritas pendidikan resmi dan dirancang spesifik untuk diimplementasikan pada populasi siswa di tingkat pendidikan menengah. Hal ini memberikan kerangka dasar pertanyaan yang ekuivalen dan sangat relevan dengan kapasitas kognitif kelompok usia target sistem.
2. **Counseling Services, University of New Orleans**
   Sebagai instrumen komparatif, referensi ini diintegrasikan karena menyajikan variasi butir pertanyaan dari perspektif institusi pendidikan tinggi. Referensi ini memastikan bahwa asesmen memiliki validitas untuk mengukur transisi psikologis dan kesiapan akademik siswa menuju lingkungan universitas.

Proses perancangan instrumen dari kedua sumber tersebut diorkestrasi melalui tahapan struktural. Tahap awal difokuskan pada agregasi dan penyaringan butir pertanyaan untuk mengeliminasi redundansi. Dari tahap ini didapat 60  pertanyaan total, dari 10 pertanyaan bagi setiap metrik RIASEC. Tahap kedua mencakup translasi linguistik secara presisi dari Bahasa Inggris ke dalam Bahasa Indonesia.

Tahap final adalah proses kontekstualisasi. Butir pertanyaan yang telah diterjemahkan dikalibrasi kembali dengan karakteristik sosiokultural, lingkungan belajar, serta parameter pemahaman kognitif siswa SMA dan SMK. Mengingat tujuan absolut dari instrumen ini adalah memfasilitasi pemilihan program studi di jenjang pendidikan tinggi, modifikasi sintaksis dilakukan secara ketat untuk memastikan bahwa setiap pertanyaan secara akurat mengukur probabilitas keberhasilan akademik dan preferensi belajar teoritis di dalam ekosistem perguruan tinggi.

## 3. Rincian Arsitektur Teknologi dan Infrastruktur Sistem PILAR

Setelah konseptualisasi data dan instrumen diselesaikan, tahapan implementasi dilanjutkan dengan pembangunan infrastruktur perangkat lunak. Sistem PILAR dikonstruksi menggunakan tumpukan teknologi terdistribusi yang dirancang untuk menjamin reliabilitas dan skalabilitas operasional.

**1. Ekosistem Antarmuka Pengguna (Frontend)**
Lapisan presentasi sistem beroperasi sebagai *Single Page Application* (SPA) yang dinamis, memanfaatkan jajaran instrumen berikut:

* **React.js:** Bertindak sebagai fondasi pembangun antarmuka pengguna berbasis komponen. Implementasinya krusial untuk mengelola siklus *state* yang fluktuatif serta merender pembaruan *Document Object Model* (DOM) secara asinkron guna mempertahankan fluiditas respons saat iterasi input kuesioner.
* **Vite:** Beroperasi sebagai perkakas kompilasi (*build tool*). Vite mereduksi latensi pengembangan melalui mekanisme *Hot Module Replacement* (HMR) dan memproduksi bundel aset statis yang teroptimasi presisi untuk lingkungan produksi.
* **TypeScript:** Diadopsi sebagai utilitas pengetikan statis (*static typing*). Penggunaannya diwajibkan untuk mendeteksi anomali kompilasi, memastikan integritas tipe data antar komponen, dan mendikte struktur basis kode agar berskala enterprise.
* **TailwindCSS:** Diaplikasikan sebagai kerangka *Cascading Style Sheets* (CSS) berbasis utilitas untuk penataan visual (*styling*) yang responsif dan konsisten secara langsung pada tingkat arsitektur komponen.
* **React Router DOM:** Mengorkestrasi sistem navigasi rute klien. Modul ini memfasilitasi transisi tampilan spasial tanpa memicu muat ulang dokumen secara absolut.

**2. Mesin Komputasi dan Layanan API (Backend)**
Logika komputasi sistem dan arsitektur *Representational State Transfer* (REST) API diproses seluruhnya oleh ekosistem komputasi Python:

* **Python:** Bahasa pemrograman utama untuk penggerak inti. Kapabilitas pustaka saintifiknya menjadikannya instrumen absolut untuk mengeksekusi kalkulasi vektor multi-dimensi.
* **FastAPI:** Kerangka kerja berkinerja tinggi untuk membangun *endpoint* API. Kerangka ini beroperasi dengan eksekusi asinkron dan secara otomatis menggenerasi skema *OpenAPI* untuk standarisasi interkoneksi *frontend*.
* **SQLModel:** Berfungsi sebagai antarmuka *Object-Relational Mapping* (ORM) yang memvalidasi struktur input secara ketat, menerjemahkan model entitas Python ke skema relasional, dan menjamin interaksi basis data yang resisten terhadap kerentanan injeksi SQL.
* **Uvicorn:** Berperan sebagai peladen web *Asynchronous Server Gateway Interface* (ASGI) untuk menangani beban konkurensi koneksi HTTP secara efisien.
* **Alembic:** Instrumen manajerial migrasi skema basis data untuk memfasilitasi modifikasi arsitektur tabel secara inkremental tanpa degradasi data persisten.
* **PyMySQL & Cryptography:** Ekstensi *driver* komunikasi basis data ke *engine* MySQL berserta utilitas enkripsi transmisi untuk menjamin integritas paket data.

**3. Manajemen Basis Data (Database)**
Infrastruktur repositori data dikelola menggunakan sistem relasional untuk mempertahankan prinsip kepatuhan transaksional (*ACID compliance*):

* **MySQL 8.0:** Bertindak sebagai unit penyimpan data persisten sentral. Mengelola tabel relasional identitas pengguna, matriks respons komputasi, dan metrik kuantitatif program studi O\*NET. Sistem ini digunakan atas dasar kapabilitas throughput yang tinggi dalam mengeksekusi kueri agregasi pembacaan secara simultan.

**4. Infrastruktur dan Orkestrasi Kontainer (DevOps)**
Distribusi arsitektur *microservices* dienkapsulasi menggunakan virtualisasi tingkat sistem operasi:

* **Docker dan Docker Compose:** Mengisolasi seluruh dependensi sistem ke dalam kontainer standar. Baris instruksi pada manifes `docker-compose.yml` mengorkestrasi seluruh sub-layanan ke dalam satu jaringan virtual paralel, mengeliminasi determinisme lingkungan perangkat keras lokal, dan memastikan konsistensi eksekusi di berbagai *server node*.

## 4. Pemodelan Matematis Algoritma Rekomendasi Berbasis Vektor RIASEC

Komponen komputasi inti dari fungsionalitas sistem ini bertumpu pada algoritma Data Science yang mentransformasi himpunan input kuesioner menjadi matriks kecocokan probabilitas. Hal ini dieksekusi melalui pemodelan matematika ruang vektor.

**1. Definisi Ruang Vektor Pengguna dan Program Studi**
Sistem beroperasi di dalam konseptualisasi ruang vektor enam dimensi, dengan masing-masing sumbu merepresentasikan tipologi Holland Codes (RIASEC). Antarmuka mengumpulkan parameter input melalui kuesioner yang berisi 10 pertanyaan independen untuk setiap dimensi kepribadian $i \in \{R, I, A, S, E, C\}$.

Setiap butir observasi, direpresentasikan sebagai $q_{i,j}$ (dengan $j$ sebagai urutan indeks $1$ hingga $10$), memiliki konstrain nilai $0 \le q_{i,j} \le 100$. Akumulasi linear pada setiap dimensi (direpresentasikan sebagai $S_i$) didapatkan dengan menjumlahkan array respons melalui persamaan $S_i = \sum_{j=1}^{10} q_{i,j}$, menghasilkan rentang skalar $0 \le S_i \le 1000$.

Secara independen, sistem menarik Vektor Program Studi (direpresentasikan sebagai $\vec{M}$) dari basis data. Setiap skalar dimensinya ($M_i$) merupakan turunan representasi O\*NET dengan rentang batas ketat $0 \le M_i \le 7$.

**2. Tahap Pra-Pemrosesan dan Normalisasi Skala**
Untuk memvalidasi perbandingan metrik dan memfasilitasi rendering proyeksi visual (*Radar Chart*), skalar pada kedua vektor wajib dioperasikan pada batas rentang yang absolut ekuivalen. Sistem mengeksekusi algoritma normalisasi linear ganda untuk mencapai kondisi ini.

Pertama, skalar akumulasi pengguna ($S_i$) diproyeksikan ke dalam Vektor Pengguna ternormalisasi ($\vec{U}$) agar terkalibrasi secara presisi pada rentang $0-100$. Proses ini dieksekusi melalui persamaan pembagian: $U_i = \frac{S_i}{10}$.

Kedua, elemen matriks pada Vektor Program Studi ($\vec{M}$) diekspansi secara proporsional menjadi Vektor Program Studi ternormalisasi ($\vec{M}'$) melalui persamaan skalar: $M'_{i} = \left( \frac{M_i}{7} \right) \times 100$. Pascakomputasi ini, seluruh himpunan variabel independen berada pada limitasi matriks metrik homogen $0$ hingga $100$.

**3. Kalkulasi Kedekatan Vektor (Cosine Similarity)**
Setelah ekuilibrium metrik tercapai, sistem mengkalkulasi koefisien geometri menggunakan algoritma *Cosine Similarity*. Algoritma ini berfokus pada evaluasi variansi sudut vektor multi-dimensi tanpa terdistorsi oleh fluktuasi panjang Euclidean secara murni.

Komputasi diawali dengan kalkulasi perkalian titik (*Dot Product*) dari kedua himpunan vektor ternormalisasi: $\vec{U} \cdot \vec{M}' = \sum_{i=1}^{6} (U_i \times M'_i)$.

Selanjutnya, sistem mengkalkulasi magnitudo (besaran Euclidean) dari masing-masing vektor. Magnitudo Vektor Pengguna dihitung dengan rumusan akar kuadrat dari penjumlahan kuadrat komponennya $\|\vec{U}\| = \sqrt{\sum_{i=1}^{6} U_i^2}$. Prosedur identik dieksekusi terhadap Vektor Program Studi termodifikasi $\|\vec{M}'\| = \sqrt{\sum_{i=1}^{6} {M'_i}^2}$.

**4. Formulasi Skor Akhir dan Pemeringkatan (*Sorting*)**
Skor probabilitas kemiripan antara vektor identitas minat pengguna dan entitas program studi direpresentasikan melalui persamaan fungsi pembagian hasil perkalian titik dengan produk magnitudo kedua vektor:

$$
\text{Similarity}(\vec{U}, \vec{M}') = \frac{\vec{U} \cdot \vec{M}'}{\|\vec{U}\| \times \|\vec{M}'\|}
$$

Fungsi ruang geometri tersebut mendikte nilai koefisien desimal dalam limitasi $0$ hingga $1$. Koefisien yang berekspansi mendekati batas $1$ berkorelasi langsung dengan tingkat kesejajaran (*alignment*) profil yang berbanding lurus. Sistem kemudian mengonversi koefisien komputasi ini ke dalam format persentase interpretatif dengan faktor pengali $100\%$.

Siklus komputasi dieksekusi berulang (*looping*) secara masif terhadap seluruh baris identitas program studi pada instansiasi MySQL. Susunan respons keluaran kemudian disortir dalam indeks agregat secara menurun (*descending order*) untuk mendistribusikan hierarki rekomendasi pendidikan secara deterministik dan saintifik kepada pengguna.
