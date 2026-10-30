import React from 'react';

export function CountdownTimer({ hours, minutes, seconds, timerState, progressRatio }) {
  const isRunning = timerState === 'RUNNING';
  const isPaused = timerState === 'PAUSED';
  const isCompleted = timerState === 'COMPLETED';

  return (
    <div className="relative z-20 w-full max-w-[850px] mx-auto px-4 my-2 sm:my-3">
      {/* Outer HUD Container */}
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-[#00D9FF] via-[#1677FF] to-[#7B3FF2] shadow-[0_0_35px_rgba(22,119,255,0.4)]">
        {/* Futuristic HUD Frame with Cut-Corners */}
        <div className="relative px-4 py-3 sm:px-8 sm:py-6 rounded-[14px] bg-[#050B1B]/95 backdrop-blur-md overflow-hidden border border-cyan-400/20">
          
          {/* Futuristic HUD corner accents */}
          <div className="absolute top-1.5 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00D9FF]" />
          <div className="absolute top-1.5 right-2 w-3 h-3 border-t-2 border-r-2 border-[#7B3FF2]" />
          <div className="absolute bottom-1.5 left-2 w-3 h-3 border-b-2 border-l-2 border-[#1677FF]" />
          <div className="absolute bottom-1.5 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00D9FF]" />

          {/* Top HUD tech brackets & decorative indices */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-mono tracking-widest text-[#AAB6D3]/70 mb-2 uppercase">
            <span className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : isPaused ? 'bg-amber-400' : isCompleted ? 'bg-purple-500' : 'bg-cyan-400'}`} />
              <span className="font-semibold text-white/90">SYS://XTREME.24H.LIVE</span>
            </span>
            <span className="hidden sm:inline-block text-cyan-400 font-bold">
              STATUS: {timerState}
            </span>
            <span className="tabular-digits font-mono">
              ELAPSED: {Math.round(progressRatio * 100)}%
            </span>
          </div>

          {/* Thin Futuristic Progress Bar */}
          <div className="w-full h-1 bg-[#0B1630] rounded-full overflow-hidden mb-3 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#00D9FF] via-[#1677FF] to-[#7B3FF2] transition-all duration-300 shadow-[0_0_10px_#00D9FF]"
              style={{ width: `${Math.min(100, Math.max(0, (1 - progressRatio) * 100))}%` }}
            />
          </div>

          {/* Large Bold Digital Timer Readout */}
          <div className="flex items-center justify-center gap-1 sm:gap-3 md:gap-4 select-none my-1">
            {/* Hours Block */}
            <div className="flex flex-col items-center">
              <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-['Space_Grotesk'] tracking-tight text-white tabular-digits drop-shadow-[0_0_25px_rgba(22,119,255,0.85)]">
                {hours}
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-[#AAB6D3] uppercase font-bold mt-0.5">
                HOURS
              </span>
            </div>

            {/* Separator Colon */}
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#00D9FF] -translate-y-2 sm:-translate-y-3 font-['Space_Grotesk'] animate-pulse">
              :
            </div>

            {/* Minutes Block */}
            <div className="flex flex-col items-center">
              <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-['Space_Grotesk'] tracking-tight text-white tabular-digits drop-shadow-[0_0_25px_rgba(22,119,255,0.85)]">
                {minutes}
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-[#AAB6D3] uppercase font-bold mt-0.5">
                MINUTES
              </span>
            </div>

            {/* Separator Colon */}
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#7B3FF2] -translate-y-2 sm:-translate-y-3 font-['Space_Grotesk'] animate-pulse">
              :
            </div>

            {/* Seconds Block */}
            <div className="flex flex-col items-center">
              <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-['Space_Grotesk'] tracking-tight text-white tabular-digits drop-shadow-[0_0_25px_rgba(123,63,242,0.85)]">
                {seconds}
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-[#AAB6D3] uppercase font-bold mt-0.5">
                SECONDS
              </span>
            </div>
          </div>

          {/* Bottom subtle glow line */}
          <div className="mt-2 w-full flex items-center justify-center">
            <div className="h-[1px] w-3/4 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
