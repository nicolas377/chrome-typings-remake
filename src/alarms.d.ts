import { Event } from './events';

export interface AlarmCreateInfo {
    /** Optional. Length of time in minutes after which the onAlarm event should fire.  */
    delayInMinutes?: number | undefined;
    /** Optional. If set, the onAlarm event should fire every periodInMinutes minutes after the initial event specified by when or delayInMinutes. If not set, the alarm will only fire once.  */
    periodInMinutes?: number | undefined;
    /** Optional. Time at which the alarm should fire, in milliseconds past the epoch (e.g. Date.now() + n).  */
    when?: number | undefined;
}

export interface Alarm {
    /** Optional. If not null, the alarm is a repeating alarm and will fire again in periodInMinutes minutes.  */
    periodInMinutes?: number | undefined;
    /** Time at which this alarm was scheduled to fire, in milliseconds past the epoch (e.g. Date.now() + n). For performance reasons, the alarm may have been delayed an arbitrary amount beyond this. */
    scheduledTime: number;
    /** Name of this alarm. */
    name: string;
}

export interface AlarmEvent extends Event<(alarm: Alarm) => void> {}

export function create(alarmInfo: AlarmCreateInfo): void;
export function create(name: string, alarmInfo: AlarmCreateInfo): void;
export function getAll(callback: (alarms: Alarm[]) => void): void;
export function getAll(): Promise<Alarm[]>;
export function clearAll(): Promise<boolean>;
export function clearAll(callback?: (wasCleared: boolean) => void): void;
export function clear(name?: string): Promise<boolean>;
export function clear(name?: string, callback?: (wasCleared: boolean) => void): void;
export function clear(callback: (wasCleared: boolean) => void): void;
export function clear(): Promise<void>;
export function get(callback: (alarm: Alarm) => void): void;
export function get(): Promise<Alarm>;
export function get(name: string, callback: (alarm: Alarm) => void): void;
export function get(name: string): Promise<Alarm>;
export var onAlarm: AlarmEvent;
