export interface GetPanelOptions {
    /**
     * If specified, the side panel options for the given tab will be returned.
     * Otherwise, returns the default side panel options (used for any tab that doesn't have specific settings).
     */
    tabId?: number;
}

export type OpenOptions = {
    /** The tab in which to open the side panel.
     * If the corresponding tab has a tab-specific side panel, the panel will only be open for that tab.
     * If there is not a tab-specific panel, the global panel will be open in the specified tab and any other tabs without a currently-open tab- specific panel.
     * This will override any currently-active side panel (global or tab-specific) in the corresponding tab.
     * At least one of this and windowId must be provided. */
    tabId?: number;
    /**
     * The window in which to open the side panel.
     * This is only applicable if the extension has a global (non-tab-specific) side panel or tabId is also specified.
     * This will override any currently-active global side panel the user has open in the given window.
     * At least one of this and tabId must be provided.
     */
    windowId?: number;
} & (
    | {
          tabId: number;
      }
    | {
          windowId: number;
      }
);
export interface PanelBehavior {
    /** Whether clicking the extension's icon will toggle showing the extension's entry in the side panel. Defaults to false. */
    openPanelOnActionClick?: boolean;
}

export interface PanelOptions {
    /** Whether the side panel should be enabled. This is optional. The default value is true. */
    enabled?: boolean;
    /** The path to the side panel HTML file to use. This must be a local resource within the extension package. */
    path?: string;
    /**
     * If specified, the side panel options will only apply to the tab with this id.
     * If omitted, these options set the default behavior (used for any tab that doesn't have specific settings).
     * Note: if the same path is set for this tabId and the default tabId, then the panel for this tabId will be a different instance than the panel for the default tabId.
     */
    tabId?: number;
}

export interface SidePanel {
    /** Developer specified path for side panel display. */
    default_path: string;
}

export function getOptions(
    /** Specifies the context to return the configuration for. */
    options: GetPanelOptions,
    callback: (options: PanelOptions) => void,
): void;
export function getOptions(
    /** Specifies the context to return the configuration for. */
    options: GetPanelOptions,
): Promise<PanelOptions>;
export function getPanelBehavior(callback: (behavior: PanelBehavior) => void): void;
export function getPanelBehavior(): Promise<PanelBehavior>;
export function open(
    /** Specifies the context in which to open the side panel. */
    options: OpenOptions,
    callback: () => void,
): void;
export function open(
    /** Specifies the context in which to open the side panel. */
    options: OpenOptions,
): Promise<void>;
export function setOptions(
    /** The configuration options to apply to the panel. */
    options: PanelOptions,
    callback: () => void,
): void;
export function setOptions(
    /** The configuration options to apply to the panel. */
    options: PanelOptions,
): Promise<void>;
export function setPanelBehavior(
    /** The new behavior to be set. */
    behavior: PanelBehavior,
    callback: () => void,
): void;
export function setPanelBehavior(
    /** The new behavior to be set. */
    behavior: PanelBehavior,
): Promise<void>;
