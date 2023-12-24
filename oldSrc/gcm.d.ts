import { Event } from './events';

export interface OutgoingMessage {
    /** The ID of the server to send the message to as assigned by Google API Console. */
    destinationId: string;
    /** The ID of the message. It must be unique for each message in scope of the applications. See the Cloud Messaging documentation for advice for picking and handling an ID. */
    messageId: string;
    /** Optional. Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The maximum and a default value of time-to-live is 86400 seconds (1 day). */
    timeToLive?: number | undefined;
    /** Message data to send to the server. Case-insensitive goog. and google, as well as case-sensitive collapse_key are disallowed as key prefixes. Sum of all key/value pairs should not exceed gcm.MAX_MESSAGE_SIZE. */
    data: Object;
}

export interface IncomingMessage {
    /** The message data. */
    data: Object;
    /**
     * Optional.
     * The sender who issued the message.
     * @since Since Chrome 41.
     */
    from?: string | undefined;
    /**
     * Optional.
     * The collapse key of a message. See Collapsible Messages section of Cloud Messaging documentation for details.
     */
    collapseKey?: string | undefined;
}

export interface GcmError {
    /** The error message describing the problem. */
    errorMessage: string;
    /** Optional. The ID of the message with this error, if error is related to a specific message. */
    messageId?: string | undefined;
    /** Additional details related to the error, when available. */
    detail: Object;
}

export interface MessageReceptionEvent extends Event<(message: IncomingMessage) => void> {}

export interface MessageDeletionEvent extends Event<() => void> {}

export interface GcmErrorEvent extends Event<(error: GcmError) => void> {}

export var MAX_MESSAGE_SIZE: number;
export function register(senderIds: string[], callback: (registrationId: string) => void): void;
export function unregister(callback: () => void): void;
export function send(message: OutgoingMessage, callback: (messageId: string) => void): void;
export var onMessage: MessageReceptionEvent;
export var onMessagesDeleted: MessageDeletionEvent;
export var onSendError: GcmErrorEvent;
