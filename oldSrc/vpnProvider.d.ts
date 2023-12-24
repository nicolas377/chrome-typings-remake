import { Event } from './events';

export interface VpnSessionParameters {
    /** IP address for the VPN interface in CIDR notation. IPv4 is currently the only supported mode. */
    address: string;
    /** Optional. Broadcast address for the VPN interface. (default: deduced from IP address and mask) */
    broadcastAddress?: string | undefined;
    /** Optional. MTU setting for the VPN interface. (default: 1500 bytes) */
    mtu?: string | undefined;
    /**
     * Exclude network traffic to the list of IP blocks in CIDR notation from the tunnel. This can be used to bypass traffic to and from the VPN server. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
     */
    exclusionList: string[];
    /**
     * Include network traffic to the list of IP blocks in CIDR notation to the tunnel. This parameter can be used to set up a split tunnel. By default no traffic is directed to the tunnel. Adding the entry "0.0.0.0/0" to this list gets all the user traffic redirected to the tunnel. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
     */
    inclusionList: string[];
    /** Optional. A list of search domains. (default: no search domain) */
    domainSearch?: string[] | undefined;
    /** A list of IPs for the DNS servers. */
    dnsServer: string[];
}

export interface VpnPlatformMessageEvent extends Event<(id: string, message: string, error: string) => void> {}

export interface VpnPacketReceptionEvent extends Event<(data: ArrayBuffer) => void> {}

export interface VpnConfigRemovalEvent extends Event<(id: string) => void> {}

export interface VpnConfigCreationEvent extends Event<(id: string, name: string, data: Object) => void> {}

export interface VpnUiEvent extends Event<(event: string, id?: string) => void> {}

export function createConfig(name: string, callback: (id: string) => void): void;
export function destroyConfig(id: string, callback?: Function): void;
export function setParameters(parameters: VpnSessionParameters, callback: Function): void;
export function sendPacket(data: ArrayBuffer, callback?: Function): void;
export function notifyConnectionStateChanged(state: string, callback?: Function): void;
export var onPlatformMessage: VpnPlatformMessageEvent;
export var onPacketReceived: VpnPacketReceptionEvent;
export var onConfigRemoved: VpnConfigRemovalEvent;
export var onConfigCreated: VpnConfigCreationEvent;
export var onUIEvent: VpnUiEvent;
