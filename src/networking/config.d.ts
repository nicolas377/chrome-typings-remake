import { Event } from '../events';

export interface NetworkInfo {
    /** Currently only WiFi supported. */
    Type: string;
    /** Optional. A unique identifier of the network. */
    GUID?: string | undefined;
    /** Optional. A hex-encoded byte sequence. */
    HexSSID?: string | undefined;
    /** Optional. The decoded SSID of the network (default encoding is UTF-8). To filter for non-UTF-8 SSIDs, use HexSSID instead. */
    SSID?: string | undefined;
    /** Optional. The basic service set identification (BSSID) uniquely identifying the basic service set. BSSID is represented as a human readable, hex-encoded string with bytes separated by colons, e.g. 45:67:89:ab:cd:ef. */
    BSSID?: string | undefined;
    /** Optional. Identifier indicating the security type of the network. Valid values are None, WEP-PSK, WPA-PSK and WPA-EAP. */
    Security?: string | undefined;
}

export interface CaptivePorttalDetectedEvent extends Event<(networkInfo: NetworkInfo) => void> {}

export function setNetworkFilter(networks: NetworkInfo[], callback: () => void): void;
export function finishAuthentication(GUID: string, result: string, callback?: () => void): void;
export var onCaptivePortalDetected: CaptivePorttalDetectedEvent;
