import { Event } from './events';

export interface OpenedFileInfo {
    /** A request ID to be be used by consecutive read/write and close requests. */
    openRequestId: number;
    /** The path of the opened file. */
    filePath: string;
    /** Whether the file was opened for reading or writing. */
    mode: string;
}

export interface FileWatchersInfo {
    /** The path of the entry being observed. */
    entryPath: string;
    /** Whether watching should include all child entries recursively. It can be true for directories only. */
    recursive: boolean;
    /** Optional. Tag used by the last notification for the watcher.  */
    lastTag?: string | undefined;
}

export interface CloudIdentifier {
    /** Identifier for the cloud storage provider (e.g. 'drive.google.com'). */
    providerName: string;
    /** The provider's identifier for the given file/directory. */
    id: string;
}

export interface EntryMetadata {
    /** True if it is a directory. Must be provided if requested in `options`. */
    isDirectory?: boolean;
    /** Name of this entry (not full path name). Must not contain '/'. For root it must be empty. Must be provided if requested in `options`. */
    name?: string;
    /** File size in bytes. Must be provided if requested in `options`. */
    size?: number;
    /** The last modified time of this entry. Must be provided if requested in `options`. */
    modificationTime?: Date;
    /** Optional. Mime type for the entry. Always optional, but should provided if requested in `options`. */
    mimeType?: string | undefined;
    /** Optional. Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32 KB in size. Optional, but can be provided only when explicitly requested by the onGetMetadataRequested event. */
    thumbnail?: string | undefined;
    /** Optional. Cloud storage representation of this entry. Must be provided if requested in `options` and the file is backed by cloud storage. For local files not backed by cloud storage, it should be undefined when requested. */
    cloudIdentifier?: CloudIdentifier | undefined;
}

export interface FileSystemInfo {
    /** The identifier of the file system. */
    fileSystemId: string;
    /** A human-readable name for the file system. */
    displayName: string;
    /** Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files). */
    writable: boolean;
    /**
     * The maximum number of files that can be opened at once. If 0, then not limited.
     * @since Since Chrome 42.
     */
    openedFilesLimit: number;
    /**
     * List of currently opened files.
     * @since Since Chrome 42.
     */
    openedFiles: OpenedFileInfo[];
    /**
     * Optional.
     * Whether the file system supports the tag field for observing directories.
     * @since Since Chrome 45. Warning: this is the current Beta channel.
     */
    supportsNotifyTag?: boolean | undefined;
    /**
     * List of watchers.
     * @since Since Chrome 45. Warning: this is the current Beta channel.
     */
    watchers: FileWatchersInfo[];
}

export interface GetActionsRequestedOptions {
    /** The identifier of the file system related to this operation. */
    fileSystemId: string;
    /** The unique identifier of this request. */
    requestId: number;
    /** List of paths of entries for the list of actions. */
    entryPaths: string[];
}

export interface Action {
    /** The identifier of the action. Any string or CommonActionId for common actions. */
    id: string;
    /** Optional. The title of the action. It may be ignored for common actions.  */
    title?: string | undefined;
}

export interface ExecuteActionRequestedOptions {
    /** The identifier of the file system related to this operation. */
    fileSystemId: string;
    /** The unique identifier of this request. */
    requestId: number;
    /** The set of paths of the entries to be used for the action. */
    entryPaths: string[];
    /** The identifier of the action to be executed. */
    actionId: string;
}

export interface MountOptions {
    /** The string identifier of the file system. Must be unique per each extension. */
    fileSystemId: string;
    /** A human-readable name for the file system. */
    displayName: string;
    /** Optional. Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).  */
    writable?: boolean | undefined;
    /**
     * Optional.
     * The maximum number of files that can be opened at once. If not specified, or 0, then not limited.
     * @since Since Chrome 41.
     */
    openedFilesLimit?: number | undefined;
    /**
     * Optional.
     * Whether the file system supports the tag field for observed directories.
     * @since Since Chrome 45. Warning: this is the current Beta channel.
     */
    supportsNotifyTag?: boolean | undefined;
}

export interface UnmountOptions {
    /** The identifier of the file system to be unmounted. */
    fileSystemId: string;
}

export interface NotificationChange {
    /** The path of the changed entry. */
    entryPath: string;
    /** The type of the change which happened to the entry. */
    changeType: string;
}

export interface NotificationOptions {
    /** The identifier of the file system related to this change. */
    fileSystemId: string;
    /** The path of the observed entry. */
    observedPath: string;
    /** Mode of the observed entry. */
    recursive: boolean;
    /** The type of the change which happened to the observed entry. If it is DELETED, then the observed entry will be automatically removed from the list of observed entries. */
    changeType: string;
    /** Optional. List of changes to entries within the observed directory (including the entry itself)  */
    changes?: NotificationChange[] | undefined;
    /** Optional. Tag for the notification. Required if the file system was mounted with the supportsNotifyTag option. Note, that this flag is necessary to provide notifications about changes which changed even when the system was shutdown.  */
    tag?: string | undefined;
}

export interface RequestedEventOptions {
    /** The identifier of the file system related to this operation. */
    fileSystemId: string;
    /** The unique identifier of this request. */
    requestId: number;
}

export interface EntryPathRequestedEventOptions extends RequestedEventOptions {
    /** The path of the entry to which this operation is related to. */
    entryPath: string;
}

export interface MetadataRequestedEventOptions extends EntryPathRequestedEventOptions {
    /** Set to true if `is_directory` value is requested. */
    isDirectory: boolean;
    /** Set to true if `name` value is requested. */
    name: boolean;
    /** Set to true if `size` value is requested. */
    size: boolean;
    /** Set to true if `modificationTime` value is requested. */
    modificationTime: boolean;
    /** Set to true if `mimeType` value is requested. */
    mimeType: boolean;
    /** Set to true if `thumbnail` is requested. */
    thumbnail: boolean;
    /** Set to true if `cloudIdentifier` is requested. */
    cloudIdentifier: boolean;
}

export interface DirectoryPathRequestedEventOptions extends RequestedEventOptions {
    /** The path of the directory which is to be operated on. */
    directoryPath: string;
    /** Set to true if `is_directory` value is requested. */
    isDirectory: boolean;
    /** Set to true if `name` value is requested. */
    name: boolean;
    /** Set to true if `size` value is requested. */
    size: boolean;
    /** Set to true if `modificationTime` value is requested. */
    modificationTime: boolean;
    /** Set to true if `mimeType` value is requested. */
    mimeType: boolean;
    /** Set to true if `thumbnail` is requested. */
    thumbnail: boolean;
}

export interface FilePathRequestedEventOptions extends RequestedEventOptions {
    /** The path of the entry for the operation */
    filePath: string;
}

export interface OpenFileRequestedEventOptions extends FilePathRequestedEventOptions {
    /** Whether the file will be used for reading or writing. */
    mode: string;
}

export interface OpenedFileRequestedEventOptions extends RequestedEventOptions {
    /** A request ID used to open the file. */
    openRequestId: number;
}

export interface OpenedFileOffsetRequestedEventOptions extends OpenedFileRequestedEventOptions {
    /** Position in the file (in bytes) to start reading from. */
    offset: number;
    /** Number of bytes to be returned. */
    length: number;
}

export interface CreateDirectoryRequestedEventOptions extends RequestedEventOptions {
    /** The path of the directory to be created. */
    directoryPath: string;

    /** Whether the operation is recursive (for directories only). */
    recursive: boolean;
}

export interface EntryPathRecursiveRequestedEventOptions extends EntryPathRequestedEventOptions {
    /** Whether the operation is recursive (for directories only). */
    recursive: boolean;
}

export interface SourceTargetPathRequestedEventOptions extends RequestedEventOptions {
    /** The source path for the operation. */
    sourcePath: string;
    /** The destination path for the operation. */
    targetPath: string;
}

export interface FilePathLengthRequestedEventOptions extends FilePathRequestedEventOptions {
    /** Number of bytes to be retained after the operation completes. */
    length: number;
}

export interface OpenedFileIoRequestedEventOptions extends OpenedFileRequestedEventOptions {
    /** Position in the file (in bytes) to start operating from. */
    offset: number;
    /** Buffer of bytes to be operated on the file. */
    data: ArrayBuffer;
}

export interface OperationRequestedEventOptions extends RequestedEventOptions {
    /** An ID of the request to which this operation is related. */
    operationRequestId: number;
}

export interface RequestedEvent
    extends Event<
        (options: RequestedEventOptions, successCallback: Function, errorCallback: (error: string) => void) => void
    > {}

export interface MetadataRequestedEvent
    extends Event<
        (
            options: MetadataRequestedEventOptions,
            successCallback: (metadata: EntryMetadata) => void,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface DirectoryPathRequestedEvent
    extends Event<
        (
            options: DirectoryPathRequestedEventOptions,
            successCallback: (entries: EntryMetadata[], hasMore: boolean) => void,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface OpenFileRequestedEvent
    extends Event<
        (
            options: OpenFileRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface OpenedFileRequestedEvent
    extends Event<
        (
            options: OpenedFileRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface OpenedFileOffsetRequestedEvent
    extends Event<
        (
            options: OpenedFileOffsetRequestedEventOptions,
            successCallback: (data: ArrayBuffer, hasMore: boolean) => void,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface CreateDirectoryRequestedEvent
    extends Event<
        (
            options: CreateDirectoryRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface EntryPathRecursiveRequestedEvent
    extends Event<
        (
            options: EntryPathRecursiveRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface FilePathRequestedEvent
    extends Event<
        (
            options: FilePathRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface SourceTargetPathRequestedEvent
    extends Event<
        (
            options: SourceTargetPathRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface FilePathLengthRequestedEvent
    extends Event<
        (
            options: FilePathLengthRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface OpenedFileIoRequestedEvent
    extends Event<
        (
            options: OpenedFileIoRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface OperationRequestedEvent
    extends Event<
        (
            options: OperationRequestedEventOptions,
            successCallback: Function,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface OptionlessRequestedEvent
    extends Event<(successCallback: Function, errorCallback: (error: string) => void) => void> {}

export interface GetActionsRequested
    extends Event<
        (
            options: GetActionsRequestedOptions,
            successCallback: (actions: Action[]) => void,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export interface ExecuteActionRequested
    extends Event<
        (
            options: ExecuteActionRequestedOptions,
            successCallback: () => void,
            errorCallback: (error: string) => void,
        ) => void
    > {}

export function mount(options: MountOptions, callback?: () => void): void;
export function unmount(options: UnmountOptions, callback?: () => void): void;
export function getAll(callback: (fileSystems: FileSystemInfo[]) => void): void;
export function get(fileSystemId: string, callback: (fileSystem: FileSystemInfo) => void): void;
export function notify(options: NotificationOptions, callback: () => void): void;
export var onUnmountRequested: RequestedEvent;
export var onGetMetadataRequested: MetadataRequestedEvent;
export var onReadDirectoryRequested: DirectoryPathRequestedEvent;
export var onOpenFileRequested: OpenFileRequestedEvent;
export var onCloseFileRequested: OpenedFileRequestedEvent;
export var onReadFileRequested: OpenedFileOffsetRequestedEvent;
export var onCreateDirectoryRequested: CreateDirectoryRequestedEvent;
export var onDeleteEntryRequested: EntryPathRecursiveRequestedEvent;
export var onCreateFileRequested: FilePathRequestedEvent;
export var onCopyEntryRequested: SourceTargetPathRequestedEvent;
export var onMoveEntryRequested: SourceTargetPathRequestedEvent;
export var onTruncateRequested: FilePathLengthRequestedEvent;
export var onWriteFileRequested: OpenedFileIoRequestedEvent;
export var onAbortRequested: OperationRequestedEvent;
export var onConfigureRequested: RequestedEvent;
export var onMountRequested: OptionlessRequestedEvent;
export var onAddWatcherRequested: EntryPathRecursiveRequestedEvent;
export var onRemoveWatcherRequested: EntryPathRecursiveRequestedEvent;
export var onGetActionsRequested: GetActionsRequested;
export var onExecuteActionRequested: ExecuteActionRequested;
