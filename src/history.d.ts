import { Event } from './events';

export interface VisitItem {
    /** The transition type for this visit from its referrer. */
    transition: string;
    /** Optional. When this visit occurred, represented in milliseconds since the epoch. */
    visitTime?: number | undefined;
    /** The unique identifier for this visit. */
    visitId: string;
    /** The visit ID of the referrer. */
    referringVisitId: string;
    /** The unique identifier for the item. */
    id: string;
}

export interface HistoryItem {
    /** Optional. The number of times the user has navigated to this page by typing in the address. */
    typedCount?: number | undefined;
    /** Optional. The title of the page when it was last loaded. */
    title?: string | undefined;
    /** Optional. The URL navigated to by a user. */
    url?: string | undefined;
    /** Optional. When this page was last loaded, represented in milliseconds since the epoch. */
    lastVisitTime?: number | undefined;
    /** Optional. The number of times the user has navigated to this page. */
    visitCount?: number | undefined;
    /** The unique identifier for the item. */
    id: string;
}

export interface HistoryQuery {
    /** A free-text query to the history service. Leave empty to retrieve all pages. */
    text: string;
    /** Optional. The maximum number of results to retrieve. Defaults to 100. */
    maxResults?: number | undefined;
    /** Optional. Limit results to those visited after this date, represented in milliseconds since the epoch. */
    startTime?: number | undefined;
    /** Optional. Limit results to those visited before this date, represented in milliseconds since the epoch. */
    endTime?: number | undefined;
}

export interface Url {
    /** The URL for the operation. It must be in the format as returned from a call to history.search. */
    url: string;
}

export interface Range {
    /** Items added to history before this date, represented in milliseconds since the epoch. */
    endTime: number;
    /** Items added to history after this date, represented in milliseconds since the epoch. */
    startTime: number;
}

export interface RemovedResult {
    /** True if all history was removed. If true, then urls will be empty. */
    allHistory: boolean;
    /** Optional. */
    urls?: string[] | undefined;
}

export interface HistoryVisitedEvent extends Event<(result: HistoryItem) => void> {}

export interface HistoryVisitRemovedEvent extends Event<(removed: RemovedResult) => void> {}

export function search(query: HistoryQuery): Promise<HistoryItem[]>;
export function search(query: HistoryQuery, callback?: (results: HistoryItem[]) => void): void;
export function addUrl(details: Url): Promise<void>;
export function addUrl(details: Url, callback?: () => void): void;
export function deleteRange(range: Range): Promise<void>;
export function deleteRange(range: Range, callback?: () => void): void;
export function deleteAll(): Promise<void>;
export function deleteAll(callback: () => void): void;
export function getVisits(details: Url): Promise<VisitItem[]>;
export function getVisits(details: Url, callback: (results: VisitItem[]) => void): void;
export function deleteUrl(details: Url): Promise<void>;
export function deleteUrl(details: Url, callback?: () => void): void;
export var onVisited: HistoryVisitedEvent;
export var onVisitRemoved: HistoryVisitRemovedEvent;
