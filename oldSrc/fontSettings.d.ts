import { Event } from './events';

export interface FontName {
    /** The display name of the font. */
    displayName: string;
    /** The font ID. */
    fontId: string;
}

export interface DefaultFontSizeDetails {
    /** The font size in pixels. */
    pixelSize: number;
}

export interface FontDetails {
    /** The generic font family for the font. */
    genericFamily: 'cursive' | 'fantasy' | 'fixed' | 'sansserif' | 'serif' | 'standard';
    /** Optional. The script for the font. If omitted, the global script font setting is affected.  */
    script?: string | undefined;
}

export interface FullFontDetails {
    /** The generic font family for which the font setting has changed. */
    genericFamily: string;
    /** The level of control this extension has over the setting. */
    levelOfControl: string;
    /** Optional. The script code for which the font setting has changed.  */
    script?: string | undefined;
    /** The font ID. See the description in getFont. */
    fontId: string;
}

export interface FontDetailsResult {
    /** The level of control this extension has over the setting. */
    levelOfControl: string;
    /** The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, fontId can differ from the font passed to setFont, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting. */
    fontId: string;
}

export interface FontSizeDetails {
    /** The font size in pixels. */
    pixelSize: number;
    /** The level of control this extension has over the setting. */
    levelOfControl: string;
}

export interface SetFontSizeDetails {
    /** The font size in pixels. */
    pixelSize: number;
}

export interface SetFontDetails extends FontDetails {
    /** The font ID. The empty string means to fallback to the global script font setting. */
    fontId: string;
}

export interface DefaultFixedFontSizeChangedEvent extends Event<(details: FontSizeDetails) => void> {}

export interface DefaultFontSizeChangedEvent extends Event<(details: FontSizeDetails) => void> {}

export interface MinimumFontSizeChangedEvent extends Event<(details: FontSizeDetails) => void> {}

export interface FontChangedEvent extends Event<(details: FullFontDetails) => void> {}

export function setDefaultFontSize(details: DefaultFontSizeDetails): Promise<void>;
export function setDefaultFontSize(details: DefaultFontSizeDetails, callback: Function): void;
export function getFont(details: FontDetails): Promise<FontDetailsResult>;
export function getFont(details: FontDetails, callback: (details: FontDetailsResult) => void): void;
export function getDefaultFontSize(details?: Object): Promise<FontSizeDetails>;
export function getDefaultFontSize(callback: (options: FontSizeDetails) => void): void;
export function getDefaultFontSize(details: Object, callback: (options: FontSizeDetails) => void): void;
export function getMinimumFontSize(details?: object): Promise<FontSizeDetails>;
export function getMinimumFontSize(callback: (options: FontSizeDetails) => void): void;
export function getMinimumFontSize(details: object, callback: (options: FontSizeDetails) => void): void;
export function setMinimumFontSize(details: SetFontSizeDetails): Promise<void>;
export function setMinimumFontSize(details: SetFontSizeDetails, callback: Function): void;
export function getDefaultFixedFontSize(details?: Object): Promise<FontSizeDetails>;
export function getDefaultFixedFontSize(callback: (details: FontSizeDetails) => void): void;
export function getDefaultFixedFontSize(details: Object, callback: (details: FontSizeDetails) => void): void;
export function clearDefaultFontSize(details?: Object): Promise<void>;
export function clearDefaultFontSize(callback: Function): void;
export function clearDefaultFontSize(details: Object, callback: Function): void;
export function setDefaultFixedFontSize(details: SetFontSizeDetails): Promise<void>;
export function setDefaultFixedFontSize(details: SetFontSizeDetails, callback: Function): void;
export function clearFont(details: FontDetails): Promise<void>;
export function clearFont(details: FontDetails, callback: Function): void;
export function setFont(details: SetFontDetails): Promise<void>;
export function setFont(details: SetFontDetails, callback: Function): void;
export function clearMinimumFontSize(details?: Object): Promise<void>;
export function clearMinimumFontSize(callback: Function): void;
export function clearMinimumFontSize(details: Object, callback: Function): void;
export function getFontList(): Promise<FontName[]>;
export function getFontList(callback: (results: FontName[]) => void): void;
export function clearDefaultFixedFontSize(details: Object): Promise<void>;
export function clearDefaultFixedFontSize(details: Object, callback: Function): void;
export var onDefaultFixedFontSizeChanged: DefaultFixedFontSizeChangedEvent;
export var onDefaultFontSizeChanged: DefaultFontSizeChangedEvent;
export var onMinimumFontSizeChanged: MinimumFontSizeChangedEvent;
export var onFontChanged: FontChangedEvent;
