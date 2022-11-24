export interface OriginTypes {
    /** Optional. Extensions and packaged applications a user has installed (be _really_ careful!).  */
    extension?: boolean | undefined;
    /** Optional. Websites that have been installed as hosted applications (be careful!).  */
    protectedWeb?: boolean | undefined;
    /** Optional. Normal websites.  */
    unprotectedWeb?: boolean | undefined;
}

export interface RemovalOptions {
    /**
     * Optional.
     * Since Chrome 74.
     * When present, data for origins in this list is excluded from deletion. Can't be used together with origins. Only supported for cookies, storage and cache. Cookies are excluded for the whole registrable domain.
     */
    excludeOrigins?: string[] | undefined;
    /**
     * Optional.
     * An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you _really_ want to remove application data before adding 'protectedWeb' or 'extensions'.
     */
    originTypes?: OriginTypes | undefined;
    /**
     * Optional.
     * Since Chrome 74.
     * When present, only data for origins in this list is deleted. Only supported for cookies, storage and cache. Cookies are cleared for the whole registrable domain.
     */
    origins?: string[] | undefined;
    /**
     * Optional.
     * Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the {@link Date.getTime} method). If absent, defaults to 0 (which would remove all browsing data).
     */
    since?: number | undefined;
}

export interface DataTypeSet {
    /** Optional. Websites' WebSQL data.  */
    webSQL?: boolean | undefined;
    /** Optional. Websites' IndexedDB data.  */
    indexedDB?: boolean | undefined;
    /** Optional. The browser's cookies.  */
    cookies?: boolean | undefined;
    /** Optional. Stored passwords.  */
    passwords?: boolean | undefined;
    /**
     * @deprecated Deprecated since Chrome 76.
     * Support for server-bound certificates has been removed. This data type will be ignored.
     *
     * Optional. Server-bound certificates.
     */
    serverBoundCertificates?: boolean | undefined;
    /** Optional. The browser's download list.  */
    downloads?: boolean | undefined;
    /** Optional. The browser's cache. Note: when removing data, this clears the entire cache: it is not limited to the range you specify.  */
    cache?: boolean | undefined;
    /** Optional. Websites' appcaches.  */
    appcache?: boolean | undefined;
    /** Optional. Websites' file systems.  */
    fileSystems?: boolean | undefined;
    /**
     * @deprecated Deprecated since Chrome 88.
     * Support for Flash has been removed. This data type will be ignored.
     *
     * Optional. Plugins' data.
     */
    pluginData?: boolean | undefined;
    /** Optional. Websites' local storage data.  */
    localStorage?: boolean | undefined;
    /** Optional. The browser's stored form data.  */
    formData?: boolean | undefined;
    /** Optional. The browser's history.  */
    history?: boolean | undefined;
    /**
     * Optional.
     * Since Chrome 39.
     * Service Workers.
     */
    serviceWorkers?: boolean | undefined;
}

export interface SettingsResult {
    options: RemovalOptions;
    /** All of the types will be present in the result, with values of true if they are both selected to be removed and permitted to be removed, otherwise false. */
    dataToRemove: DataTypeSet;
    /** All of the types will be present in the result, with values of true if they are permitted to be removed (e.g., by enterprise policy) and false if not. */
    dataRemovalPermitted: DataTypeSet;
}

export function settings(): Promise<SettingsResult>;
export function settings(callback: (result: SettingsResult) => void): void;
export function removePluginData(options: RemovalOptions): Promise<void>;
export function removePluginData(options: RemovalOptions, callback?: () => void): void;
export function removeServiceWorkers(options: RemovalOptions): Promise<void>;
export function removeServiceWorkers(options: RemovalOptions, callback?: () => void): void;
export function removeFormData(options: RemovalOptions): Promise<void>;
export function removeFormData(options: RemovalOptions, callback?: () => void): void;
export function removeFileSystems(options: RemovalOptions): Promise<void>;
export function removeFileSystems(options: RemovalOptions, callback?: () => void): void;
export function remove(options: RemovalOptions, dataToRemove: DataTypeSet): Promise<void>;
export function remove(options: RemovalOptions, dataToRemove: DataTypeSet, callback?: () => void): void;
export function removePasswords(options: RemovalOptions): Promise<void>;
export function removePasswords(options: RemovalOptions, callback?: () => void): void;
export function removeCookies(options: RemovalOptions, callback?: () => void): Promise<void>;
export function removeCookies(options: RemovalOptions, callback?: () => void): void;
export function removeWebSQL(options: RemovalOptions): Promise<void>;
export function removeWebSQL(options: RemovalOptions, callback?: () => void): void;
export function removeAppcache(options: RemovalOptions): Promise<void>;
export function removeAppcache(options: RemovalOptions, callback?: () => void): void;
export function removeCacheStorage(options: RemovalOptions): Promise<void>;
export function removeCacheStorage(options: RemovalOptions, callback?: () => void): void;
export function removeDownloads(options: RemovalOptions): Promise<void>;
export function removeDownloads(options: RemovalOptions, callback?: () => void): void;
export function removeLocalStorage(options: RemovalOptions): Promise<void>;
export function removeLocalStorage(options: RemovalOptions, callback?: () => void): void;
export function removeCache(options: RemovalOptions): Promise<void>;
export function removeCache(options: RemovalOptions, callback?: () => void): void;
export function removeHistory(options: RemovalOptions): Promise<void>;
export function removeHistory(options: RemovalOptions, callback?: () => void): void;
export function removeIndexedDB(options: RemovalOptions): Promise<void>;
export function removeIndexedDB(options: RemovalOptions, callback?: () => void): void;
