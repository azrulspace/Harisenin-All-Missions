import React, { useState, useEffect } from 'react';
import { useCourses } from '../hooks/useCourses';
import Navbar from '../layouts/Navbar';
import HeroSection from '../components/HeroSection';
import FocusMaterials from '../components/FocusMaterials';
import WhyChooseUs from '../components/WhyChooseUs';
import CourseSection from '../components/CourseSection';
import Footer from '../layouts/Footer';

function Home() {
  const [courses, setCourses] = useState([]);
  const { fetchCourses, loading } = useCourses();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const allCourses = await fetchCourses();
        const publicCourses = allCourses.filter(c => c.status === 'ACTIVE' || c.status === 'COMING_SOON');
        setCourses(publicCourses);
      } catch (err) {
        console.error("Failed to fetch public courses", err);
      }
    };
    loadCourses();
  }, [fetchCourses]);

  return (
    <div className="relative min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      
      <FocusMaterials />
      
      <WhyChooseUs />
      
      {loading ? (
        <div className="py-20 text-center text-gray-500">Memuat kursus...</div>
      ) : (
        <CourseSection courses={courses} />
      )}

      <Footer />
    </div>
  );
}

export default Home;
