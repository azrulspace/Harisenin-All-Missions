import React, { useState } from 'react';
import materiUiUx from '../assets/images/materi-uiux-image.png';

const focusMaterialsData = [
  {
    id: 0,
    category: "UI/UX",
    icon: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    subheading: "UI/UX DESIGN",
    title: "Crafting Mobile App & Website Design",
    description: "Learn UI/UX in depth, product thinking, UX Research, PRD, Design System, Prototyping, UX Writing, Testing.",
    tools: ["Figma", "ChatGPT", "Claude"],
    image: materiUiUx
  },
  {
    id: 1,
    category: "Visual Design",
    icon: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    subheading: "VISUAL DESIGN",
    title: "Mastering Visual Elements",
    description: "Learn about typography, color theory, layout, and visual hierarchy to create stunning designs.",
    tools: ["Illustrator", "Photoshop", "Figma"],
    image: "https://placehold.co/600x400/F8F9FB/1a202c?text=Visual+Design"
  },
  {
    id: 2,
    category: "Framer Website",
    icon: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
    ),
    subheading: "FRAMER WEBSITE",
    title: "Building Interactive Websites",
    description: "Create high-performance, interactive, and responsive websites without writing complex code using Framer.",
    tools: ["Framer", "React"],
    image: "https://placehold.co/600x400/F8F9FB/1a202c?text=Framer+Website"
  },
  {
    id: 3,
    category: "3D Design",
    icon: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
    ),
    subheading: "3D DESIGN",
    title: "Creating 3D Models & Assets",
    description: "Learn 3D modeling, texturing, lighting, and rendering to create immersive digital experiences.",
    tools: ["Blender", "Spline", "Cinema4D"],
    image: "https://placehold.co/600x400/F8F9FB/1a202c?text=3D+Design"
  },
  {
    id: 4,
    category: "Figma to Vibe Coding",
    icon: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
    subheading: "FIGMA TO VIBE CODING",
    title: "Transforming Design into Code",
    description: "Seamlessly translate Figma designs into pixel-perfect, interactive code using modern web technologies.",
    tools: ["Figma", "React", "Tailwind"],
    image: "https://placehold.co/600x400/F8F9FB/1a202c?text=Vibe+Coding"
  },
  {
    id: 5,
    category: "Video Editing",
    icon: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
    ),
    subheading: "VIDEO EDITING",
    title: "Crafting Compelling Stories",
    description: "Master the art of video editing, color grading, and audio mixing to produce professional-quality videos.",
    tools: ["Premiere", "DaVinci", "CapCut"],
    image: "https://placehold.co/600x400/F8F9FB/1a202c?text=Video+Editing"
  },
  {
    id: 6,
    category: "Motion Graphic",
    icon: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    subheading: "MOTION GRAPHIC",
    title: "Bringing Designs to Life",
    description: "Create engaging animations and motion graphics that communicate complex ideas simply and beautifully.",
    tools: ["After Effects", "Lottie", "Protopie"],
    image: "https://placehold.co/600x400/F8F9FB/1a202c?text=Motion+Graphic"
  }
];

export default function FocusMaterials() {
  const [activeTab, setActiveTab] = useState(0);
  
  const currentData = focusMaterialsData[activeTab];

  return (
    <section className="bg-[#F8F9FB] py-20 font-sans">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Fokus Materi</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a202c]">Delapan bidang keahlian DKV</h2>
        </div>

        {/* Tab Navigation (Pill Tabs Bar) */}
        <div className="flex justify-center mb-10 w-full overflow-hidden">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide max-w-full items-center bg-white rounded-full p-2 border border-gray-100 shadow-sm gap-2">
            {focusMaterialsData.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                    activeTab === index 
                    ? 'bg-[#F1F5F9] text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.category}
                </button>
                {index !== focusMaterialsData.length - 1 && (
                  <span className="text-gray-200">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Interactive Content Container */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <div className="transition-all duration-500 ease-in-out transform" key={`content-${activeTab}`}>
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6 text-[#1a202c] shadow-sm">
                {React.cloneElement(currentData.icon, { className: "w-6 h-6 mr-0" })}
              </div>
              
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                {currentData.subheading}
              </h4>
              
              <h3 className="text-3xl md:text-4xl font-bold text-[#1a202c] mb-6 leading-tight">
                {currentData.title}
              </h3>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md">
                {currentData.description}
              </p>
              
              <div className="flex items-center space-x-6">
                {currentData.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center text-gray-800 font-semibold text-sm">
                    <div className="w-6 h-6 mr-2 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-xs">
                      ✨
                    </div>
                    {tool}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div 
              key={`image-${activeTab}`}
              className="relative rounded-2xl overflow-hidden bg-gray-50 transition-opacity duration-500 ease-in-out h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center animate-fade-in"
            >
              <img 
                src={currentData.image} 
                alt={currentData.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
