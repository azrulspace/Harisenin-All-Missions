import React from 'react';
import iconAi from '../assets/icons/why-choose-us/icon-ai.svg';
import iconHammer from '../assets/icons/why-choose-us/icon-hammer.svg';
import iconShop from '../assets/icons/why-choose-us/icon-shop.svg';
import iconUser from '../assets/icons/why-choose-us/icon-user.svg';
import iconMoon from '../assets/icons/why-choose-us/icon-moon.svg';
import iconMedal from '../assets/icons/why-choose-us/icon-medal.svg';

const features = [
  {
    title: "Kurikulum AI-Driven",
    description: "Setiap semester punya modul AI tersendiri seperti Dreamina/Google Flow, ChatGPT/Claude, Lovable, Cursor, Antigravity, Figma MCP.",
    icon: iconAi
  },
  {
    title: "Project Based Learning, Not Theory",
    description: "Target 60+ project riil per angkatan, dari ilustrasi sampai client project di Ujikom semester 4.",
    icon: iconHammer
  },
  {
    title: "Siap Jual Karya Sejak Sekolah",
    description: "Siswa dilatih menjual desain di Gumroad dan UI8.net sebagai penghasilan pasif.",
    icon: iconShop
  },
  {
    title: "Tim Pengajar Expert & Berpengalaman",
    description: "Kelas kecil per angkatan dengan koordinator kurikulum khusus DKV.",
    icon: iconUser
  },
  {
    title: "Boarding School Berbasis IT",
    description: "Tetap ada kajian diniyyah dan halaqah tahfidz harian, konsisten dengan identitas IDN.",
    icon: iconMoon
  },
  {
    title: "Portofolio & Sertifikasi Profesional",
    description: "Target minimal 2 sertifikat internasional plus Google UX Certification per siswa.",
    icon: iconMedal
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0f0f11] text-white py-24 relative overflow-hidden font-sans">
      {/* Light Beam / Glow Effect */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white opacity-[0.02] blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h3 className="text-gray-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">KENAPA DKV IDN?</h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Bukan sekolah desain biasa! Kami menggabungkan desain, AI, dan pesantren dalam satu kurikulum.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-[#161618] border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl flex flex-col"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#061226] rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 shadow-inner">
                  <img src={feature.icon} alt={feature.title} className="w-8 h-8 object-contain" />
                </div>
                <h4 className="text-xl font-bold text-white leading-snug">{feature.title}</h4>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
