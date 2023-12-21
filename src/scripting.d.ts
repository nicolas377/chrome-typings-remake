export type StyleOrigin = 'AUTHOR' | 'USER';
export type ExecutionWorld = 'ISOLATED' | 'MAIN';
export interface InjectionResult<T> {
    /* The frame associated with the injection. */
    frameId: number;
    /* The result of the script execution. */
    result: T;
}

export interface InjectionTarget {
    /* Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if frameIds is specified. */
    allFrames?: boolean | undefined;
    /* The IDs of specific frames to inject into. */
    frameIds?: number[] | undefined;
    /* The ID of the tab into which to inject. */
    tabId: number;
}

export interface CSSInjection {
    /* A string containing the CSS to inject. Exactly one of files and css must be specified. */
    css?: string | undefined;
    /* The path of the CSS files to inject, relative to the extension's root directory. NOTE: Currently a maximum of one file is supported. Exactly one of files and css must be specified. */
    files?: string[] | undefined;
    /* The style origin for the injection. Defaults to 'AUTHOR'. */
    origin?: StyleOrigin | undefined;
    /* Details specifying the target into which to insert the CSS. */
    target: InjectionTarget;
}

export type ScriptInjection<Args extends any[], Result> = {
    /* Details specifying the target into which to inject the script. */
    target: InjectionTarget;
    /* The JavaScript world for a script to execute within. */
    world?: ExecutionWorld;
    /* Whether the injection should be triggered in the target as soon as possible. Note that this is not a guarantee that injection will occur prior to page load, as the page may have already loaded by the time the script reaches the target. */
    injectImmediately?: boolean;
} & (
    | {
          /* The path of the JS files to inject, relative to the extension's root directory. NOTE: Currently a maximum of one file is supported. Exactly one of files and function must be specified. */
          files: string[];
      }
    | (
          | {
                /* A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of files and function must be specified. */
                func: () => Result;
            }
          | {
                /* A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of files and function must be specified. */
                func: (...args: Args) => Result;
                /* The arguments to carry into a provided function. This is only valid if the func parameter is specified. These arguments must be JSON-serializable. */
                args: Args;
            }
      )
);
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
interface RegisteredContentScript {
    id: string;
    allFrames?: boolean;
    matchOriginAsFallback?: boolean;
    css?: string[];
    excludeMatches?: string[];
    js?: string[];
    matches?: string[];
    persistAcrossSessions?: boolean;
    runAt?: 'document_start' | 'document_end' | 'document_idle';
    world?: ExecutionWorld;
}

interface ContentScriptFilter {
    ids?: string[];
    css?: string;
    files?: string[];
    origin?: StyleOrigin;
    target?: InjectionTarget;
}

export function executeScript<Args extends any[], Result>(
    injection: ScriptInjection<Args, Result>,
): Promise<Array<InjectionResult<Awaited<Result>>>>;
export function executeScript<Args extends any[], Result>(
    injection: ScriptInjection<Args, Result>,
    callback: (results: Array<InjectionResult<Awaited<Result>>>) => void,
): void;
export function insertCSS(injection: CSSInjection): Promise<void>;
export function insertCSS(injection: CSSInjection, callback: () => void): void;
export function removeCSS(injection: CSSInjection): Promise<void>;
export function removeCSS(injection: CSSInjection, callback: () => void): void;
export function registerContentScripts(scripts: RegisteredContentScript[]): Promise<void>;
export function registerContentScripts(scripts: RegisteredContentScript[], callback: () => void): void;
export function unregisterContentScripts(filter?: ContentScriptFilter): Promise<void>;
export function unregisterContentScripts(callback: () => void): void;
export function unregisterContentScripts(filter: ContentScriptFilter, callback: () => void): void;
export function getRegisteredContentScripts(filter?: ContentScriptFilter): Promise<RegisteredContentScript[]>;
export function getRegisteredContentScripts(callback: (scripts: RegisteredContentScript[]) => void): void;
export function getRegisteredContentScripts(
    filter: ContentScriptFilter,
    callback: (scripts: RegisteredContentScript[]) => void,
): void;
export function updateContentScripts(scripts: RegisteredContentScript[]): Promise<void>;
export function updateContentScripts(scripts: RegisteredContentScript[], callback: () => void): void;
