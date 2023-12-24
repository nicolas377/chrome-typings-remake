import { Event } from '../events';

export interface StorageUnitInfo {
    /** The transient ID that uniquely identifies the storage device. This ID will be persistent within the same run of a single application. It will not be a persistent identifier between different runs of an application, or between different applications. */
    id: string;
    /** The name of the storage unit. */
    name: string;
    /**
     * The media type of the storage unit.
     * fixed: The storage has fixed media, e.g. hard disk or SSD.
     * removable: The storage is removable, e.g. USB flash drive.
     * unknown: The storage type is unknown.
     */
    type: string;
    /** The total amount of the storage space, in bytes. */
    capacity: number;
}

export interface StorageCapacityInfo {
    /** A copied |id| of getAvailableCapacity function parameter |id|. */
    id: string;
    /** The available capacity of the storage device, in bytes. */
    availableCapacity: number;
}

export interface SystemStorageAttachedEvent extends Event<(info: StorageUnitInfo) => void> {}

export interface SystemStorageDetachedEvent extends Event<(id: string) => void> {}

export function getInfo(callback: (info: StorageUnitInfo[]) => void): void;
export function getInfo(): Promise<StorageUnitInfo[]>;
export function ejectDevice(id: string, callback: (result: string) => void): void;
export function ejectDevice(id: string): Promise<string>;
export function getAvailableCapacity(id: string, callback: (info: StorageCapacityInfo) => void): void;
export function getAvailableCapacity(id: string): Promise<StorageCapacityInfo>;
export var onAttached: SystemStorageAttachedEvent;
export var onDetached: SystemStorageDetachedEvent;
