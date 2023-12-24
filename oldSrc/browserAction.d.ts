import { Event } from './events';
import { Tab } from './tabs';

export interface BadgeBackgroundColorDetails {
    /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is [255, 0, 0, 255]. Can also be a string with a CSS value, with opaque red being #FF0000 or #F00. */
    color: string | ColorArray;
    /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
    tabId?: number | undefined;
}

export interface BadgeTextDetails {
    /** Any number of characters can be passed, but only about four can fit in the space. */
    text?: string | null | undefined;
    /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
    tabId?: number | undefined;
}

export type ColorArray = [number, number, number, number];
export interface TitleDetails {
    /** The string the browser action should display when moused over. */
    title: string;
    /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
    tabId?: number | null;
}

export interface TabDetails {
    /** Optional. Specify the tab to get the information. If no tab is specified, the non-tab-specific information is returned.  */
    tabId?: number | null;
}

export interface TabIconDetails {
    /** Optional. Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'  */
    path?: string | { [index: string]: string } | undefined;
    /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
    tabId?: number | undefined;
    /** Optional. Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'  */
    imageData?: ImageData | { [index: number]: ImageData } | undefined;
}

export interface PopupDetails {
    /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
    tabId?: number | null;
    /** The html file to show in a popup. If set to the empty string (''), no popup is shown. */
    popup: string;
}

export interface BrowserClickedEvent extends Event<(tab: Tab) => void> {}

export function enable(tabId?: number | null): Promise<void>;
export function enable(callback?: () => void): void;
export function enable(tabId: number | null | undefined, callback?: () => void): void;
export function setBadgeBackgroundColor(details: BadgeBackgroundColorDetails): Promise<void>;
export function setBadgeBackgroundColor(details: BadgeBackgroundColorDetails, callback?: () => void): void;
export function setBadgeText(details: BadgeTextDetails): Promise<void>;
export function setBadgeText(details: BadgeTextDetails, callback: () => void): void;
export function setTitle(details: TitleDetails): Promise<void>;
export function setTitle(details: TitleDetails, callback: () => void): void;
export function getBadgeText(details: TabDetails, callback: (result: string) => void): void;
export function getBadgeText(details: TabDetails): Promise<string>;
export function setPopup(details: PopupDetails): Promise<void>;
export function setPopup(details: PopupDetails, callback?: () => void): void;
export function disable(tabId?: number | null): Promise<void>;
export function disable(callback: () => void): void;
export function disable(tabId?: number | null, callback?: () => void): void;
export function getTitle(details: TabDetails, callback: (result: string) => void): void;
export function getTitle(details: TabDetails): Promise<string>;
export function getBadgeBackgroundColor(details: TabDetails, callback: (result: ColorArray) => void): void;
export function getBadgeBackgroundColor(details: TabDetails): Promise<ColorArray>;
export function getPopup(details: TabDetails, callback: (result: string) => void): void;
export function getPopup(details: TabDetails): Promise<string>;
export function setIcon(details: TabIconDetails, callback?: Function): void;
export var onClicked: BrowserClickedEvent;
