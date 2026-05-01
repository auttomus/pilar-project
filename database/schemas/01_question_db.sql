-- ==========================================================
-- Database: db_komputasi
-- Tabel: categories, questions, submissions
-- ==========================================================

-- Tabel Kategori (RIASEC)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code CHAR(1) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabel Soal
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    text_id TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabel Submissions untuk hasil akhir
CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    scores JSON NOT NULL,
    answers_snapshot JSON NOT NULL,
    is_continuing BOOLEAN DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO categories (code, name, description) VALUES
('R', 'Realistic', 'Praktis, suka bekerja dengan mesin, alat, dan di luar ruangan.'),
('I', 'Investigative', 'Analitis, suka belajar, mengamati, dan memecahkan masalah.'),
('A', 'Artistic', 'Kreatif, imajinatif, dan suka bekerja tanpa aturan yang kaku.'),
('S', 'Social', 'Suka membantu, mengajar, dan bekerja dengan orang lain.'),
('E', 'Enterprising', 'Persuasif, suka memimpin, dan berorientasi pada tujuan/bisnis.'),
('C', 'Conventional', 'Detail, terorganisir, dan mahir mengolah data atau angka.');

INSERT INTO questions (category_id, text_id) VALUES
-- R - Realistic
((SELECT id FROM categories WHERE code = 'R'), 'Saya menganggap diri saya atletis dan suka berolahraga.'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya adalah seorang pencinta alam.'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya suka memperbaiki barang-barang yang rusak.'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya suka bekerja menggunakan tangan (seperti berkebun atau membantu renovasi rumah).'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya mandiri dan suka bekerja sendiri.'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya suka mengotak-atik atau memperbaiki kendaraan (motor/mobil).'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya suka membangun atau merakit sesuatu.'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya suka merawat atau menjaga hewan.'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya senang merakit komponen-komponen menjadi satu kesatuan.'),
((SELECT id FROM categories WHERE code = 'R'), 'Saya lebih suka melakukan aktivitas di luar ruangan.'),

-- I - Investigative
((SELECT id FROM categories WHERE code = 'I'), 'Saya penasaran dengan dunia fisik (alam, ruang angkasa, makhluk hidup).'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya bisa melakukan perhitungan yang rumit.'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya senang memecahkan soal-soal matematika.'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya suka menggunakan komputer untuk mengeksplorasi banyak hal.'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya senang membaca buku pengetahuan setiap waktu.'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya menyukai mata pelajaran sains (IPA).'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya senang memecahkan teka-teki (puzzle).'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya suka melakukan eksperimen atau percobaan ilmiah.'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya senang mencari tahu bagaimana cara kerja suatu benda.'),
((SELECT id FROM categories WHERE code = 'I'), 'Saya suka menganalisis sebuah masalah atau situasi.'),

-- A - Artistic
((SELECT id FROM categories WHERE code = 'A'), 'Saya menganggap diri saya orang yang sangat kreatif.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya suka menggambar atau melukis.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya bisa atau senang memainkan alat musik.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya senang mendesain pakaian atau mengikuti tren fesyen yang unik.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya suka membaca karya fiksi, naskah drama, atau puisi.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya senang mempelajari bahasa asing.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya suka menyanyi, berakting, atau menari.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya senang membaca artikel atau buku tentang seni dan musik.'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya menikmati kegiatan menulis kreatif (seperti cerpen atau blog).'),
((SELECT id FROM categories WHERE code = 'A'), 'Saya senang mempelajari kebudayaan dari daerah atau negara lain.'),

-- S - Social
((SELECT id FROM categories WHERE code = 'S'), 'Saya orang yang sangat ramah dan mudah bergaul.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya senang mengajar atau memberikan les kepada orang lain.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya berani berbicara di depan banyak orang.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya bisa bekerja sama dengan baik dalam tim atau kelompok.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya senang memimpin sebuah diskusi.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya suka membantu orang lain memecahkan masalah mereka.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya senang mencari teman-teman baru.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya memiliki minat dalam bidang penyembuhan atau kesehatan manusia.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya senang berdiskusi mengenai isu-isu yang sedang terjadi.'),
((SELECT id FROM categories WHERE code = 'S'), 'Saya merasa puas saat bisa menolong orang lain.'),

-- E - Enterprising
((SELECT id FROM categories WHERE code = 'E'), 'Saya senang berjualan produk (misalnya saat ada bazar sekolah atau dana usaha).'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya menganggap diri saya cukup populer atau dikenal di sekolah.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya senang memimpin sebuah kelompok.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya sering terpilih menjadi pengurus organisasi atau ketua kelas.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya memiliki keinginan untuk mempunyai bisnis sendiri.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya suka mengambil risiko dan mencoba petualangan baru.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya adalah orang yang ambisius dan rajin menetapkan target pribadi.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya suka mencoba meyakinkan atau memengaruhi pendapat orang lain.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya cepat dalam mengambil tanggung jawab baru yang diberikan.'),
((SELECT id FROM categories WHERE code = 'E'), 'Saya percaya diri saat memberikan pidato atau sambutan.'),

-- C - Conventional
((SELECT id FROM categories WHERE code = 'C'), 'Saya suka menabung dan mengatur keuangan dengan baik.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya tipe orang yang bekerja sampai tugas benar-benar selesai.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya sangat teratur, rapi, dan menjaga kerapihan kamar.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya suka membuat daftar tugas atau catatan (to-do list).'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya orang yang praktis dan selalu mempertimbangkan harga sebelum membeli.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya lebih suka mengetik tugas sekolah agar hasilnya lebih rapi.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya selalu memeriksa ulang tugas matematika agar tidak ada kesalahan.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya lebih nyaman jika ada instruksi kerja yang jelas untuk diikuti.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya sangat memperhatikan detail-detail kecil dalam pekerjaan.'),
((SELECT id FROM categories WHERE code = 'C'), 'Saya mahir dalam menyimpan dan merapikan catatan atau data pekerjaan.');