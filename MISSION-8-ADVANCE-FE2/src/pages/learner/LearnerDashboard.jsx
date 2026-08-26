import React, { useState, useEffect } from 'react';
import { courseApi } from '../../services/api/courseApi';
import LearnerCourseCard from '../../components/learner/LearnerCourseCard';

export default function LearnerDashboard() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseApi.fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollSuccess = (course) => {
    setToast({
      show: true,
      message: `Berhasil enroll kelas ${course.title}! Kelas telah ditambahkan ke My Learning`
    });
    
    // Hide toast after 3s
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const [levelFilter, setLevelFilter] = useState('');

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = course.title?.toLowerCase().includes(query);
    const softwareMatch = course.software?.toLowerCase().includes(query);
    const categoryMatch = course.category?.toLowerCase().includes(query);
    const searchMatch = titleMatch || softwareMatch || categoryMatch;
    
    const levelMatch = levelFilter ? course.level === levelFilter : true;
    
    return searchMatch && levelMatch;
  });

  return (
    <div className="max-w-[1200px] mx-auto pb-12 pt-8 px-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-8 right-8 z-50 animate-fade-in">
          <div className="bg-white border-l-4 border-green-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Berhasil!</p>
              <p className="text-gray-500 text-sm mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header & Controls */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Explore Courses</h1>
        <p className="text-sm text-gray-500 mb-6">Discover and enroll in courses to upgrade your skills.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer appearance-none bg-white text-gray-700"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'%3E%3C/polygon%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Semua Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((sk) => (
            <div key={sk} className="h-[460px] bg-gray-100 animate-pulse rounded-[24px]"></div>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-20 text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 className="text-gray-900 font-semibold mb-1">Course not found</h3>
          <p className="text-gray-500 text-sm">Coba kata kunci lain atau gunakan kategori pencarian berbeda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <LearnerCourseCard 
              key={course.id} 
              course={course} 
              onEnrollSuccess={handleEnrollSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
