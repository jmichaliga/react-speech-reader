'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function useSpeechReader(options) {
    var _a = react.useState(false), speaking = _a[0], setSpeaking = _a[1];
    var _b = react.useState([]), voices = _b[0], setVoices = _b[1];
    var supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    react.useEffect(function () {
        if (!supported)
            return;
        var updateVoices = function () {
            setVoices(window.speechSynthesis.getVoices());
        };
        // Get initial voices
        updateVoices();
        // Listen for voice changes
        window.speechSynthesis.onvoiceschanged = updateVoices;
        return function () {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [supported]);
    var speak = react.useCallback(function (text) {
        if (!supported)
            return;
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        if (options === null || options === void 0 ? void 0 : options.voice)
            utterance.voice = options.voice;
        if (options === null || options === void 0 ? void 0 : options.rate)
            utterance.rate = options.rate;
        if (options === null || options === void 0 ? void 0 : options.pitch)
            utterance.pitch = options.pitch;
        utterance.onstart = function () { return setSpeaking(true); };
        utterance.onend = function () { return setSpeaking(false); };
        utterance.onerror = function () { return setSpeaking(false); };
        window.speechSynthesis.speak(utterance);
    }, [supported, options]);
    var pause = react.useCallback(function () {
        if (!supported)
            return;
        window.speechSynthesis.pause();
    }, [supported]);
    var resume = react.useCallback(function () {
        if (!supported)
            return;
        window.speechSynthesis.resume();
    }, [supported]);
    var cancel = react.useCallback(function () {
        if (!supported)
            return;
        window.speechSynthesis.cancel();
        setSpeaking(false);
    }, [supported]);
    var setVoice = react.useCallback(function (voice) {
        if (!supported)
            return;
        window.speechSynthesis.cancel();
    }, [supported]);
    var setRate = react.useCallback(function (rate) {
        if (!supported)
            return;
        window.speechSynthesis.cancel();
    }, [supported]);
    var setPitch = react.useCallback(function (pitch) {
        if (!supported)
            return;
        window.speechSynthesis.cancel();
    }, [supported]);
    return {
        speak: speak,
        pause: pause,
        resume: resume,
        cancel: cancel,
        speaking: speaking,
        voices: voices,
        setVoice: setVoice,
        setRate: setRate,
        setPitch: setPitch,
    };
}

exports.useSpeechReader = useSpeechReader;
//# sourceMappingURL=index.js.map
