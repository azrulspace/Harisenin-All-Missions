# LMS SMK DKV IDN (Mission 7 Advance FE 1)

Proyek ini adalah sebuah platform katalog kursus dan manajemen kurikulum untuk SMK DKV IDN yang dibangun menggunakan ekosistem React JS dan Tailwind CSS. Platform ini dirancang untuk memudahkan siswa dalam mencari kelas desain visual, UI/UX, dan ilustrasi, sekaligus menyediakan panel admin yang kuat untuk mengelola kurikulum secara dinamis.

## Fitur Utama

- **Showcase Katalog Kursus Interaktif**: Menampilkan daftar kelas yang tersedia dengan animasi dan tata letak yang menarik, dilengkapi dengan tab fokus materi yang intuitif.
- **Autentikasi Multi Mode**: Mendukung berbagai cara untuk masuk ke platform, termasuk Email dan Password biasa, integrasi Google, serta OTP via WhatsApp.
- **Product Detail Page**: Halaman detail kursus yang komprehensif, dilengkapi sidebar aksi yang sticky untuk pendaftaran, dan kurikulum yang menggunakan sistem accordion.
- **Panel Admin Manajemen Kursus**: Antarmuka admin untuk operasi CRUD (Create, Read, Update, Delete) data kursus melalui integrasi REST API dengan MockAPI. Admin dapat menyaring status publikasi, mencari kursus secara real time, dan menyusun materi pembelajaran secara dinamis.
- **Panel Admin Manajemen Learner**: Fitur manajemen siswa (learners) yang memungkinkan admin menambah, mengedit, memblokir, serta memverifikasi status siswa, termasuk kemampuan _CSV Bulk Upload_ untuk kemudahan impor data.
- **Learner Dashboard & Course Player**: Antarmuka khusus untuk siswa memantau kursus yang diikuti (My Learning), pengaturan profil, serta fitur pemutar materi (Course Player) dengan integrasi YouTube dan sistem pelacakan progres belajar interaktif.

## Kredensial Login Admin (Untuk Reviewer)

Gunakan kredensial berikut untuk mengakses panel admin:
- **Email**: admin.dkv@idn.sch.id
- **Password**: admin123dkv

Atau login sebagai Learner (Siswa):
- **Email**: learner@idn.sch.id (atau gunakan email apa saja saat registrasi)
- **Password**: learner123

## Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer Anda:

1. Clone repositori ini ke komputer lokal Anda.
2. Buka terminal dan arahkan ke direktori proyek:
   `cd MISSION-7-ADVANCE-F1`
3. Install seluruh dependensi yang dibutuhkan:
   `npm install`
4. Jalankan server pengembangan lokal:
   `npm run dev`
5. Buka browser dan akses tautan lokal yang muncul di terminal (biasanya http://localhost:5173).

## Tech Stack

Proyek ini dibangun menggunakan teknologi modern berikut:
- **React JS** (Library antarmuka pengguna)
- **Vite** (Build tool dan development server yang sangat cepat)
- **Tailwind CSS** (Framework CSS utility-first untuk styling cepat)
- **React Router DOM** (Manajemen routing untuk aplikasi Single Page)
- **Axios** (HTTP client terpusat lengkap dengan Interceptors)
- **MockAPI** (Simulasi backend REST API)
- **Lucide Icons** (Pustaka ikon SVG yang bersih dan konsisten)

## Referensi Desain

Akses penuh terhadap desain UI/UX dapat dilihat melalui tautan Figma berikut:
https://www.figma.com/design/mbNnvDO06qNQJY6z9ivlaA/Website-SMK-DKV-IDN?node-id=12135-22119&m=dev
