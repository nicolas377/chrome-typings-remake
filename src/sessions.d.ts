import { Event } from './events';

export interface Filter {
    /**
     * Optional.
     * The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries (sessions.MAX_SESSION_RESULTS).
     */
    maxResults?: number | undefined;
}

export interface Session {
    /** The time when the window or tab was closed or modified, represented in milliseconds since the epoch. */
    lastModified: number;
    /**
     * Optional.
     * The tabs.Tab, if this entry describes a tab. Either this or sessions.Session.window will be set.
     */
    tab?: tabs.Tab | undefined;
    /**
     * Optional.
     * The windows.Window, if this entry describes a window. Either this or sessions.Session.tab will be set.
     */
    window?: windows.Window | undefined;
}

export interface Device {
    /** The name of the foreign device. */
    deviceName: string;
    /** A list of open window sessions for the foreign device, sorted from most recently to least recently modified session. */
    sessions: Session[];
}

export interface SessionChangedEvent extends Event<() => void> {}

export var MAX_SESSION_RESULTS: number;
export function getRecentlyClosed(filter: Filter, callback: (sessions: Session[]) => void): void;
export function getRecentlyClosed(callback: (sessions: Session[]) => void): void;
export function getDevices(filter: Filter, callback: (devices: Device[]) => void): void;
export function getDevices(callback: (devices: Device[]) => void): void;
export function restore(sessionId?: string, callback?: (restoredSession: Session) => void): void;
export var onChanged: SessionChangedEvent;
