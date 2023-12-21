import { Event } from './events';

export interface BookmarkTreeNode {
    /** Optional. The 0-based position of this node within its parent folder.  */
    index?: number | undefined;
    /** Optional. When this node was created, in milliseconds since the epoch (new Date(dateAdded)).  */
    dateAdded?: number | undefined;
    /** The text displayed for the node. */
    title: string;
    /** Optional. The URL navigated to when a user clicks the bookmark. Omitted for folders.   */
    url?: string | undefined;
    /** Optional. When the contents of this folder last changed, in milliseconds since the epoch.   */
    dateGroupModified?: number | undefined;
    /** The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted.  */
    id: string;
    /** Optional. The id of the parent folder. Omitted for the root node.   */
    parentId?: string | undefined;
    /** Optional. An ordered list of children of this node.  */
    children?: BookmarkTreeNode[] | undefined;
    /**
     * Optional.
     * Since Chrome 37.
     * Indicates the reason why this node is unmodifiable. The managed value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default).
     */
    unmodifiable?: 'managed' | undefined;
}

export interface BookmarkRemoveInfo {
    index: number;
    parentId: string;
    node: BookmarkTreeNode;
}

export interface BookmarkMoveInfo {
    index: number;
    oldIndex: number;
    parentId: string;
    oldParentId: string;
}

export interface BookmarkChangeInfo {
    url?: string | undefined;
    title: string;
}

export interface BookmarkReorderInfo {
    childIds: string[];
}

export interface BookmarkRemovedEvent extends Event<(id: string, removeInfo: BookmarkRemoveInfo) => void> {}

export interface BookmarkImportEndedEvent extends Event<() => void> {}

export interface BookmarkMovedEvent extends Event<(id: string, moveInfo: BookmarkMoveInfo) => void> {}

export interface BookmarkImportBeganEvent extends Event<() => void> {}

export interface BookmarkChangedEvent extends Event<(id: string, changeInfo: BookmarkChangeInfo) => void> {}

export interface BookmarkCreatedEvent extends Event<(id: string, bookmark: BookmarkTreeNode) => void> {}

export interface BookmarkChildrenReordered extends Event<(id: string, reorderInfo: BookmarkReorderInfo) => void> {}

export interface BookmarkSearchQuery {
    query?: string | undefined;
    url?: string | undefined;
    title?: string | undefined;
}

export interface BookmarkCreateArg {
    /** Optional. Defaults to the Other Bookmarks folder.  */
    parentId?: string | undefined;
    index?: number | undefined;
    title?: string | undefined;
    url?: string | undefined;
}

export interface BookmarkDestinationArg {
    parentId?: string | undefined;
    index?: number | undefined;
}

export interface BookmarkChangesArg {
    title?: string | undefined;
    url?: string | undefined;
}

export var MAX_WRITE_OPERATIONS_PER_HOUR: number;
export var MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;
export function search(query: string, callback: (results: BookmarkTreeNode[]) => void): void;
export function search(query: string): Promise<BookmarkTreeNode[]>;
export function search(query: BookmarkSearchQuery, callback: (results: BookmarkTreeNode[]) => void): void;
export function search(query: BookmarkSearchQuery): Promise<BookmarkTreeNode[]>;
export function getTree(callback: (results: BookmarkTreeNode[]) => void): void;
export function getTree(): Promise<BookmarkTreeNode[]>;
export function getRecent(numberOfItems: number, callback: (results: BookmarkTreeNode[]) => void): void;
export function getRecent(numberOfItems: number): Promise<BookmarkTreeNode[]>;
export function get(id: string, callback: (results: BookmarkTreeNode[]) => void): void;
export function get(id: string): Promise<BookmarkTreeNode[]>;
export function get(idList: string[], callback: (results: BookmarkTreeNode[]) => void): void;
export function get(idList: string[]): Promise<BookmarkTreeNode[]>;
export function create(bookmark: BookmarkCreateArg): Promise<BookmarkTreeNode>;
export function create(bookmark: BookmarkCreateArg, callback: (result: BookmarkTreeNode) => void): void;
export function move(id: string, destination: BookmarkDestinationArg): Promise<BookmarkTreeNode>;
export function move(
    id: string,
    destination: BookmarkDestinationArg,
    callback: (result: BookmarkTreeNode) => void,
): void;
export function update(id: string, changes: BookmarkChangesArg): Promise<BookmarkTreeNode>;
export function update(id: string, changes: BookmarkChangesArg, callback: (result: BookmarkTreeNode) => void): void;
export function remove(id: string): Promise<void>;
export function remove(id: string, callback: Function): void;
export function getChildren(id: string, callback: (results: BookmarkTreeNode[]) => void): void;
export function getChildren(id: string): Promise<BookmarkTreeNode[]>;
export function getSubTree(id: string, callback: (results: BookmarkTreeNode[]) => void): void;
export function getSubTree(id: string): Promise<BookmarkTreeNode[]>;
export function removeTree(id: string): Promise<void>;
export function removeTree(id: string, callback: Function): void;
export var onRemoved: BookmarkRemovedEvent;
export var onImportEnded: BookmarkImportEndedEvent;
export var onImportBegan: BookmarkImportBeganEvent;
export var onChanged: BookmarkChangedEvent;
export var onMoved: BookmarkMovedEvent;
export var onCreated: BookmarkCreatedEvent;
export var onChildrenReordered: BookmarkChildrenReordered;
