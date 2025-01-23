# React Speech Reader 🗣️

A modern React application that converts text to speech using the Web Speech API. This application allows users to input text and have it read aloud with customizable voice settings.

## Features

- 🎯 Text-to-speech conversion
- 🔊 Multiple voice options
- 🌐 Cross-browser compatibility
- ⚡ Real-time speech synthesis
- 🎛️ Adjustable speech rate and pitch
- ⏯️ Full playback control (play, pause, resume, cancel)
- 🎨 Clean and responsive UI

## Installation

To get started with React Speech Reader, follow these steps:

```bash
# Using npm
npm install react-speech-reader

# Using yarn
yarn add react-speech-reader
```

## Usage

```typescript
import { useSpeechReader } from 'react-speech-reader';

function MyComponent() {
  const { 
    speak, 
    speaking, 
    voices,
    setVoice,
    setRate,
    setPitch,
    pause,
    resume,
    cancel
  } = useSpeechReader({
    rate: 1.0,
    pitch: 1.0
  });

  return (
    <div>
      <button 
        onClick={() => speak('Hello, welcome to React Speech Reader!')}
        disabled={speaking}
      >
        Speak
      </button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={cancel}>Stop</button>
    </div>
  );
}
```

## API Reference

### Types

```typescript
interface SpeechReaderOptions {
  rate?: number;        // Speech rate between 0.1 and 10
  pitch?: number;       // Speech pitch between 0 and 2
  voice?: SpeechSynthesisVoice;  // Browser's SpeechSynthesisVoice object
}

interface SpeechReaderHook {
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
```

### `useSpeechReader` Hook

```typescript
function useSpeechReader(options?: SpeechReaderOptions): SpeechReaderHook;
```

#### Options

| Option    | Type   | Default | Description                                |
|-----------|--------|---------|-------------------------------------------|
| rate      | number | 1.0     | Speech rate (0.1 to 10)                   |
| pitch     | number | 1.0     | Speech pitch (0 to 2)                     |
| voice     | SpeechSynthesisVoice | system default | Voice to use for speech |

#### Return Values

| Value     | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| speak     | function | Function to start speaking text                  |
| speaking  | boolean  | Whether speech is currently in progress          |
| voices    | array    | Available system voices                          |
| setVoice  | function | Function to change the current voice            |
| setRate   | function | Function to change the speech rate              |
| setPitch  | function | Function to change the speech pitch             |
| pause     | function | Function to pause speaking                      |
| resume    | function | Function to resume speaking                     |
| cancel    | function | Function to cancel speaking                     |

## Examples

### Basic Usage

```typescript
import { useSpeechReader } from 'react-speech-reader';

function TextReader() {
  const { speak, speaking } = useSpeechReader();
  
  return (
    <div>
      <textarea 
        onChange={(e) => speak(e.target.value)}
        placeholder="Type something to read..."
      />
    </div>
  );
}
```

### Advanced Usage with Full Controls

```typescript
import { useSpeechReader } from 'react-speech-reader';

function AdvancedReader() {
  const { 
    speak, 
    speaking, 
    voices, 
    setVoice, 
    setRate, 
    setPitch,
    pause,
    resume,
    cancel
  } = useSpeechReader();
  
  return (
    <div>
      {/* Voice Selection */}
      <select onChange={(e) => setVoice(voices[e.target.value])}>
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {voice.name}
          </option>
        ))}
      </select>

      {/* Rate Control */}
      <input 
        type="range" 
        min="0.1" 
        max="10" 
        step="0.1" 
        defaultValue="1"
        onChange={(e) => setRate(parseFloat(e.target.value))}
      />

      {/* Pitch Control */}
      <input 
        type="range" 
        min="0" 
        max="2" 
        step="0.1" 
        defaultValue="1"
        onChange={(e) => setPitch(parseFloat(e.target.value))}
      />

      {/* Playback Controls */}
      <div>
        <button onClick={() => speak('Testing voice settings')}>
          Speak
        </button>
        <button onClick={pause} disabled={!speaking}>
          Pause
        </button>
        <button onClick={resume} disabled={!speaking}>
          Resume
        </button>
        <button onClick={cancel} disabled={!speaking}>
          Stop
        </button>
      </div>
    </div>
  );
}
```

## Browser Support

This package uses the Web Speech API, which is supported in most modern browsers:

- Chrome 33+
- Edge 14+
- Firefox 49+
- Safari 7+
- Opera 21+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you find this project helpful, please give it a ⭐️!

For issues and feature requests, please create an issue on the GitHub repository.
