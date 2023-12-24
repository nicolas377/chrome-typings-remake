export interface OnReceiveInfo {
    /** The connection identifier. */
    connectionId: number;
    /** The data received. */
    data: ArrayBuffer;
}

export function addListener(callback: (info: OnReceiveInfo) => void): void;
