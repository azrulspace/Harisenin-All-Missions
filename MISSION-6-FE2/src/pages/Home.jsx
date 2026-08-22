import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/courseData';
import Navbar from '../layouts/Navbar';
import HeroSection from '../components/HeroSection';
import FocusMaterials from '../components/FocusMaterials';
import WhyChooseUs from '../components/WhyChooseUs';
import CourseSection from '../components/CourseSection';
import Footer from '../layouts/Footer';

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const allCourses = getCourses();
    const publicCourses = allCourses.filter(c => c.status === 'ACTIVE' || c.status === 'COMING_SOON');
    setCourses(publicCourses);
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      
      <FocusMaterials />
      
      <WhyChooseUs />
      
      <CourseSection courses={courses} />

      <Footer />
    </div>
  );
}

export default Home;
