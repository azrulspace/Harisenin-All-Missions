# LMS Edu Course Backend - Mission 11 (Advance Backend)

Proyek ini merupakan implementasi API backend menggunakan Node.js, Express, dan Prisma ORM untuk mengelola operasi sistem yang lebih canggih (Advance) pada platform Learning Management System (LMS) SMK DKV IDN. Fitur utama mencakup Autentikasi (JWT), File Upload, Manajemen Database Relasional, dan Standarisasi Environment untuk sinkronisasi dengan Frontend.

## 🚀 Tech Stack

Proyek ini dibangun menggunakan teknologi berikut:
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database ORM:** [Prisma ORM](https://www.prisma.io/)
- **Database Engine:** PostgreSQL
- **Security & Auth:** JWT (JSON Web Tokens), bcryptjs, Helmet, CORS
- **File Upload:** Multer

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
   JWT_SECRET="supersecret"
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
**`http://localhost:5000`** (Sesuai standarisasi dengan Frontend Vite yang menggunakan port 5173).

## 📖 Fitur Utama (Mission 11)

1. **Standarisasi Port 5000**: Mencegah *port clashing* dengan aplikasi frontend (Vite berjalan di 5173).
2. **Autentikasi Aman**: Fitur Login dan Registrasi menggunakan hashing `bcryptjs` dan otorisasi dengan `JWT`.
3. **Verifikasi Email**: Simulasi pendaftaran aman yang membutuhkan token untuk verifikasi alamat email.
4. **Manajemen File (Uploads)**: Menangani unggahan file (gambar) dengan aman menggunakan modul `multer` dengan batasan ukuran dan ekstensi file.
5. **CRUD Courses Terproteksi**: Modifikasi API untuk mengharuskan *Bearer Token* saat melakukan aksi Create, Update, dan Delete data.

## 🧪 Testing via Postman

Proyek ini telah dilengkapi dengan file dokumen *Postman Collection* yang sudah memuat format JSON siap pakai untuk menguji seluruh endpoint terbaru.

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** pada antarmuka Postman.
3. Pilih file `docs/Mission-11-Postman.json` dari dalam folder proyek ini.
4. Anda akan melihat koleksi baru bernama **Mission 11 - Advance BE**.
5. Pastikan server lokal Anda menyala (`npm run dev`), lalu jalankan *request* API sesuai kebutuhan. Pastikan untuk memperbarui *Bearer Token* dan parameter `:id` (UUID) saat melakukan pengujian otorisasi (Create/Update/Delete).
