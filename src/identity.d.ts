import { Event } from './events';

export interface AccountInfo {
    /** A unique identifier for the account. This ID will not change for the lifetime of the account. */
    id: string;
}

export enum AccountStatus {
    SYNC = 'SYNC',
    ANY = 'ANY',
}

export interface ProfileDetails {
    /**
     * Optional.
     * A status of the primary account signed into a profile whose ProfileUserInfo should be returned. Defaults to SYNC account status.
     */
    accountStatus?: AccountStatus | undefined;
}

export interface TokenDetails {
    /**
     * Optional.
     * Fetching a token may require the user to sign-in to Chrome, or approve the application's requested scopes. If the interactive flag is true, getAuthToken will prompt the user as necessary. When the flag is false or omitted, getAuthToken will return failure any time a prompt would be required.
     */
    interactive?: boolean | undefined;
    /**
     * Optional.
     * The account ID whose token should be returned. If not specified, the primary account for the profile will be used.
     * account is only supported when the "enable-new-profile-management" flag is set.
     * @since Chrome 37.
     */
    account?: AccountInfo | undefined;
    /**
     * Optional.
     * A list of OAuth2 scopes to request.
     * When the scopes field is present, it overrides the list of scopes specified in manifest.json.
     * @since Chrome 37.
     */
    scopes?: string[] | undefined;
}

export interface UserInfo {
    /** An email address for the user account signed into the current profile. Empty if the user is not signed in or the identity.email manifest permission is not specified. */
    email: string;
    /** A unique identifier for the account. This ID will not change for the lifetime of the account. Empty if the user is not signed in or (in M41+) the identity.email manifest permission is not specified. */
    id: string;
}

export interface TokenInformation {
    /** The specific token that should be removed from the cache. */
    token: string;
}

export interface WebAuthFlowOptions {
    /** The URL that initiates the auth flow. */
    url: string;
    /**
     * Optional.
     * Whether to launch auth flow in interactive mode.
     * Since some auth flows may immediately redirect to a result URL, launchWebAuthFlow hides its web view until the first navigation either redirects to the final URL, or finishes loading a page meant to be displayed.
     * If the interactive flag is true, the window will be displayed when a page load completes. If the flag is false or omitted, launchWebAuthFlow will return with an error if the initial navigation does not complete the flow.
     */
    interactive?: boolean | undefined;
}

export interface SignInChangeEvent extends Event<(account: AccountInfo, signedIn: boolean) => void> {}

export function clearAllCachedAuthTokens(callback: () => void): void;
export function getAccounts(callback: (accounts: AccountInfo[]) => void): void;
export function getAuthToken(details: TokenDetails, callback?: (token: string) => void): void;
export function getProfileUserInfo(callback: (userInfo: UserInfo) => void): void;
export function getProfileUserInfo(details: ProfileDetails, callback: (userInfo: UserInfo) => void): void;
export function removeCachedAuthToken(details: TokenInformation, callback?: () => void): void;
export function launchWebAuthFlow(details: WebAuthFlowOptions, callback: (responseUrl?: string) => void): void;
export function launchWebAuthFlow(details: WebAuthFlowOptions): Promise<string | undefined>;
export function getRedirectURL(path?: string): string;
export var onSignInChanged: SignInChangeEvent;
