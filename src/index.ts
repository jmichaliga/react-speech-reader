import { useCallback, useEffect, useState, useRef } from 'react';

export interface SpeechReaderOptions {
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
}

export interface SpeechReaderHook {
  speak: (text: string) => void;
  speaking: boolean;
  voices: SpeechSynthesisVoice[];
  setVoice: (voice: SpeechSynthesisVoice) => void;
  setRate: (rate: number) => void;
  setPitch: (pitch: number) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
}

export function useSpeechReader(options?: SpeechReaderOptions): SpeechReaderHook {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const optionsRef = useRef(options);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Update options ref when props change
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // Handle voices initialization
  useEffect(() => {
    if (!supported) return;

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        window.speechSynthesis.onvoiceschanged = null; // Remove listener once voices are loaded
      }
    };

    // Try to get voices immediately
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
    } else {
      // If no voices available, wait for them to load
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  const speak = useCallback((text: string) => {
    if (!supported) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const currentOptions = optionsRef.current;
    
    if (currentOptions?.voice) utterance.voice = currentOptions.voice;
    if (currentOptions?.rate) utterance.rate = currentOptions.rate;
    if (currentOptions?.pitch) utterance.pitch = currentOptions.pitch;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.resume();
  }, [supported]);

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    optionsRef.current = { ...optionsRef.current, voice };
  }, []);

  const setRate = useCallback((rate: number) => {
    optionsRef.current = { ...optionsRef.current, rate };
  }, []);

  const setPitch = useCallback((pitch: number) => {
    optionsRef.current = { ...optionsRef.current, pitch };
  }, []);

  return {
    speak,
    pause,
    resume,
    cancel,
    speaking,
    voices,
    setVoice,
    setRate,
    setPitch,
  };
} 