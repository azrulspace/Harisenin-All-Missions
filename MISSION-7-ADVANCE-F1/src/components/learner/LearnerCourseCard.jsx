import React, { useState, useEffect } from 'react';
import iconChapter from '../../assets/icons/course-card/icon-chapter.svg';
import iconFileText from '../../assets/icons/course-card/file-text.svg';
import iconBeginner from '../../assets/icons/course-card/icon-skill-level-beginner.svg';
import iconIntermediate from '../../assets/icons/course-card/icon-skill-level-intermediate.svg';
import iconAdvance from '../../assets/icons/course-card/icon-skill-level-advance.svg';
import iconMoney from '../../assets/icons/course-card/money-bill.svg';

import { enrollInCourse, isEnrolled } from '../../services/learnerService';

export default function LearnerCourseCard({ course, onEnrollSuccess }) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setEnrolled(isEnrolled(course.id));
  }, [course.id]);

  const isComingSoon = course.status === 'COMING_SOON';
  const totalMaterials = course.detailData?.sections?.reduce((acc, section) => acc + (section.materials?.length || 0), 0) || course.videos || 0;

  const getLevelIcon = (level) => {
    const l = level?.toLowerCase();
    if (l === 'advanced' || l === 'advance') return iconAdvance;
    if (l === 'intermediate') return iconIntermediate;
    return iconBeginner;
  };

  const isFree = course.price === 'GRATIS' || Number(course.price) === 0 || course.isFree;

  const handleEnroll = async () => {
    if (isComingSoon || enrolled) return;
    
    // For now, auto-enroll if it's free or has price 0. 
    // In a real flow, a non-free course would redirect to checkout.
    // Based on requirements, if GRATIS, we enroll directly.
    setLoading(true);
    if (isFree) {
      await enrollInCourse(course.id);
      setEnrolled(true);
      if (onEnrollSuccess) {
        onEnrollSuccess(course);
      }
    } else {
      // Simulate non-free behavior if needed (e.g. redirect to purchase)
      // For now, just enroll as per standard testing flow, or you could navigate to checkout.
      await enrollInCourse(course.id);
      setEnrolled(true);
      if (onEnrollSuccess) {
        onEnrollSuccess(course);
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#F8F9FA] rounded-[24px] border border-gray-200/70 p-2.5 pb-3 flex flex-col justify-between h-full w-full">
      <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col h-full overflow-hidden">
        
        {course.coverImage ? (
          <div className="relative h-[178px] shrink-0">
            <img src={course.coverImage} alt="Course Cover" className="w-full h-full object-cover" />
            {isComingSoon ? (
              <div className="absolute top-5 left-5 bg-[#0070F3] text-white text-[12px] font-semibold px-3 py-1 rounded-full w-fit flex items-center gap-1.5 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
                <span>Coming Soon</span>
              </div>
            ) : (
              <div className="absolute top-5 left-5 bg-[#EA3829] text-white text-[12px] font-semibold px-3 py-1 rounded-full w-fit flex items-center gap-1.5 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                <span>New Course</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative h-[178px] bg-gradient-to-br from-[#DFF2ED]/60 via-[#E4F0F4]/60 to-[#EFE9F5]/70 p-5 flex flex-col justify-between shrink-0">
            {isComingSoon ? (
              <div className="bg-[#0070F3] text-white text-[12px] font-semibold px-3 py-1 rounded-full w-fit flex items-center gap-1.5 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
                <span>Coming Soon</span>
              </div>
            ) : (
              <div className="bg-[#EA3829] text-white text-[12px] font-semibold px-3 py-1 rounded-full w-fit flex items-center gap-1.5 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                <span>New Course</span>
              </div>
            )}
            <div className="text-[28px] font-bold text-gray-900 tracking-tight font-mono">
              {course.software}
            </div>
          </div>
        )}

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-[20px] font-bold text-[#1a202c] leading-snug mb-3 line-clamp-2" title={course.title}>{course.title}</h3>
          <p className="text-[15px] text-[#4A5568] leading-relaxed min-h-[44px] mb-5 line-clamp-3" title={course.description}>
            {course.description}
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-[14px] text-[#4A5568] font-medium mb-6 mt-1">
            <div className="flex items-center">
              <img src={iconChapter} alt="Chapter" className="w-5 h-5 mr-2 opacity-80" />
              <span>{course.chapters || course.detailData?.sections?.length || 0} Chapter</span>
            </div>
            <div className="flex items-center">
              <img src={iconFileText} alt="Materi" className="w-5 h-5 mr-2 opacity-80" />
              <span>{totalMaterials} Materi</span>
            </div>
            <div className="flex items-center">
              <img src={getLevelIcon(course.level)} alt="Level" className="w-5 h-5 mr-2 opacity-80" />
              <span>{course.level || "Beginner"}</span>
            </div>
            <div className="flex items-center">
              <img src={iconMoney} alt="Price" className="w-5 h-5 mr-2 opacity-80" />
              <span className={isFree ? 'text-[#4A5568]' : ''}>
                {isFree ? 'GRATIS' : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
              </span>
            </div>
          </div>

          <div className="mt-auto">
            {enrolled ? (
              <button 
                className="w-full py-[14px] px-4 rounded-xl bg-[#F3F4F6] text-[#9CA3AF] font-semibold text-[15px] flex items-center justify-center gap-2 cursor-not-allowed pointer-events-none"
                disabled
              >
                Enrolled
              </button>
            ) : (
              <button 
                onClick={handleEnroll}
                disabled={isComingSoon || loading}
                className={
                  isComingSoon 
                  ? 'w-full py-[14px] px-4 rounded-xl bg-[#F3F4F6] text-[#9CA3AF] font-semibold text-[15px] flex items-center justify-center gap-2 cursor-not-allowed pointer-events-none'
                  : 'w-full py-[14px] px-4 rounded-xl bg-[#08091E] hover:bg-[#151733] text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors'
                }
              >
                {loading ? 'Processing...' : 'Enroll Kelas'}
                {!isComingSoon && !loading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-[12px] font-semibold tracking-widest text-[#9CA3AF] uppercase pt-3 pb-1">
        {isComingSoon ? 'COMING SOON' : course.footer || 'LAST UPDATE 16 AUG 2026'}
      </div>
    </div>
  );
}
