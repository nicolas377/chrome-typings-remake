import { Event } from '../events';

export const DisplayPosition: {
    TOP: 'top';
    RIGHT: 'right';
    BOTTOM: 'bottom';
    LEFT: 'left';
};
export const MirrorMode: {
    OFF: 'off';
    NORMAL: 'normal';
    MIXED: 'mixed';
};
export interface Bounds {
    /**  The x-coordinate of the upper-left corner. */
    left: number;
    /**  The y-coordinate of the upper-left corner. */
    top: number;
    /** The width of the display in pixels. */
    width: number;
    /** The height of the display in pixels. */
    height: number;
}

export interface Insets {
    /** The x-axis distance from the left bound. */
    left: number;
    /** The y-axis distance from the top bound. */
    top: number;
    /** The x-axis distance from the right bound. */
    right: number;
    /** The y-axis distance from the bottom bound. */
    bottom: number;
}

export interface Point {
    /** The x-coordinate of the point. */
    x: number;
    /** The y-coordinate of the point. */
    y: number;
}

export interface TouchCalibrationPair {
    /** The coordinates of the display point. */
    displayPoint: Point;
    /** The coordinates of the touch point corresponding to the display point. */
    touchPoint: Point;
}

export interface DisplayMode {
    /** The display mode width in device independent (user visible) pixels. */
    width: number;

    /** The display mode height in device independent (user visible) pixels. */
    height: number;

    /** The display mode width in native pixels. */
    widthInNativePixels: number;

    /** The display mode height in native pixels. */
    heightInNativePixels: number;

    /**
     * @deprecated Deprecated since Chrome 70. Use `displayZoomFactor`
     * @description The display mode UI scale factor.
     **/
    uiScale: number;

    /** The display mode device scale factor. */
    deviceScaleFactor: number;

    /**
     * The display mode refresh rate in hertz.
     * @since Chrome 67
     */
    refreshRate: number;

    /** True if the mode is the display's native mode. */
    isNative: boolean;

    /** True if the display mode is currently selected. */
    isSelected: boolean;
}

export interface DisplayLayout {
    /** The unique identifier of the display. */
    id: string;
    /** The unique identifier of the parent display. Empty if this is the root. */
    parentId: string;
    /**
     * The layout position of this display relative to the parent.
     * This will be ignored for the root.
     * @see enum
     */
    position: typeof DisplayPosition[keyof typeof DisplayPosition];
    /** The offset of the display along the connected edge. 0 indicates that the topmost or leftmost corners are aligned. */
    offset: number;
}

export interface TouchCalibrationPairs {
    /** First pair of touch and display point required for touch calibration. */
    pair1: TouchCalibrationPair;
    /** Second pair of touch and display point required for touch calibration. */
    pair2: TouchCalibrationPair;
    /** Third pair of touch and display point required for touch calibration. */
    pair3: TouchCalibrationPair;
    /** Fourth pair of touch and display point required for touch calibration. */
    pair4: TouchCalibrationPair;
}

export interface DisplayPropertiesInfo {
    /**
     * requires(CrOS) Chrome OS only.
     * @description
     * If set to true, changes the display mode to unified desktop.
     * If set to false, unified desktop mode will be disabled.
     * This is only valid for the primary display.
     * If provided, mirroringSourceId must not be provided and other properties may not apply.
     * This is has no effect if not provided.
     * @see(See `enableUnifiedDesktop` for details).
     * @since Chrome 59
     * */
    isUnified?: boolean | undefined;

    /**
     * requires(CrOS) Chrome OS only.
     * @deprecated Deprecated since Chrome 68. Use ´setMirrorMode´
     * @see setMirrorMode
     * @description
     * If set and not empty, enables mirroring for this display.
     * Otherwise disables mirroring for this display.
     * This value should indicate the id of the source display to mirror,
     * which must not be the same as the id passed to setDisplayProperties.
     * If set, no other property may be set.
     */
    mirroringSourceId?: string | undefined;

    /**
     * If set to true, makes the display primary.
     * No-op if set to false.
     */
    isPrimary?: boolean | undefined;

    /**
     * If set, sets the display's overscan insets to the provided values.
     * Note that overscan values may not be negative or larger than a half of the screen's size.
     * Overscan cannot be changed on the internal monitor. It's applied after isPrimary parameter.
     */
    overscan?: Insets | undefined;

    /**
     * If set, updates the display's rotation.
     * Legal values are [0, 90, 180, 270].
     * The rotation is set clockwise, relative to the display's vertical position.
     * It's applied after overscan parameter.
     */
    rotation?: 0 | 90 | 180 | 270 | undefined;

    /**
     * If set, updates the display's logical bounds origin along x-axis.
     * Applied together with boundsOriginY, if boundsOriginY is set.
     * Note that, when updating the display origin, some constraints will be applied,
     * so the final bounds origin may be different than the one set.
     * The final bounds can be retrieved using getInfo. The bounds origin is applied
     * after rotation. The bounds origin cannot be changed on the primary display.
     * Note that is also invalid to set bounds origin values if isPrimary is also set
     * (as isPrimary parameter is applied first).
     */
    boundsOriginX?: number | undefined;

    /**
     * If set, updates the display's logical bounds origin along y-axis.
     * @see[See documentation for boundsOriginX parameter.]
     */
    boundsOriginY?: number | undefined;

    /**
     * If set, updates the display mode to the mode matching this value.
     * @since Chrome 52
     */
    displayMode?: DisplayMode | undefined;

    /**
     * @since Chrome 65.
     * @description
     * If set, updates the zoom associated with the display.
     * This zoom performs re-layout and repaint thus resulting
     * in a better quality zoom than just performing
     * a pixel by pixel stretch enlargement.
     */
    displayZoomFactor?: number | undefined;
}

export interface DisplayInfoFlags {
    /**
     * If set to true, only a single DisplayUnitInfo will be returned by getInfo when in unified desktop mode.
     * @see[enableUnifiedDesktop]
     * @default false
     */
    singleUnified?: boolean | undefined;
}

export interface DisplayInfo {
    /** The unique identifier of the display. */
    id: string;
    /** The user-friendly name (e.g. 'HP LCD monitor'). */
    name: string;
    /**
     * requires(CrOS Kiosk app) Only available in Chrome OS Kiosk apps
     */
    edid?:
        | {
              /**
               * 3 character manufacturer code.
               */
              manufacturerId: string;
              /**
               * 2 byte manufacturer-assigned code.
               */
              productId: string;
              /**
               * Year of manufacturer.
               */
              yearOfManufacture?: string | undefined;
          }
        | undefined;
    /**
     * requires(CrOS) Only working properly on Chrome OS.
     * Identifier of the display that is being mirrored on the display unit.
     * If mirroring is not in progress, set to an empty string
     * Currently exposed only on ChromeOS.
     * Will be empty string on other platforms.
     */
    mirroringSourceId: string;
    /**
     * requires(CrOS) Only available on Chrome OS.
     * Identifiers of the displays to which the source display is being mirrored.
     * Empty if no displays are being mirrored. This will be set to the same value
     * for all displays.
     * ❗ This must not include *mirroringSourceId*. ❗
     */
    mirroringDestinationIds: string[];
    /** True if this is the primary display. */
    isPrimary: boolean;
    /** True if this is an internal display. */
    isInternal: boolean;
    /** True if this display is enabled. */
    isEnabled: boolean;
    /** The number of pixels per inch along the x-axis. */
    dpiX: number;
    /** The number of pixels per inch along the y-axis. */
    dpiY: number;
    /** The display's clockwise rotation in degrees relative to the vertical position. Currently exposed only on ChromeOS. Will be set to 0 on other platforms. */
    rotation: number;
    /** The display's logical bounds. */
    bounds: Bounds;
    /** The display's insets within its screen's bounds. Currently exposed only on ChromeOS. Will be set to empty insets on other platforms. */
    overscan: Insets;
    /** The usable work area of the display within the display bounds. The work area excludes areas of the display reserved for OS, for example taskbar and launcher. */
    workArea: Bounds;
    /**
     * requires(CrOS) Only available on Chrome OS.
     * The list of available display modes.
     * The current mode will have isSelected=true.
     * Only available on Chrome OS.
     * Will be set to an empty array on other platforms.
     */
    modes: DisplayMode[];
    /** True if this display has a touch input device associated with it. */
    hasTouchSupport: boolean;
    /** A list of zoom factor values that can be set for the display. */
    availableDisplayZoomFactors: number[];
    /**
     * The ratio between the display's current and default zoom.
     * For example, value 1 is equivalent to 100% zoom, and value 1.5 is equivalent to 150% zoom.
     * */
    displayZoomFactor: number;
}

export interface MirrorModeInfo {
    /**
     * The mirror mode that should be set.
     * **off**
     * Use the default mode (extended or unified desktop).
     * **normal**
     * The default source display will be mirrored to all other displays.
     * **mixed**
     * The specified source display will be mirrored to the provided destination displays. All other connected displays will be extended.
     */
    mode?: 'off' | 'normal' | 'mixed' | undefined;
}

export interface MirrorModeInfoMixed extends MirrorModeInfo {
    mode: 'mixed';
    mirroringSourceId?: string | undefined;
    /** The ids of the mirroring destination displays. */
    mirroringDestinationIds?: string[] | undefined;
}

export function getInfo(callback: (info: DisplayInfo[]) => void): void;
export function getInfo(): Promise<DisplayInfo[]>;
export function getInfo(flags: DisplayInfoFlags, callback: (info: DisplayInfo[]) => void): void;
export function getInfo(flags: DisplayInfoFlags): Promise<DisplayInfo[]>;
export function getDisplayLayout(callback: (layouts: DisplayLayout[]) => void): void;
export function getDisplayLayout(): Promise<DisplayLayout[]>;
export function setDisplayProperties(id: string, info: DisplayPropertiesInfo): Promise<void>;
export function setDisplayProperties(id: string, info: DisplayPropertiesInfo, callback?: () => void): void;
export function setDisplayLayout(layouts: DisplayLayout[]): Promise<void>;
export function setDisplayLayout(layouts: DisplayLayout[], callback?: () => void): void;
export function enableUnifiedDesktop(enabled: boolean): void;
export function overscanCalibrationStart(id: string): void;
export function overscanCalibrationAdjust(id: string, delta: Insets): void;
export function overscanCalibrationReset(id: string): void;
export function overscanCalibrationComplete(id: string): void;
export function showNativeTouchCalibration(id: string, callback: (success: boolean) => void): void;
export function showNativeTouchCalibration(id: string): Promise<boolean>;
export function startCustomTouchCalibration(id: string): void;
export function completeCustomTouchCalibration(pairs: TouchCalibrationPairs, bounds: Bounds): void;
export function clearTouchCalibration(id: string): void;
export function setMirrorMode(info: MirrorModeInfo | MirrorModeInfoMixed, callback: () => void): void;
export function setMirrorMode(info: MirrorModeInfo | MirrorModeInfoMixed): Promise<void>;
export const onDisplayChanged: Event<() => void>;
