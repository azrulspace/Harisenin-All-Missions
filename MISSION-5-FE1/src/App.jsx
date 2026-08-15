import React from 'react';
// Mengimpor komponen dari react-router-dom untuk routing halaman
// Router: Komponen utama pembungkus aplikasi
// Routes: Kumpulan rute-rute yang ada
// Route: Mendefinisikan path dan komponen yang akan di-render
// Outlet: Tempat di mana komponen anak akan di-render di dalam layout
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Mengimpor komponen layout dan halaman
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

// MainLayout adalah komponen pembungkus (wrapper)
// Fungsi ini berguna agar kita tidak perlu menulis Navbar dan Footer berulang-ulang
// di setiap halaman yang membutuhkannya.
const MainLayout = () => {
  return (
    // flex-col dan min-h-screen memastikan footer selalu ada di bawah
    <div className="flex flex-col min-h-screen">
      {/* Menampilkan Navbar di atas */}
      <Navbar />
      
      {/* flex-grow membuat konten utama mengambil sisa ruang kosong */}
      <main className="flex-grow">
        {/* Outlet adalah tempat komponen halaman (seperti Homepage) akan muncul */}
        <Outlet />
      </main>
      
      {/* Menampilkan Footer di bawah */}
      <Footer />
    </div>
  );
};

// Komponen utama aplikasi
function App() {
  return (
    // Membungkus seluruh aplikasi dengan Router agar routing berfungsi
    <Router>
      <Routes>
        {/* Rute yang menggunakan MainLayout (ada Navbar dan Footer) */}
        {/* Element MainLayout akan membungkus rute anak di dalamnya */}
        <Route element={<MainLayout />}>
          {/* Path "/" adalah halaman utama (Homepage) */}
          <Route path="/" element={<Homepage />} />
        </Route>
        
        {/* Rute khusus autentikasi (tanpa Navbar dan Footer) */}
        {/* Halaman ini akan berdiri sendiri tanpa layout pembungkus */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

// Mengekspor komponen App agar bisa digunakan di main.jsx
export default App;
