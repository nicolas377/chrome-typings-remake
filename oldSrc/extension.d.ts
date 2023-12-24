import { Event } from './events';

export interface FetchProperties {
    /**
     * Optional.
     * Chrome 54+
     * Find a view according to a tab id. If this field is omitted, returns all views.
     */
    tabId?: number | undefined;
    /** Optional. The window to restrict the search to. If omitted, returns all views.  */
    windowId?: number | undefined;
    /** Optional. The type of view to get. If omitted, returns all views (including background pages and tabs). Valid values: 'tab', 'notification', 'popup'.  */
    type?: string | undefined;
}

export interface LastError {
    /** Description of the error that has taken place. */
    message: string;
}

export interface OnRequestEvent
    extends Event<
        | ((request: any, sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
        | ((sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
    > {}

export var inIncognitoContext: boolean;
export var lastError: LastError;
export function getBackgroundPage(): Window | null;
export function getURL(path: string): string;
export function setUpdateUrlData(data: string): void;
export function getViews(fetchProperties?: FetchProperties): Window[];
export function isAllowedFileSchemeAccess(): Promise<boolean>;
export function isAllowedFileSchemeAccess(callback: (isAllowedAccess: boolean) => void): void;
export function isAllowedIncognitoAccess(): Promise<boolean>;
export function isAllowedIncognitoAccess(callback: (isAllowedAccess: boolean) => void): void;
export function sendRequest<Request = any, Response = any>(
    extensionId: string,
    request: Request,
    responseCallback?: (response: Response) => void,
): void;
export function sendRequest<Request = any, Response = any>(
    request: Request,
    responseCallback?: (response: Response) => void,
): void;
export function getExtensionTabs(windowId?: number): Window[];
export var onRequest: OnRequestEvent;
export var onRequestExternal: OnRequestEvent;
