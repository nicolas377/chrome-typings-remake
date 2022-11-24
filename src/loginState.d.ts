import { Event } from './events';

export interface SessionStateChangedEvent extends Event<(sessionState: SessionState) => void> {}

export type ProfileType = 'SIGNIN_PROFILE' | 'USER_PROFILE';
export type SessionState = 'UNKNOWN' | 'IN_OOBE_SCREEN' | 'IN_LOGIN_SCREEN' | 'IN_SESSION' | 'IN_LOCK_SCREEN';
export function getProfileType(callback: (profileType: ProfileType) => void): void;
export function getSessionState(callback: (sessionState: SessionState) => void): void;
export const onSessionStateChanged: SessionStateChangedEvent;
