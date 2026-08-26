import React from 'react';
import { Link } from 'react-router-dom';
import logoSmkDkv from '../assets/icons/Logo SMK DKV.svg';

export default function CourseDetailNavbar({ onOpenLogin, onOpenRegister }) {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[80px] flex items-center justify-between">
        
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <img src={logoSmkDkv} alt="SMK DKV IDN" className="h-[28px] w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="#" className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Kurikulum</Link>
            <Link to="#" className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Kelas Online</Link>
            <Link to="#" className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Karya Siswa</Link>
            <Link to="#" className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors">PPDB</Link>
            <Link to="#" className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Kontak</Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button 
            onClick={onOpenLogin}
            className="px-6 py-2.5 rounded-full font-semibold text-[15px] text-gray-900 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={onOpenRegister}
            className="px-6 py-2.5 rounded-full font-semibold text-[15px] text-white bg-[#0082fb] hover:bg-blue-600 transition-colors shadow-sm"
          >
            Create account
          </button>
        </div>

        <button className="lg:hidden p-2 text-gray-600">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

      </div>
    </nav>
  );
}
