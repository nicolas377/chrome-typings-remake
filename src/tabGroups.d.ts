import { Event } from './events';

export var TAB_GROUP_ID_NONE: -1;
export type ColorEnum = 'grey' | 'blue' | 'red' | 'yellow' | 'green' | 'pink' | 'purple' | 'cyan' | 'orange';
export interface TabGroup {
    /** Whether the group is collapsed. A collapsed group is one whose tabs are hidden. */
    collapsed: boolean;
    /** The group's color. */
    color: ColorEnum;
    /** The ID of the group. Group IDs are unique within a browser session. */
    id: number;
    /** Optional. The title of the group. */
    title?: string | undefined;
    /** The ID of the window that contains the group. */
    windowId: number;
}

export interface MoveProperties {
    /** The position to move the group to. Use -1 to place the group at the end of the window. */
    index: number;
    /** Optional. The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with chrome.windows.WindowType type "normal". */
    windowId?: number | undefined;
}

export interface QueryInfo {
    /** Optional. Whether the groups are collapsed. */
    collapsed?: boolean | undefined;
    /** Optional. The color of the groups. */
    color?: ColorEnum | undefined;
    /** Optional. Match group titles against a pattern. */
    title?: string | undefined;
    /** Optional. The ID of the window that contains the group. */
    windowId?: number | undefined;
}

export interface UpdateProperties {
    /** Optional. Whether the group should be collapsed. */
    collapsed?: boolean | undefined;
    /** Optional. The color of the group. */
    color?: ColorEnum | undefined;
    /** Optional. The title of the group. */
    title?: string | undefined;
}

export function get(groupId: number, callback: (group: TabGroup) => void): void;
export function get(groupId: number): Promise<TabGroup>;
export function move(groupId: number, moveProperties: MoveProperties): Promise<TabGroup>;
export function move(groupId: number, moveProperties: MoveProperties, callback?: (group: TabGroup) => void): void;
export function query(queryInfo: QueryInfo, callback: (result: TabGroup[]) => void): void;
export function query(queryInfo: QueryInfo): Promise<TabGroup[]>;
export function update(groupId: number, updateProperties: UpdateProperties): Promise<TabGroup>;
export function update(groupId: number, updateProperties: UpdateProperties, callback?: (group: TabGroup) => void): void;
export interface TabGroupCreatedEvent extends Event<(group: TabGroup) => void> {}

export interface TabGroupMovedEvent extends Event<(group: TabGroup) => void> {}

export interface TabGroupRemovedEvent extends Event<(group: TabGroup) => void> {}

export interface TabGroupUpdated extends Event<(group: TabGroup) => void> {}

export var onCreated: TabGroupCreatedEvent;
export var onMoved: TabGroupMovedEvent;
export var onRemoved: TabGroupRemovedEvent;
export var onUpdated: TabGroupUpdated;
