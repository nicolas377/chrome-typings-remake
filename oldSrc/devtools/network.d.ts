import { network } from '../devtools';
import { Event } from '../events';

export interface HAREntry extends HARFormatEntry {}

export interface HARLog extends HARFormatLog {}

export interface Request extends network.HAREntry {
    /**
     * Returns content of the response body.
     * @param callback A function that receives the response body when the request completes.
     */
    getContent(
        callback: (
            /** Content of the response body (potentially encoded) */
            content: string,
            /** Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported */
            encoding: string,
        ) => void,
    ): void;
}

export interface RequestFinishedEvent extends Event<(request: Request) => void> {}

export interface NavigatedEvent extends Event<(url: string) => void> {}

export function getHAR(callback: (harLog: HARLog) => void): void;
export var onRequestFinished: RequestFinishedEvent;
export var onNavigated: NavigatedEvent;
