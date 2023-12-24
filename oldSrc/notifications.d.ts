import { Event } from './events';

export type TemplateType = 'basic' | 'image' | 'list' | 'progress';
export interface ButtonOptions {
    title: string;
    iconUrl?: string | undefined;
}

export interface ItemOptions {
    /** Title of one item of a list notification. */
    title: string;
    /** Additional details about this item. */
    message: string;
}

export type NotificationOptions<T extends boolean = false> = {
    /**
     * Optional.
     * Alternate notification content with a lower-weight font.
     * @since Chrome 31.
     */
    contextMessage?: string | undefined;
    /** Optional. Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default. */
    priority?: number | undefined;
    /** Optional. A timestamp associated with the notification, in milliseconds past the epoch (e.g. Date.now() + n). */
    eventTime?: number | undefined;
    /** Optional. Text and icons for up to two notification action buttons. */
    buttons?: ButtonOptions[] | undefined;
    /** Optional. Items for multi-item notifications. */
    items?: ItemOptions[] | undefined;
    /**
     * Optional.
     * Current progress ranges from 0 to 100.
     * @since Chrome 30.
     */
    progress?: number | undefined;
    /**
     * Optional.
     * Whether to show UI indicating that the app will visibly respond to clicks on the body of a notification.
     * @since Chrome 32.
     */
    isClickable?: boolean | undefined;
    /**
     * Optional.
     * A URL to the app icon mask. URLs have the same restrictions as iconUrl. The app icon mask should be in alpha channel, as only the alpha channel of the image will be considered.
     * @since Chrome 38.
     */
    appIconMaskUrl?: string | undefined;
    /** Optional. A URL to the image thumbnail for image-type notifications. URLs have the same restrictions as iconUrl. */
    imageUrl?: string | undefined;
    /**
     * Indicates that the notification should remain visible on screen until the user activates or dismisses the notification.
     * This defaults to false.
     * @since Chrome 50
     */
    requireInteraction?: boolean | undefined;
    /**
     * Optional.
     * Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.
     * @since Chrome 70
     */
    silent?: boolean | undefined;
} & (T extends true
    ? {
          /**
           * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
           * URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file. Required for notifications.create method.
           */
          iconUrl: string;
          /** Main notification content. Required for notifications.create method. */
          message: string;
          /** Which type of notification to display. Required for notifications.create method. */
          type: TemplateType;
          /** Title of the notification (e.g. sender name for email). Required for notifications.create method. */
          title: string;
      }
    : {
          /**
           * Optional.
           * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
           * URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file. Required for notifications.create method.
           */
          iconUrl?: string | undefined;
          /** Optional. Main notification content. Required for notifications.create method. */
          message?: string | undefined;
          /** Optional. Which type of notification to display. Required for notifications.create method. */
          type?: TemplateType | undefined;
          /** Optional. Title of the notification (e.g. sender name for email). Required for notifications.create method. */
          title?: string | undefined;
      });
export interface NotificationClosedEvent extends Event<(notificationId: string, byUser: boolean) => void> {}

export interface NotificationClickedEvent extends Event<(notificationId: string) => void> {}

export interface NotificationButtonClickedEvent extends Event<(notificationId: string, buttonIndex: number) => void> {}

export interface NotificationPermissionLevelChangedEvent extends Event<(level: string) => void> {}

export interface NotificationShowSettingsEvent extends Event<() => void> {}

export var onClosed: NotificationClosedEvent;
export var onClicked: NotificationClickedEvent;
export var onButtonClicked: NotificationButtonClickedEvent;
export var onPermissionLevelChanged: NotificationPermissionLevelChangedEvent;
export var onShowSettings: NotificationShowSettingsEvent;
export function create(
    notificationId: string,
    options: NotificationOptions<true>,
    callback?: (notificationId: string) => void,
): void;
export function create(options: NotificationOptions<true>, callback?: (notificationId: string) => void): void;
export function update(
    notificationId: string,
    options: NotificationOptions,
    callback?: (wasUpdated: boolean) => void,
): void;
export function clear(notificationId: string, callback?: (wasCleared: boolean) => void): void;
export function getAll(callback: (notifications: Object) => void): void;
export function getPermissionLevel(callback: (level: string) => void): void;
