import { Event } from './events';

export interface SelectionParams {
    /**
     * Optional.
     * List of file extensions that the selected file can have. The list is also used to specify what files to be shown in the select file dialog. Files with the listed extensions are only shown in the dialog. Extensions should not include the leading '.'. Example: ['jpg', 'png']
     * Since Chrome 23.
     */
    allowedFileExtensions?: string[] | undefined;
    /** Suggested name for the file. */
    suggestedName: string;
}

export interface SelectionResult {
    /** Optional. Selected file entry. It will be null if a file hasn't been selected.  */
    entry?: Object | null | undefined;
    /** Whether the file has been selected. */
    success: boolean;
}

export interface FileHandlerExecuteEventDetails {
    /** Optional. The ID of the tab that raised this event. Tab IDs are unique within a browser session.  */
    tab_id?: number | undefined;
    /** Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser). */
    entries: any[];
}

export interface FileBrowserHandlerExecuteEvent
    extends Event<(id: string, details: FileHandlerExecuteEventDetails) => void> {}

export function selectFile(selectionParams: SelectionParams, callback: (result: SelectionResult) => void): void;
export var onExecute: FileBrowserHandlerExecuteEvent;
