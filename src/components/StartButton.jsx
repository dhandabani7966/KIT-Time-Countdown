import React from 'react';
import { sounds } from '../utils/soundEffects';

export function StartButton({
  timerState,
  onStart,
  onPause,
  onResume,
  images,
}) {
  const isReady = timerState === 'READY';
  const isRunning = timerState === 'RUNNING';
  const isPaused = timerState === 'PAUSED';
  const isCompleted = timerState === 'COMPLETED';

  const handleClick = () => {
    if (isReady) {
      sounds.playStart();
      onStart();
    } else if (isRunning) {
      sounds.playPause();
      onPause();
    } else if (isPaused) {
      sounds.playStart();
      onResume();
    }
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center my-3 sm:my-5">
      {/* Outer Concentric Animated Glowing Rings */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Pulsing Glow Aura (active when ready or running) */}
        <div
          className={`absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#1677FF] via-[#7B3FF2] to-[#00D9FF] blur-2xl transition-all duration-700 pointer-events-none ${
            isReady ? 'opacity-70 animate-pulse' : isRunning ? 'opacity-50' : 'opacity-20'
          }`}
        />

        {/* Rotating Outer Dashed Orbit Ring */}
        <div className="absolute -inset-2.5 sm:-inset-3.5 rounded-full border border-dashed border-[#00D9FF]/40 animate-spin-slow pointer-events-none" />

        {/* Counter-Rotating Mid Neon Ring */}
        <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-dotted border-[#7B3FF2]/50 animate-spin-reverse pointer-events-none" />

        {/* Main Circular Button Element */}
        <button
          onClick={handleClick}
          disabled={isCompleted}
          aria-label={
            isReady
              ? 'Start The Xtreme 24 Hour Countdown'
              : isRunning
              ? 'Pause Countdown'
              : isPaused
              ? 'Resume Countdown'
              : 'Xtreme Challenge Completed'
          }
          className={`group relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-[4px] cursor-pointer transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00D9FF]/60 shadow-[0_0_40px_rgba(22,119,255,0.6)] ${
            isReady ? 'animate-pulse-glow hover:scale-105' : ''
          }`}
        >
          {/* Glowing Gradient Border Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D9FF] via-[#1677FF] to-[#7B3FF2] p-[3px]">
            {/* Inner Dark Navy Circular Surface */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0B1630] via-[#050B1B] to-[#071126] flex flex-col items-center justify-center p-3 text-center border border-white/10 group-hover:border-cyan-400/40 transition-colors">
              
              {/* College Emblem / Seal inside center of button */}
              <div className="relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 mb-1 flex items-center justify-center">
                <img
                  src={images.centerEmblem}
                  alt="Kangeyam Institute of Technology Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/center-emblem.png';
                  }}
                />
              </div>

              {/* Main Button Text */}
              <div className="flex flex-col items-center">
                {isReady && (
                  <>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black font-['Space_Grotesk'] tracking-wider text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:text-cyan-300 transition-colors">
                      START
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-black font-mono tracking-[0.2em] text-[#00D9FF] uppercase mt-0.5">
                      THE XTREME
                    </span>
                  </>
                )}

                {isRunning && (
                  <>
                    <span className="text-lg sm:text-xl md:text-2xl font-black font-['Space_Grotesk'] tracking-wider text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
                      XTREME LIVE
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-[#AAB6D3] uppercase mt-0.5 group-hover:text-white">
                      (CLICK TO PAUSE)
                    </span>
                  </>
                )}

                {isPaused && (
                  <>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black font-['Space_Grotesk'] tracking-wider text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
                      RESUME
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-[#AAB6D3] uppercase mt-0.5 group-hover:text-white">
                      COUNTDOWN
                    </span>
                  </>
                )}

                {isCompleted && (
                  <>
                    <span className="text-lg sm:text-xl md:text-2xl font-black font-['Space_Grotesk'] tracking-wider text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                      FINISHED
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-cyan-400 uppercase mt-0.5">
                      CONGRATULATIONS
                    </span>
                  </>
                )}
              </div>

              {/* Status mini orb indicator */}
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isReady
                      ? 'bg-cyan-400 shadow-[0_0_8px_#00D9FF] animate-ping'
                      : isRunning
                      ? 'bg-emerald-400 shadow-[0_0_8px_#34D399]'
                      : isPaused
                      ? 'bg-amber-400 shadow-[0_0_8px_#FBBF24]'
                      : 'bg-purple-500 shadow-[0_0_8px_#A855F7]'
                  }`}
                />
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#AAB6D3]/80 uppercase">
                  {timerState}
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Accessible keyboard hint */}
      <span className="mt-2 text-[10px] sm:text-xs font-mono tracking-widest text-[#AAB6D3]/60 uppercase">
        PRESS <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-white font-mono text-[9px]">SPACE</kbd> TO {isReady ? 'START' : isRunning ? 'PAUSE' : isPaused ? 'RESUME' : 'TOGGLE'}
      </span>
    </div>
  );
}
