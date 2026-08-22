import React, { useRef } from 'react';
import CourseCard from './CourseCard';
import chevronLeft from '../assets/icons/why-choose-us/chevron-left.svg';
import chevronRight from '../assets/icons/why-choose-us/chevron-right.svg';
import arrowRight from '../assets/icons/why-choose-us/arrow-right.svg';

export default function CourseSection({ courses }) {
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 360, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-24 font-sans">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">SOROTAN KURSUS KAMI</h3>
            <h2 className="text-4xl md:text-[40px] font-bold text-[#1a202c] mb-4 tracking-tight leading-tight">Delapan bidang keahlian DKV</h2>
            <p className="text-gray-500 text-lg">
              Geser ke kanan untuk melihat perjalanan belajar dari fondasi desain sampai proyek klien.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex space-x-3">
              <button 
                onClick={handleScrollLeft}
                className="w-11 h-11 rounded-lg border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <img src={chevronLeft} alt="Previous" className="w-5 h-5 opacity-70" />
              </button>
              <button 
                onClick={handleScrollRight}
                className="w-11 h-11 rounded-lg border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <img src={chevronRight} alt="Next" className="w-5 h-5 opacity-70" />
              </button>
            </div>
            <a href="#" className="font-semibold text-[15px] text-gray-900 hover:text-blue-600 transition-colors flex items-center group">
              Lihat Semua Kelas
              <img src={arrowRight} alt="Arrow Right" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide scroll-smooth snap-x"
        >
          {courses.map((course) => (
            <div key={course.id} className="snap-start shrink-0 w-[320px] md:w-[360px]">
              <CourseCard course={course} />
            </div>
          ))}
          {courses.length === 0 && (
            <div className="w-full text-center py-10 text-gray-500">
              Belum ada data kursus.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
