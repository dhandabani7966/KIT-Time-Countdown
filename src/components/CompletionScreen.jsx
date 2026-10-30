import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function CompletionScreen({ isOpen, onReset, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Play celebratory sound
      sounds.playCompletion();

      // Restrained cyber confetti burst
      try {
        const duration = 3.5 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#00D9FF', '#1677FF', '#7B3FF2', '#FFFFFF'],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#00D9FF', '#1677FF', '#7B3FF2', '#FFFFFF'],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      } catch (e) {
        console.warn('Confetti effect failed', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050B1B]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl p-[2px] rounded-3xl bg-gradient-to-r from-[#00D9FF] via-[#7B3FF2] to-[#1677FF] shadow-[0_0_60px_rgba(123,63,242,0.8)]">
        <div className="relative w-full rounded-[22px] bg-[#0B1630] p-6 sm:p-8 text-center border border-white/10 flex flex-col items-center">
          
          {/* Trophy Icon with animated halo */}
          <div className="relative my-2">
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#1677FF] to-[#7B3FF2] flex items-center justify-center shadow-lg border border-cyan-300">
              <Trophy className="w-10 h-10 text-white drop-shadow-[0_0_10px_#FFFFFF]" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 uppercase">
            XTREME CHALLENGE COMPLETED!
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#AAB6D3] font-mono tracking-widest uppercase">
            24 Hours of Pure Grit, Innovation &amp; Victory
          </p>

          {/* 00:00:00 Final Digital Readout */}
          <div className="my-5 px-6 py-2 rounded-xl bg-[#050B1B] border border-cyan-500/30 text-4xl sm:text-5xl font-black font-mono tracking-wider text-cyan-300 drop-shadow-[0_0_15px_rgba(0,217,255,0.7)]">
            00 : 00 : 00
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-mono tracking-wider mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span>ALL SUBMISSIONS LOCKED &amp; FINALIZED</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/15"
            >
              Keep Display Mode
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#7B3FF2] hover:brightness-110 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(22,119,255,0.5)]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Timer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
