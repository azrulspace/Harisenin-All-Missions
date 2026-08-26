import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoSmkDkv from '../assets/icons/Logo SMK DKV.svg';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full flex justify-center pt-6 px-4 md:px-8 absolute top-0 z-50">
      <div className="w-full max-w-[1280px] flex items-center justify-between lg:justify-center lg:gap-[32px]">
        {/* Main Pill (Logo + Links) */}
        <div className="bg-white border border-[#e9eaeb] flex items-center px-4 md:px-[32px] py-[12px] rounded-[80px] w-full lg:w-auto justify-between lg:justify-start lg:gap-[20px] shadow-sm">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoSmkDkv} alt="SMK DKV IDN" className="h-[28px] w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-[22px] ml-4 border-l border-[#e9eaeb] pl-6">
            <Link to="/curriculum" className="font-medium text-[16px] text-[#181d27] hover:text-[#0082fb] transition-colors">Curriculum</Link>
            <Link to="/courses" className="font-medium text-[16px] text-[#181d27] hover:text-[#0082fb] transition-colors">Courses</Link>
            <Link to="/showcase" className="flex items-center gap-[8px] cursor-pointer group">
              <span className="font-medium text-[16px] text-[#181d27] group-hover:text-[#0082fb] transition-colors">Showcase</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="#181d27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/ppdb" className="font-medium text-[16px] text-[#181d27] hover:text-[#0082fb] transition-colors">PPDB</Link>
            <Link to="/about" className="font-medium text-[16px] text-[#181d27] hover:text-[#0082fb] transition-colors">About</Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-[16px]">
          <button 
            onClick={() => navigate('/login')}
            className="bg-white border border-[#e9eaeb] flex h-[52px] items-center justify-center px-[32px] rounded-[100px] font-semibold text-[16px] text-[#181d27] hover:bg-gray-50 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="bg-[#0082fb] border border-[#e9eaeb] flex h-[52px] items-center justify-center px-[32px] rounded-[100px] font-semibold text-[16px] text-white hover:bg-blue-600 transition-colors shadow-md"
          >
            Create account
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-4 right-4 bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-100 lg:hidden">
          <Link to="/curriculum" className="font-medium text-lg text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Curriculum</Link>
          <Link to="/courses" className="font-medium text-lg text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
          <Link to="/showcase" className="font-medium text-lg text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Showcase</Link>
          <Link to="/ppdb" className="font-medium text-lg text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>PPDB</Link>
          <Link to="/about" className="font-medium text-lg text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <hr className="my-2" />
          <button 
            onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
            className="w-full bg-gray-50 border border-gray-200 py-3 rounded-full font-semibold text-gray-800"
          >
            Login
          </button>
          <button 
            onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
            className="w-full bg-[#0082fb] text-white py-3 rounded-full font-semibold shadow-md"
          >
            Create account
          </button>
        </div>
      )}
    </nav>
  );
}
