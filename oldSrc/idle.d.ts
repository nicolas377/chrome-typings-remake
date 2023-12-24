import { Event } from './events';

export type IdleState = 'active' | 'idle' | 'locked';
export interface IdleStateChangedEvent extends Event<(newState: IdleState) => void> {}

export function queryState(detectionIntervalInSeconds: number, callback: (newState: IdleState) => void): void;
export function setDetectionInterval(intervalInSeconds: number): void;
export function getAutoLockDelay(callback: (delay: number) => void): void;
export var onStateChanged: IdleStateChangedEvent;
