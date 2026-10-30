import React from 'react';

export function BrandHeader({ config, images, onOpenAdmin }) {
  return (
    <header className="relative z-20 w-full px-4 sm:px-6 pt-3 pb-2 flex items-center justify-between border-b border-cyan-500/15 bg-gradient-to-b from-[#050B1B]/95 via-[#050B1B]/80 to-transparent backdrop-blur-xs">
      {/* College Branding - Left */}
      <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer transition-transform hover:scale-[1.01]" onClick={onOpenAdmin} title="Click to manage institution details">
        <div className="relative h-11 sm:h-14 md:h-16 flex items-center">
          <img
            src={images.collegeLogo}
            alt={config.collegeName}
            className="h-full w-auto max-w-[170px] sm:max-w-[240px] md:max-w-[320px] object-contain drop-shadow-[0_2px_10px_rgba(22,119,255,0.2)]"
            onError={(e) => {
              // fallback if custom image fails
              e.currentTarget.src = '/assets/kit-logo-white.png';
            }}
          />
        </div>
      </div>

      {/* IEEE Student Branch Branding - Right */}
      <div className="flex items-center gap-2 sm:gap-3 text-right group cursor-pointer transition-transform hover:scale-[1.01]" onClick={onOpenAdmin} title="Click to manage IEEE branch details">
        <div className="relative h-10 sm:h-13 md:h-15 flex items-center">
          <img
            src={images.ieeeLogo}
            alt={config.organizerName}
            className="h-full w-auto max-w-[150px] sm:max-w-[220px] md:max-w-[280px] object-contain drop-shadow-[0_2px_10px_rgba(123,63,242,0.2)] brightness-110 filter"
            onError={(e) => {
              e.currentTarget.src = '/assets/ieee-student-branch.png';
            }}
          />
        </div>
      </div>
    </header>
  );
}
