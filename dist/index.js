'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var useSpeechReader = function (_a) {
    var _b = _a === void 0 ? {} : _a, voice = _b.voice, _c = _b.rate, rate = _c === void 0 ? 1 : _c, _d = _b.pitch, pitch = _d === void 0 ? 1 : _d, _e = _b.volume, volume = _e === void 0 ? 1 : _e;
    var _f = react.useState(false), speaking = _f[0], setSpeaking = _f[1];
    var _g = react.useState([]), voices = _g[0], setVoices = _g[1];
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
        if (voice)
            utterance.voice = voice;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;
        utterance.onstart = function () { return setSpeaking(true); };
        utterance.onend = function () { return setSpeaking(false); };
        utterance.onerror = function () { return setSpeaking(false); };
        window.speechSynthesis.speak(utterance);
    }, [supported, voice, rate, pitch, volume]);
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
    var stop = react.useCallback(function () {
        if (!supported)
            return;
        window.speechSynthesis.cancel();
        setSpeaking(false);
    }, [supported]);
    return {
        speak: speak,
        pause: pause,
        resume: resume,
        stop: stop,
        speaking: speaking,
        supported: supported,
        voices: voices,
    };
};

exports.useSpeechReader = useSpeechReader;
//# sourceMappingURL=index.js.map
