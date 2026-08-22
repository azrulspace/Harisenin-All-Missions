import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseDetailNavbar from '../layouts/CourseDetailNavbar';
import Footer from '../layouts/Footer';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { mockCourseDetail } from '../services/courseData';
import iconPdf from '../assets/icons/Product Page/file-pdf.svg';
import iconPdfBold from '../assets/icons/Product Page/file-pdf-bold.svg';
import iconPptx from '../assets/icons/Product Page/papers-text.svg';
import iconPptxBold from '../assets/icons/Product Page/papers-text-bold.svg';
import iconText from '../assets/icons/Product Page/note-text.svg';
import iconTextBold from '../assets/icons/Product Page/note-text-bold.svg';
import iconVideo from '../assets/icons/Product Page/video-play.svg';
import iconVideoBold from '../assets/icons/Product Page/video-play-bold.svg';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = mockCourseDetail;
  
  const [expandedSessions, setExpandedSessions] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleSession = (index) => {
    setExpandedSessions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAll = () => {
    const allExpanded = {};
    course.chapters.forEach((_, index) => {
      allExpanded[index] = true;
    });
    setExpandedSessions(allExpanded);
  };

  const hideAll = () => {
    setExpandedSessions({});
  };

  const isAllExpanded = Object.keys(expandedSessions).length === course.chapters.length && Object.values(expandedSessions).every(Boolean);

  const handleEnrollClick = () => {
    setIsLoginModalOpen(true);
  };

  const getLessonIcon = (type) => {
    const t = type.toLowerCase();
    if (t === 'video') return <img src={iconVideo} alt="Video" className="w-5 h-5" />;
    if (t === 'pdf') return <img src={iconPdf} alt="PDF" className="w-5 h-5" />;
    if (t === 'pptx') return <img src={iconPptx} alt="PPTX" className="w-5 h-5" />;
    if (t === 'text-based') return <img src={iconText} alt="Text" className="w-5 h-5" />;
    return <img src={iconPdf} alt="File" className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <CourseDetailNavbar 
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
      />
      
      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
            <div className="lg:col-span-8">
              
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {course.title}
                </h1>
                <div className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>{course.learnersJoined} Learners joined</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mt-6 mb-10">
                {course.description}
              </p>

              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Content</h2>
                  <button 
                    onClick={isAllExpanded ? hideAll : expandAll}
                    className="text-[#0070F3] text-sm font-semibold hover:underline"
                  >
                    {isAllExpanded ? 'Hide all lessons' : 'Expand all'}
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <button 
                        onClick={() => toggleSession(index)}
                        className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`transform transition-transform ${expandedSessions[index] ? 'rotate-180' : ''}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-900">{chapter.title}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500">
                          {chapter.lessons.length} Materials • {chapter.duration}
                        </span>
                      </button>

                      {expandedSessions[index] && (
                        <div className="border-t border-gray-100">
                          <div className="px-5 py-2 grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <div className="col-span-8">Lesson Material</div>
                            <div className="col-span-2 text-center">Duration</div>
                            <div className="col-span-2 text-center">Type</div>
                          </div>
                          
                          {chapter.lessons.length > 0 ? (
                            <div className="flex flex-col">
                              {chapter.lessons.map((lesson) => (
                                <div key={lesson.id} className="px-5 py-4 grid grid-cols-12 items-center hover:bg-gray-50 transition-colors border-t border-gray-50">
                                  <div className="col-span-8 flex items-center gap-3">
                                    {getLessonIcon(lesson.type)}
                                    <span className="text-sm font-medium text-gray-700">{lesson.title}</span>
                                  </div>
                                  <div className="col-span-2 text-center text-sm text-gray-500 font-mono">
                                    {lesson.duration}
                                  </div>
                                  <div className="col-span-2 flex justify-center">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                                      {lesson.type}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="px-5 py-6 text-center text-sm text-gray-400 border-t border-gray-50">
                              Tidak ada materi di sesi ini.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">About Educators</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {course.educators.map((educator) => (
                    <div key={educator.id} className="bg-white rounded-[20px] overflow-hidden border border-gray-200 group cursor-pointer relative pb-4">
                      <div className="h-[240px] w-full overflow-hidden bg-gray-100 relative">
                        <img 
                          src={educator.avatar} 
                          alt={educator.name} 
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                      </div>
                      <div className="px-5 relative z-10 -mt-8">
                        <div className="flex items-end justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{educator.name}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">{educator.role}</p>
                          </div>
                          <a href={educator.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors mb-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="lg:col-span-4 sticky top-28 self-start">
              <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-sm flex flex-col gap-5">
                
                {/* Cover Image */}
                <img 
                  src={course.coverImage} 
                  alt="Course Cover" 
                  className="rounded-xl w-full h-[220px] object-cover"
                />

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium text-sm">Harga Kelas</span>
                  <span className={`font-bold text-xl ${course.isFree ? 'text-[#EA3829]' : 'text-gray-900'}`}>
                    {course.isFree ? 'GRATIS' : `Rp ${course.price}`}
                  </span>
                </div>

                <button 
                  onClick={handleEnrollClick}
                  className="bg-[#0070F3] hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl w-full transition-colors"
                >
                  Enroll Kelas
                </button>

                <button className="text-sm font-medium text-gray-600 flex items-center justify-center gap-2 hover:text-gray-900 transition-colors w-full py-1">
                  Share This Course 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </button>

                <div className="border-t border-gray-100 my-2"></div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-4">Course Lesson Included</h3>
                  <div className="flex flex-col gap-3.5">
                    {course.included.pdf > 0 && (
                      <div className="flex items-center gap-3">
                        <img src={iconPdfBold} alt="PDF" className="w-5 h-5" />
                        <span className="text-sm font-medium text-gray-700">{course.included.pdf} PDF Lesson</span>
                      </div>
                    )}
                    {course.included.pptx > 0 && (
                      <div className="flex items-center gap-3">
                        <img src={iconPptxBold} alt="PPTX" className="w-5 h-5" />
                        <span className="text-sm font-medium text-gray-700">{course.included.pptx} PPTX Lesson</span>
                      </div>
                    )}
                    {course.included.text > 0 && (
                      <div className="flex items-center gap-3">
                        <img src={iconTextBold} alt="Text" className="w-5 h-5" />
                        <span className="text-sm font-medium text-gray-700">{course.included.text} Text-Based Lesson</span>
                      </div>
                    )}
                    {course.included.video > 0 && (
                      <div className="flex items-center gap-3">
                        <img src={iconVideoBold} alt="Video" className="w-5 h-5" />
                        <span className="text-sm font-medium text-gray-700">{course.included.video} Video Lesson</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
    </div>
  );
}
