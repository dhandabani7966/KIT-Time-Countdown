import { useState, useEffect, useCallback } from 'react';
import { getCustomImage, saveCustomImage, clearAllCustomImages } from '../utils/imageStore';
import { sounds } from '../utils/soundEffects';

export const DEFAULT_CONFIG = {
  collegeName: 'KANGEYAM INSTITUTE OF TECHNOLOGY',
  collegeTagline: 'ENGINEER • INNOVATE • TRANSFORM',
  organizerName: 'IEEE STUDENT BRANCH',
  organizerBranchCode: 'KIT STUDENT BRANCH • STB 12781A',
  organizerTagline: 'LEARN • CONNECT • CREATE • IMPACT',
  eventTitle: 'IEEE XTREME 24',
  competitionLabel: 'PROGRAMMING COMPETITION',
  mainTagline: '24 HOURS OF CODING. ONE EXTREME CHALLENGE.',
  readyPrompt: 'READY TO CODE ?',
  footerTagline: 'CODE • COMPETE • CONQUER',
  sideText: ['THINK', 'CODE', 'SOLVE', 'REPEAT'],
  scriptQuote: '24 Hours, Infinite Possibilities',
  // Default asset paths
  collegeLogo: '/assets/kit-logo-white.png',
  collegeLogoAlt: '/assets/kit-logo-blue.png',
  ieeeLogo: '/assets/ieee-student-branch.png',
  ieeextremeLogo: '/assets/ieeextreme-logo.png',
  campusPhoto: '/assets/college-campus.jpg',
  centerEmblem: '/assets/center-emblem.png',
  soundEnabled: true,
};

const CONFIG_STORAGE_KEY = 'ieeextreme_event_config_v2';

export function useEventConfig() {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_CONFIG;
  });

  const [images, setImages] = useState({
    collegeLogo: DEFAULT_CONFIG.collegeLogo,
    ieeeLogo: DEFAULT_CONFIG.ieeeLogo,
    ieeextremeLogo: DEFAULT_CONFIG.ieeextremeLogo,
    campusPhoto: DEFAULT_CONFIG.campusPhoto,
    centerEmblem: DEFAULT_CONFIG.centerEmblem,
  });

  // Load any customized images from IndexedDB
  useEffect(() => {
    let mounted = true;
    async function loadAssets() {
      const keys = ['collegeLogo', 'ieeeLogo', 'ieeextremeLogo', 'campusPhoto', 'centerEmblem'];
      const loaded = {};
      for (const k of keys) {
        const custom = await getCustomImage(k);
        if (custom) {
          loaded[k] = custom;
        } else {
          loaded[k] = DEFAULT_CONFIG[k];
        }
      }
      if (mounted) {
        setImages((prev) => ({ ...prev, ...loaded }));
      }
    }
    loadAssets();
    return () => {
      mounted = false;
    };
  }, []);

  // Save config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Could not save config to localStorage', e);
    }
  }, [config]);

  // Sync sound settings
  useEffect(() => {
    sounds.setEnabled(config.soundEnabled);
  }, [config.soundEnabled]);

  const updateField = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateCustomAsset = useCallback(async (key, dataUrl) => {
    await saveCustomImage(key, dataUrl);
    setImages((prev) => ({ ...prev, [key]: dataUrl }));
  }, []);

  const toggleSound = useCallback(() => {
    setConfig((prev) => {
      const next = !prev.soundEnabled;
      sounds.setEnabled(next);
      if (next) sounds.playBeep();
      return { ...prev, soundEnabled: next };
    });
  }, []);

  const restoreAllDefaults = useCallback(async () => {
    await clearAllCustomImages();
    setConfig(DEFAULT_CONFIG);
    setImages({
      collegeLogo: DEFAULT_CONFIG.collegeLogo,
      ieeeLogo: DEFAULT_CONFIG.ieeeLogo,
      ieeextremeLogo: DEFAULT_CONFIG.ieeextremeLogo,
      campusPhoto: DEFAULT_CONFIG.campusPhoto,
      centerEmblem: DEFAULT_CONFIG.centerEmblem,
    });
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    sounds.playBeep();
  }, []);

  return {
    config,
    images,
    updateField,
    updateCustomAsset,
    toggleSound,
    restoreAllDefaults,
  };
}
