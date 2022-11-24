import { network } from '../devtools';
import { Event } from '../events';

export interface HAREntry extends HARFormatEntry {}

export interface HARLog extends HARFormatLog {}

export interface Request extends network.HAREntry {
    /**
     * Returns content of the response body.
     * @param callback A function that receives the response body when the request completes.
     * The callback parameter should be a function that looks like this:
     * function(string content, string encoding) {...};
     * Parameter content: Content of the response body (potentially encoded).
     * Parameter encoding: Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported.
     */
    getContent(callback: (content: string, encoding: string) => void): void;
}

export interface RequestFinishedEvent extends Event<(request: Request) => void> {}

export interface NavigatedEvent extends Event<(url: string) => void> {}

export function getHAR(callback: (harLog: HARLog) => void): void;
export var onRequestFinished: RequestFinishedEvent;
export var onNavigated: NavigatedEvent;
