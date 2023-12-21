export type Disposition = 'CURRENT_TAB' | 'NEW_TAB' | 'NEW_WINDOW';
export interface QueryInfo {
    /** Location where search results should be displayed. CURRENT_TAB is the default.  */
    disposition?: Disposition | undefined;
    /** Location where search results should be displayed. tabIdcannot be used with disposition. */
    tabId?: number | undefined;
    /** String to query with the default search provider. */
    text?: string | undefined;
}

export function query(options: QueryInfo, callback: () => void): void;
export function query(options: QueryInfo): Promise<void>;
