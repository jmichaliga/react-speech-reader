'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function useSpeechReader(options) {
    var _a = __read(react.useState(false), 2), speaking = _a[0], setSpeaking = _a[1];
    var _b = __read(react.useState([]), 2), voices = _b[0], setVoices = _b[1];
    var _c = __read(react.useState(options), 2), currentOptions = _c[0], setCurrentOptions = _c[1];
    var supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    react.useEffect(function () {
        setCurrentOptions(options);
    }, [options]);
    react.useEffect(function () {
        if (!supported)
            return;
        var updateVoices = function () {
            setVoices(window.speechSynthesis.getVoices());
        };
        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;
        return function () {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [supported]);
    var speak = react.useCallback(function (text) {
        if (!supported)
            return;
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        if (currentOptions === null || currentOptions === void 0 ? void 0 : currentOptions.voice)
            utterance.voice = currentOptions.voice;
        if (currentOptions === null || currentOptions === void 0 ? void 0 : currentOptions.rate)
            utterance.rate = currentOptions.rate;
        if (currentOptions === null || currentOptions === void 0 ? void 0 : currentOptions.pitch)
            utterance.pitch = currentOptions.pitch;
        utterance.onstart = function () { return setSpeaking(true); };
        utterance.onend = function () { return setSpeaking(false); };
        utterance.onerror = function () { return setSpeaking(false); };
        window.speechSynthesis.speak(utterance);
    }, [supported, currentOptions]);
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
        setCurrentOptions(function (prev) { return (__assign(__assign({}, prev), { voice: voice })); });
    }, []);
    var setRate = react.useCallback(function (rate) {
        setCurrentOptions(function (prev) { return (__assign(__assign({}, prev), { rate: rate })); });
    }, []);
    var setPitch = react.useCallback(function (pitch) {
        setCurrentOptions(function (prev) { return (__assign(__assign({}, prev), { pitch: pitch })); });
    }, []);
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
