import React, { useState, useEffect, useCallback } from 'react';
import { Settings, Maximize2, Minimize2, Volume2, VolumeX, Monitor, Smartphone } from 'lucide-react';
import { useCountdown, TIMER_STATES } from './hooks/useCountdown';
import { useEventConfig } from './hooks/useEventConfig';
import { BrandHeader } from './components/BrandHeader';
import { EventIdentity } from './components/EventIdentity';
import { CountdownTimer } from './components/CountdownTimer';
import { StartButton } from './components/StartButton';
import { SupportingContent } from './components/SupportingContent';
import { CampusBackground } from './components/CampusBackground';
import { AdminPanel } from './components/AdminPanel';
import { CompletionScreen } from './components/CompletionScreen';
import { ResetConfirmationModal } from './components/ResetConfirmationModal';
import { sounds } from './utils/soundEffects';

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layoutMode, setLayoutMode] = useState('auto'); // 'auto' | 'portrait' | 'wide'

  // Event config & custom assets hook
  const {
    config,
    images,
    updateField,
    updateCustomAsset,
    toggleSound,
    restoreAllDefaults,
  } = useEventConfig();

  // Completion callback
  const handleCountdownComplete = useCallback(() => {
    setIsCompletionModalOpen(true);
  }, []);

  // Timer engine hook
  const timer = useCountdown(handleCountdownComplete);

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(() => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn('Error attempting to enable fullscreen:', err);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch((err) => {
            console.warn('Error attempting to exit fullscreen:', err);
          });
        }
      }
    } catch (e) {
      console.warn('Fullscreen API error', e);
    }
  }, []);

  // Reset confirmation handlers
  const handleOpenResetConfirm = useCallback(() => {
    sounds.playBeep();
    setIsResetConfirmOpen(true);
  }, []);

  const handleConfirmReset = useCallback(() => {
    sounds.playBeep();
    timer.reset();
    setIsResetConfirmOpen(false);
    setIsCompletionModalOpen(false);
  }, [timer]);

  const handleCancelReset = useCallback(() => {
    sounds.playBeep();
    setIsResetConfirmOpen(false);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in form inputs
      const tag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (timer.isReady) {
          sounds.playStart();
          timer.start();
        } else if (timer.isRunning) {
          sounds.playPause();
          timer.pause();
        } else if (timer.isPaused) {
          sounds.playStart();
          timer.resume();
        }
      } else if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleOpenResetConfirm();
      } else if (e.code === 'KeyF' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'KeyM' || e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleSound();
      } else if (e.code === 'Escape') {
        if (isResetConfirmOpen) {
          setIsResetConfirmOpen(false);
        } else if (isAdminOpen) {
          setIsAdminOpen(false);
        } else if (isCompletionModalOpen) {
          setIsCompletionModalOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    timer,
    toggleFullscreen,
    toggleSound,
    handleOpenResetConfirm,
    isResetConfirmOpen,
    isAdminOpen,
    isCompletionModalOpen,
  ]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#050B1B] text-white flex flex-col justify-between overflow-x-hidden overflow-y-auto select-none">
      
      {/* Background Campus Photo & Overlays */}
      <CampusBackground campusPhoto={images.campusPhoto} />

      {/* Floating Control Buttons (Top-Right discreet bar) */}
      <div className="fixed top-2 right-4 z-40 flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-300">
        
        {/* Layout toggle (Portrait / Widescreen projector) */}
        <button
          onClick={() => {
            sounds.playBeep();
            setLayoutMode((prev) => (prev === 'portrait' ? 'wide' : prev === 'wide' ? 'auto' : 'portrait'));
          }}
          className="p-1.5 rounded-lg bg-[#0B1630]/80 hover:bg-[#0B1630] border border-cyan-500/20 text-[#AAB6D3] hover:text-cyan-300 transition-colors backdrop-blur-xs flex items-center gap-1 text-[10px] font-mono"
          title={`Display Mode: ${layoutMode.toUpperCase()} (Click to toggle Portrait 9:16 / Widescreen)`}
        >
          {layoutMode === 'wide' ? (
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
          ) : layoutMode === 'portrait' ? (
            <Smartphone className="w-3.5 h-3.5 text-purple-400" />
          ) : (
            <Monitor className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline uppercase">{layoutMode}</span>
        </button>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 rounded-lg bg-[#0B1630]/80 hover:bg-[#0B1630] border border-cyan-500/20 text-[#AAB6D3] hover:text-cyan-300 transition-colors backdrop-blur-xs"
          title={`Toggle Sound (M) - Currently ${config.soundEnabled ? 'Enabled' : 'Muted'}`}
        >
          {config.soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-[#AAB6D3]" />}
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg bg-[#0B1630]/80 hover:bg-[#0B1630] border border-cyan-500/20 text-[#AAB6D3] hover:text-purple-300 transition-colors backdrop-blur-xs"
          title="Toggle Fullscreen Display Mode (F)"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-purple-400" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Admin settings gear */}
        <button
          onClick={() => {
            sounds.playBeep();
            setIsAdminOpen(true);
          }}
          className="p-1.5 rounded-lg bg-[#0B1630]/80 hover:bg-[#0B1630] border border-cyan-500/20 text-[#AAB6D3] hover:text-white transition-colors backdrop-blur-xs"
          title="Open Admin & Settings Panel"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Main Event Stage Container */}
      <div
        className={`relative z-10 w-full h-full flex-1 flex flex-col justify-between mx-auto min-h-screen transition-all duration-300 ${
          layoutMode === 'portrait'
            ? 'max-w-[1080px] shadow-[0_0_80px_rgba(0,0,0,0.8)] border-x border-cyan-500/10'
            : layoutMode === 'wide'
            ? 'max-w-[1920px] px-4 md:px-8'
            : 'max-w-[1080px] 2xl:max-w-[1400px]'
        }`}
      >
        {/* Top Branding Row (College Logo Left, IEEE Logo Right) */}
        <BrandHeader
          config={config}
          images={images}
          onOpenAdmin={() => {
            sounds.playBeep();
            setIsAdminOpen(true);
          }}
        />

        {/* Center Event Stage */}
        <main className="flex-1 flex flex-col items-center justify-between py-1 sm:py-2">
          
          {/* Event Identity with IEEEXtreme Logo and Tagline */}
          <EventIdentity config={config} images={images} />

          {/* Prominent High-Contrast Countdown Timer */}
          <CountdownTimer
            hours={timer.hours}
            minutes={timer.minutes}
            seconds={timer.seconds}
            timerState={timer.state}
            progressRatio={timer.progressRatio}
          />

          {/* Large Circular Futuristic Start Button */}
          <StartButton
            timerState={timer.state}
            onStart={timer.start}
            onPause={timer.pause}
            onResume={timer.resume}
            images={images}
          />

          {/* Supporting Content: Code Snippets, Ready Prompt, Coder Silhouettes */}
          <SupportingContent config={config} />
        </main>
      </div>

      {/* Admin and Control Drawer */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        timer={timer}
        config={config}
        images={images}
        updateField={updateField}
        updateCustomAsset={updateCustomAsset}
        toggleSound={toggleSound}
        onOpenResetConfirm={handleOpenResetConfirm}
        restoreAllDefaults={restoreAllDefaults}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmationModal
        isOpen={isResetConfirmOpen}
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
        timerState={timer.state}
      />

      {/* Completion Victory Screen */}
      <CompletionScreen
        isOpen={isCompletionModalOpen || timer.isCompleted}
        onReset={handleOpenResetConfirm}
        onClose={() => setIsCompletionModalOpen(false)}
      />
    </div>
  );
}

export default App;
