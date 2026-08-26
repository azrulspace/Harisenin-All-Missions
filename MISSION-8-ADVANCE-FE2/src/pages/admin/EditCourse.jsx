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
            level: course.level || 'Beginner',
            software: course.software || '',
            price: course.price === 'GRATIS' ? 0 : Number(course.price),
            isFree: course.price === 'GRATIS',
            thumbnailUrl: course.detailData?.coverImage || '',
            status: course.status === 'ACTIVE' ? 'PUBLISHED' : course.status,
            sections: course.detailData?.sections || [],
            educators: course.detailData?.educators || []
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
      software: formData.software,
      title: formData.title,
      description: formData.description,
      chapters: formData.sections.length,
      videos: formData.sections.reduce((acc, sec) => acc + sec.materials.length, 0),
      level: formData.level,
      price: formData.isFree ? 'GRATIS' : formData.price,
      status: formData.status === 'PUBLISHED' ? 'ACTIVE' : formData.status,
      lastEdit: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      footer: formData.status === 'PUBLISHED' ? `LAST UPDATE ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}` : 'COMING SOON',
      detailData: {
        isFree: formData.isFree,
        coverImage: formData.thumbnailUrl || initialData.thumbnailUrl || "https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        educators: formData.educators,
        sections: formData.sections
      }
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
