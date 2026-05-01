# Menggunakan pondasi Node.js yang ringan
FROM node:20-slim

# Menetapkan zona komersial
WORKDIR /app

# Mengaktifkan lisensi logistik pnpm secara native (tanpa perlu mengunduh installer eksternal)
RUN corepack enable pnpm

# Mengimpor dokumen kontrak pengadaan (pastikan file lock terbawa jika ada)
COPY package.json pnpm-lock.yaml* ./

# Melakukan pengadaan barang secara efisien menggunakan pnpm
RUN pnpm install

# Membawa seluruh aset visual ke dalam zona komersial
COPY . .

# Membuka pintu akses publik di port 5173
EXPOSE 5173

# Mengaktifkan operasional toko
CMD ["pnpm", "run", "dev", "--", "--host"]