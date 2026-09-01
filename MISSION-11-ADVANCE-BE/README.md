# LMS Edu Course Backend - Mission 10 (REST API & DML)

Proyek ini merupakan implementasi API backend menggunakan Node.js, Express, dan Prisma ORM untuk mengelola operasi CRUD (Data Manipulation Language) secara komprehensif pada platform Learning Management System (LMS) SMK DKV IDN.

## 🚀 Tech Stack

Proyek ini dibangun menggunakan teknologi berikut:
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database ORM:** [Prisma ORM](https://www.prisma.io/)
- **Database Engine:** PostgreSQL

## 🛠 Prerequisites & Installation

### Prasyarat
Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut di perangkat lokal Anda:
- Node.js (v18 atau lebih baru direkomendasikan)
- PostgreSQL (Pastikan service database berjalan)
- Postman (Untuk pengujian REST API)

### Instalasi & Setup

1. **Install Dependensi**
   Jalankan perintah berikut pada terminal di dalam direktori proyek:
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   Buat file `.env` di *root directory* proyek Anda (jika belum ada) dan sesuaikan konfigurasi koneksi database Anda:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://username:password@localhost:5432/edu_course_db?schema=public"
   ```
   *(Ganti `username`, `password`, dan `edu_course_db` dengan kredensial PostgreSQL Anda).*

3. **Sinkronisasi Skema Database**
   Terapkan skema Prisma Anda ke dalam PostgreSQL dengan menjalankan:
   ```bash
   npx prisma db push
   # atau jika Anda menggunakan fitur migration:
   # npx prisma migrate dev
   ```

## 💻 Running the Server

Untuk menjalankan server di dalam mode *development*, eksekusi perintah berikut di terminal:
```bash
npm run dev
```
Secara default, server akan menyala dan siap menerima *request* pada:
**`http://localhost:5000`**

## 📖 API Endpoints Reference

Berikut adalah tabel rujukan lengkap untuk keseluruhan 5 endpoint REST API utama pada entitas **Course**:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/courses` | Mengambil seluruh data kelas |
| `GET` | `/api/v1/courses/:id` | Mengambil data kelas spesifik berdasarkan ID |
| `POST` | `/api/v1/courses` | Menambahkan data kelas baru (Insert) |
| `PATCH` | `/api/v1/courses/:id` | Memperbarui sebagian data kelas spesifik (Update) |
| `DELETE` | `/api/v1/courses/:id` | Menghapus kelas spesifik berdasarkan ID |

## 🧪 Testing via Postman

Proyek ini telah dilengkapi dengan file dokumen *Postman Collection* yang sudah memuat format JSON siap pakai untuk menguji kelima endpoint di atas.

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** pada antarmuka Postman.
3. Pilih file `docs/Mission-10-Postman.json` dari dalam folder proyek ini.
4. Anda akan melihat koleksi baru bernama **Mission 10 - Course API**.
5. Pastikan server lokal Anda menyala (`npm run dev`), lalu jalankan request API secara berurutan mulai dari *Create*, *Get All*, *Get By ID*, *Update*, dan *Delete*.
