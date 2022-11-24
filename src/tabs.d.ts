import { Event } from './events';
import { Window } from './windows';

export interface MutedInfo {
    /** Whether the tab is prevented from playing sound (but hasn't necessarily recently produced sound). Equivalent to whether the muted audio indicator is showing. */
    muted: boolean;
    /**
     * Optional.
     * The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
     * "user": A user input action has set/overridden the muted state.
     * "capture": Tab capture started, forcing a muted state change.
     * "extension": An extension, identified by the extensionId field, set the muted state.
     */
    reason?: string | undefined;
    /**
     * Optional.
     * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
     */
    extensionId?: string | undefined;
}

export interface Tab {
    /**
     * Optional.
     * Either loading or complete.
     */
    status?: string | undefined;
    /** The zero-based index of the tab within its window. */
    index: number;
    /**
     * Optional.
     * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
     * @since Chrome 18.
     */
    openerTabId?: number | undefined;
    /**
     * Optional.
     * The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission.
     */
    title?: string | undefined;
    /**
     * Optional.
     * The URL the tab is displaying. This property is only present if the extension's manifest includes the "tabs" permission.
     */
    url?: string | undefined;
    /**
     * The URL the tab is navigating to, before it has committed.
     * This property is only present if the extension's manifest includes the "tabs" permission and there is a pending navigation.
     * @since Chrome 79.
     */
    pendingUrl?: string | undefined;
    /**
     * Whether the tab is pinned.
     * @since Chrome 9.
     */
    pinned: boolean;
    /**
     * Whether the tab is highlighted.
     * @since Chrome 16.
     */
    highlighted: boolean;
    /** The ID of the window the tab is contained within. */
    windowId: number;
    /**
     * Whether the tab is active in its window. (Does not necessarily mean the window is focused.)
     * @since Chrome 16.
     */
    active: boolean;
    /**
     * Optional.
     * The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading.
     */
    favIconUrl?: string | undefined;
    /**
     * Optional.
     * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to chrome.tabs.TAB_ID_NONE for apps and devtools windows.
     */
    id?: number | undefined;
    /** Whether the tab is in an incognito window. */
    incognito: boolean;
    /**
     * Whether the tab is selected.
     * @deprecated since Chrome 33. Please use tabs.Tab.highlighted.
     */
    selected: boolean;
    /**
     * Optional.
     * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the speaker audio indicator is showing.
     * @since Chrome 45.
     */
    audible?: boolean | undefined;
    /**
     * Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated.
     * @since Chrome 54.
     */
    discarded: boolean;
    /**
     * Whether the tab can be discarded automatically by the browser when resources are low.
     * @since Chrome 54.
     */
    autoDiscardable: boolean;
    /**
     * Optional.
     * Current tab muted state and the reason for the last state change.
     * @since Chrome 46. Warning: this is the current Beta channel.
     */
    mutedInfo?: MutedInfo | undefined;
    /**
     * Optional. The width of the tab in pixels.
     * @since Chrome 31.
     */
    width?: number | undefined;
    /**
     * Optional. The height of the tab in pixels.
     * @since Chrome 31.
     */
    height?: number | undefined;
    /**
     * Optional. The session ID used to uniquely identify a Tab obtained from the sessions API.
     * @since Chrome 31.
     */
    sessionId?: string | undefined;
    /**
     * The ID of the group that the tab belongs to.
     * @since Chrome 88
     */
    groupId: number;
}

export interface ZoomSettings {
    /**
     * Optional.
     * Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to "automatic".
     * "automatic": Zoom changes are handled automatically by the browser.
     * "manual": Overrides the automatic handling of zoom changes. The onZoomChange event will still be dispatched, and it is the responsibility of the extension to listen for this event and manually scale the page. This mode does not support per-origin zooming, and will thus ignore the scope zoom setting and assume per-tab.
     * "disabled": Disables all zooming in the tab. The tab will revert to the default zoom level, and all attempted zoom changes will be ignored.
     */
    mode?: string | undefined;
    /**
     * Optional.
     * Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise.
     * "per-origin": Zoom changes will persist in the zoomed page's origin, i.e. all other tabs navigated to that same origin will be zoomed as well. Moreover, per-origin zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they will all be zoomed to the same zoom factor. The per-origin scope is only available in the automatic mode.
     * "per-tab": Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. Also, per-tab zoom changes are reset on navigation; navigating a tab will always load pages with their per-origin zoom factors.
     */
    scope?: string | undefined;
    /**
     * Optional.
     * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
     * @since Chrome 43.
     */
    defaultZoomFactor?: number | undefined;
}

export interface InjectDetails {
    /**
     * Optional.
     * If allFrames is true, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's false and is only injected into the top frame.
     */
    allFrames?: boolean | undefined;
    /**
     * Optional. JavaScript or CSS code to inject.
     * Warning: Be careful using the code parameter. Incorrect use of it may open your extension to cross site scripting attacks.
     */
    code?: string | undefined;
    /**
     * Optional. The soonest that the JavaScript or CSS will be injected into the tab.
     * One of: "document_start", "document_end", or "document_idle"
     * @since Chrome 20.
     */
    runAt?: string | undefined;
    /** Optional. JavaScript or CSS file to inject. */
    file?: string | undefined;
    /**
     * Optional.
     * The frame where the script or CSS should be injected. Defaults to 0 (the top-level frame).
     * @since Chrome 39.
     */
    frameId?: number | undefined;
    /**
     * Optional.
     * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is false.
     * @since Chrome 39.
     */
    matchAboutBlank?: boolean | undefined;
    /**
     * Optional. The origin of the CSS to inject. This may only be specified for CSS, not JavaScript. Defaults to "author".
     * One of: "author", or "user"
     * @since Chrome 66.
     */
    cssOrigin?: string | undefined;
}

export interface CreateProperties {
    /** Optional. The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window. */
    index?: number | undefined;
    /**
     * Optional.
     * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
     * @since Chrome 18.
     */
    openerTabId?: number | undefined;
    /**
     * Optional.
     * The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
     */
    url?: string | undefined;
    /**
     * Optional. Whether the tab should be pinned. Defaults to false
     * @since Chrome 9.
     */
    pinned?: boolean | undefined;
    /** Optional. The window to create the new tab in. Defaults to the current window. */
    windowId?: number | undefined;
    /**
     * Optional.
     * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true.
     * @since Chrome 16.
     */
    active?: boolean | undefined;
    /**
     * Optional. Whether the tab should become the selected tab in the window. Defaults to true
     * @deprecated since Chrome 33. Please use active.
     */
    selected?: boolean | undefined;
}

export interface MoveProperties {
    /** The position to move the window to. -1 will place the tab at the end of the window. */
    index: number;
    /** Optional. Defaults to the window the tab is currently in. */
    windowId?: number | undefined;
}

export interface UpdateProperties {
    /**
     * Optional. Whether the tab should be pinned.
     * @since Chrome 9.
     */
    pinned?: boolean | undefined;
    /**
     * Optional. The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
     * @since Chrome 18.
     */
    openerTabId?: number | undefined;
    /** Optional. A URL to navigate the tab to. */
    url?: string | undefined;
    /**
     * Optional. Adds or removes the tab from the current selection.
     * @since Chrome 16.
     */
    highlighted?: boolean | undefined;
    /**
     * Optional. Whether the tab should be active. Does not affect whether the window is focused (see windows.update).
     * @since Chrome 16.
     */
    active?: boolean | undefined;
    /**
     * Optional. Whether the tab should be selected.
     * @deprecated since Chrome 33. Please use highlighted.
     */
    selected?: boolean | undefined;
    /**
     * Optional. Whether the tab should be muted.
     * @since Chrome 45.
     */
    muted?: boolean | undefined;
    /**
     * Optional. Whether the tab should be discarded automatically by the browser when resources are low.
     * @since Chrome 54.
     */
    autoDiscardable?: boolean | undefined;
}

export interface CaptureVisibleTabOptions {
    /**
     * Optional.
     * When format is "jpeg", controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
     */
    quality?: number | undefined;
    /**
     * Optional. The format of an image.
     * One of: "jpeg", or "png"
     */
    format?: string | undefined;
}

export interface ReloadProperties {
    /** Optional. Whether using any local cache. Default is false. */
    bypassCache?: boolean | undefined;
}

export interface ConnectInfo {
    /** Optional. Will be passed into onConnect for content scripts that are listening for the connection event. */
    name?: string | undefined;
    /**
     * Open a port to a specific frame identified by frameId instead of all frames in the tab.
     * @since Chrome 41.
     */
    frameId?: number | undefined;
}

export interface MessageSendOptions {
    /** Optional. Send a message to a specific frame identified by frameId instead of all frames in the tab. */
    frameId?: number | undefined;
}

export interface GroupOptions {
    /** Optional. Configurations for creating a group. Cannot be used if groupId is already specified. */
    createProperties?:
        | {
              /** Optional. The window of the new group. Defaults to the current window. */
              windowId?: number | undefined;
          }
        | undefined;
    /** Optional. The ID of the group to add the tabs to. If not specified, a new group will be created. */
    groupId?: number | undefined;
    /** TOptional. he tab ID or list of tab IDs to add to the specified group. */
    tabIds?: number | number[] | undefined;
}

export interface HighlightInfo {
    /** One or more tab indices to highlight. */
    tabs: number | number[];
    /** Optional. The window that contains the tabs. */
    windowId?: number | undefined;
}

export interface QueryInfo {
    /**
     * Optional. Whether the tabs have completed loading.
     * One of: "loading", or "complete"
     */
    status?: 'loading' | 'complete' | undefined;
    /**
     * Optional. Whether the tabs are in the last focused window.
     * @since Chrome 19.
     */
    lastFocusedWindow?: boolean | undefined;
    /** Optional. The ID of the parent window, or windows.WINDOW_ID_CURRENT for the current window. */
    windowId?: number | undefined;
    /**
     * Optional. The type of window the tabs are in.
     * One of: "normal", "popup", "panel", "app", or "devtools"
     */
    windowType?: 'normal' | 'popup' | 'panel' | 'app' | 'devtools' | undefined;
    /** Optional. Whether the tabs are active in their windows. */
    active?: boolean | undefined;
    /**
     * Optional. The position of the tabs within their windows.
     * @since Chrome 18.
     */
    index?: number | undefined;
    /** Optional. Match page titles against a pattern. */
    title?: string | undefined;
    /** Optional. Match tabs against one or more URL patterns. Note that fragment identifiers are not matched. */
    url?: string | string[] | undefined;
    /**
     * Optional. Whether the tabs are in the current window.
     * @since Chrome 19.
     */
    currentWindow?: boolean | undefined;
    /** Optional. Whether the tabs are highlighted. */
    highlighted?: boolean | undefined;
    /**
     * Optional.
     * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated.
     * @since Chrome 54.
     */
    discarded?: boolean | undefined;
    /**
     * Optional.
     * Whether the tabs can be discarded automatically by the browser when resources are low.
     * @since Chrome 54.
     */
    autoDiscardable?: boolean | undefined;
    /** Optional. Whether the tabs are pinned. */
    pinned?: boolean | undefined;
    /**
     * Optional. Whether the tabs are audible.
     * @since Chrome 45.
     */
    audible?: boolean | undefined;
    /**
     * Optional. Whether the tabs are muted.
     * @since Chrome 45.
     */
    muted?: boolean | undefined;
    /**
     * Optional. The ID of the group that the tabs are in, or chrome.tabGroups.TAB_GROUP_ID_NONE for ungrouped tabs.
     * @since Chrome 88
     */
    groupId?: number | undefined;
}

export interface TabHighlightInfo {
    windowId: number;
    tabIds: number[];
}

export interface TabRemoveInfo {
    /**
     * The window whose tab is closed.
     * @since Chrome 25.
     */
    windowId: number;
    /** True when the tab is being closed because its window is being closed. */
    isWindowClosing: boolean;
}

export interface TabAttachInfo {
    newPosition: number;
    newWindowId: number;
}

export interface TabChangeInfo {
    /** Optional. The status of the tab. Can be either loading or complete. */
    status?: string | undefined;
    /**
     * The tab's new pinned state.
     * @since Chrome 9.
     */
    pinned?: boolean | undefined;
    /** Optional. The tab's URL if it has changed. */
    url?: string | undefined;
    /**
     * The tab's new audible state.
     * @since Chrome 45.
     */
    audible?: boolean | undefined;
    /**
     * The tab's new discarded state.
     * @since Chrome 54.
     */
    discarded?: boolean | undefined;
    /**
     * The tab's new auto-discardable
     * @since Chrome 54.
     */
    autoDiscardable?: boolean | undefined;
    /**
     * The tab's new group.
     * @since Chrome 88
     */
    groupId?: number | undefined;
    /**
     * The tab's new muted state and the reason for the change.
     * @since Chrome 46. Warning: this is the current Beta channel.
     */
    mutedInfo?: MutedInfo | undefined;
    /**
     * The tab's new favicon URL.
     * @since Chrome 27.
     */
    favIconUrl?: string | undefined;
    /**
     * The tab's new title.
     * @since Chrome 48.
     */
    title?: string | undefined;
}

export interface TabMoveInfo {
    toIndex: number;
    windowId: number;
    fromIndex: number;
}

export interface TabDetachInfo {
    oldWindowId: number;
    oldPosition: number;
}

export interface TabActiveInfo {
    /** The ID of the tab that has become active. */
    tabId: number;
    /** The ID of the window the active tab changed inside of. */
    windowId: number;
}

export interface TabWindowInfo {
    /** The ID of the window of where the tab is located. */
    windowId: number;
}

export interface ZoomChangeInfo {
    tabId: number;
    oldZoomFactor: number;
    newZoomFactor: number;
    zoomSettings: ZoomSettings;
}

export interface TabHighlightedEvent extends Event<(highlightInfo: TabHighlightInfo) => void> {}

export interface TabRemovedEvent extends Event<(tabId: number, removeInfo: TabRemoveInfo) => void> {}

export interface TabUpdatedEvent extends Event<(tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void> {}

export interface TabAttachedEvent extends Event<(tabId: number, attachInfo: TabAttachInfo) => void> {}

export interface TabMovedEvent extends Event<(tabId: number, moveInfo: TabMoveInfo) => void> {}

export interface TabDetachedEvent extends Event<(tabId: number, detachInfo: TabDetachInfo) => void> {}

export interface TabCreatedEvent extends Event<(tab: Tab) => void> {}

export interface TabActivatedEvent extends Event<(activeInfo: TabActiveInfo) => void> {}

export interface TabReplacedEvent extends Event<(addedTabId: number, removedTabId: number) => void> {}

export interface TabSelectedEvent extends Event<(tabId: number, selectInfo: TabWindowInfo) => void> {}

export interface TabZoomChangeEvent extends Event<(ZoomChangeInfo: ZoomChangeInfo) => void> {}

export function executeScript(details: InjectDetails): Promise<any[]>;
export function executeScript(details: InjectDetails, callback?: (result: any[]) => void): void;
export function executeScript(tabId: number, details: InjectDetails): Promise<any[]>;
export function executeScript(tabId: number, details: InjectDetails, callback?: (result: any[]) => void): void;
export function get(tabId: number, callback: (tab: Tab) => void): void;
export function get(tabId: number): Promise<Tab>;
export function getAllInWindow(callback: (tab: Tab) => void): void;
export function getAllInWindow(): Promise<Tab>;
export function getAllInWindow(windowId: number, callback: (tab: Tab) => void): void;
export function getAllInWindow(windowId: number): Promise<Tab>;
export function getCurrent(callback: (tab?: Tab) => void): void;
export function getCurrent(): Promise<Tab | undefined>;
export function getSelected(callback: (tab: Tab) => void): void;
export function getSelected(): Promise<Tab>;
export function getSelected(windowId: number, callback: (tab: Tab) => void): void;
export function getSelected(windowId: number): Promise<Tab>;
export function create(createProperties: CreateProperties): Promise<Tab>;
export function create(createProperties: CreateProperties, callback?: (tab: Tab) => void): void;
export function move(tabId: number, moveProperties: MoveProperties): Promise<Tab>;
export function move(tabId: number, moveProperties: MoveProperties, callback?: (tab: Tab) => void): void;
export function move(tabIds: number[], moveProperties: MoveProperties): Promise<Tab[]>;
export function move(tabIds: number[], moveProperties: MoveProperties, callback?: (tabs: Tab[]) => void): void;
export function update(updateProperties: UpdateProperties): Promise<Tab>;
export function update(updateProperties: UpdateProperties, callback?: (tab?: Tab) => void): void;
export function update(tabId: number, updateProperties: UpdateProperties): Promise<Tab>;
export function update(tabId: number, updateProperties: UpdateProperties, callback?: (tab?: Tab) => void): void;
export function remove(tabId: number): Promise<void>;
export function remove(tabId: number, callback?: Function): void;
export function remove(tabIds: number[]): Promise<void>;
export function remove(tabIds: number[], callback?: Function): void;
export function captureVisibleTab(callback: (dataUrl: string) => void): void;
export function captureVisibleTab(): Promise<string>;
export function captureVisibleTab(windowId: number, callback: (dataUrl: string) => void): void;
export function captureVisibleTab(windowId: number): Promise<string>;
export function captureVisibleTab(options: CaptureVisibleTabOptions): Promise<string>;
export function captureVisibleTab(options: CaptureVisibleTabOptions, callback: (dataUrl: string) => void): void;
export function captureVisibleTab(windowId: number, options: CaptureVisibleTabOptions): Promise<string>;
export function captureVisibleTab(
    windowId: number,
    options: CaptureVisibleTabOptions,
    callback: (dataUrl: string) => void,
): void;
export function reload(tabId: number, reloadProperties?: ReloadProperties): Promise<void>;
export function reload(tabId: number, reloadProperties?: ReloadProperties, callback?: () => void): void;
export function reload(reloadProperties: ReloadProperties): Promise<void>;
export function reload(reloadProperties: ReloadProperties, callback?: () => void): void;
export function reload(): Promise<void>;
export function reload(callback?: () => void): void;
export function duplicate(tabId: number, callback?: (tab?: Tab) => void): void;
export function sendMessage<M = any, R = any>(tabId: number, message: M, responseCallback: (response: R) => void): void;
export function sendMessage<M = any, R = any>(
    tabId: number,
    message: M,
    options: MessageSendOptions,
    responseCallback: (response: R) => void,
): void;
export function sendMessage<M = any, R = any>(tabId: number, message: M): Promise<R>;
export function sendMessage<M = any, R = any>(tabId: number, message: M, options: MessageSendOptions): Promise<R>;
export function sendRequest<Request = any, Response = any>(
    tabId: number,
    request: Request,
    responseCallback?: (response: Response) => void,
): void;
export function connect(tabId: number, connectInfo?: ConnectInfo): runtime.Port;
export function insertCSS(details: InjectDetails): Promise<void>;
export function insertCSS(details: InjectDetails, callback?: Function): void;
export function insertCSS(tabId: number, details: InjectDetails): Promise<void>;
export function insertCSS(tabId: number, details: InjectDetails, callback?: Function): void;
export function highlight(highlightInfo: HighlightInfo): Promise<Window>;
export function highlight(highlightInfo: HighlightInfo, callback?: (window: Window) => void): void;
export function query(queryInfo: QueryInfo, callback: (result: Tab[]) => void): void;
export function query(queryInfo: QueryInfo): Promise<Tab[]>;
export function detectLanguage(callback: (language: string) => void): void;
export function detectLanguage(): Promise<string>;
export function detectLanguage(tabId: number, callback: (language: string) => void): void;
export function detectLanguage(tabId: number): Promise<string>;
export function setZoom(zoomFactor: number): Promise<void>;
export function setZoom(zoomFactor: number, callback?: () => void): void;
export function setZoom(tabId: number, zoomFactor: number): Promise<void>;
export function setZoom(tabId: number, zoomFactor: number, callback?: () => void): void;
export function getZoom(callback: (zoomFactor: number) => void): void;
export function getZoom(): Promise<number>;
export function getZoom(tabId: number, callback: (zoomFactor: number) => void): void;
export function getZoom(tabId: number): Promise<number>;
export function setZoomSettings(zoomSettings: ZoomSettings): Promise<void>;
export function setZoomSettings(zoomSettings: ZoomSettings, callback?: () => void): void;
export function setZoomSettings(tabId: number, zoomSettings: ZoomSettings): Promise<void>;
export function setZoomSettings(tabId: number, zoomSettings: ZoomSettings, callback?: () => void): void;
export function getZoomSettings(callback: (zoomSettings: ZoomSettings) => void): void;
export function getZoomSettings(): Promise<ZoomSettings>;
export function getZoomSettings(tabId: number, callback: (zoomSettings: ZoomSettings) => void): void;
export function getZoomSettings(tabId: number): Promise<ZoomSettings>;
export function discard(tabId?: number): Promise<Tab>;
export function discard(tabId?: number, callback?: (tab: Tab) => void): void;
export function goForward(): Promise<void>;
export function goForward(callback?: () => void): void;
export function goForward(tabId: number): Promise<void>;
export function goForward(tabId: number, callback?: () => void): void;
export function goBack(): Promise<void>;
export function goBack(callback?: () => void): void;
export function goBack(tabId: number): Promise<void>;
export function goBack(tabId: number, callback?: () => void): void;
export function group(options: GroupOptions): Promise<number>;
export function group(options: GroupOptions): Promise<number>;
export function group(options: GroupOptions, callback?: (groupId: number) => void): void;
export function ungroup(tabIds: number | number[]): Promise<void>;
export function ungroup(tabIds: number | number[], callback?: () => void): void;
export var onHighlighted: TabHighlightedEvent;
export var onRemoved: TabRemovedEvent;
export var onUpdated: TabUpdatedEvent;
export var onAttached: TabAttachedEvent;
export var onMoved: TabMovedEvent;
export var onDetached: TabDetachedEvent;
export var onCreated: TabCreatedEvent;
export var onActivated: TabActivatedEvent;
export var onReplaced: TabReplacedEvent;
export var onSelectionChanged: TabSelectedEvent;
export var onActiveChanged: TabSelectedEvent;
export var onHighlightChanged: TabHighlightedEvent;
export var onZoomChange: TabZoomChangeEvent;
export var TAB_ID_NONE: -1;
