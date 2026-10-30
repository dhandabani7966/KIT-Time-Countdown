import React from 'react';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';

export function ResetConfirmationModal({ isOpen, onConfirm, onCancel, timerState }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050B1B]/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-r from-amber-500 via-red-500 to-purple-600 shadow-[0_0_40px_rgba(239,68,68,0.5)]">
        <div className="relative w-full rounded-[14px] bg-[#0B1630] p-6 text-center border border-white/10">
          
          {/* Warning Icon */}
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 border border-amber-500/40">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">
            Reset Event Countdown?
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#AAB6D3] leading-relaxed">
            The timer is currently in <strong className="text-amber-300">{timerState}</strong> state.
            Resetting will discard the active countdown and restore the configured starting duration.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Confirm Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
