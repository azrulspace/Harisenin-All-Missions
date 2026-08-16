import React, { useState } from 'react';
import { initialCourseData } from '../services/courseData';
import Navbar from '../layouts/Navbar';
import HeroSection from '../components/HeroSection';
import FocusMaterials from '../components/FocusMaterials';
import WhyChooseUs from '../components/WhyChooseUs';
import CourseSection from '../components/CourseSection';

function Home() {
  const [courses, setCourses] = useState(initialCourseData);

  return (
    <div className="relative min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      
      <FocusMaterials />
      
      <WhyChooseUs />
      
      <CourseSection courses={courses} />
    </div>
  );
}

export default Home;
