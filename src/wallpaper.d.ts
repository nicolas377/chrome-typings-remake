export interface WallpaperDetails {
    /** Optional. The jpeg or png encoded wallpaper image. */
    data?: ArrayBuffer | undefined;
    /** Optional. The URL of the wallpaper to be set. */
    url?: string | undefined;
    /**
     * The supported wallpaper layouts.
     * One of: "STRETCH", "CENTER", or "CENTER_CROPPED"
     */
    layout: 'STRETCH' | 'CENTER' | 'CENTER_CROPPED';
    /** The file name of the saved wallpaper. */
    filename: string;
    /** Optional. True if a 128x60 thumbnail should be generated. */
    thumbnail?: boolean | undefined;
}

export function setWallpaper(details: WallpaperDetails, callback: (thumbnail?: ArrayBuffer) => void): void;
