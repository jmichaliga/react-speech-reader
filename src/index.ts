import { useCallback, useEffect, useState } from 'react';

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
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!supported) return;

    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    // Get initial voices
    updateVoices();

    // Listen for voice changes
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  const speak = useCallback((text: string) => {
    if (!supported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (options?.voice) utterance.voice = options.voice;
    if (options?.rate) utterance.rate = options.rate;
    if (options?.pitch) utterance.pitch = options.pitch;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported, options]);

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
    if (!supported) return;
    window.speechSynthesis.cancel();
  }, [supported]);

  const setRate = useCallback((rate: number) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
  }, [supported]);

  const setPitch = useCallback((pitch: number) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
  }, [supported]);

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