export interface SaveDetails {
    /** The id of the tab to save as MHTML. */
    tabId: number;
}

export function saveAsMHTML(details: SaveDetails, callback: (mhtmlData?: Blob) => void): void;
