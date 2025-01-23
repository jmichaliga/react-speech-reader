import { useCallback, useEffect, useState } from 'react';

interface UseSpeechReaderOptions {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseSpeechReaderReturn {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  speaking: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
}

export const useSpeechReader = ({
  voice,
  rate = 1,
  pitch = 1,
  volume = 1,
}: UseSpeechReaderOptions = {}): UseSpeechReaderReturn => {
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
    
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported, voice, rate, pitch, volume]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.resume();
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return {
    speak,
    pause,
    resume,
    stop,
    speaking,
    supported,
    voices,
  };
}; 