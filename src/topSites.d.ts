export interface MostVisitedURL {
    /** The most visited URL. */
    url: string;
    /** The title of the page */
    title: string;
}

export function get(callback: (data: MostVisitedURL[]) => void): void;
export function get(): Promise<MostVisitedURL[]>;
