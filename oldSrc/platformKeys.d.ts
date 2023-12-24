export interface Match {
    /** The DER encoding of a X.509 certificate. */
    certificate: ArrayBuffer;
    /** The  KeyAlgorithm of the certified key. This contains algorithm parameters that are inherent to the key of the certificate (e.g. the key length). Other parameters like the hash function used by the sign function are not included. */
    keyAlgorithm: KeyAlgorithm;
}

export interface ClientCertificateSelectRequestDetails {
    /** This field is a list of the types of certificates requested, sorted in order of the server's preference. Only certificates of a type contained in this list will be retrieved. If certificateTypes is the empty list, however, certificates of any type will be returned. */
    certificateTypes: string[];
    /** List of distinguished names of certificate authorities allowed by the server. Each entry must be a DER-encoded X.509 DistinguishedName. */
    certificateAuthorities: ArrayBuffer[];
}

export interface ClientCertificateSelectDetails {
    /** Only certificates that match this request will be returned. */
    request: ClientCertificateSelectRequestDetails;
    /**
     * Optional.
     * If given, the selectClientCertificates operates on this list. Otherwise, obtains the list of all certificates from the platform's certificate stores that are available to this extensions. Entries that the extension doesn't have permission for or which doesn't match the request, are removed.
     */
    clientCerts?: ArrayBuffer[] | undefined;
    /** If true, the filtered list is presented to the user to manually select a certificate and thereby granting the extension access to the certificate(s) and key(s). Only the selected certificate(s) will be returned. If is false, the list is reduced to all certificates that the extension has been granted access to (automatically or manually). */
    interactive: boolean;
}

export interface ServerCertificateVerificationDetails {
    /** Each chain entry must be the DER encoding of a X.509 certificate, the first entry must be the server certificate and each entry must certify the entry preceding it. */
    serverCertificateChain: ArrayBuffer[];
    /** The hostname of the server to verify the certificate for, e.g. the server that presented the serverCertificateChain. */
    hostname: string;
}

export interface ServerCertificateVerificationResult {
    /** The result of the trust verification: true if trust for the given verification details could be established and false if trust is rejected for any reason. */
    trusted: boolean;
    /**
     * If the trust verification failed, this array contains the errors reported by the underlying network layer. Otherwise, this array is empty.
     * Note: This list is meant for debugging only and may not contain all relevant errors. The errors returned may change in future revisions of this API, and are not guaranteed to be forwards or backwards compatible.
     */
    debug_errors: string[];
}

export function selectClientCertificates(
    details: ClientCertificateSelectDetails,
    callback: (matches: Match[]) => void,
): void;
export function getKeyPair(
    certificate: ArrayBuffer,
    parameters: Object,
    callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void,
): void;
export function getKeyPairBySpki(
    publicKeySpkiDer: ArrayBuffer,
    parameters: Object,
    callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void,
): void;
export function subtleCrypto(): SubtleCrypto;
export function verifyTLSServerCertificate(
    details: ServerCertificateVerificationDetails,
    callback: (result: ServerCertificateVerificationResult) => void,
): void;
