import { Event } from './events';

export interface ExtensionInfo {
    /**
     * Optional.
     * A reason the item is disabled.
     * @since Chrome 17.
     */
    disabledReason?: string | undefined;
    /** Optional. The launch url (only present for apps). */
    appLaunchUrl?: string | undefined;
    /**
     * The description of this extension, app, or theme.
     * @since Chrome 9.
     */
    description: string;
    /**
     * Returns a list of API based permissions.
     * @since Chrome 9.
     */
    permissions: string[];
    /**
     * Optional.
     * A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the manifest documentation on icons for more details.
     */
    icons?: IconInfo[] | undefined;
    /**
     * Returns a list of host based permissions.
     * @since Chrome 9.
     */
    hostPermissions: string[];
    /** Whether it is currently enabled or disabled. */
    enabled: boolean;
    /**
     * Optional.
     * The URL of the homepage of this extension, app, or theme.
     * @since Chrome 11.
     */
    homepageUrl?: string | undefined;
    /**
     * Whether this extension can be disabled or uninstalled by the user.
     * @since Chrome 12.
     */
    mayDisable: boolean;
    /**
     * How the extension was installed.
     * @since Chrome 22.
     */
    installType: string;
    /** The version of this extension, app, or theme. */
    version: string;
    /** The extension's unique identifier. */
    id: string;
    /**
     * Whether the extension, app, or theme declares that it supports offline.
     * @since Chrome 15.
     */
    offlineEnabled: boolean;
    /**
     * Optional.
     * The update URL of this extension, app, or theme.
     * @since Chrome 16.
     */
    updateUrl?: string | undefined;
    /**
     * The type of this extension, app, or theme.
     * @since Chrome 23.
     */
    type: string;
    /** The url for the item's options page, if it has one. */
    optionsUrl: string;
    /** The name of this extension, app, or theme. */
    name: string;
    /**
     * A short version of the name of this extension, app, or theme.
     * @since Chrome 31.
     */
    shortName: string;
    /**
     * True if this is an app.
     * @deprecated since Chrome 33. Please use management.ExtensionInfo.type.
     */
    isApp: boolean;
    /**
     * Optional.
     * The app launch type (only present for apps).
     * @since Chrome 37.
     */
    launchType?: string | undefined;
    /**
     * Optional.
     * The currently available launch types (only present for apps).
     * @since Chrome 37.
     */
    availableLaunchTypes?: string[] | undefined;
}

export interface IconInfo {
    /** The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append ?grayscale=true to the URL. */
    url: string;
    /** A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16. */
    size: number;
}

export interface UninstallOptions {
    /**
     * Optional.
     * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown.
     */
    showConfirmDialog?: boolean | undefined;
}

export interface ManagementDisabledEvent extends Event<(info: ExtensionInfo) => void> {}

export interface ManagementUninstalledEvent extends Event<(id: string) => void> {}

export interface ManagementInstalledEvent extends Event<(info: ExtensionInfo) => void> {}

export interface ManagementEnabledEvent extends Event<(info: ExtensionInfo) => void> {}

export function setEnabled(id: string, enabled: boolean): Promise<void>;
export function setEnabled(id: string, enabled: boolean, callback: () => void): void;
export function getPermissionWarningsById(id: string): Promise<string[]>;
export function getPermissionWarningsById(id: string, callback: (permissionWarnings: string[]) => void): void;
export function get(id: string): Promise<ExtensionInfo>;
export function get(id: string, callback: (result: ExtensionInfo) => void): void;
export function getAll(): Promise<ExtensionInfo[]>;
export function getAll(callback: (result: ExtensionInfo[]) => void): void;
export function getPermissionWarningsByManifest(manifestStr: string): Promise<string[]>;
export function getPermissionWarningsByManifest(
    manifestStr: string,
    callback: (permissionwarnings: string[]) => void,
): void;
export function launchApp(id: string): Promise<void>;
export function launchApp(id: string, callback: () => void): void;
export function uninstall(id: string, options?: UninstallOptions): Promise<void>;
export function uninstall(id: string, callback: () => void): void;
export function uninstall(id: string, options: UninstallOptions, callback: () => void): void;
export function uninstall(id: string): Promise<void>;
export function uninstall(id: string, callback: () => void): void;
export function getSelf(): Promise<ExtensionInfo>;
export function getSelf(callback: (result: ExtensionInfo) => void): void;
export function uninstallSelf(options?: UninstallOptions): Promise<void>;
export function uninstallSelf(callback: () => void): void;
export function uninstallSelf(options: UninstallOptions, callback: () => void): void;
export function uninstallSelf(): Promise<void>;
export function uninstallSelf(callback: () => void): void;
export function createAppShortcut(id: string): Promise<void>;
export function createAppShortcut(id: string, callback: () => void): void;
export function setLaunchType(id: string, launchType: string): Promise<void>;
export function setLaunchType(id: string, launchType: string, callback: () => void): void;
export function generateAppForLink(url: string, title: string): Promise<ExtensionInfo>;
export function generateAppForLink(url: string, title: string, callback: (result: ExtensionInfo) => void): void;
export var onDisabled: ManagementDisabledEvent;
export var onUninstalled: ManagementUninstalledEvent;
export var onInstalled: ManagementInstalledEvent;
export var onEnabled: ManagementEnabledEvent;
