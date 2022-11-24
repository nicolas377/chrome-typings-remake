export interface Options {
    /** The URL to navigate to when the new tab is initially opened. */
    url: string;
}

export function openTab(options: Options, callback: () => void): void;
export function openTab(options: Options): void;
