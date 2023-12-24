import { Event } from './events';

export interface StorageArea {
    /**
     * Gets the amount of space (in bytes) being used by one or more items.
     * @param callback Callback with the amount of space being used by storage, or on failure (in which case runtime.lastError will be set).
     * Parameter bytesInUse: Amount of space being used in storage, in bytes.
     */
    getBytesInUse(callback: (bytesInUse: number) => void): void;
    /**
     * Gets the amount of space (in bytes) being used by one or more items.
     * @param keys Optional. A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
     * @return A Promise that resolves with a number
     * @since MV3
     */
    getBytesInUse(keys?: string | string[] | null): Promise<number>;
    /**
     * Gets the amount of space (in bytes) being used by one or more items.
     * @param keys Optional. A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
     * @param callback Callback with the amount of space being used by storage, or on failure (in which case runtime.lastError will be set).
     * Parameter bytesInUse: Amount of space being used in storage, in bytes.
     */
    getBytesInUse(keys: string | string[] | null, callback: (bytesInUse: number) => void): void;
    /**
     * Removes all items from storage.
     * @return A void Promise
     * @since MV3
     */
    clear(): Promise<void>;
    /**
     * Removes all items from storage.
     * @param callback Optional.
     * Callback on success, or on failure (in which case runtime.lastError will be set).
     */
    clear(callback: () => void): void;
    /**
     * Sets multiple items.
     * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.
     * Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
     * @return A void Promise
     * @since MV3
     */
    set(items: { [key: string]: any }): Promise<void>;
    /**
     * Sets multiple items.
     * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.
     * Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
     * @param callback Optional.
     * Callback on success, or on failure (in which case runtime.lastError will be set).
     */
    set(items: { [key: string]: any }, callback: () => void): void;
    /**
     * Removes one or more items from storage.
     * @param keys A single key or a list of keys for items to remove.
     * @param callback Optional.
     * @return A void Promise
     * @since MV3
     */
    remove(keys: string | string[]): Promise<void>;
    /**
     * Removes one or more items from storage.
     * @param keys A single key or a list of keys for items to remove.
     * @param callback Optional.
     * Callback on success, or on failure (in which case runtime.lastError will be set).
     */
    remove(keys: string | string[], callback: () => void): void;
    /**
     * Gets the entire contents of storage.
     * @param callback Callback with storage items, or on failure (in which case runtime.lastError will be set).
     * Parameter items: Object with items in their key-value mappings.
     */
    get(callback: (items: { [key: string]: any }) => void): void;
    /**
     * Gets one or more items from storage.
     * @param keys A single key to get, list of keys to get, or a dictionary specifying default values.
     * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
     * @return A Promise that resolves with an object containing items
     * @since MV3
     */
    get(keys?: string | string[] | { [key: string]: any } | null): Promise<{ [key: string]: any }>;
    /**
     * Gets one or more items from storage.
     * @param keys A single key to get, list of keys to get, or a dictionary specifying default values.
     * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
     * @param callback Callback with storage items, or on failure (in which case runtime.lastError will be set).
     * Parameter items: Object with items in their key-value mappings.
     */
    get(
        keys: string | string[] | { [key: string]: any } | null,
        callback: (items: { [key: string]: any }) => void,
    ): void;
    /**
     * Sets the desired access level for the storage area. The default will be only trusted contexts.
     * @param accessOptions An object containing an accessLevel key which contains the access level of the storage area.
     * @return A void Promise.
     * @since Chrome 102
     */
    setAccessLevel(accessOptions: { accessLevel: AccessLevel }): Promise<void>;
    /**
     * Sets the desired access level for the storage area. The default will be only trusted contexts.
     * @param accessOptions An object containing an accessLevel key which contains the access level of the storage area.
     * @param callback Optional.
     * @since Chrome 102
     */
    setAccessLevel(accessOptions: { accessLevel: AccessLevel }, callback: () => void): void;
    /**
     * Fired when one or more items change within this storage area.
     * @param keys A single key to get, list of keys to get, or a dictionary specifying default values.
     * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
     * @param callback Callback with storage items, or on failure (in which case runtime.lastError will be set).
     * Parameter items: Object with items in their key-value mappings.
     */
    onChanged: StorageAreaChangedEvent;
}

export interface StorageChange {
    /** Optional. The new value of the item, if there is a new value. */
    newValue?: any;
    /** Optional. The old value of the item, if there was an old value. */
    oldValue?: any;
}

export interface LocalStorageArea extends StorageArea {
    /** The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the unlimitedStorage permission. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
    QUOTA_BYTES: number;
}

export interface SyncStorageArea extends StorageArea {
    /** @deprecated since Chrome 40. The storage.sync API no longer has a sustained write operation quota. */
    MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;
    /** The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
    QUOTA_BYTES: number;
    /** The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set runtime.lastError. */
    QUOTA_BYTES_PER_ITEM: number;
    /** The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set runtime.lastError. */
    MAX_ITEMS: number;
    /**
     * The maximum number of set, remove, or clear operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
     * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError.
     */
    MAX_WRITE_OPERATIONS_PER_HOUR: number;
    /**
     * The maximum number of set, remove, or clear operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
     * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError.
     * @since Chrome 40.
     */
    MAX_WRITE_OPERATIONS_PER_MINUTE: number;
}

export interface SessionStorageArea extends StorageArea {
    /** The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
    QUOTA_BYTES: number;
}

export interface StorageAreaChangedEvent extends Event<(changes: { [key: string]: StorageChange }) => void> {}

type AreaName = 'sync' | 'local' | 'managed' | 'session';
export interface StorageChangedEvent
    extends Event<(changes: { [key: string]: StorageChange }, areaName: AreaName) => void> {}

type AccessLevel = keyof typeof AccessLevel;
export var AccessLevel: {
    TRUSTED_AND_UNTRUSTED_CONTEXTS: 'TRUSTED_AND_UNTRUSTED_CONTEXTS';
    TRUSTED_CONTEXTS: 'TRUSTED_CONTEXTS';
};
export var local: LocalStorageArea;
export var sync: SyncStorageArea;
export var managed: StorageArea;
export var session: SessionStorageArea;
export var onChanged: StorageChangedEvent;
