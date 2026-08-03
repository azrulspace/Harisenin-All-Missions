# Mission 4: Mobile-First To-Do List

Ini adalah proyek untuk Mission 4 dari bootcamp Harisenin. Proyek ini adalah aplikasi web manajemen tugas (To-Do List) berbasis *Mobile-First* yang dibuat murni menggunakan **HTML, CSS, dan Vanilla JavaScript** tanpa *framework* tambahan.

## Fitur Utama

Aplikasi ini mencakup beberapa fitur interaktif untuk mempermudah manajemen tugas harian:
- **Tampilan Waktu Nyata (Live Time & Date):** Menampilkan tanggal dan waktu saat ini yang di-*update* secara *real-time*.
- **Manajemen Tugas (CRUD Dasar):** Pengguna dapat menambah, mencentang (selesai), dan menghapus tugas.
- **Dua Kategori Daftar Tugas:** Memisahkan tugas yang masih berjalan (Pending) dan yang sudah selesai (Completed/Done).
- **Prioritas Tugas:** Mendukung pemilihan tingkat prioritas tugas (Low, Medium, High).
- **Tenggat Waktu & Overdue:** Pengguna dapat menetapkan jatuh tempo (*due date*). Aplikasi juga akan memberikan *badge* "Late" (terlambat) secara otomatis jika tugas belum selesai melewati batas waktu.
- **Penyimpanan Lokal (Local Storage):** Data tugas akan disimpan secara persisten di dalam *browser* sehingga tidak hilang saat halaman di-*refresh* atau ditutup.
- **Hapus Semua Data:** Fitur cepat untuk membersihkan seluruh daftar tugas sekaligus.

## Teknologi yang Digunakan
- **HTML5:** Struktur semantik untuk aplikasi.
- **CSS3:** Menggunakan pendekatan *Mobile-First Design* agar responsif dan terlihat rapi di berbagai ukuran layar.
- **JavaScript (ES6):** Manipulasi DOM (Document Object Model) untuk menangani *event listener*, *local storage*, dan logika aplikasi.

## Cara Menggunakan
1. Buka file `index.html` langsung pada browser pilihan Anda.
2. Isi deskripsi tugas, pilih prioritas, dan tanggal jatuh tempo (opsional).
3. Klik "Tambah Tugas".
4. Centang kotak di samping tugas untuk memindahkannya ke daftar "Done".
5. Anda dapat menghapus tugas satu per satu atau mengeklik tombol "Hapus Semua Data" di paling bawah.
