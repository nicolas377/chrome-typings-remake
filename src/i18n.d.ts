export interface DetectedLanguage {
    /** An ISO language code such as 'en' or 'fr'.
     * For a complete list of languages supported by this method, see  [kLanguageInfoTable]{@link https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc}.
     * For an unknown language, 'und' will be returned, which means that [percentage] of the text is unknown to CLD */
    language: string;

    /** The percentage of the detected language */
    percentage: number;
}

export interface LanguageDetectionResult {
    /** CLD detected language reliability */
    isReliable: boolean;

    /** Array of detectedLanguage */
    languages: DetectedLanguage[];
}

export function getAcceptLanguages(): Promise<string[]>;
export function getAcceptLanguages(callback: (languages: string[]) => void): void;
export function getMessage(messageName: string, substitutions?: string | string[]): string;
export function getUILanguage(): string;
export function detectLanguage(text: string): Promise<LanguageDetectionResult>;
export function detectLanguage(text: string, callback: (result: LanguageDetectionResult) => void): void;
