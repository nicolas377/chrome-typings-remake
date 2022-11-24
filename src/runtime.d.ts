import { Tab } from './tabs';
import { Event } from './events';
import { PageStateMatcherProperties } from './declarativeContent';

export var lastError: LastError | undefined;
export var id: string;
export type PlatformOs = 'mac' | 'win' | 'android' | 'cros' | 'linux' | 'openbsd';
export type PlatformArch = 'arm' | 'arm64' | 'x86-32' | 'x86-64' | 'mips' | 'mips64';
export type PlatformNaclArch = 'arm' | 'x86-32' | 'x86-64' | 'mips' | 'mips64';
export enum OnInstalledReason {
    INSTALL = 'install',
    UPDATE = 'update',
    CHROME_UPDATE = 'chrome_update',
    SHARED_MODULE_UPDATE = 'shared_module_update',
}

export interface LastError {
    /** Optional. Details about the error which occurred.  */
    message?: string | undefined;
}

export interface ConnectInfo {
    name?: string | undefined;
    includeTlsChannelId?: boolean | undefined;
}

export interface InstalledDetails {
    /**
     * The reason that this event is being dispatched.
     */
    reason: OnInstalledReason;
    /**
     * Optional.
     * Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'.
     */
    previousVersion?: string | undefined;
    /**
     * Optional.
     * Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared_module_update'.
     * @since Chrome 29.
     */
    id?: string | undefined;
}

export interface MessageOptions {
    /** Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event. */
    includeTlsChannelId?: boolean | undefined;
}

export interface MessageSender {
    /** The ID of the extension or app that opened the connection, if any. */
    id?: string | undefined;
    /** The tabs.Tab which opened the connection, if any. This property will only be present when the connection was opened from a tab (including content scripts), and only if the receiver is an extension, not an app. */
    tab?: Tab | undefined;
    /** The name of the native application that opened the connection, if any.
     * @since Chrome 74
     */
    nativeApplication?: string | undefined;
    /**
     * The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set.
     * @since Chrome 41.
     */
    frameId?: number | undefined;
    /**
     * The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it.
     * @since Chrome 28.
     */
    url?: string | undefined;
    /**
     * The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available.
     * @since Chrome 32.
     */
    tlsChannelId?: string | undefined;
    /**
     * The origin of the page or frame that opened the connection. It can vary from the url property (e.g., about:blank) or can be opaque (e.g., sandboxed iframes). This is useful for identifying if the origin can be trusted if we can't immediately tell from the URL.
     * @since Chrome 80.
     */
    origin?: string | undefined;
}

export interface PlatformInfo {
    /**
     * The operating system chrome is running on.
     */
    os: PlatformOs;
    /**
     * The machine's processor architecture.
     */
    arch: PlatformArch;
    /**
     * The native client architecture. This may be different from arch on some platforms.
     */
    nacl_arch: PlatformNaclArch;
}

export interface Port {
    postMessage: (message: any) => void;
    disconnect: () => void;
    /**
     * Optional.
     * This property will only be present on ports passed to onConnect/onConnectExternal listeners.
     */
    sender?: MessageSender | undefined;
    /** An object which allows the addition and removal of listeners for a Chrome event. */
    onDisconnect: PortDisconnectEvent;
    /** An object which allows the addition and removal of listeners for a Chrome event. */
    onMessage: PortMessageEvent;
    name: string;
}

export interface UpdateAvailableDetails {
    /** The version number of the available update. */
    version: string;
}

export interface UpdateCheckDetails {
    /** The version of the available update. */
    version: string;
}

export type RequestUpdateCheckStatus = 'throttled' | 'no_update' | 'update_available';
export interface PortDisconnectEvent extends Event<(port: Port) => void> {}

export interface PortMessageEvent extends Event<(message: any, port: Port) => void> {}

export interface ExtensionMessageEvent
    extends Event<(message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void> {}

export interface ExtensionConnectEvent extends Event<(port: Port) => void> {}

export interface RuntimeInstalledEvent extends Event<(details: InstalledDetails) => void> {}

export interface RuntimeEvent extends Event<() => void> {}

export interface RuntimeRestartRequiredEvent extends Event<(reason: string) => void> {}

export interface RuntimeUpdateAvailableEvent extends Event<(details: UpdateAvailableDetails) => void> {}

export interface ManifestIcons {
    [size: number]: string;
}

export interface ManifestAction {
    default_icon?: ManifestIcons | undefined;
    default_title?: string | undefined;
    default_popup?: string | undefined;
}

export type ManifestPermissions =
    | 'activeTab'
    | 'alarms'
    | 'background'
    | 'bookmarks'
    | 'browsingData'
    | 'certificateProvider'
    | 'clipboardRead'
    | 'clipboardWrite'
    | 'contentSettings'
    | 'contextMenus'
    | 'cookies'
    | 'debugger'
    | 'declarativeContent'
    | 'declarativeNetRequest'
    | 'declarativeNetRequestFeedback'
    | 'declarativeWebRequest'
    | 'desktopCapture'
    | 'documentScan'
    | 'downloads'
    | 'enterprise.deviceAttributes'
    | 'enterprise.hardwarePlatform'
    | 'enterprise.networkingAttributes'
    | 'enterprise.platformKeys'
    | 'experimental'
    | 'fileBrowserHandler'
    | 'fileSystemProvider'
    | 'fontSettings'
    | 'gcm'
    | 'geolocation'
    | 'history'
    | 'identity'
    | 'identity.email'
    | 'idle'
    | 'loginState'
    | 'management'
    | 'nativeMessaging'
    | 'notifications'
    | 'pageCapture'
    | 'platformKeys'
    | 'power'
    | 'printerProvider'
    | 'printing'
    | 'printingMetrics'
    | 'privacy'
    | 'processes'
    | 'proxy'
    | 'scripting'
    | 'search'
    | 'sessions'
    | 'signedInDevices'
    | 'storage'
    | 'system.cpu'
    | 'system.display'
    | 'system.memory'
    | 'system.storage'
    | 'tabCapture'
    | 'tabGroups'
    | 'tabs'
    | 'topSites'
    | 'tts'
    | 'ttsEngine'
    | 'unlimitedStorage'
    | 'vpnProvider'
    | 'wallpaper'
    | 'webNavigation'
    | 'webRequest'
    | 'webRequestBlocking';
export interface SearchProvider {
    name?: string | undefined;
    keyword?: string | undefined;
    favicon_url?: string | undefined;
    search_url: string;
    encoding?: string | undefined;
    suggest_url?: string | undefined;
    instant_url?: string | undefined;
    image_url?: string | undefined;
    search_url_post_params?: string | undefined;
    suggest_url_post_params?: string | undefined;
    instant_url_post_params?: string | undefined;
    image_url_post_params?: string | undefined;
    alternate_urls?: string[] | undefined;
    prepopulated_id?: number | undefined;
    is_default?: boolean | undefined;
}

export interface ManifestBase {
    // Required
    manifest_version: number;
    name: string;
    version: string;

    // Recommended
    default_locale?: string | undefined;
    description?: string | undefined;
    icons?: ManifestIcons | undefined;

    // Optional
    author?: string | undefined;
    background_page?: string | undefined;
    chrome_settings_overrides?:
        | {
              homepage?: string | undefined;
              search_provider?: SearchProvider | undefined;
              startup_pages?: string[] | undefined;
          }
        | undefined;
    chrome_ui_overrides?:
        | {
              bookmarks_ui?:
                  | {
                        remove_bookmark_shortcut?: boolean | undefined;
                        remove_button?: boolean | undefined;
                    }
                  | undefined;
          }
        | undefined;
    chrome_url_overrides?:
        | {
              bookmarks?: string | undefined;
              history?: string | undefined;
              newtab?: string | undefined;
          }
        | undefined;
    commands?:
        | {
              [name: string]: {
                  suggested_key?:
                      | {
                            default?: string | undefined;
                            windows?: string | undefined;
                            mac?: string | undefined;
                            chromeos?: string | undefined;
                            linux?: string | undefined;
                        }
                      | undefined;
                  description?: string | undefined;
                  global?: boolean | undefined;
              };
          }
        | undefined;
    content_capabilities?:
        | {
              matches?: string[] | undefined;
              permissions?: string[] | undefined;
          }
        | undefined;
    content_scripts?:
        | {
              matches?: string[] | undefined;
              exclude_matches?: string[] | undefined;
              css?: string[] | undefined;
              js?: string[] | undefined;
              run_at?: string | undefined;
              all_frames?: boolean | undefined;
              match_about_blank?: boolean | undefined;
              include_globs?: string[] | undefined;
              exclude_globs?: string[] | undefined;
          }[]
        | undefined;
    converted_from_user_script?: boolean | undefined;
    current_locale?: string | undefined;
    devtools_page?: string | undefined;
    event_rules?:
        | {
              event?: string | undefined;
              actions?:
                  | {
                        type: string;
                    }[]
                  | undefined;
              conditions?: PageStateMatcherProperties[] | undefined;
          }[]
        | undefined;
    externally_connectable?:
        | {
              ids?: string[] | undefined;
              matches?: string[] | undefined;
              accepts_tls_channel_id?: boolean | undefined;
          }
        | undefined;
    file_browser_handlers?:
        | {
              id?: string | undefined;
              default_title?: string | undefined;
              file_filters?: string[] | undefined;
          }[]
        | undefined;
    file_system_provider_capabilities?:
        | {
              configurable?: boolean | undefined;
              watchable?: boolean | undefined;
              multiple_mounts?: boolean | undefined;
              source?: string | undefined;
          }
        | undefined;
    homepage_url?: string | undefined;
    import?:
        | {
              id: string;
              minimum_version?: string | undefined;
          }[]
        | undefined;
    export?:
        | {
              whitelist?: string[] | undefined;
          }
        | undefined;
    incognito?: string | undefined;
    input_components?:
        | {
              name?: string | undefined;
              type?: string | undefined;
              id?: string | undefined;
              description?: string | undefined;
              language?: string[] | string | undefined;
              layouts?: string[] | undefined;
              indicator?: string | undefined;
          }[]
        | undefined;
    key?: string | undefined;
    minimum_chrome_version?: string | undefined;
    nacl_modules?:
        | {
              path: string;
              mime_type: string;
          }[]
        | undefined;
    oauth2?:
        | {
              client_id: string;
              scopes?: string[] | undefined;
          }
        | undefined;
    offline_enabled?: boolean | undefined;
    omnibox?:
        | {
              keyword: string;
          }
        | undefined;
    options_page?: string | undefined;
    options_ui?:
        | {
              page?: string | undefined;
              chrome_style?: boolean | undefined;
              open_in_tab?: boolean | undefined;
          }
        | undefined;
    platforms?:
        | {
              nacl_arch?: string | undefined;
              sub_package_path: string;
          }[]
        | undefined;
    plugins?:
        | {
              path: string;
          }[]
        | undefined;
    requirements?:
        | {
              '3D'?:
                  | {
                        features?: string[] | undefined;
                    }
                  | undefined;
              plugins?:
                  | {
                        npapi?: boolean | undefined;
                    }
                  | undefined;
          }
        | undefined;
    sandbox?:
        | {
              pages: string[];
              content_security_policy?: string | undefined;
          }
        | undefined;
    short_name?: string | undefined;
    spellcheck?:
        | {
              dictionary_language?: string | undefined;
              dictionary_locale?: string | undefined;
              dictionary_format?: string | undefined;
              dictionary_path?: string | undefined;
          }
        | undefined;
    storage?:
        | {
              managed_schema: string;
          }
        | undefined;
    tts_engine?:
        | {
              voices: {
                  voice_name: string;
                  lang?: string | undefined;
                  gender?: string | undefined;
                  event_types?: string[] | undefined;
              }[];
          }
        | undefined;
    update_url?: string | undefined;
    version_name?: string | undefined;
    [key: string]: any;
}

export interface ManifestV2 extends ManifestBase {
    // Required
    manifest_version: 2;

    // Pick one (or none)
    browser_action?: ManifestAction | undefined;
    page_action?: ManifestAction | undefined;

    // Optional
    background?:
        | {
              scripts?: string[] | undefined;
              page?: string | undefined;
              persistent?: boolean | undefined;
          }
        | undefined;
    content_security_policy?: string | undefined;
    optional_permissions?: string[] | undefined;
    permissions?: string[] | undefined;
    web_accessible_resources?: string[] | undefined;
}

export interface ManifestV3 extends ManifestBase {
    // Required
    manifest_version: 3;

    // Optional
    action?: ManifestAction | undefined;
    background?:
        | {
              service_worker: string;
              type?: 'module'; // If the service worker uses ES modules
          }
        | undefined;
    content_security_policy?: {
        extension_pages?: string;
        sandbox?: string;
    };
    host_permissions?: string[] | undefined;
    optional_permissions?: ManifestPermissions[] | undefined;
    permissions?: ManifestPermissions[] | undefined;
    web_accessible_resources?: { resources: string[]; matches: string[] }[] | undefined;
}

export type Manifest = ManifestV2 | ManifestV3;
export function connect(connectInfo?: ConnectInfo): Port;
export function connect(extensionId: string, connectInfo?: ConnectInfo): Port;
export function connectNative(application: string): Port;
export function getBackgroundPage(callback: (backgroundPage?: Window) => void): void;
export function getManifest(): Manifest;
export function getPackageDirectoryEntry(callback: (directoryEntry: DirectoryEntry) => void): void;
export function getPlatformInfo(callback: (platformInfo: PlatformInfo) => void): void;
export function getPlatformInfo(): Promise<PlatformInfo>;
export function getURL(path: string): string;
export function reload(): void;
export function requestUpdateCheck(
    callback: (status: RequestUpdateCheckStatus, details?: UpdateCheckDetails) => void,
): void;
export function restart(): void;
export function restartAfterDelay(seconds: number, callback?: () => void): void;
export function sendMessage<M = any, R = any>(message: M, responseCallback: (response: R) => void): void;
export function sendMessage<M = any, R = any>(
    message: M,
    options: MessageOptions,
    responseCallback: (response: R) => void,
): void;
export function sendMessage<M = any, R = any>(
    extensionId: string,
    message: M,
    responseCallback: (response: R) => void,
): void;
export function sendMessage<Message = any, Response = any>(
    extensionId: string,
    message: Message,
    options: MessageOptions,
    responseCallback: (response: Response) => void,
): void;
export function sendMessage<M = any, R = any>(message: M): Promise<R>;
export function sendMessage<M = any, R = any>(message: M, options: MessageOptions): Promise<R>;
export function sendMessage<M = any, R = any>(extensionId: string, message: M): Promise<R>;
export function sendMessage<Message = any, Response = any>(
    extensionId: string,
    message: Message,
    options: MessageOptions,
): Promise<Response>;
export function sendNativeMessage(
    application: string,
    message: Object,
    responseCallback: (response: any) => void,
): void;
export function sendNativeMessage(application: string, message: Object): Promise<any>;
export function setUninstallURL(url: string, callback?: () => void): void;
export function openOptionsPage(callback?: () => void): void;
export var onConnect: ExtensionConnectEvent;
export var onConnectExternal: ExtensionConnectEvent;
export var onSuspend: RuntimeEvent;
export var onStartup: RuntimeEvent;
export var onInstalled: RuntimeInstalledEvent;
export var onSuspendCanceled: RuntimeEvent;
export var onMessage: ExtensionMessageEvent;
export var onMessageExternal: ExtensionMessageEvent;
export var onRestartRequired: RuntimeRestartRequiredEvent;
export var onUpdateAvailable: RuntimeUpdateAvailableEvent;
export var onBrowserUpdateAvailable: RuntimeEvent;
