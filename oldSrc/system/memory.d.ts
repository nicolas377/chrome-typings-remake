export interface MemoryInfo {
    /** The total amount of physical memory capacity, in bytes. */
    capacity: number;
    /** The amount of available capacity, in bytes. */
    availableCapacity: number;
}

export function getInfo(callback: (info: MemoryInfo) => void): void;
export function getInfo(): Promise<MemoryInfo>;
