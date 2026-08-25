import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnrolledCoursesWithProgress } from '../../services/learnerService';

export default function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const data = await getEnrolledCoursesWithProgress();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return course.title?.toLowerCase().includes(query);
  });

  const handleActionClick = (courseId) => {
    // Navigate to a placeholder course player
    navigate(`/learner/course-player/${courseId}/lesson/1`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">My Learning</h1>
          <p className="text-sm text-gray-500 mb-6">Pick up where you left off and complete your courses.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-sm">
            <svg 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" 
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Filter Button */}
          <button className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading courses...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No enrolled courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.courseId} className="bg-white rounded-[24px] border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row gap-5 items-center">
              
              {course.thumbnailUrl ? (
                <img 
                  src={course.thumbnailUrl} 
                  alt={course.title} 
                  className="rounded-2xl w-full sm:w-[220px] h-[160px] object-cover shrink-0 bg-gray-100"
                />
              ) : (
                <div className="rounded-2xl w-full sm:w-[220px] h-[160px] shrink-0 bg-gradient-to-br from-[#DFF2ED]/60 via-[#E4F0F4]/60 to-[#EFE9F5]/70 flex items-center justify-center p-4">
                  <span className="text-[20px] font-bold text-gray-900 tracking-tight font-mono text-center">
                    {course.software || 'Course'}
                  </span>
                </div>
              )}

              <div className="flex-1 w-full flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {course.completedMaterials} / {course.totalMaterials} materials completed
                  </p>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-bold text-blue-600 mb-1.5">
                    {course.progressPercentage}% Completed
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-4">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${course.progressPercentage}%` }}
                    />
                  </div>

                  {course.progressPercentage === 0 ? (
                    <button 
                      onClick={() => handleActionClick(course.courseId)}
                      className="bg-[#08091E] hover:bg-[#151733] text-white font-semibold py-3 px-5 rounded-xl w-full flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Start Learning
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleActionClick(course.courseId)}
                      className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-900 font-semibold py-3 px-5 rounded-xl w-full flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
