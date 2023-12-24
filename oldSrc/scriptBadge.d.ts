import { Event } from './events';
import { Tab } from './tabs';

export interface GetPopupDetails {
    tabId: number;
}

export interface AttentionDetails {
    tabId: number;
}

export interface SetPopupDetails {
    tabId: number;
    popup: string;
}

export interface ScriptBadgeClickedEvent extends Event<(tab: Tab) => void> {}

export function getPopup(details: GetPopupDetails, callback: Function): void;
export function getAttention(details: AttentionDetails): void;
export function setPopup(details: SetPopupDetails): void;
export var onClicked: ScriptBadgeClickedEvent;
