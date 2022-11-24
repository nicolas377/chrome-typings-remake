import { Event } from '../events';

export interface Resource {
    /** The URL of the resource. */
    url: string;
    /**
     * Gets the content of the resource.
     * @param callback A function that receives resource content when the request completes.
     * The callback parameter should be a function that looks like this:
     * function(string content, string encoding) {...};
     * Parameter content: Content of the resource (potentially encoded).
     * Parameter encoding: Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported.
     */
    getContent(callback: (content: string, encoding: string) => void): void;
    /**
     * Sets the content of the resource.
     * @param content New content of the resource. Only resources with the text type are currently supported.
     * @param commit True if the user has finished editing the resource, and the new content of the resource should be persisted; false if this is a minor change sent in progress of the user editing the resource.
     * @param callback A function called upon request completion.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function(object error) {...};
     * Optional parameter error: Set to undefined if the resource content was set successfully; describes error otherwise.
     */
    setContent(content: string, commit: boolean, callback?: (error: Object) => void): void;
}

export interface ReloadOptions {
    /** Optional. If specified, the string will override the value of the User-Agent HTTP header that's sent while loading the resources of the inspected page. The string will also override the value of the navigator.userAgent property that's returned to any scripts that are running within the inspected page.  */
    userAgent?: string | undefined;
    /** Optional. When true, the loader will ignore the cache for all inspected page resources loaded before the load event is fired. The effect is similar to pressing Ctrl+Shift+R in the inspected window or within the Developer Tools window.  */
    ignoreCache?: boolean | undefined;
    /** Optional. If specified, the script will be injected into every frame of the inspected page immediately upon load, before any of the frame's scripts. The script will not be injected after subsequent reloads—for example, if the user presses Ctrl+R.  */
    injectedScript?: string | undefined;
    /**
     * Optional.
     * If specified, this script evaluates into a function that accepts three string arguments: the source to preprocess, the URL of the source, and a function name if the source is an DOM event handler. The preprocessorerScript function should return a string to be compiled by Chrome in place of the input source. In the case that the source is a DOM event handler, the returned source must compile to a single JS function.
     * @deprecated Deprecated since Chrome 41. Please avoid using this parameter, it will be removed soon.
     */
    preprocessorScript?: string | undefined;
}

export interface EvaluationExceptionInfo {
    /** Set if the error occurred on the DevTools side before the expression is evaluated. */
    isError: boolean;
    /** Set if the error occurred on the DevTools side before the expression is evaluated. */
    code: string;
    /** Set if the error occurred on the DevTools side before the expression is evaluated. */
    description: string;
    /** Set if the error occurred on the DevTools side before the expression is evaluated, contains the array of the values that may be substituted into the description string to provide more information about the cause of the error. */
    details: any[];
    /** Set if the evaluated code produces an unhandled exception. */
    isException: boolean;
    /** Set if the evaluated code produces an unhandled exception. */
    value: string;
}

export interface ResourceAddedEvent extends Event<(resource: Resource) => void> {}

export interface ResourceContentCommittedEvent extends Event<(resource: Resource, content: string) => void> {}

export var tabId: number;
export function reload(reloadOptions?: ReloadOptions): void;
export function eval<T>(
    expression: string,
    callback?: (result: T, exceptionInfo: EvaluationExceptionInfo) => void,
): void;
export function eval<T>(
    expression: string,
    options?: EvalOptions,
    callback?: (result: T, exceptionInfo: EvaluationExceptionInfo) => void,
): void;
export function getResources(callback: (resources: Resource[]) => void): void;
export var onResourceAdded: ResourceAddedEvent;
export var onResourceContentCommitted: ResourceContentCommittedEvent;
export interface EvalOptions {
    /** If specified, the expression is evaluated on the iframe whose URL matches the one specified. By default, the expression is evaluated in the top frame of the inspected page. */
    frameURL?: string | undefined;
    /** Evaluate the expression in the context of the content script of the calling extension, provided that the content script is already injected into the inspected page. If not, the expression is not evaluated and the callback is invoked with the exception parameter set to an object that has the isError field set to true and the code field set to E_NOTFOUND. */
    useContentScriptContext?: boolean | undefined;
    /** Evaluate the expression in the context of a content script of an extension that matches the specified origin. If given, contextSecurityOrigin overrides the 'true' setting on userContentScriptContext. */
    contextSecurityOrigin?: string | undefined;
}
