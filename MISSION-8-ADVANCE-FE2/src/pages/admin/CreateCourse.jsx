import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from '../../components/admin/CourseForm';
import { useCourses } from '../../hooks/useCourses';

export default function CreateCourse() {
  const navigate = useNavigate();
  const { createCourse } = useCourses();

  const handleCreateCourse = async (formData) => {
    // Map to backend Prisma schema
    const newCourse = {
      title: formData.title,
      software: formData.software,
      description: formData.description,
      thumbnailUrl: formData.thumbnailUrl || "https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      level: formData.level.toUpperCase(),
      status: formData.status === 'PUBLISHED' ? 'ACTIVE' : 'DRAFT',
      price: formData.isFree ? 0 : Number(formData.price || 0),
      isFree: formData.isFree,
      totalChapters: formData.sections?.length || 0,
      totalLessons: formData.sections?.reduce((acc, sec) => acc + (sec.materials?.length || 0), 0) || 0,
    };

    try {
      await createCourse(newCourse);
      navigate('/admin/courses');
    } catch (err) {
      console.error(err);
      alert('Gagal membuat kursus');
    }
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
