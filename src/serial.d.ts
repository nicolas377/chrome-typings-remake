import * as onReceive from './serial/onReceive';
import * as onReceiveError from './serial/onReceiveError';

export const DataBits: {
    SEVEN: 'seven';
    EIGHT: 'eight';
};
export const ParityBit: {
    NO: 'no';
    ODD: 'odd';
    EVEN: 'even';
};
export const StopBits: {
    ONE: 'one';
    TWO: 'two';
};
export interface DeviceInfo {
    /** The device's system path. This should be passed as the path argument to chrome.serial.connect in order to connect to this device. */
    path: string;
    /** Optional. A PCI or USB vendor ID if one can be determined for the underlying device. */
    vendorId?: number | undefined;
    /** Optional. A USB product ID if one can be determined for the underlying device. */
    productId?: number | undefined;
    /** Optional. A human-readable display name for the underlying device if one can be queried from the host driver. */
    displayName?: number | undefined;
}

export interface ConnectionInfo {
    /** The id of the serial port connection. */
    connectionId?: number | undefined;
    /** Flag indicating whether the connection is blocked from firing onReceive events. */
    paused: boolean;
    /** See ConnectionOptions.persistent */
    persistent: boolean;
    /** See ConnectionOptions.name */
    name: string;
    /** See ConnectionOptions.bufferSize */
    bufferSize: number;
    /** See ConnectionOptions.receiveTimeout */
    receiveTimeout?: number | undefined;
    /** See ConnectionOptions.sendTimeout */
    sendTimeout?: number | undefined;
    /** Optional. See ConnectionOptions.bitrate.
     * This field may be omitted or inaccurate if a non-standard bitrate is in use, or if an error occurred while querying the underlying device. */
    bitrate?: number | undefined;
    /** Optional. See ConnectionOptions.dataBits. This field may be omitted if an error occurred while querying the underlying device. */
    dataBits?: typeof DataBits[keyof typeof DataBits] | undefined;
    /** Optional. See ConnectionOptions.parityBit. This field may be omitted if an error occurred while querying the underlying device. */
    parityBit?: typeof ParityBit[keyof typeof ParityBit] | undefined;
    /** Optional. See ConnectionOptions.stopBits. This field may be omitted if an error occurred while querying the underlying device. */
    stopBits?: typeof StopBits[keyof typeof StopBits] | undefined;
    /** Optional. Flag indicating whether or not to enable RTS/CTS hardware flow control. Defaults to false. */
    ctsFlowControl?: boolean | undefined;
}

export interface ConnectionOptions {
    /** Optional. Flag indicating whether or not the connection should be left open when the application is suspended (see Manage App Lifecycle: https://developer.chrome.com/apps/app_lifecycle).
     *  The default value is "false." When the application is loaded, any serial connections previously opened with persistent=true can be fetched with getConnections. */
    persistent?: boolean | undefined;
    /** Optional. An application-defined string to associate with the connection. */
    name?: string | undefined;
    /** Optional. The size of the buffer used to receive data. The default value is 4096. */
    bufferSize?: number | undefined;
    /** Optional. The requested bitrate of the connection to be opened.
     * For compatibility with the widest range of hardware, this number should match one of commonly-available bitrates,
     * such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200.
     * There is no guarantee, of course, that the device connected to the serial port will support the requested bitrate, even if the port itself supports that bitrate.
     * 9600 will be passed by default. */
    bitrate?: number | undefined;
    /** Optional. "eight" will be passed by default. */
    dataBits?: typeof DataBits[keyof typeof DataBits] | undefined;
    /** Optional. "no" will be passed by default. */
    parityBit?: typeof ParityBit[keyof typeof ParityBit] | undefined;
    /** Optional. "one" will be passed by default. */
    stopBits?: typeof StopBits[keyof typeof StopBits] | undefined;
    /** Optional. Flag indicating whether or not to enable RTS/CTS hardware flow control. Defaults to false. */
    ctsFlowControl?: boolean | undefined;
    /** Optional. The maximum amount of time (in milliseconds) to wait for new data before raising an onReceiveError event with a "timeout" error.
     * If zero, receive timeout errors will not be raised for the connection.
     * Defaults to 0. */
    receiveTimeout?: number | undefined;
    /** Optional. The maximum amount of time (in milliseconds) to wait for a send operation to complete before calling the callback with a "timeout" error.
     * If zero, send timeout errors will not be triggered.
     * Defaults to 0. */
    sendTimeout?: number | undefined;
}

export function getDevices(callback: (ports: DeviceInfo[]) => void): void;
export function connect(
    path: string,
    options: ConnectionOptions,
    callback: (connectionInfo: ConnectionInfo) => void,
): void;
export function update(connectionId: number, options: ConnectionOptions, callback: (result: boolean) => void): void;
export function disconnect(connectionId: number, callback: (result: boolean) => void): void;
export function setPaused(connectionId: number, paused: boolean, callback: () => void): void;
export function getInfo(callback: (connectionInfos: ConnectionInfo[]) => void): void;
export function getConnections(callback: (connectionInfos: ConnectionInfo[]) => void): void;
export function send(connectionId: number, data: ArrayBuffer, callback: (sendInfo: object) => void): void;
export function flush(connectionId: number, callback: (result: boolean) => void): void;
export function getControlSignals(connectionId: number, callback: (signals: object) => void): void;
export function setControlSignals(connectionId: number, signals: object, callback: (result: boolean) => void): void;
export function setBreak(connectionId: number, callback: (result: boolean) => void): void;
export function clearBreak(connectionId: number, callback: (result: boolean) => void): void;

export { onReceive, onReceiveError };
