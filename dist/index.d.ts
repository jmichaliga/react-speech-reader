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
export declare function useSpeechReader(options?: SpeechReaderOptions): SpeechReaderHook;
