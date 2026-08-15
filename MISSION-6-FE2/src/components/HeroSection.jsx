import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#f6f6f8] overflow-hidden flex flex-col items-center pt-[150px] lg:pt-[200px]">
      
      {/* Complex Background Gradients & Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
        {/* Glow Gradients */}
        <div className="absolute bottom-[-100px] w-full max-w-[1512px] h-[520px] opacity-45 blur-[60px]" style={{
          backgroundImage: `
            url("data:image/svg+xml;utf8,<svg viewBox='0 0 1512 520' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad1)' opacity='1'/><defs><radialGradient id='grad1' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(1.23 -48.4 -105.55 -2.6824 214.5 172)'><stop stop-color='rgba(85,233,209,0.55)' offset='0'/><stop stop-color='rgba(85,233,209,0)' offset='0.7'/></radialGradient></defs></svg>"), 
            url("data:image/svg+xml;utf8,<svg viewBox='0 0 1512 520' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad2)' opacity='1'/><defs><radialGradient id='grad2' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -39 -83.16 0 831.6 52)'><stop stop-color='rgba(3,127,237,0.45)' offset='0'/><stop stop-color='rgba(3,127,237,0)' offset='0.7'/></radialGradient></defs></svg>"), 
            url("data:image/svg+xml;utf8,<svg viewBox='0 0 1512 520' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad3)' opacity='1'/><defs><radialGradient id='grad3' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -44.2 -90.72 0 1209.6 156)'><stop stop-color='rgba(117,2,206,0.45)' offset='0'/><stop stop-color='rgba(117,2,206,0)' offset='0.7'/></radialGradient></defs></svg>"), 
            url("data:image/svg+xml;utf8,<svg viewBox='0 0 1512 520' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad4)' opacity='1'/><defs><radialGradient id='grad4' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -36.4 -68.04 0 1436.4 390)'><stop stop-color='rgba(246,195,48,0.45)' offset='0'/><stop stop-color='rgba(246,195,48,0)' offset='0.7'/></radialGradient></defs></svg>")
          `
        }} />
        
        {/* Subtle grid/radial overlay based on Figma's mix-blend-plus-lighter shapes could go here, simplified for now */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-white/40 to-transparent rounded-full blur-[100px] mix-blend-plus-lighter"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-[32px] justify-between items-start">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 lg:gap-[32px] max-w-[670px] pt-4 lg:pt-[38px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[16px]">
              <p className="font-semibold text-[20px] lg:text-[28px] leading-snug tracking-[1.12px] text-[#717680] uppercase">
                SMK DKV IDN BOARDING SCHOOL
              </p>
              <h1 className="font-semibold text-[40px] lg:text-[56px] leading-[1.1] lg:leading-[68px] tracking-tight lg:tracking-[-2.24px] text-[#181d27]">
                Sekolahnya Desainer Produk Digital Dengan AI-Driven Kurikulum
              </h1>
            </div>
            <p className="font-normal text-[16px] lg:text-[18px] leading-relaxed lg:leading-[26px] text-[#414651] opacity-85">
              Belajar jadi lebih seru dengan metode Project Based Learning! Kita bakal fokus pada UI/UX, Desain Visual, 3D, Motion Graphic, dan Video Editing, sambil asah kemampuan dengan AI design tools.
            </p>
          </div>
          
          <div>
            <button className="bg-[#0082fb] hover:bg-blue-600 transition-colors shadow-[0px_19px_15px_-3px_rgba(0,130,251,0.15)] flex h-[52px] items-center justify-center px-[32px] rounded-[100px]">
              <span className="font-semibold text-[14px] text-[#f9fafb]">
                Lihat Informasi PPDB
              </span>
            </button>
          </div>
        </div>

        {/* Right Content - Mockup Card (Agento UI Card representation) */}
        <div className="w-full lg:w-[578px] h-[400px] lg:h-[578px] bg-[#e9eaeb] rounded-t-[20px] rounded-b-[20px] lg:rounded-b-none relative overflow-hidden flex items-center justify-center border border-gray-200 shadow-xl lg:shadow-none">
           {/* Placeholder for Agento Card based on user prompt requirements */}
           <div className="bg-white p-6 rounded-2xl shadow-lg w-[80%] max-w-[400px] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xl">A</div>
                <div>
                  <h4 className="font-bold text-gray-800">Agento UI</h4>
                  <p className="text-xs text-gray-500">Dashboard Concept</p>
                </div>
              </div>
              <div className="h-32 bg-gray-50 rounded-lg border border-gray-100 p-3 flex gap-2">
                 <div className="w-1/3 h-full bg-indigo-50 rounded"></div>
                 <div className="w-2/3 h-full flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Brand Section Bottom Strip */}
      <div className="w-full bg-[#fafafa] border-t border-[#e9eaeb] mt-16 lg:mt-auto relative z-10 py-8 px-6 lg:px-[80px]">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-[40px]">
          <p className="font-normal text-[16px] leading-[1.7] text-[#717680] opacity-85 text-center lg:text-left lg:w-[296px]">
            We connect with over 100+ companies for internship opportunities.
          </p>
          
          {/* Logos Scroll / Grid */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-8 lg:gap-0 lg:flex-1 opacity-65 overflow-hidden">
            {/* ByteBoost */}
            <div className="flex items-center gap-2 lg:w-[176px] justify-center">
              <div className="grid grid-cols-2 gap-1 w-6 h-6">
                <div className="border-2 border-[#55a9f7] rounded-tr-[10px] rounded-br-[10px] rotate-180"></div>
                <div className="border-2 border-[#55a9f7] rounded-tr-[10px] rounded-br-[10px]"></div>
                <div className="border-2 border-[#3a96ed] rounded-tr-[10px] rounded-br-[10px]"></div>
                <div className="border-2 border-[#3a96ed] rounded-tr-[10px] rounded-br-[10px] rotate-180"></div>
              </div>
              <span className="font-medium text-[20px] lg:text-[24px] text-[#1f3f5c] tracking-tight">ByteBoost</span>
            </div>
            
            <div className="hidden lg:block w-[1px] h-8 bg-gray-300 mx-4"></div>

            {/* Hexagon */}
            <div className="flex items-center gap-2 lg:w-[176px] justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7.5V16.5L12 22L22 16.5V7.5L12 2Z" stroke="#48C774" strokeWidth="3" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium text-[20px] lg:text-[24px] text-[#1f3f5c] tracking-tight">Hexagon</span>
            </div>

            <div className="hidden lg:block w-[1px] h-8 bg-gray-300 mx-4"></div>

            {/* Codelink */}
            <div className="flex items-center gap-2 lg:w-[176px] justify-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#F15A42" strokeWidth="4"/>
                  <circle cx="12" cy="12" r="4" fill="#F15A42"/>
               </svg>
              <span className="font-medium text-[20px] lg:text-[24px] text-[#1f3f5c] tracking-tight">Codelink</span>
            </div>

            <div className="hidden lg:block w-[1px] h-8 bg-gray-300 mx-4"></div>

            {/* Netdot */}
            <div className="flex items-center gap-2 lg:w-[176px] justify-center">
              <div className="bg-[#4D96FF] w-6 h-6 rounded flex items-center justify-center">
                 <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-medium text-[20px] lg:text-[24px] text-[#1f3f5c] tracking-tight">Netdot</span>
            </div>

            <div className="hidden lg:block w-[1px] h-8 bg-gray-300 mx-4"></div>

            {/* Webgear */}
            <div className="flex items-center gap-2 lg:w-[176px] justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L8 4H16L20 12L16 20H8L4 12Z" fill="#84B6F4"/>
              </svg>
              <span className="font-medium text-[20px] lg:text-[24px] text-[#1f3f5c] tracking-tight">Webgear</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
