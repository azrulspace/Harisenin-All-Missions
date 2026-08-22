import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from '../../components/admin/CourseForm';
import { getCourses, saveCourses } from '../../services/courseData';

export default function CreateCourse() {
  const navigate = useNavigate();

  const handleCreateCourse = (formData) => {
    const existingCourses = getCourses();
    
    // Convert formData to match the simplified structure required by the landing page
    // and also keep the detailed data for the detail page.
    const newCourse = {
      id: Date.now().toString(),
      software: formData.software,
      title: formData.title,
      description: formData.description,
      chapters: formData.sections.length,
      videos: formData.sections.reduce((acc, sec) => acc + sec.materials.length, 0), // Simplification: count all materials as videos for the summary
      level: formData.level,
      price: formData.isFree ? 'GRATIS' : formData.price,
      status: formData.status === 'PUBLISHED' ? 'ACTIVE' : formData.status,
      learners: 0,
      lastEdit: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      footer: formData.status === 'PUBLISHED' ? `LAST UPDATE ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}` : 'COMING SOON',
      
      // Detailed form data for the CourseDetail page to consume
      detailData: {
        isFree: formData.isFree,
        coverImage: formData.thumbnailUrl || "https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        educators: formData.educators,
        sections: formData.sections
      }
    };

    const updatedCourses = [...existingCourses, newCourse];
    saveCourses(updatedCourses);
    navigate('/admin/courses');
  };

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  return (
    <div className="w-full">
      <CourseForm onSubmit={handleCreateCourse} onCancel={handleCancel} />
    </div>
  );
}
