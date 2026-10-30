import React from 'react';

export function EventIdentity({ config, images }) {
  return (
    <div className="relative z-20 w-full px-4 pt-1 pb-2 flex items-center justify-between">
      {/* Left side text accent: THINK / CODE / SOLVE / REPEAT */}
      <div className="hidden sm:flex flex-col items-start gap-1 pl-2 select-none">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-20 bg-gradient-to-b from-[#00D9FF] via-[#1677FF] to-[#7B3FF2] rounded-full shadow-[0_0_8px_#00D9FF]" />
          <div className="flex flex-col text-[10px] sm:text-xs tracking-[0.25em] font-mono text-[#AAB6D3] uppercase font-semibold leading-[1.3]">
            {config.sideText.map((word, i) => (
              <span key={i} className="hover:text-white transition-colors duration-200">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center Event Logo & Title */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        {/* Glow orbit container for IEEEXtreme Logo */}
        <div className="relative group max-w-[340px] sm:max-w-[420px] md:max-w-[480px] w-full flex items-center justify-center my-0.5">
          {/* Subtle cosmic aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#1677FF]/20 via-[#7B3FF2]/20 to-[#00D9FF]/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Actual IEEEXtreme Logo */}
          <img
            src={images.ieeextremeLogo}
            alt="IEEE Xtreme Programming Competition"
            className="relative z-10 w-full h-auto max-h-[105px] sm:max-h-[135px] object-contain drop-shadow-[0_4px_20px_rgba(22,119,255,0.4)]"
            onError={(e) => {
              e.currentTarget.src = '/assets/ieeextreme-logo.png';
            }}
          />
        </div>

        {/* Supporting Line: 24 HOURS OF CODING. ONE EXTREME CHALLENGE. */}
        <div className="mt-1 flex items-center gap-2">
          <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#1677FF]" />
          <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#AAB6D3] via-white to-[#AAB6D3] uppercase">
            {config.mainTagline}
          </p>
          <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#7B3FF2]" />
        </div>
      </div>

      {/* Right side text accent: 24 Hours, Infinite Possibilities */}
      <div className="hidden sm:flex flex-col items-end pr-2 select-none">
        <div className="relative text-right">
          <p className="font-['Caveat'] text-lg sm:text-2xl text-cyan-200/90 leading-tight -rotate-6 drop-shadow-[0_0_12px_rgba(0,217,255,0.6)]">
            24 Hours,
          </p>
          <p className="font-['Caveat'] text-xl sm:text-3xl text-purple-200 font-bold -rotate-6 drop-shadow-[0_0_15px_rgba(123,63,242,0.8)] -mt-1">
            Infinite Possibilities
          </p>
          <div className="h-[2px] w-24 ml-auto mt-1 bg-gradient-to-r from-transparent via-[#7B3FF2] to-[#00D9FF] rounded-full" />
        </div>
      </div>
    </div>
  );
}
