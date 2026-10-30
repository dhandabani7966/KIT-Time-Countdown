import { useState, useEffect, useRef, useCallback } from 'react';

export const TIMER_STATES = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
};

const STORAGE_KEYS = {
  STATE: 'ieeextreme_timer_state',
  TARGET_TIMESTAMP: 'ieeextreme_timer_target',
  REMAINING_MS: 'ieeextreme_timer_remaining_ms',
  CONFIGURED_MS: 'ieeextreme_timer_configured_ms',
};

const DEFAULT_24_HOURS_MS = 24 * 60 * 60 * 1000; // 86,400,000 ms

export function useCountdown(onCompleteCallback) {
  // Load initial settings from localStorage safely
  const [configuredMs, setConfiguredMs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIGURED_MS);
      return saved ? Math.max(1000, parseInt(saved, 10)) : DEFAULT_24_HOURS_MS;
    } catch {
      return DEFAULT_24_HOURS_MS;
    }
  });

  const [timerState, setTimerState] = useState(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEYS.STATE);
      if (savedState && Object.values(TIMER_STATES).includes(savedState)) {
        // If it was saved as RUNNING, check if deadline already passed
        if (savedState === TIMER_STATES.RUNNING) {
          const target = parseInt(localStorage.getItem(STORAGE_KEYS.TARGET_TIMESTAMP) || '0', 10);
          if (Date.now() >= target) {
            return TIMER_STATES.COMPLETED;
          }
        }
        return savedState;
      }
    } catch {}
    return TIMER_STATES.READY;
  });

  const [remainingMs, setRemainingMs] = useState(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEYS.STATE);
      if (savedState === TIMER_STATES.RUNNING) {
        const target = parseInt(localStorage.getItem(STORAGE_KEYS.TARGET_TIMESTAMP) || '0', 10);
        const rem = target - Date.now();
        if (rem <= 0) return 0;
        return rem;
      }
      if (savedState === TIMER_STATES.PAUSED) {
        const rem = parseInt(localStorage.getItem(STORAGE_KEYS.REMAINING_MS) || '0', 10);
        return Math.max(0, rem);
      }
      if (savedState === TIMER_STATES.COMPLETED) {
        return 0;
      }
      const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIGURED_MS);
      return savedConfig ? parseInt(savedConfig, 10) : DEFAULT_24_HOURS_MS;
    } catch {
      return DEFAULT_24_HOURS_MS;
    }
  });

  const targetTimestampRef = useRef(null);
  const intervalIdRef = useRef(null);
  const onCompleteRef = useRef(onCompleteCallback);

  useEffect(() => {
    onCompleteRef.current = onCompleteCallback;
  }, [onCompleteCallback]);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATE, timerState);
      localStorage.setItem(STORAGE_KEYS.CONFIGURED_MS, configuredMs.toString());
      if (timerState === TIMER_STATES.RUNNING && targetTimestampRef.current) {
        localStorage.setItem(STORAGE_KEYS.TARGET_TIMESTAMP, targetTimestampRef.current.toString());
      } else {
        localStorage.removeItem(STORAGE_KEYS.TARGET_TIMESTAMP);
      }
      localStorage.setItem(STORAGE_KEYS.REMAINING_MS, remainingMs.toString());
    } catch (e) {
      console.warn('Failed to sync timer state to localStorage', e);
    }
  }, [timerState, configuredMs, remainingMs]);

  // Synchronize targetTimestampRef with loaded state
  useEffect(() => {
    if (timerState === TIMER_STATES.RUNNING) {
      const savedTarget = parseInt(localStorage.getItem(STORAGE_KEYS.TARGET_TIMESTAMP) || '0', 10);
      if (savedTarget && savedTarget > Date.now()) {
        targetTimestampRef.current = savedTarget;
      } else {
        targetTimestampRef.current = Date.now() + remainingMs;
      }
    }
  }, []);

  // Completion trigger handler
  const handleCompletion = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    targetTimestampRef.current = null;
    setRemainingMs(0);
    setTimerState(TIMER_STATES.COMPLETED);
    try {
      localStorage.setItem(STORAGE_KEYS.STATE, TIMER_STATES.COMPLETED);
      localStorage.setItem(STORAGE_KEYS.REMAINING_MS, '0');
      localStorage.removeItem(STORAGE_KEYS.TARGET_TIMESTAMP);
    } catch {}
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  // Update tick calculation
  const tick = useCallback(() => {
    if (!targetTimestampRef.current) return;
    const now = Date.now();
    const diff = targetTimestampRef.current - now;

    if (diff <= 0) {
      handleCompletion();
    } else {
      setRemainingMs(diff);
    }
  }, [handleCompletion]);

  // Start the countdown
  const start = useCallback(() => {
    if (timerState === TIMER_STATES.RUNNING) return;

    const msToCount = timerState === TIMER_STATES.PAUSED ? remainingMs : configuredMs;
    if (msToCount <= 0) return;

    const target = Date.now() + msToCount;
    targetTimestampRef.current = target;
    setRemainingMs(msToCount);
    setTimerState(TIMER_STATES.RUNNING);

    try {
      localStorage.setItem(STORAGE_KEYS.STATE, TIMER_STATES.RUNNING);
      localStorage.setItem(STORAGE_KEYS.TARGET_TIMESTAMP, target.toString());
      localStorage.setItem(STORAGE_KEYS.REMAINING_MS, msToCount.toString());
    } catch {}
  }, [timerState, remainingMs, configuredMs]);

  // Pause the countdown
  const pause = useCallback(() => {
    if (timerState !== TIMER_STATES.RUNNING) return;

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    const currentRem = targetTimestampRef.current ? Math.max(0, targetTimestampRef.current - Date.now()) : remainingMs;
    targetTimestampRef.current = null;

    setRemainingMs(currentRem);
    setTimerState(TIMER_STATES.PAUSED);

    try {
      localStorage.setItem(STORAGE_KEYS.STATE, TIMER_STATES.PAUSED);
      localStorage.setItem(STORAGE_KEYS.REMAINING_MS, currentRem.toString());
      localStorage.removeItem(STORAGE_KEYS.TARGET_TIMESTAMP);
    } catch {}
  }, [timerState, remainingMs]);

  // Resume the countdown
  const resume = useCallback(() => {
    if (timerState !== TIMER_STATES.PAUSED) return;
    start();
  }, [timerState, start]);

  // Reset to configured duration (requires caller confirmation)
  const reset = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    targetTimestampRef.current = null;
    setRemainingMs(configuredMs);
    setTimerState(TIMER_STATES.READY);

    try {
      localStorage.setItem(STORAGE_KEYS.STATE, TIMER_STATES.READY);
      localStorage.setItem(STORAGE_KEYS.REMAINING_MS, configuredMs.toString());
      localStorage.removeItem(STORAGE_KEYS.TARGET_TIMESTAMP);
    } catch {}
  }, [configuredMs]);

  // Set new duration (admin)
  const updateDuration = useCallback(
    (hours, minutes = 0, seconds = 0) => {
      const totalMs = Math.max(1000, (Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)) * 1000);
      setConfiguredMs(totalMs);
      if (timerState === TIMER_STATES.READY) {
        setRemainingMs(totalMs);
      }
      try {
        localStorage.setItem(STORAGE_KEYS.CONFIGURED_MS, totalMs.toString());
      } catch {}
    },
    [timerState]
  );

  // Interval loop when RUNNING
  useEffect(() => {
    if (timerState === TIMER_STATES.RUNNING) {
      // Clear any prior interval to guarantee single interval
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      // Immediate tick to stay synchronized
      tick();

      // Tick every 200ms for high responsiveness and exact second flips
      intervalIdRef.current = setInterval(tick, 200);

      // Handle visibilitychange & focus so tab changes recalculate instantly
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          tick();
        }
      };

      window.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', tick);

      return () => {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
        window.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', tick);
      };
    }
  }, [timerState, tick]);

  // Formatted parts: HH, MM, SS
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // Percentage elapsed (for HUD progress rings/bars)
  const progressRatio = configuredMs > 0 ? Math.min(1, Math.max(0, 1 - remainingMs / configuredMs)) : 0;

  return {
    state: timerState,
    remainingMs,
    configuredMs,
    hours: formattedHours,
    minutes: formattedMinutes,
    seconds: formattedSeconds,
    rawHours: hours,
    rawMinutes: minutes,
    rawSeconds: seconds,
    progressRatio,
    start,
    pause,
    resume,
    reset,
    updateDuration,
    isReady: timerState === TIMER_STATES.READY,
    isRunning: timerState === TIMER_STATES.RUNNING,
    isPaused: timerState === TIMER_STATES.PAUSED,
    isCompleted: timerState === TIMER_STATES.COMPLETED,
  };
}
