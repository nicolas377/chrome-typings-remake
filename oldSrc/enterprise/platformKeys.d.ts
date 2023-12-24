export interface Token {
    /**
     * Uniquely identifies this Token.
     * Static IDs are "user" and "system", referring to the platform's user-specific and the system-wide hardware token, respectively. Any other tokens (with other identifiers) might be returned by enterprise.platformKeys.getTokens.
     */
    id: string;
    /**
     * Implements the WebCrypto's SubtleCrypto interface. The cryptographic operations, including key generation, are hardware-backed.
     * Only non-extractable RSASSA-PKCS1-V1_5 keys with modulusLength up to 2048 and ECDSA with namedCurve P-256 can be generated. Each key can be used for signing data at most once.
     * Keys generated on a specific Token cannot be used with any other Tokens, nor can they be used with window.crypto.subtle. Equally, Key objects created with window.crypto.subtle cannot be used with this interface.
     */
    subtleCrypto: SubtleCrypto;
    /**
     * Implements the WebCrypto's SubtleCrypto interface. The cryptographic operations, including key generation, are software-backed.
     * Protection of the keys, and thus implementation of the non-extractable property, is done in software, so the keys are less protected than hardware-backed keys.
     * Only non-extractable RSASSA-PKCS1-V1_5 keys with modulusLength up to 2048 can be generated. Each key can be used for signing data at most once.
     * Keys generated on a specific Token cannot be used with any other Tokens, nor can they be used with window.crypto.subtle. Equally, Key objects created with window.crypto.subtle cannot be used with this interface.
     * @since Chrome 97.
     */
    softwareBackedSubtleCrypto: SubtleCrypto;
}

export function getTokens(callback: (tokens: Token[]) => void): void;
export function getCertificates(tokenId: string, callback: (certificates: ArrayBuffer[]) => void): void;
export function importCertificate(tokenId: string, certificate: ArrayBuffer, callback?: () => void): void;
export function removeCertificate(tokenId: string, certificate: ArrayBuffer, callback?: () => void): void;
export function challengeMachineKey(
    challenge: ArrayBuffer,
    registerKey: boolean,
    callback: (response: ArrayBuffer) => void,
): void;
export function challengeMachineKey(challenge: ArrayBuffer, callback: (response: ArrayBuffer) => void): void;
export function challengeUserKey(
    challenge: ArrayBuffer,
    registerKey: boolean,
    callback: (response: ArrayBuffer) => void,
): void;
