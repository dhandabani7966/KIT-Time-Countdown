import React from 'react';

export function CampusBackground({ campusPhoto }) {
  const photoUrl = campusPhoto || '/assets/college-campus.jpg';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Real College Campus Photograph with subtle gradient overlay (65%–80% natural visibility) */}
      <div
        className="absolute inset-0 w-full h-full filter brightness-105 contrast-105 saturate-110 transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(5, 11, 27, 0.30), rgba(5, 11, 27, 0.18), rgba(5, 11, 27, 0.38)), url('${photoUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle top & bottom edge vignette to keep header logos and footer text crystal clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B]/50 via-transparent to-[#050B1B]/60 pointer-events-none" />

      {/* Subtle Cyber Grid Pattern (restrained, 12% opacity) */}
      <div className="absolute inset-0 cyber-grid opacity-12 pointer-events-none" />

      {/* Fine futuristic HUD circuit traces */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#1677FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7B3FF2" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M 0 100 L 180 100 L 240 160 L 380 160" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 100% 100 L calc(100% - 180px) 100 L calc(100% - 240px) 160 L calc(100% - 380px) 160" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 0 88% L 140 88% L 200 calc(88% - 50px) L 320 calc(88% - 50px)" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" />
          <path d="M 100% 88% L calc(100% - 140px) 88% L calc(100% - 200px) calc(88% - 50px) L calc(100% - 320px) calc(88% - 50px)" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
