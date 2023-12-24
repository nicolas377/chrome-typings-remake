import { Event } from './events';

export function install(
    url: string,
    successCallback?: Function,
    failureCallback?: (error: string, errorCode?: string) => void,
): void;
export function install(successCallback: Function, failureCallback?: (error: string, errorCode?: string) => void): void;
export function install(failureCallback?: (error: string, errorCode?: string) => void): void;
export interface InstallationStageEvent extends Event<(stage: string) => void> {}

export interface DownloadProgressEvent extends Event<(percentDownloaded: number) => void> {}

export var onInstallStageChanged: InstallationStageEvent;
export var onDownloadProgress: DownloadProgressEvent;
