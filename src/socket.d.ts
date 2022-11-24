export interface CreateInfo {
    socketId: number;
}

export interface AcceptInfo {
    resultCode: number;
    socketId?: number | undefined;
}

export interface ReadInfo {
    resultCode: number;
    data: ArrayBuffer;
}

export interface WriteInfo {
    bytesWritten: number;
}

export interface RecvFromInfo {
    resultCode: number;
    data: ArrayBuffer;
    port: number;
    address: string;
}

export interface SocketInfo {
    socketType: string;
    localPort?: number | undefined;
    peerAddress?: string | undefined;
    peerPort?: number | undefined;
    localAddress?: string | undefined;
    connected: boolean;
}

export interface NetworkInterface {
    name: string;
    address: string;
}

export function create(type: string, options?: Object, callback?: (createInfo: CreateInfo) => void): void;
export function destroy(socketId: number): void;
export function connect(socketId: number, hostname: string, port: number, callback: (result: number) => void): void;
export function bind(socketId: number, address: string, port: number, callback: (result: number) => void): void;
export function disconnect(socketId: number): void;
export function read(socketId: number, bufferSize?: number, callback?: (readInfo: ReadInfo) => void): void;
export function write(socketId: number, data: ArrayBuffer, callback?: (writeInfo: WriteInfo) => void): void;
export function recvFrom(socketId: number, bufferSize?: number, callback?: (recvFromInfo: RecvFromInfo) => void): void;
export function sendTo(
    socketId: number,
    data: ArrayBuffer,
    address: string,
    port: number,
    callback?: (writeInfo: WriteInfo) => void,
): void;
export function listen(
    socketId: number,
    address: string,
    port: number,
    backlog?: number,
    callback?: (result: number) => void,
): void;
export function accept(socketId: number, callback?: (acceptInfo: AcceptInfo) => void): void;
export function setKeepAlive(
    socketId: number,
    enable: boolean,
    delay?: number,
    callback?: (result: boolean) => void,
): void;
export function setNoDelay(socketId: number, noDelay: boolean, callback?: (result: boolean) => void): void;
export function getInfo(socketId: number, callback: (result: SocketInfo) => void): void;
export function getNetworkList(callback: (result: NetworkInterface[]) => void): void;
