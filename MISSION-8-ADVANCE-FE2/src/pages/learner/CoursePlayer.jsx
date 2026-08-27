import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseCurriculum, getLessonProgress, markLessonCompleted } from '../../services/learnerService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById as fetchCourseByIdThunk } from '../../store/slices/courseSlice';

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'youtube.com/embed/');
  }
  return url;
};

export default function CoursePlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [curriculum, setCurriculum] = useState([]);
  const [progress, setProgress] = useState({ completed: 0, total: 6, completedLessons: [] });
  const [courseTitle, setCourseTitle] = useState('Memuat kursus...');
  const [loading, setLoading] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      const loadData = async () => {
        setLoading(true);
        try {
          const resultAction = await dispatch(fetchCourseByIdThunk(courseId));
          if (fetchCourseByIdThunk.fulfilled.match(resultAction)) {
            const course = resultAction.payload;
            if (course) {
              setCourseTitle(course.title);
              
              const curData = getCourseCurriculum(course);
              setCurriculum(curData);
              
              const totalMaterials = curData.reduce((acc, sec) => acc + sec.materialsCount, 0);
              setProgress(getLessonProgress(courseId, totalMaterials));
            }
          }
        } catch (error) {
          console.error("Failed to load course player data:", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [courseId]);

  // Flatten lessons to easily find previous/next
  const allLessons = useMemo(() => {
    return curriculum.flatMap(session => session.lessons);
  }, [curriculum]);

  // If lessonId from URL is invalid, redirect to the first lesson
  useEffect(() => {
    if (!loading && allLessons.length > 0) {
      const validIndex = allLessons.findIndex(l => String(l.id) === String(lessonId));
      if (validIndex === -1) {
        navigate(`/learner/course-player/${courseId}/lesson/${allLessons[0].id}`, { replace: true });
      }
    }
  }, [lessonId, allLessons, loading, courseId, navigate]);

  const currentLessonIndexRaw = allLessons.findIndex(l => String(l.id) === String(lessonId));
  const currentLessonIndex = currentLessonIndexRaw !== -1 ? currentLessonIndexRaw : 0;
  const currentLesson = allLessons[currentLessonIndex];
  
  // Find current session for the lesson
  const currentSession = curriculum.find(session => 
    session.lessons.some(l => String(l.id) === String(currentLesson?.id))
  );

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCompleted = currentLesson ? progress.completedLessons.includes(String(currentLesson.id)) : false;

  const handleMarkCompleted = () => {
    if (courseId && currentLesson) {
      const newProgress = markLessonCompleted(courseId, currentLesson.id);
      setProgress({ ...newProgress });
    }
  };

  const handleNext = () => {
    if (isCompleted && nextLesson) {
      navigate(`/learner/course-player/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (prevLesson) {
      navigate(`/learner/course-player/${courseId}/lesson/${prevLesson.id}`);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Memuat materi...</div>;
  }

  if (!currentLesson) {
    return <div className="p-8 text-center text-gray-500">Materi belum tersedia untuk kelas ini.</div>;
  }

  // Calculate progress percentage
  const progressPercentage = Math.round((progress.completed / progress.total) * 100) || 0;

  // Icon helper based on type
  const getIconForType = (type, isActive, isCompleted) => {
    if (isCompleted) {
      return (
        <div className="bg-emerald-500 text-white rounded-full p-[3px] w-[20px] h-[20px] flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      );
    }
    
    const colorClass = isActive ? "text-blue-600" : "text-gray-400";
    
    switch (type) {
      case 'VIDEO':
        return (
          <svg className={`shrink-0 ${colorClass}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        );
      case 'SLIDE':
      case 'PDF':
        return (
          <svg className={`shrink-0 ${colorClass}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'TEXT':
      default:
        return (
          <svg className={`shrink-0 ${colorClass}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Topbar */}
      <header className="h-[64px] border-b border-gray-200 px-6 flex items-center shrink-0">
        <Link 
          to="/learner/my-learning" 
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Dashboard
        </Link>
        <div className="h-4 w-[1px] bg-gray-300 mx-3"></div>
        <h1 className="text-sm font-bold text-gray-900 truncate">
          {courseTitle}
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative bg-[#FAFAFA]">
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="w-full max-w-5xl mx-auto flex flex-col">
              
              {/* Media Player Container */}
              <div className="w-full aspect-video rounded-2xl bg-gray-100 overflow-hidden relative flex items-center justify-center border border-gray-200 shrink-0 shadow-sm">
                {currentLesson.type === 'VIDEO' && currentLesson.contentUrl && (
                  <iframe 
                    src={getEmbedUrl(currentLesson.contentUrl)} 
                    title={currentLesson.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                )}
                {currentLesson.type === 'SLIDE' && currentLesson.contentUrl && (
                  <iframe 
                    src={currentLesson.contentUrl} 
                    title={currentLesson.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                )}
                {currentLesson.type === 'PDF' && currentLesson.contentUrl && (
                  <iframe 
                    src={`${currentLesson.contentUrl}#toolbar=0`} 
                    title={currentLesson.title}
                    className="w-full h-full"
                  ></iframe>
                )}
                {currentLesson.type === 'TEXT' && (
                  <div className="w-full h-full p-8 bg-white overflow-y-auto">
                    <div className="max-w-2xl mx-auto prose prose-blue">
                      <h2>{currentLesson.title}</h2>
                      <p>{currentLesson.description}</p>
                    </div>
                  </div>
                )}
                {(!currentLesson.contentUrl && currentLesson.type !== 'TEXT') && (
                  <div className="text-gray-400 flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="2.5" ry="2.5"></rect>
                      <line x1="12" y1="2" x2="12" y2="22"></line>
                    </svg>
                    <span>Media not available</span>
                  </div>
                )}
              </div>

              {/* Lesson Information & Header */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{currentSession?.title}</p>
                </div>

                {/* Completion Action Button */}
                {!isCompleted ? (
                  <button 
                    onClick={handleMarkCompleted}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shrink-0 bg-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    Mark as Completed
                  </button>
                ) : (
                  <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-semibold px-5 py-2 rounded-full flex items-center justify-center gap-2 text-sm pointer-events-none shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.76 11.7574L11.0026 16Z"></path>
                    </svg>
                    Lesson Completed
                  </div>
                )}
              </div>

              {/* Description Section */}
              {currentLesson.description && (
                <div className="mt-8 mb-8">
                  <h3 className="text-base font-bold text-gray-900 mb-2">About this material</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-3xl whitespace-pre-line">
                    {currentLesson.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="bg-white border-t border-gray-200 px-6 md:px-8 py-5 shrink-0 w-full z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
            <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
              <button 
                onClick={handlePrev}
                disabled={!prevLesson}
                className={!prevLesson 
                  ? "border border-gray-200 text-gray-300 cursor-not-allowed px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 bg-gray-50/50" 
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 bg-white"
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>

              {nextLesson ? (
                <button 
                  onClick={handleNext}
                  disabled={!isCompleted}
                  className={!isCompleted
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                    : "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
                  }
                >
                  Next Lesson
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => setShowCompletionModal(true)}
                  disabled={!isCompleted}
                  className={!isCompleted
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
                  }
                >
                  Complete Course
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Kanan (Course Content) */}
        <aside className="w-[320px] xl:w-[380px] bg-white border-l border-gray-200 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-200 bg-[#F5F5F5] shrink-0">
            <h2 className="text-lg font-bold text-gray-900">Course Content</h2>
            <div className="flex items-center justify-between mt-4 mb-2">
              <span className="text-xs text-gray-600 font-medium">Progress Belajar</span>
              <span className="text-xs text-gray-900 font-bold">{progress.completed} / {progress.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {curriculum.map((session, sIdx) => (
              <div key={session.id} className="border-b border-gray-100 last:border-b-0 pb-2">
                {/* Session Header */}
                <div className="px-6 pt-5 pb-3">
                  <h3 className="font-bold text-sm text-gray-900">{session.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{session.materialsCount} materials</p>
                </div>

                {/* Lessons */}
                <div className="flex flex-col">
                  {session.lessons.map((lesson) => {
                    const isActive = String(lesson.id) === String(lessonId);
                    const lessonCompleted = progress.completedLessons.includes(String(lesson.id));
                    const globalIndex = allLessons.findIndex(l => String(l.id) === String(lesson.id));
                    const isUnlocked = globalIndex === 0 || 
                                       progress.completedLessons.includes(String(allLessons[globalIndex - 1]?.id)) ||
                                       lessonCompleted;

                    const content = (
                      <>
                        {/* Status Icon */}
                        <div className="mt-0.5">
                          {getIconForType(lesson.type, isActive, lessonCompleted)}
                        </div>

                        <div>
                          <h4 className={`text-sm ${isActive ? 'font-semibold text-blue-600' : 'font-medium text-gray-700'}`}>
                            {lesson.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 font-medium mt-1 uppercase tracking-wider">
                            {lesson.type} • {lesson.duration}
                          </p>
                        </div>
                      </>
                    );

                    if (!isUnlocked) {
                      return (
                        <div 
                          key={lesson.id}
                          className="flex items-start gap-3 px-6 py-3 border-l-4 border-transparent opacity-60 cursor-not-allowed"
                        >
                          {content}
                        </div>
                      );
                    }
                    
                    return (
                      <Link 
                        key={lesson.id}
                        to={`/learner/course-player/${courseId}/lesson/${lesson.id}`}
                        className={`flex items-start gap-3 px-6 py-3 transition-colors ${
                          isActive 
                            ? 'bg-blue-50/70 border-l-4 border-blue-600' 
                            : 'border-l-4 border-transparent hover:bg-gray-50'
                        }`}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

      </div>

      {/* Course Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h2>
            <p className="text-gray-600 mb-8">
              You have successfully completed <strong>{courseTitle}</strong>. Great job on finishing all the materials!
            </p>
            <button
              onClick={() => navigate('/learner/my-learning')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Go to My Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
