import React, { useState } from 'react';
import { initialCourseData } from '../services/courseData';
import Navbar from '../layouts/Navbar';
import HeroSection from '../components/HeroSection';

function Home() {
  const [courses, setCourses] = useState(initialCourseData);

  return (
    <div className="relative min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      
      {/* Course List Section (CRUD akan di-implementasi di sini) */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Pilihan Kursus Kami</h2>
        <p className="text-gray-600 mb-8">Tingkatkan skill digital kamu bersama mentor berpengalaman.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map(course => (
            <div key={course.id} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover mb-4 rounded-lg bg-gray-100" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded">{course.category}</span>
                  <span className="text-xs text-gray-500">{course.level}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4">By: {course.instructor}</p>
              </div>
              <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                <p className="font-bold text-blue-600 text-lg">Rp {course.price.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
