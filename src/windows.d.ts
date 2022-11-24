import { Tab } from './tabs';
import { Event } from './events';
import { Window } from './windows';

export interface Window {
    /** Optional. Array of tabs.Tab objects representing the current tabs in the window. */
    tabs?: Tab[] | undefined;
    /** Optional. The offset of the window from the top edge of the screen in pixels. Under some circumstances a Window may not be assigned top property, for example when querying closed windows from the sessions API. */
    top?: number | undefined;
    /** Optional. The height of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned height property, for example when querying closed windows from the sessions API. */
    height?: number | undefined;
    /** Optional. The width of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned width property, for example when querying closed windows from the sessions API. */
    width?: number | undefined;
    /**
     * The state of this browser window.
     * @since Chrome 17.
     */
    state?: windowStateEnum | undefined;
    /** Whether the window is currently the focused window. */
    focused: boolean;
    /**
     * Whether the window is set to be always on top.
     * @since Chrome 19.
     */
    alwaysOnTop: boolean;
    /** Whether the window is incognito. */
    incognito: boolean;
    /**
     * The type of browser window this is.
     */
    type?: windowTypeEnum | undefined;
    /** Optional. The ID of the window. Window IDs are unique within a browser session. Under some circumstances a Window may not be assigned an ID, for example when querying windows using the sessions API, in which case a session ID may be present. */
    id?: number | undefined;
    /** Optional. The offset of the window from the left edge of the screen in pixels. Under some circumstances a Window may not be assigned left property, for example when querying closed windows from the sessions API. */
    left?: number | undefined;
    /**
     * Optional. The session ID used to uniquely identify a Window obtained from the sessions API.
     * @since Chrome 31.
     */
    sessionId?: string | undefined;
}

export interface QueryOptions {
    /**
     * Optional.
     * If true, the windows.Window object will have a tabs property that contains a list of the tabs.Tab objects.
     * The Tab objects only contain the url, pendingUrl, title and favIconUrl properties if the extension's manifest file includes the "tabs" permission.
     */
    populate?: boolean | undefined;
    /**
     * If set, the Window returned is filtered based on its type. If unset, the default filter is set to ['normal', 'popup'].
     */
    windowTypes?: windowTypeEnum[] | undefined;
}

export interface CreateData {
    /**
     * Optional. The id of the tab for which you want to adopt to the new window.
     * @since Chrome 10.
     */
    tabId?: number | undefined;
    /**
     * Optional.
     * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
     */
    url?: string | string[] | undefined;
    /**
     * Optional.
     * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
     */
    top?: number | undefined;
    /**
     * Optional.
     * The height in pixels of the new window, including the frame. If not specified defaults to a natural height.
     */
    height?: number | undefined;
    /**
     * Optional.
     * The width in pixels of the new window, including the frame. If not specified defaults to a natural width.
     */
    width?: number | undefined;
    /**
     * Optional. If true, opens an active window. If false, opens an inactive window.
     * @since Chrome 12.
     */
    focused?: boolean | undefined;
    /** Optional. Whether the new window should be an incognito window. */
    incognito?: boolean | undefined;
    /** Optional. Specifies what type of browser window to create. */
    type?: createTypeEnum | undefined;
    /**
     * Optional.
     * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
     */
    left?: number | undefined;
    /**
     * Optional. The initial state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
     * @since Chrome 44.
     */
    state?: windowStateEnum | undefined;
    /**
     * If true, the newly-created window's 'window.opener' is set to the caller and is in the same [unit of related browsing contexts](https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts) as the caller.
     * @since Chrome 64.
     */
    setSelfAsOpener?: boolean | undefined;
}

export interface UpdateInfo {
    /** Optional. The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels. */
    top?: number | undefined;
    /**
     * Optional. If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous draw attention request.
     * @since Chrome 14.
     */
    drawAttention?: boolean | undefined;
    /** Optional. The height to resize the window to in pixels. This value is ignored for panels. */
    height?: number | undefined;
    /** Optional. The width to resize the window to in pixels. This value is ignored for panels. */
    width?: number | undefined;
    /**
     * Optional. The new state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
     * @since Chrome 17.
     */
    state?: windowStateEnum | undefined;
    /**
     * Optional. If true, brings the window to the front. If false, brings the next window in the z-order to the front.
     * @since Chrome 8.
     */
    focused?: boolean | undefined;
    /** Optional. The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels. */
    left?: number | undefined;
}

export interface WindowEventFilter {
    /**
     * Conditions that the window's type being created must satisfy. By default it will satisfy ['app', 'normal', 'panel', 'popup'], with 'app' and 'panel' window types limited to the extension's own windows.
     */
    windowTypes: windowTypeEnum[];
}

export interface WindowIdEvent extends Event<(windowId: number) => void> {
    addListener(callback: (windowId: number) => void, filters?: WindowEventFilter): void;
}

export interface WindowReferenceEvent extends Event<(window: Window) => void> {
    addListener(callback: (window: Window) => void, filters?: WindowEventFilter): void;
}

export type createTypeEnum = 'normal' | 'popup' | 'panel';
export type windowStateEnum = 'normal' | 'minimized' | 'maximized' | 'fullscreen' | 'locked-fullscreen';
export type windowTypeEnum = 'normal' | 'popup' | 'panel' | 'app' | 'devtools';
export var WINDOW_ID_CURRENT: -2;
export var WINDOW_ID_NONE: -1;
export function get(windowId: number, callback: (window: Window) => void): void;
export function get(windowId: number): Promise<Window>;
export function get(windowId: number, queryOptions: QueryOptions, callback: (window: Window) => void): void;
export function get(windowId: number, queryOptions: QueryOptions): Promise<Window>;
export function getCurrent(callback: (window: Window) => void): void;
export function getCurrent(): Promise<Window>;
export function getCurrent(queryOptions: QueryOptions, callback: (window: Window) => void): void;
export function getCurrent(queryOptions: QueryOptions): Promise<Window>;
export function create(): Promise<Window>;
export function create(callback?: (window?: Window) => void): void;
export function create(createData: CreateData): Promise<Window>;
export function create(createData: CreateData, callback?: (window?: Window) => void): void;
export function getAll(callback: (windows: Window[]) => void): void;
export function getAll(): Promise<Window[]>;
export function getAll(queryOptions: QueryOptions, callback: (windows: Window[]) => void): void;
export function getAll(queryOptions: QueryOptions): Promise<Window[]>;
export function update(windowId: number, updateInfo: UpdateInfo): Promise<Window>;
export function update(windowId: number, updateInfo: UpdateInfo, callback?: (window: Window) => void): void;
export function remove(windowId: number): Promise<void>;
export function remove(windowId: number, callback?: Function): void;
export function getLastFocused(callback: (window: Window) => void): void;
export function getLastFocused(): Promise<Window>;
export function getLastFocused(queryOptions: QueryOptions, callback: (window: Window) => void): void;
export function getLastFocused(queryOptions: QueryOptions): Promise<Window>;
export var onRemoved: WindowIdEvent;
export var onCreated: WindowReferenceEvent;
export var onFocusChanged: WindowIdEvent;
export var onBoundsChanged: WindowReferenceEvent;
