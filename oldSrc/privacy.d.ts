import { ChromeSetting } from './types';

export interface Services {
    /** since Chrome 20. */
    spellingServiceEnabled: ChromeSetting;
    searchSuggestEnabled: ChromeSetting;
    instantEnabled: ChromeSetting;
    alternateErrorPagesEnabled: ChromeSetting;
    safeBrowsingEnabled: ChromeSetting;
    /** @deprecated since Chrome 70. Please use privacy.services.autofillAddressEnabled and privacy.services.autofillCreditCardEnabled. */
    autofillEnabled: ChromeSetting;
    translationServiceEnabled: ChromeSetting;
    /** @since Chrome 38. */
    passwordSavingEnabled: ChromeSetting;
    /** @since Chrome 42. */
    hotwordSearchEnabled: ChromeSetting;
    /** @since Chrome 42. */
    safeBrowsingExtendedReportingEnabled: ChromeSetting;
    /** @since Chrome 70. */
    autofillAddressEnabled: ChromeSetting;
    /** @since Chrome 70. */
    autofillCreditCardEnabled: ChromeSetting;
}

export interface Network {
    networkPredictionEnabled: ChromeSetting;
    /** @deprecated since Chrome 48. Please use privacy.network.webRTCIPHandlingPolicy. */
    webRTCMultipleRoutesEnabled: ChromeSetting;
    /** @deprecated since Chrome 48. Please use privacy.network.webRTCIPHandlingPolicy. */
    webRTCNonProxiedUdpEnabled: ChromeSetting;
    /** @since Chrome 48. */
    webRTCIPHandlingPolicy: ChromeSetting;
}

export interface Websites {
    thirdPartyCookiesAllowed: ChromeSetting;
    referrersEnabled: ChromeSetting;
    hyperlinkAuditingEnabled: ChromeSetting;
    /** @since Chrome 21. Available on Windows and ChromeOS only. */
    protectedContentEnabled: ChromeSetting;
    /** @since Chrome 65. */
    doNotTrackEnabled: ChromeSetting;
}

export var services: Services;
export var network: Network;
export var websites: Websites;
