import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyIllustration from '../assets/icons/empty-illustration-404.svg';

export default function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9fafb] relative font-sans flex flex-col items-center justify-center">
      <div className="text-center px-4 py-16 max-w-2xl mx-auto flex flex-col items-center">
        <img 
          src={emptyIllustration} 
          alt="Under Construction" 
          className="w-72 sm:w-96 max-w-full h-auto mb-8 mx-auto" 
        />
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          Ruang Belajar Ini Lagi Kami Desain Ulang ⚙️
        </h1>
        
        <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed mb-8">
          Oops, maaf! halaman ini sedang dalam proses pengembangan dan akan segera hadir
        </p>
        
        <button 
          onClick={() => navigate('/learner/my-learning')}
          className="bg-white hover:bg-gray-50 text-gray-800 font-medium px-8 py-3 rounded-full border border-gray-200 shadow-sm transition-all duration-200 hover:shadow"
        >
          Kembali ke My Learning
        </button>
      </div>
    </div>
  );
}
