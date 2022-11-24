import { Event } from './events';
import { TtsEvent } from './tts';

export interface SpeakOptions {
    /** Optional. The language to be used for synthesis, in the form language-region. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'. */
    lang?: string | undefined;
    /** Optional. The name of the voice to use for synthesis. */
    voiceName?: string | undefined;
    /**
     * Optional. Gender of voice for synthesized speech.
     * One of: "male", or "female"
     */
    gender?: string | undefined;
    /** Optional. Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0. */
    volume?: number | undefined;
    /**
     * Optional.
     * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. This value is guaranteed to be between 0.1 and 10.0, inclusive. When a voice does not support this full range of rates, don't return an error. Instead, clip the rate to the range the voice supports.
     */
    rate?: number | undefined;
    /** Optional. Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to this voice's default pitch. */
    pitch?: number | undefined;
}

export interface TtsEngineSpeakEvent
    extends Event<(utterance: string, options: SpeakOptions, sendTtsEvent: (event: TtsEvent) => void) => void> {}

export var onSpeak: TtsEngineSpeakEvent;
export var onStop: Event<() => void>;
export var onPause: Event<() => void>;
export var onResume: Event<() => void>;
