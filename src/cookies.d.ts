import { Event } from './events';

export type SameSiteStatus = 'unspecified' | 'no_restriction' | 'lax' | 'strict';
export interface Cookie {
    /** The domain of the cookie (e.g. "www.google.com", "example.com"). */
    domain: string;
    /** The name of the cookie. */
    name: string;
    /** The ID of the cookie store containing this cookie, as provided in getAllCookieStores(). */
    storeId: string;
    /** The value of the cookie. */
    value: string;
    /** True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date. */
    session: boolean;
    /** True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie). */
    hostOnly: boolean;
    /** Optional. The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.  */
    expirationDate?: number | undefined;
    /** The path of the cookie. */
    path: string;
    /** True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts). */
    httpOnly: boolean;
    /** True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS). */
    secure: boolean;
    /**
     * The cookie's same-site status (i.e. whether the cookie is sent with cross-site requests).
     * @since Chrome 51.
     */
    sameSite: SameSiteStatus;
}

export interface CookieStore {
    /** The unique identifier for the cookie store. */
    id: string;
    /** Identifiers of all the browser tabs that share this cookie store. */
    tabIds: number[];
}

export interface GetAllDetails {
    /** Optional. Restricts the retrieved cookies to those whose domains match or are subdomains of this one.  */
    domain?: string | undefined;
    /** Optional. Filters the cookies by name.  */
    name?: string | undefined;
    /** Optional. Restricts the retrieved cookies to those that would match the given URL.  */
    url?: string | undefined;
    /** Optional. The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used.  */
    storeId?: string | undefined;
    /** Optional. Filters out session vs. persistent cookies.  */
    session?: boolean | undefined;
    /** Optional. Restricts the retrieved cookies to those whose path exactly matches this string.  */
    path?: string | undefined;
    /** Optional. Filters the cookies by their Secure property.  */
    secure?: boolean | undefined;
}

export interface SetDetails {
    /** Optional. The domain of the cookie. If omitted, the cookie becomes a host-only cookie.  */
    domain?: string | undefined;
    /** Optional. The name of the cookie. Empty by default if omitted.  */
    name?: string | undefined;
    /** The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail. */
    url: string;
    /** Optional. The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store.  */
    storeId?: string | undefined;
    /** Optional. The value of the cookie. Empty by default if omitted.  */
    value?: string | undefined;
    /** Optional. The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie.  */
    expirationDate?: number | undefined;
    /** Optional. The path of the cookie. Defaults to the path portion of the url parameter.  */
    path?: string | undefined;
    /** Optional. Whether the cookie should be marked as HttpOnly. Defaults to false.  */
    httpOnly?: boolean | undefined;
    /** Optional. Whether the cookie should be marked as Secure. Defaults to false.  */
    secure?: boolean | undefined;
    /**
     * Optional. The cookie's same-site status. Defaults to "unspecified", i.e., if omitted, the cookie is set without specifying a SameSite attribute.
     * @since Chrome 51.
     */
    sameSite?: SameSiteStatus | undefined;
}

export interface Details {
    name: string;
    url: string;
    storeId?: string | undefined;
}

export interface CookieChangeInfo {
    /** Information about the cookie that was set or removed. */
    cookie: Cookie;
    /** True if a cookie was removed. */
    removed: boolean;
    /**
     * Since Chrome 12.
     * The underlying reason behind the cookie's change.
     */
    cause: string;
}

export interface CookieChangedEvent extends Event<(changeInfo: CookieChangeInfo) => void> {}

export function getAllCookieStores(callback: (cookieStores: CookieStore[]) => void): void;
export function getAllCookieStores(): Promise<CookieStore[]>;
export function getAll(details: GetAllDetails, callback: (cookies: Cookie[]) => void): void;
export function getAll(details: GetAllDetails): Promise<Cookie[]>;
export function set(details: SetDetails): Promise<Cookie | null>;
export function set(details: SetDetails, callback?: (cookie: Cookie | null) => void): void;
export function remove(details: Details): Promise<Details>;
export function remove(details: Details, callback?: (details: Details) => void): void;
export function get(details: Details, callback: (cookie: Cookie | null) => void): void;
export function get(details: Details): Promise<Cookie | null>;
export var onChanged: CookieChangedEvent;
