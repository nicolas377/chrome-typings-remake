export interface DocumentScanOptions {
    /** Optional. The MIME types that are accepted by the caller.  */
    mimeTypes?: string[] | undefined;
    /** Optional. The number of scanned images allowed (defaults to 1).  */
    maxImages?: number | undefined;
}

export interface DocumentScanCallbackArg {
    /** The data image URLs in a form that can be passed as the "src" value to an image tag. */
    dataUrls: string[];
    /** The MIME type of dataUrls. */
    mimeType: string;
}

export function scan(options: DocumentScanOptions, callback: (result: DocumentScanCallbackArg) => void): void;
