import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseForm from '../../components/admin/CourseForm';
import { useCourses } from '../../hooks/useCourses';

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const { fetchCourseById, updateCourse } = useCourses();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const course = await fetchCourseById(id);
        if (course) {
          // Reconstruct form data from stored course format
          setInitialData({
            title: course.title,
            description: course.description || '',
            level: course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1).toLowerCase() : 'Beginner',
            software: course.software || '',
            price: course.price || 0,
            isFree: course.isFree || false,
            thumbnailUrl: course.thumbnailUrl || '',
            status: course.status === 'ACTIVE' ? 'PUBLISHED' : course.status,
            sections: course.chapters || [],
            educators: []
          });
        } else {
          navigate('/admin/courses');
        }
      } catch (err) {
        console.error(err);
        navigate('/admin/courses');
      }
    };
    loadCourse();
  }, [id, navigate, fetchCourseById]);

  const handleUpdateCourse = async (formData) => {
    const updatedCourseData = {
      title: formData.title,
      software: formData.software,
      description: formData.description,
      thumbnailUrl: formData.thumbnailUrl || initialData.thumbnailUrl || "https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      level: formData.level.toUpperCase(),
      status: formData.status === 'PUBLISHED' ? 'ACTIVE' : 'DRAFT',
      price: formData.isFree ? 0 : Number(formData.price || 0),
      isFree: formData.isFree,
      totalChapters: formData.sections?.length || 0,
      totalLessons: formData.sections?.reduce((acc, sec) => acc + (sec.materials?.length || 0), 0) || 0,
    };

    try {
      await updateCourse(id, updatedCourseData);
      navigate('/admin/courses');
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui kursus');
    }
  };

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  if (!initialData) return null;

  return (
    <div className="w-full">
      <CourseForm initialData={initialData} onSubmit={handleUpdateCourse} onCancel={handleCancel} />
    </div>
  );
}
