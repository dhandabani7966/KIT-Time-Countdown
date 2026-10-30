import React, { useState, useRef } from 'react';
import {
  X,
  Settings,
  Clock,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Play,
  Pause,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Sliders,
  Type,
  FileImage,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export function AdminPanel({
  isOpen,
  onClose,
  timer,
  config,
  images,
  updateField,
  updateCustomAsset,
  toggleSound,
  onOpenResetConfirm,
  restoreAllDefaults,
  isFullscreen,
  toggleFullscreen,
}) {
  const [activeTab, setActiveTab] = useState('timer'); // 'timer' | 'branding' | 'assets' | 'shortcuts'
  const [customHours, setCustomHours] = useState(timer.rawHours);
  const [customMinutes, setCustomMinutes] = useState(timer.rawMinutes);
  const [customSeconds, setCustomSeconds] = useState(timer.rawSeconds);
  const [uploadFeedback, setUploadFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const collegeLogoRef = useRef(null);
  const ieeeLogoRef = useRef(null);
  const xtremeLogoRef = useRef(null);
  const campusPhotoRef = useRef(null);
  const emblemRef = useRef(null);

  if (!isOpen) return null;

  // Handle applying duration
  const handleApplyDuration = (e) => {
    e.preventDefault();
    const h = parseInt(customHours, 10) || 0;
    const m = parseInt(customMinutes, 10) || 0;
    const s = parseInt(customSeconds, 10) || 0;
    if (h === 0 && m === 0 && s === 0) {
      setErrorMessage('Duration must be greater than 0 seconds.');
      return;
    }
    setErrorMessage('');
    timer.updateDuration(h, m, s);
    sounds.playBeep();
    setUploadFeedback(`Duration set to ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    setTimeout(() => setUploadFeedback(''), 3000);
  };

  // Quick preset handlers
  const handleSetPreset = (h, m, s) => {
    setCustomHours(h);
    setCustomMinutes(m);
    setCustomSeconds(s);
    timer.updateDuration(h, m, s);
    sounds.playBeep();
    setUploadFeedback(`Preset loaded: ${h}h ${m}m ${s}s`);
    setTimeout(() => setUploadFeedback(''), 3000);
  };

  // Handle file upload
  const handleFileChange = async (key, file) => {
    if (!file) return;

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file format. Please upload PNG, JPG, WEBP, or SVG.');
      return;
    }

    // Validate size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File size exceeds 15MB. Please choose a smaller image.');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const dataUrl = e.target.result;
        await updateCustomAsset(key, dataUrl);
        sounds.playBeep();
        setUploadFeedback(`Updated ${key} successfully!`);
        setTimeout(() => setUploadFeedback(''), 3000);
      } catch (err) {
        setErrorMessage(err.message || 'Failed to save image.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg h-full bg-[#0B1630] border-l border-cyan-500/20 text-white shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#050B1B]/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Space_Grotesk'] tracking-wide">
                Control &amp; Settings Panel
              </h2>
              <p className="text-[11px] font-mono text-[#AAB6D3]">
                IEEE Xtreme Live Event Controller
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-[#AAB6D3] hover:text-white transition-colors"
            title="Close Settings (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#071026] text-xs font-mono font-medium">
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'timer'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/20 font-bold'
                : 'text-[#AAB6D3] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Timer</span>
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'branding'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/20 font-bold'
                : 'text-[#AAB6D3] hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Event Info</span>
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'assets'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/20 font-bold'
                : 'text-[#AAB6D3] hover:text-white'
            }`}
          >
            <FileImage className="w-3.5 h-3.5" />
            <span>Logos &amp; BG</span>
          </button>
          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'shortcuts'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-950/20 font-bold'
                : 'text-[#AAB6D3] hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Shortcuts</span>
          </button>
        </div>

        {/* Notifications / Feedback */}
        {uploadFeedback && (
          <div className="mx-5 mt-3 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{uploadFeedback}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mx-5 mt-3 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Panel Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: TIMER CONTROLS & DURATION */}
          {activeTab === 'timer' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="p-4 rounded-xl bg-[#050B1B] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-[#AAB6D3] uppercase tracking-wider block">
                  Live Event State: <strong className="text-cyan-400">{timer.state}</strong>
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  {timer.isReady && (
                    <button
                      onClick={() => {
                        sounds.playStart();
                        timer.start();
                      }}
                      className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:brightness-110 font-bold font-mono tracking-wider text-sm transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>START THE XTREME</span>
                    </button>
                  )}

                  {timer.isRunning && (
                    <button
                      onClick={() => {
                        sounds.playPause();
                        timer.pause();
                      }}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-bold font-mono tracking-wider text-xs transition-colors"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>PAUSE COUNTDOWN</span>
                    </button>
                  )}

                  {timer.isPaused && (
                    <button
                      onClick={() => {
                        sounds.playStart();
                        timer.resume();
                      }}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold font-mono tracking-wider text-xs transition-colors"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>RESUME COUNTDOWN</span>
                    </button>
                  )}

                  <button
                    onClick={onOpenResetConfirm}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-200 font-bold font-mono tracking-wider text-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET TIMER...</span>
                  </button>
                </div>
              </div>

              {/* Set Custom Duration */}
              <div className="p-4 rounded-xl bg-[#050B1B] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#AAB6D3] uppercase tracking-wider font-semibold">
                    Set Countdown Duration
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    Default: 24:00:00
                  </span>
                </div>

                <form onSubmit={handleApplyDuration} className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-[#AAB6D3] mb-1">
                        HOURS
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={customHours}
                        onChange={(e) => setCustomHours(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B1630] border border-cyan-500/30 text-white font-mono text-center text-lg focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#AAB6D3] mb-1">
                        MINUTES
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B1630] border border-cyan-500/30 text-white font-mono text-center text-lg focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#AAB6D3] mb-1">
                        SECONDS
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={customSeconds}
                        onChange={(e) => setCustomSeconds(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B1630] border border-cyan-500/30 text-white font-mono text-center text-lg focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#1677FF] hover:bg-[#1677FF]/80 text-white font-mono font-bold text-xs tracking-wider uppercase transition-colors"
                  >
                    Apply Duration (Requires Reset)
                  </button>
                </form>

                {/* Quick Presets */}
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-[#AAB6D3] uppercase tracking-wider block mb-2">
                    Quick Event Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSetPreset(24, 0, 0)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-xs font-mono text-cyan-300 border border-cyan-500/20"
                    >
                      24 Hours (Full)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetPreset(12, 0, 0)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-xs font-mono text-white/80 border border-white/10"
                    >
                      12 Hours
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetPreset(2, 0, 0)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-xs font-mono text-white/80 border border-white/10"
                    >
                      2 Hours
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetPreset(0, 30, 0)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-xs font-mono text-white/80 border border-white/10"
                    >
                      30 Min
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetPreset(0, 0, 10)}
                      className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-xs font-mono text-amber-300 border border-amber-500/30 font-bold"
                      title="Quick test to check 00:00:00 completion and celebration"
                    >
                      10s Test Run ⚡
                    </button>
                  </div>
                </div>
              </div>

              {/* Display & Sound Toggles */}
              <div className="p-4 rounded-xl bg-[#050B1B] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-[#AAB6D3] uppercase tracking-wider font-semibold block">
                  Display &amp; Audio Controls
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {config.soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-[#AAB6D3]" />
                    )}
                    <span className="text-xs font-medium">Sound Effects (Ticks, Beeps, Fanfare)</span>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-colors ${
                      config.soundEnabled
                        ? 'bg-cyan-500 text-[#050B1B]'
                        : 'bg-white/10 text-[#AAB6D3]'
                    }`}
                  >
                    {config.soundEnabled ? 'ENABLED' : 'MUTED'}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-purple-400" />
                    )}
                    <span className="text-xs font-medium">Fullscreen Auditorium Mode</span>
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold transition-colors"
                  >
                    {isFullscreen ? 'EXIT FULLSCREEN' : 'ENTER FULLSCREEN'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRANDING & EVENT TEXT */}
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#AAB6D3] uppercase mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={config.collegeName}
                  onChange={(e) => updateField('collegeName', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B1B] border border-cyan-500/30 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#AAB6D3] uppercase mb-1">
                  Organizer Branch Name
                </label>
                <input
                  type="text"
                  value={config.organizerName}
                  onChange={(e) => updateField('organizerName', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B1B] border border-cyan-500/30 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#AAB6D3] uppercase mb-1">
                  Main Event Title
                </label>
                <input
                  type="text"
                  value={config.eventTitle}
                  onChange={(e) => updateField('eventTitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B1B] border border-cyan-500/30 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#AAB6D3] uppercase mb-1">
                  Main Event Tagline
                </label>
                <input
                  type="text"
                  value={config.mainTagline}
                  onChange={(e) => updateField('mainTagline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B1B] border border-cyan-500/30 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#AAB6D3] uppercase mb-1">
                  Ready Prompt
                </label>
                <input
                  type="text"
                  value={config.readyPrompt}
                  onChange={(e) => updateField('readyPrompt', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B1B] border border-cyan-500/30 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={restoreAllDefaults}
                  className="text-xs text-red-400 hover:text-red-300 font-mono underline"
                >
                  Reset All Texts to Defaults
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: LOGOS & ASSET UPLOADS */}
          {activeTab === 'assets' && (
            <div className="space-y-4">
              <p className="text-xs text-[#AAB6D3] font-mono">
                Upload custom logo and background images. Files are persisted in browser memory.
              </p>

              {/* 1. College Logo */}
              <div className="p-3 rounded-xl bg-[#050B1B] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 p-1 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                    <img src={images.collegeLogo} alt="College Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono block">Kangeyam College Logo</span>
                    <span className="text-[10px] text-[#AAB6D3]">Top-Left Header</span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={collegeLogoRef}
                  className="hidden"
                  onChange={(e) => handleFileChange('collegeLogo', e.target.files[0])}
                />
                <button
                  onClick={() => collegeLogoRef.current.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/40 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
              </div>

              {/* 2. IEEE Student Branch Logo */}
              <div className="p-3 rounded-xl bg-[#050B1B] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 p-1 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                    <img src={images.ieeeLogo} alt="IEEE Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono block">IEEE Student Branch Logo</span>
                    <span className="text-[10px] text-[#AAB6D3]">Top-Right Header</span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={ieeeLogoRef}
                  className="hidden"
                  onChange={(e) => handleFileChange('ieeeLogo', e.target.files[0])}
                />
                <button
                  onClick={() => ieeeLogoRef.current.click()}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-mono font-semibold border border-purple-500/40 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
              </div>

              {/* 3. IEEEXtreme Competition Logo */}
              <div className="p-3 rounded-xl bg-[#050B1B] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 p-1 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                    <img src={images.ieeextremeLogo} alt="IEEEXtreme" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono block">IEEEXtreme 24 Logo</span>
                    <span className="text-[10px] text-[#AAB6D3]">Above Countdown Timer</span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={xtremeLogoRef}
                  className="hidden"
                  onChange={(e) => handleFileChange('ieeextremeLogo', e.target.files[0])}
                />
                <button
                  onClick={() => xtremeLogoRef.current.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/40 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
              </div>

              {/* 4. Campus Background Photograph */}
              <div className="p-3 rounded-xl bg-[#050B1B] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 p-1 bg-white/5 rounded border border-white/10 flex items-center justify-center overflow-hidden">
                    <img src={images.campusPhoto} alt="Campus Background" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono block">KIT Campus Photo</span>
                    <span className="text-[10px] text-[#AAB6D3]">Background Architecture</span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={campusPhotoRef}
                  className="hidden"
                  onChange={(e) => handleFileChange('campusPhoto', e.target.files[0])}
                />
                <button
                  onClick={() => campusPhotoRef.current.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/40 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
              </div>

              {/* 5. Center Start Button Emblem */}
              <div className="p-3 rounded-xl bg-[#050B1B] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 p-1 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                    <img src={images.centerEmblem} alt="Button Emblem" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono block">Start Button Emblem</span>
                    <span className="text-[10px] text-[#AAB6D3]">Inside Center Circle</span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={emblemRef}
                  className="hidden"
                  onChange={(e) => handleFileChange('centerEmblem', e.target.files[0])}
                />
                <button
                  onClick={() => emblemRef.current.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/40 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </button>
              </div>

              {/* Restore Defaults */}
              <div className="pt-2">
                <button
                  onClick={restoreAllDefaults}
                  className="w-full py-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 text-red-300 font-mono text-xs font-bold transition-colors"
                >
                  Restore Official Default Assets &amp; Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: KEYBOARD SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#AAB6D3] uppercase tracking-wider block">
                Keyboard Shortcuts Reference
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#050B1B] border border-white/5">
                  <span className="text-white">Start / Pause / Resume</span>
                  <kbd className="px-2 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">
                    Spacebar
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#050B1B] border border-white/5">
                  <span className="text-white">Open Reset Confirmation</span>
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white font-bold">
                    R
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#050B1B] border border-white/5">
                  <span className="text-white">Toggle Fullscreen Display</span>
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white font-bold">
                    F
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#050B1B] border border-white/5">
                  <span className="text-white">Mute / Unmute Sound Effects</span>
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white font-bold">
                    M
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#050B1B] border border-white/5">
                  <span className="text-white">Close Admin / Modals</span>
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white font-bold">
                    Esc
                  </kbd>
                </div>
              </div>

              <p className="text-[11px] text-[#AAB6D3]/70 font-mono mt-4">
                Note: Keyboard shortcuts are safely disabled while typing in text or number inputs.
              </p>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/10 bg-[#050B1B] text-center text-[10px] font-mono text-[#AAB6D3]">
          Kangeyam Institute of Technology • IEEE Student Branch STB 12781A
        </div>
      </div>
    </div>
  );
}
