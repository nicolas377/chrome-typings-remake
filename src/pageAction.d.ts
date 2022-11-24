import { Event } from './events';
import { Tab } from './tabs';

export interface PageActionClickedEvent extends Event<(tab: Tab) => void> {}

export interface TitleDetails {
    /** The id of the tab for which you want to modify the page action. */
    tabId: number;
    /** The tooltip string. */
    title: string;
}

export interface GetDetails {
    /** Specify the tab to get the title from. */
    tabId: number;
}

export interface PopupDetails {
    /** The id of the tab for which you want to modify the page action. */
    tabId: number;
    /** The html file to show in a popup. If set to the empty string (''), no popup is shown. */
    popup: string;
}

export interface IconDetails {
    /** The id of the tab for which you want to modify the page action. */
    tabId: number;
    /**
     * Optional.
     * @deprecated This argument is ignored.
     */
    iconIndex?: number | undefined;
    /**
     * Optional.
     * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'
     */
    imageData?: ImageData | { [index: number]: ImageData } | undefined;
    /**
     * Optional.
     * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'
     */
    path?: string | { [index: string]: string } | undefined;
}

export function hide(tabId: number, callback?: () => void): void;
export function show(tabId: number, callback?: () => void): void;
export function setTitle(details: TitleDetails, callback?: () => void): void;
export function setPopup(details: PopupDetails, callback?: () => void): void;
export function getTitle(details: GetDetails, callback: (result: string) => void): void;
export function getPopup(details: GetDetails, callback: (result: string) => void): void;
export function setIcon(details: IconDetails, callback?: () => void): void;
export var onClicked: PageActionClickedEvent;
