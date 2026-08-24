import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import emptyIllustration from '../assets/icons/empty-illustration-404.svg';

export default function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9fafb] relative font-sans">
      <Navbar />
      
      <div className="pt-[100px] min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-16 max-w-2xl mx-auto">
        <img 
          src={emptyIllustration} 
          alt="Under Construction" 
          className="w-72 sm:w-96 max-w-full h-auto mb-8 mx-auto" 
        />
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          Ruang Belajar Ini Lagi Kami Desain Ulang ⚙️
        </h1>
        
        <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed mb-8">
          Oops, maaf! halaman ini belum siap buat kamu intip. Tapi tenang saja, kamu bisa intip materi dan kelas interaktif yang sudah siap tayang di halaman utama!
        </p>
        
        <button 
          onClick={() => navigate('/')}
          className="bg-white hover:bg-gray-50 text-gray-800 font-medium px-8 py-3 rounded-full border border-gray-200 shadow-sm transition-all duration-200 hover:shadow"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
