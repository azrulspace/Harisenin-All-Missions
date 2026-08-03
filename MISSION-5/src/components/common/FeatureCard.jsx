import React from 'react';
import Card from './Card';

/**
 * Komponen FeatureCard untuk menampilkan fitur aplikasi.
 * 
 * @param {object} props - Properti yang dikirim dari parent component
 * @param {React.Component} props.icon - Icon lucide-react yang akan dirender (contoh: Zap, Shield)
 * @param {string} props.title - Judul dari fitur
 * @param {string} props.description - Penjelasan detail dari fitur
 */
// Kita menggunakan 'destructuring' di sini ({ icon: Icon, title, description })
// untuk langsung mengambil nilai dari props tanpa perlu menulis props.title dsb.
// 'icon: Icon' berarti kita mengambil properti 'icon' dan memberinya nama 'Icon' (huruf besar)
// karena komponen React harus diawali huruf besar.
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    // Menggunakan komponen Card yang sudah kita buat sebelumnya sebagai pembungkus
    <Card className="p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative group">
      
      {/* Helper text UI untuk memperjelas (hanya untuk junior FE) */}
      <span className="absolute top-2 right-2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        ✨ Feature Card Component
      </span>

      <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-primary-50 text-primary-600 mb-5">
        {/* Render Icon jika ada. Jika Icon tidak null, maka tampilkan komponen <Icon /> */}
        {Icon && <Icon size={24} />}
      </div>
      
      {/* Menampilkan judul fitur */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      
      {/* Menampilkan deskripsi fitur */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

// Jangan lupa untuk export agar bisa di-import di Homepage.jsx
export default FeatureCard;
