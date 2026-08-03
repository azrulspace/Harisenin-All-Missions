import React from 'react';
import { Hexagon, MessageCircle, Code, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary-600 text-white p-1 rounded-lg">
                <Hexagon size={20} className="fill-current" />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">
                SaaSify<span className="text-primary-600">.</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Solusi manajemen tugas terbaik untuk tim modern. Tingkatkan produktivitas Anda sekarang.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <span className="sr-only">Contact</span>
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <span className="sr-only">Development</span>
                <Code size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                <span className="sr-only">Business</span>
                <Briefcase size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Produk</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Fitur</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Harga</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Integrasi</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Pembaruan</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Perusahaan</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Karier</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Privasi</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Keamanan</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SaaSify Inc. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
