import React from 'react';

export function CampusBackground({ campusPhoto }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Real Campus Photograph */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <img
          src={campusPhoto}
          alt="Kangeyam Institute of Technology Campus"
          className="w-full h-full object-cover object-center filter saturate-90 contrast-105 opacity-35"
          onError={(e) => {
            e.currentTarget.src = '/assets/campus-clean.png';
          }}
        />
      </div>

      {/* Cyber Grid Pattern Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-25" />

      {/* Deep Navy / Dark Blue Multi-layer Overlays for High Contrast Readability */}
      {/* 1. Base dark navy background overlay */}
      <div className="absolute inset-0 bg-[#050B1B]/70" />

      {/* 2. Top-to-bottom vignette gradient: strong at top & bottom, moderate in mid-section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B] via-[#050B1B]/55 to-[#050B1B]" />

      {/* 3. Radial spotlight behind timer to keep typography razor sharp */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#1677FF]/10 via-[#7B3FF2]/10 to-transparent rounded-full blur-3xl" />

      {/* 4. Fine circuit traces / futuristic accent lines */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#1677FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7B3FF2" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M 0 120 L 180 120 L 240 180 L 400 180" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 100% 120 L calc(100% - 180px) 120 L calc(100% - 240px) 180 L calc(100% - 400px) 180" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 0 85% L 120 85% L 180 calc(85% - 60px) L 320 calc(85% - 60px)" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" />
          <path d="M 100% 85% L calc(100% - 120px) 85% L calc(100% - 180px) calc(85% - 60px) L calc(100% - 320px) calc(85% - 60px)" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
