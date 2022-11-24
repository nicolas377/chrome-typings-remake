import { Tab } from './tabs';

export interface StreamOptions {
    /** True if "audio" is included in parameter sources, and the end user does not uncheck the "Share audio" checkbox. Otherwise false, and in this case, one should not ask for audio stream through getUserMedia call. */
    canRequestAudioTrack: boolean;
}

export function chooseDesktopMedia(
    sources: string[],
    callback: (streamId: string, options: StreamOptions) => void,
): number;
export function chooseDesktopMedia(
    sources: string[],
    targetTab: Tab,
    callback: (streamId: string, options: StreamOptions) => void,
): number;
export function cancelChooseDesktopMedia(desktopMediaRequestId: number): void;
