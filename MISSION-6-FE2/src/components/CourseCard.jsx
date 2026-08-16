import React from 'react';
import iconChapter from '../assets/icons/course-card/icon-chapter.svg';
import iconVideo from '../assets/icons/course-card/video.svg';
import iconBeginner from '../assets/icons/course-card/icon-skill-level-beginner.svg';
import iconIntermediate from '../assets/icons/course-card/icon-skill-level-intermediate.svg';
import iconAdvance from '../assets/icons/course-card/icon-skill-level-advance.svg';
import iconMoney from '../assets/icons/course-card/money-bill.svg';

export default function CourseCard({ course }) {
  const isComingSoon = course.status === 'COMING_SOON';

  const getLevelIcon = (level) => {
    const l = level?.toLowerCase();
    if (l === 'advanced' || l === 'advance') return iconAdvance;
    if (l === 'intermediate') return iconIntermediate;
    return iconBeginner;
  };

  return (
    <div className="bg-[#F8F9FA] rounded-[24px] border border-gray-200/70 p-2.5 pb-3 flex flex-col justify-between h-full min-w-[320px] w-full">
      
      {/* Inner Card (White Box) */}
      <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col h-full overflow-hidden">
        
        {/* Cover Gradient Container (Flush to edge) */}
        <div className="relative h-[178px] bg-gradient-to-br from-[#DFF2ED]/60 via-[#E4F0F4]/60 to-[#EFE9F5]/70 p-5 flex flex-col justify-between shrink-0">
          
          {/* Badge New Course */}
          <div className="bg-[#EA3829] text-white text-[12px] font-semibold px-3 py-1 rounded-full w-fit flex items-center gap-1.5 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            <span>New Course</span>
          </div>
          
          {/* Software Name Overlay */}
          <div className="text-[28px] font-bold text-gray-900 tracking-tight font-mono">
            {course.software}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-[20px] font-bold text-[#1a202c] leading-snug mb-3">{course.title}</h3>
          <p className="text-[15px] text-[#4A5568] leading-relaxed min-h-[44px] mb-5">
            {course.description}
          </p>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-[14px] text-[#4A5568] font-medium mb-6 mt-1">
            <div className="flex items-center">
              <img src={iconChapter} alt="Chapter" className="w-5 h-5 mr-2 opacity-80" />
              <span>{course.chapters || 0} Chapter</span>
            </div>
            <div className="flex items-center">
              <img src={iconVideo} alt="Video" className="w-5 h-5 mr-2 opacity-80" />
              <span>{course.videos || 0} Video</span>
            </div>
            <div className="flex items-center">
              <img src={getLevelIcon(course.level)} alt="Level" className="w-5 h-5 mr-2 opacity-80" />
              <span>{course.level || "Beginner"}</span>
            </div>
            <div className="flex items-center">
              <img src={iconMoney} alt="Price" className="w-5 h-5 mr-2 opacity-80" />
              <span className={course.price === 'GRATIS' ? 'text-[#4A5568]' : ''}>
                {course.price === 'GRATIS' ? 'GRATIS' : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <button 
              className={
                isComingSoon 
                ? 'w-full py-[14px] px-4 rounded-xl bg-[#F3F4F6] text-[#9CA3AF] font-semibold text-[15px] flex items-center justify-center gap-2 cursor-not-allowed pointer-events-none'
                : 'w-full py-[14px] px-4 rounded-xl bg-[#08091E] hover:bg-[#151733] text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors'
              }
              disabled={isComingSoon}
            >
              Lihat Kelas 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Text (Outer Container) */}
      <div className="text-center text-[12px] font-semibold tracking-widest text-[#9CA3AF] uppercase pt-3 pb-1">
        {course.footer}
      </div>
    </div>
  );
}
