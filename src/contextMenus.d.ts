import { Tab } from './tabs';
import { Event } from './events';

export interface OnClickData {
    /**
     * Optional.
     * Since Chrome 35.
     * The text for the context selection, if any.
     */
    selectionText?: string | undefined;
    /**
     * Optional.
     * Since Chrome 35.
     * A flag indicating the state of a checkbox or radio item after it is clicked.
     */
    checked?: boolean | undefined;
    /**
     * Since Chrome 35.
     * The ID of the menu item that was clicked.
     */
    menuItemId: number | string;
    /**
     * Optional.
     * Since Chrome 35.
     * The ID of the frame of the element where the context menu was
     * clicked, if it was in a frame.
     */
    frameId?: number | undefined;
    /**
     * Optional.
     * Since Chrome 35.
     * The URL of the frame of the element where the context menu was clicked, if it was in a frame.
     */
    frameUrl?: string | undefined;
    /**
     * Since Chrome 35.
     * A flag indicating whether the element is editable (text input, textarea, etc.).
     */
    editable: boolean;
    /**
     * Optional.
     * Since Chrome 35.
     * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
     */
    mediaType?: 'image' | 'video' | 'audio' | undefined;
    /**
     * Optional.
     * Since Chrome 35.
     * A flag indicating the state of a checkbox or radio item before it was clicked.
     */
    wasChecked?: boolean | undefined;
    /**
     * Since Chrome 35.
     * The URL of the page where the menu item was clicked. This property is not set if the click occurred in a context where there is no current page, such as in a launcher context menu.
     */
    pageUrl: string;
    /**
     * Optional.
     * Since Chrome 35.
     * If the element is a link, the URL it points to.
     */
    linkUrl?: string | undefined;
    /**
     * Optional.
     * Since Chrome 35.
     * The parent ID, if any, for the item clicked.
     */
    parentMenuItemId?: number | string;
    /**
     * Optional.
     * Since Chrome 35.
     * Will be present for elements with a 'src' URL.
     */
    srcUrl?: string | undefined;
}

type ContextType =
    | 'all'
    | 'page'
    | 'frame'
    | 'selection'
    | 'link'
    | 'editable'
    | 'image'
    | 'video'
    | 'audio'
    | 'launcher'
    | 'browser_action'
    | 'page_action'
    | 'action';
type ContextItemType = 'normal' | 'checkbox' | 'radio' | 'separator';
export interface CreateProperties {
    /** Optional. Lets you restrict the item to apply only to documents whose URL matches one of the given patterns. (This applies to frames as well.) For details on the format of a pattern, see Match Patterns.  */
    documentUrlPatterns?: string[] | undefined;
    /** Optional. The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items.  */
    checked?: boolean | undefined;
    /** Optional. The text to be displayed in the item; this is required unless type is 'separator'. When the context is 'selection', you can use %s within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".  */
    title?: string | undefined;
    /** Optional. List of contexts this menu item will appear in. Defaults to ['page'] if not specified.  */
    contexts?: ContextType | ContextType[] | undefined;
    /**
     * Optional.
     * Since Chrome 20.
     * Whether this context menu item is enabled or disabled. Defaults to true.
     */
    enabled?: boolean | undefined;
    /** Optional. Similar to documentUrlPatterns, but lets you filter based on the src attribute of img/audio/video tags and the href of anchor tags.  */
    targetUrlPatterns?: string[] | undefined;
    /**
     * Optional.
     * A function that will be called back when the menu item is clicked. Event pages cannot use this; instead, they should register a listener for chrome.contextMenus.onClicked.
     * @param info Information sent when a context menu item is clicked.
     * @param tab The details of the tab where the click took place. Note: this parameter only present for extensions.
     */
    onclick?: ((info: OnClickData, tab: Tab) => void) | undefined;
    /** Optional. The ID of a parent menu item; this makes the item a child of a previously added item.  */
    parentId?: number | string | undefined;
    /** Optional. The type of menu item. Defaults to 'normal' if not specified.  */
    type?: ContextItemType | undefined;
    /**
     * Optional.
     * Since Chrome 21.
     * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
     */
    id?: string | undefined;
    /**
     * Optional.
     * Since Chrome 62.
     * Whether the item is visible in the menu.
     */
    visible?: boolean | undefined;
}

export interface UpdateProperties {
    documentUrlPatterns?: string[] | undefined;
    checked?: boolean | undefined;
    title?: string | undefined;
    contexts?: ContextType[] | undefined;
    /** Optional. Since Chrome 20.  */
    enabled?: boolean | undefined;
    targetUrlPatterns?: string[] | undefined;
    onclick?: Function | undefined;
    /** Optional. Note: You cannot change an item to be a child of one of its own descendants.  */
    parentId?: number | string;
    type?: ContextItemType | undefined;
    /**
     * Optional.
     * @since Chrome 62.
     * Whether the item is visible in the menu.
     */
    visible?: boolean | undefined;
}

export interface MenuClickedEvent extends Event<(info: OnClickData, tab?: Tab) => void> {}

export var ACTION_MENU_TOP_LEVEL_LIMIT: number;
export function removeAll(callback?: () => void): void;
export function create(createProperties: CreateProperties, callback?: () => void): number | string;
export function update(id: string, updateProperties: UpdateProperties, callback?: () => void): void;
export function update(id: number, updateProperties: UpdateProperties, callback?: () => void): void;
export function remove(menuItemId: string, callback?: () => void): void;
export function remove(menuItemId: number, callback?: () => void): void;
export var onClicked: MenuClickedEvent;
