# Menggunakan pondasi Python yang efisien
FROM python:3.11-slim

# Mencegah cache Python dan memastikan log real-time
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Menginstal uv terlebih dahulu
RUN pip install uv

# Mengimpor daftar bahan baku
COPY requirements.txt .

# Menggunakan uv untuk menginstal dependencies ke sistem container dengan sangat cepat
RUN uv pip install --system --no-cache -r requirements.txt

# Membawa sisa kode kerja
COPY . .

EXPOSE 8000

# Menjalankan FastAPI dengan Uvicorn (dilengkapi --reload untuk sinkronisasi kode lokal)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]