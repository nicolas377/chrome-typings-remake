export interface Permissions {
    /**
     * Optional.
     * List of named permissions (does not include hosts or origins). Anything listed here must appear in the optional_permissions list in the manifest.
     */
    permissions?: string[] | undefined;
    /**
     * Optional.
     * List of origin permissions. Anything listed here must be a subset of a host that appears in the optional_permissions list in the manifest. For example, if http://*.example.com/ or http://* appears in optional_permissions, you can request an origin of http://help.example.com/. Any path is ignored.
     */
    origins?: string[] | undefined;
}

export interface PermissionsRemovedEvent {
    addListener(callback: (/** The permissions that have been removed*/ permissions: Permissions) => void): void;
}

export interface PermissionsAddedEvent {
    addListener(callback: (/** The newly-acquired permissions*/ permissions: Permissions) => void): void;
}

export function contains(permissions: Permissions): Promise<boolean>;
export function contains(permissions: Permissions, callback: (result: boolean) => void): void;
export function getAll(): Promise<Permissions>;
export function getAll(callback: (permissions: Permissions) => void): void;
export function request(permissions: Permissions): Promise<boolean>;
export function request(permissions: Permissions, callback?: (granted: boolean) => void): void;
export function remove(permissions: Permissions): Promise<boolean>;
export function remove(permissions: Permissions, callback?: (removed: boolean) => void): void;
export var onRemoved: PermissionsRemovedEvent;
export var onAdded: PermissionsAddedEvent;
