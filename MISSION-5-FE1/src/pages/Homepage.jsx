import React from 'react';
// Link digunakan untuk pindah halaman tanpa merefresh browser (Single Page Application)
import { Link } from 'react-router-dom';
// Mengimpor icon dari lucide-react agar tampilan lebih menarik
import { ArrowRight, LayoutDashboard, Shield, Zap } from 'lucide-react';

// Mengimpor komponen-komponen yang sudah kita buat
import Button from '../components/common/Button';
import FeatureCard from '../components/common/FeatureCard';
import PricingCard from '../components/common/PricingCard';

// Mengimpor gambar mockup
import mockupImg from '../assets/Mockup Sample Saas.png';

// Ini adalah Functional Component untuk Halaman Utama (Homepage)
const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section: Bagian paling atas yang pertama kali dilihat user */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-primary-50/50 -z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Helper Badge: Catatan untuk diri sendiri atau user */}
          <div className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-4 font-medium border border-yellow-200">
            👋 Info Dev: Halaman ini masih dalam tahap pengembangan (WIP)
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Kelola Tim Anda dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Lebih Cerdas</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Platform SaaSify membantu Anda mengotomatiskan alur kerja, melacak produktivitas, dan mencapai target proyek lebih cepat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative group">
            
            {/* Tooltip sederhana untuk button (efek hover) */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Akan mengarah ke halaman /register
            </span>

            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Coba Gratis 14 Hari
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto group/btn">
              Pelajari Lebih Lanjut
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Mockup Image */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="rounded-4xl border border-gray-200/50 shadow-2xl bg-white p-2 relative group">
              
              {/* Pesan helper dari Frontend Junior */}
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm border border-green-200">
                ✅ Gambar mockup berhasil ditambahkan
              </div>

              <div className="rounded-3xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
                <img src={mockupImg} alt="Dashboard Interface Preview" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Keunggulan Kami</h2>
            <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Semua yang Anda butuhkan di satu tempat</h3>
            <p className="mt-4 text-lg text-gray-600">
              Fokus pada pekerjaan yang berarti, biarkan sistem kami menangani sisanya dengan fitur canggih dan intuitif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="Kinerja Kilat"
              description="Dibangun dengan teknologi terbaru untuk memastikan antarmuka yang sangat responsif dan tanpa lag."
            />
            <FeatureCard 
              icon={Shield}
              title="Keamanan Tingkat Tinggi"
              description="Data Anda dilindungi dengan enkripsi end-to-end dan standar keamanan enterprise terbaik di industri."
            />
            <FeatureCard 
              icon={LayoutDashboard}
              title="Dashboard Intuitif"
              description="Pantau semua metrik penting dalam satu tampilan yang mudah dimengerti tanpa perlu pelatihan khusus."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Harga yang transparan</h2>
            <p className="mt-4 text-lg text-gray-600">
              Pilih paket yang paling sesuai dengan ukuran dan kebutuhan tim Anda. Tidak ada biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            <PricingCard 
              title="Basic"
              price="Gratis"
              features={[
                'Hingga 5 pengguna',
                'Analitik dasar',
                'Dukungan komunitas',
                'Integrasi terbatas'
              ]}
              buttonText="Mulai Gratis"
            />
            <PricingCard 
              title="Pro"
              price="Rp 149rb"
              isPopular={true}
              features={[
                'Hingga 50 pengguna',
                'Analitik lanjutan',
                'Dukungan prioritas 24/7',
                'Integrasi tanpa batas',
                'Fitur kolaborasi real-time'
              ]}
              buttonText="Coba Pro 14 Hari"
            />
            <PricingCard 
              title="Enterprise"
              price="Custom"
              features={[
                'Pengguna tak terbatas',
                'SSO & Keamanan Lanjutan',
                'Manajer Akun Dedikasi',
                'SLA Terjamin',
                'Kustomisasi fitur'
              ]}
              buttonText="Hubungi Kami"
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-2">Siap untuk memulai?</h2>
            <p className="text-primary-100 text-lg">Bergabunglah dengan ribuan tim yang sudah menggunakan SaaSify.</p>
          </div>
          <div>
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-50 focus:ring-white">
                Buat Akun Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
