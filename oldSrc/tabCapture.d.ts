import { Event } from './events';

export interface CaptureInfo {
    /** The id of the tab whose status changed. */
    tabId: number;
    /**
     * The new capture status of the tab.
     * One of: "pending", "active", "stopped", or "error"
     */
    status: string;
    /** Whether an element in the tab being captured is in fullscreen mode. */
    fullscreen: boolean;
}

export interface MediaStreamConstraint {
    mandatory: object;
    optional?: object | undefined;
}

export interface CaptureOptions {
    /** Optional. */
    audio?: boolean | undefined;
    /** Optional. */
    video?: boolean | undefined;
    /** Optional. */
    audioConstraints?: MediaStreamConstraint | undefined;
    /** Optional. */
    videoConstraints?: MediaStreamConstraint | undefined;
}

export interface GetMediaStreamOptions {
    /** Optional tab id of the tab which will later invoke getUserMedia() to consume the stream. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches the consumber tab's origin. The tab's origin must be a secure origin, e.g. HTTPS. */
    consumerTabId?: number | undefined;
    /** Optional tab id of the tab which will be captured. If not specified then the current active tab will be selected. Only tabs for which the extension has been granted the activeTab permission can be used as the target tab. */
    targetTabId?: number | undefined;
}

export interface CaptureStatusChangedEvent extends Event<(info: CaptureInfo) => void> {}

export function capture(options: CaptureOptions, callback: (stream: MediaStream | null) => void): void;
export function getCapturedTabs(callback: (result: CaptureInfo[]) => void): void;
export function getMediaStreamId(options: GetMediaStreamOptions, callback: (streamId: string) => void): void;
export var onStatusChanged: CaptureStatusChangedEvent;
