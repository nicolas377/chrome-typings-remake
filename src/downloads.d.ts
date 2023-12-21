import { Event } from './events';

export interface HeaderNameValuePair {
    /** Name of the HTTP header. */
    name: string;
    /** Value of the HTTP header. */
    value: string;
}

export type FilenameConflictAction = 'uniquify' | 'overwrite' | 'prompt';
export interface DownloadOptions {
    /** Optional. Post body.  */
    body?: string | undefined;
    /** Optional. Use a file-chooser to allow the user to select a filename regardless of whether filename is set or already exists.  */
    saveAs?: boolean | undefined;
    /** The URL to download. */
    url: string;
    /** Optional. A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will cause an error. onDeterminingFilename allows suggesting a filename after the file's MIME type and a tentative filename have been determined.  */
    filename?: string | undefined;
    /** Optional. Extra HTTP headers to send with the request if the URL uses the HTTP[s] protocol. Each header is represented as a dictionary containing the keys name and either value or binaryValue, restricted to those allowed by XMLHttpRequest.  */
    headers?: HeaderNameValuePair[] | undefined;
    /** Optional. The HTTP method to use if the URL uses the HTTP[S] protocol.  */
    method?: 'GET' | 'POST' | undefined;
    /** Optional. The action to take if filename already exists.  */
    conflictAction?: FilenameConflictAction | undefined;
}

export interface DownloadDelta {
    /** The id of the DownloadItem that changed. */
    id: number;
    /** Optional. The change in danger, if any.  */
    danger?: StringDelta | undefined;
    /** Optional. The change in url, if any.  */
    url?: StringDelta | undefined;
    /**
     * Optional. The change in finalUrl, if any.
     * @since Since Chrome 54.
     */
    finalUrl?: StringDelta | undefined;
    /** Optional. The change in totalBytes, if any.  */
    totalBytes?: DoubleDelta | undefined;
    /** Optional. The change in filename, if any.  */
    filename?: StringDelta | undefined;
    /** Optional. The change in paused, if any.  */
    paused?: BooleanDelta | undefined;
    /** Optional. The change in state, if any.  */
    state?: StringDelta | undefined;
    /** Optional. The change in mime, if any.  */
    mime?: StringDelta | undefined;
    /** Optional. The change in fileSize, if any.  */
    fileSize?: DoubleDelta | undefined;
    /** Optional. The change in startTime, if any.  */
    startTime?: StringDelta | undefined;
    /** Optional. The change in error, if any.  */
    error?: StringDelta | undefined;
    /** Optional. The change in endTime, if any.  */
    endTime?: StringDelta | undefined;
    /** Optional. The change in canResume, if any.  */
    canResume?: BooleanDelta | undefined;
    /** Optional. The change in exists, if any.  */
    exists?: BooleanDelta | undefined;
}

export interface BooleanDelta {
    current?: boolean | undefined;
    previous?: boolean | undefined;
}

export interface DoubleDelta {
    current?: number | undefined;
    previous?: number | undefined;
}

export interface StringDelta {
    current?: string | undefined;
    previous?: string | undefined;
}

export type DownloadInterruptReason =
    | 'FILE_FAILED'
    | 'FILE_ACCESS_DENIED'
    | 'FILE_NO_SPACE'
    | 'FILE_NAME_TOO_LONG'
    | 'FILE_TOO_LARGE'
    | 'FILE_VIRUS_INFECTED'
    | 'FILE_TRANSIENT_ERROR'
    | 'FILE_BLOCKED'
    | 'FILE_SECURITY_CHECK_FAILED'
    | 'FILE_TOO_SHORT'
    | 'FILE_HASH_MISMATCH'
    | 'FILE_SAME_AS_SOURCE'
    | 'NETWORK_FAILED'
    | 'NETWORK_TIMEOUT'
    | 'NETWORK_DISCONNECTED'
    | 'NETWORK_SERVER_DOWN'
    | 'NETWORK_INVALID_REQUEST'
    | 'SERVER_FAILED'
    | 'SERVER_NO_RANGE'
    | 'SERVER_BAD_CONTENT'
    | 'SERVER_UNAUTHORIZED'
    | 'SERVER_CERT_PROBLEM'
    | 'SERVER_FORBIDDEN'
    | 'SERVER_UNREACHABLE'
    | 'SERVER_CONTENT_LENGTH_MISMATCH'
    | 'SERVER_CROSS_ORIGIN_REDIRECT'
    | 'USER_CANCELED'
    | 'USER_SHUTDOWN'
    | 'CRASH';
export type DownloadState = 'in_progress' | 'interrupted' | 'complete';
export type DangerType = 'file' | 'url' | 'content' | 'uncommon' | 'host' | 'unwanted' | 'safe' | 'accepted';
export interface DownloadItem {
    /** Number of bytes received so far from the host, without considering file compression. */
    bytesReceived: number;
    /** Indication of whether this download is thought to be safe or known to be suspicious. */
    danger: DangerType;
    /** The absolute URL that this download initiated from, before any redirects. */
    url: string;
    /**
     * The absolute URL that this download is being made from, after all redirects.
     * @since Since Chrome 54.
     */
    finalUrl: string;
    /** Number of bytes in the whole file, without considering file compression, or -1 if unknown. */
    totalBytes: number;
    /** Absolute local path. */
    filename: string;
    /** True if the download has stopped reading data from the host, but kept the connection open. */
    paused: boolean;
    /** Indicates whether the download is progressing, interrupted, or complete. */
    state: DownloadState;
    /** The file's MIME type. */
    mime: string;
    /** Number of bytes in the whole file post-decompression, or -1 if unknown. */
    fileSize: number;
    /** The time when the download began in ISO 8601 format. May be passed directly to the Date constructor: chrome.downloads.search({}, function(items){items.forEach(function(item){console.log(new Date(item.startTime))})}) */
    startTime: string;
    /** Optional. Why the download was interrupted. Several kinds of HTTP errors may be grouped under one of the errors beginning with SERVER_. Errors relating to the network begin with NETWORK_, errors relating to the process of writing the file to the file system begin with FILE_, and interruptions initiated by the user begin with USER_.  */
    error?: DownloadInterruptReason | undefined;
    /** Optional. The time when the download ended in ISO 8601 format. May be passed directly to the Date constructor: chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.endTime) console.log(new Date(item.endTime))})})  */
    endTime?: string | undefined;
    /** An identifier that is persistent across browser sessions. */
    id: number;
    /** False if this download is recorded in the history, true if it is not recorded. */
    incognito: boolean;
    /** Absolute URL. */
    referrer: string;
    /** Optional. Estimated time when the download will complete in ISO 8601 format. May be passed directly to the Date constructor: chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.estimatedEndTime) console.log(new Date(item.estimatedEndTime))})})  */
    estimatedEndTime?: string | undefined;
    /** True if the download is in progress and paused, or else if it is interrupted and can be resumed starting from where it was interrupted. */
    canResume: boolean;
    /** Whether the downloaded file still exists. This information may be out of date because Chrome does not automatically watch for file removal. Call search() in order to trigger the check for file existence. When the existence check completes, if the file has been deleted, then an onChanged event will fire. Note that search() does not wait for the existence check to finish before returning, so results from search() may not accurately reflect the file system. Also, search() may be called as often as necessary, but will not check for file existence any more frequently than once every 10 seconds. */
    exists: boolean;
    /** Optional. The identifier for the extension that initiated this download if this download was initiated by an extension. Does not change once it is set.  */
    byExtensionId?: string | undefined;
    /** Optional. The localized name of the extension that initiated this download if this download was initiated by an extension. May change if the extension changes its name or if the user changes their locale.  */
    byExtensionName?: string | undefined;
}

export interface GetFileIconOptions {
    /** Optional. * The size of the returned icon. The icon will be square with dimensions size * size pixels. The default and largest size for the icon is 32x32 pixels. The only supported sizes are 16 and 32. It is an error to specify any other size.
     */
    size?: 16 | 32 | undefined;
}

export interface DownloadQuery {
    /** Optional. Set elements of this array to DownloadItem properties in order to sort search results. For example, setting orderBy=['startTime'] sorts the DownloadItem by their start time in ascending order. To specify descending order, prefix with a hyphen: '-startTime'.  */
    orderBy?: string[] | undefined;
    /** Optional. Limits results to DownloadItem whose url matches the given regular expression.  */
    urlRegex?: string | undefined;
    /** Optional. Limits results to DownloadItem that ended before the time in ISO 8601 format.  */
    endedBefore?: string | undefined;
    /** Optional. Limits results to DownloadItem whose totalBytes is greater than the given integer.  */
    totalBytesGreater?: number | undefined;
    /** Optional. Indication of whether this download is thought to be safe or known to be suspicious.  */
    danger?: string | undefined;
    /** Optional. Number of bytes in the whole file, without considering file compression, or -1 if unknown.  */
    totalBytes?: number | undefined;
    /** Optional. True if the download has stopped reading data from the host, but kept the connection open.  */
    paused?: boolean | undefined;
    /** Optional. Limits results to DownloadItem whose filename matches the given regular expression.  */
    filenameRegex?: string | undefined;
    /** Optional. This array of search terms limits results to DownloadItem whose filename or url contain all of the search terms that do not begin with a dash '-' and none of the search terms that do begin with a dash.  */
    query?: string[] | undefined;
    /** Optional. Limits results to DownloadItem whose totalBytes is less than the given integer.  */
    totalBytesLess?: number | undefined;
    /** Optional. The id of the DownloadItem to query.  */
    id?: number | undefined;
    /** Optional. Number of bytes received so far from the host, without considering file compression.  */
    bytesReceived?: number | undefined;
    /** Optional. Limits results to DownloadItem that ended after the time in ISO 8601 format.  */
    endedAfter?: string | undefined;
    /** Optional. Absolute local path.  */
    filename?: string | undefined;
    /** Optional. Indicates whether the download is progressing, interrupted, or complete.  */
    state?: string | undefined;
    /** Optional. Limits results to DownloadItem that started after the time in ISO 8601 format.  */
    startedAfter?: string | undefined;
    /** Optional. The file's MIME type.  */
    mime?: string | undefined;
    /** Optional. Number of bytes in the whole file post-decompression, or -1 if unknown.  */
    fileSize?: number | undefined;
    /** Optional. The time when the download began in ISO 8601 format.  */
    startTime?: string | undefined;
    /** Optional. Absolute URL.  */
    url?: string | undefined;
    /** Optional. Limits results to DownloadItem that started before the time in ISO 8601 format.  */
    startedBefore?: string | undefined;
    /** Optional. The maximum number of matching DownloadItem returned. Defaults to 1000. Set to 0 in order to return all matching DownloadItem. See search for how to page through results.  */
    limit?: number | undefined;
    /** Optional. Why a download was interrupted.  */
    error?: number | undefined;
    /** Optional. The time when the download ended in ISO 8601 format.  */
    endTime?: string | undefined;
    /** Optional. Whether the downloaded file exists;  */
    exists?: boolean | undefined;
}

export interface DownloadFilenameSuggestion {
    /** The DownloadItem's new target DownloadItem.filename, as a path relative to the user's default Downloads directory, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will be ignored. */
    filename: string;
    /** Optional. The action to take if filename already exists.  */
    conflictAction?: string | undefined;
}

export interface UiOptions {
    /** Enable or disable the download UI. */
    enabled: boolean;
}

export interface DownloadChangedEvent extends Event<(downloadDelta: DownloadDelta) => void> {}

export interface DownloadCreatedEvent extends Event<(downloadItem: DownloadItem) => void> {}

export interface DownloadErasedEvent extends Event<(downloadId: number) => void> {}

export interface DownloadDeterminingFilenameEvent
    extends Event<(downloadItem: DownloadItem, suggest: (suggestion?: DownloadFilenameSuggestion) => void) => void> {}

export function search(query: DownloadQuery): Promise<DownloadItem[]>;
export function search(query: DownloadQuery, callback: (results: DownloadItem[]) => void): void;
export function pause(downloadId: number): Promise<void>;
export function pause(downloadId: number, callback: () => void): void;
export function getFileIcon(downloadId: number, options?: GetFileIconOptions): Promise<string>;
export function getFileIcon(downloadId: number, callback: (iconURL: string) => void): void;
export function getFileIcon(downloadId: number, options: GetFileIconOptions, callback: (iconURL: string) => void): void;
export function resume(downloadId: number): Promise<void>;
export function resume(downloadId: number, callback: () => void): void;
export function cancel(downloadId: number): Promise<void>;
export function cancel(downloadId: number, callback: () => void): void;
export function download(options: DownloadOptions): Promise<number>;
export function download(options: DownloadOptions, callback: (downloadId: number) => void): void;
export function open(downloadId: number): void;
export function show(downloadId: number): void;
export function showDefaultFolder(): void;
export function erase(query: DownloadQuery): Promise<number[]>;
export function erase(query: DownloadQuery, callback: (erasedIds: number[]) => void): void;
export function removeFile(downloadId: number): Promise<void>;
export function removeFile(downloadId: number, callback?: () => void): void;
export function acceptDanger(downloadId: number): Promise<void>;
export function acceptDanger(downloadId: number, callback: () => void): void;
export function drag(downloadId: number): void;
export function setShelfEnabled(enabled: boolean): void;
export function setUiOptions(options: UiOptions): Promise<void>;
export function setUiOptions(options: UiOptions, callback: () => void): void;
export var onChanged: DownloadChangedEvent;
export var onCreated: DownloadCreatedEvent;
export var onErased: DownloadErasedEvent;
export var onDeterminingFilename: DownloadDeterminingFilenameEvent;
