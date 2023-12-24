export interface NetworkDetails {
    /** The device's MAC address. */
    macAddress: string;
    /** Optional. The device's local IPv4 address (undefined if not configured). */
    ipv4?: string | undefined;
    /** Optional. The device's local IPv6 address (undefined if not configured). */
    ipv6?: string | undefined;
}

export function getNetworkDetails(callback: (networkDetails: NetworkDetails) => void): void;
