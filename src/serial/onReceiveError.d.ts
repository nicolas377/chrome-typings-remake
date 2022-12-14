export const OnReceiveErrorEnum: {
    /* The connection was disconnected. */
    disconnected: 'disconnected';
    /* No data has been received for receiveTimeout milliseconds. */
    timeout: 'timeout';
    /* The device was most likely disconnected from the host. */
    device_lost: 'device_lost';
    /* The device detected a break condition. */
    break: 'break';
    /* The device detected a framing error. */
    frame_error: 'frame_error';
    /* A character-buffer overrun has occurred. The next character is lost. */
    overrun: 'overrun';
    /* An input buffer overflow has occurred. There is either no room in the input buffer, or a character was received after the end-of-file (EOF) character. */
    buffer_overflow: 'buffer_overflow';
    /* The device detected a parity error. */
    parity_error: 'parity_error';
    /* A system error occurred and the connection may be unrecoverable. */
    system_error: 'system_error';
};
export interface OnReceiveErrorInfo {
    /** The connection identifier. */
    connectionId: number;
    /** The data received. */
    error: ArrayBuffer;
}

export function addListener(callback: (info: OnReceiveErrorInfo) => void): void;
