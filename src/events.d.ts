export interface UrlFilter {
    /** Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.  */
    schemes?: string[] | undefined;
    /**
     * Optional.
     * Since Chrome 23.
     * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
     */
    urlMatches?: string | undefined;
    /** Optional. Matches if the path segment of the URL contains a specified string.  */
    pathContains?: string | undefined;
    /** Optional. Matches if the host name of the URL ends with a specified string.  */
    hostSuffix?: string | undefined;
    /** Optional. Matches if the host name of the URL starts with a specified string.  */
    hostPrefix?: string | undefined;
    /** Optional. Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.  */
    hostContains?: string | undefined;
    /** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
    urlContains?: string | undefined;
    /** Optional. Matches if the query segment of the URL ends with a specified string.  */
    querySuffix?: string | undefined;
    /** Optional. Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
    urlPrefix?: string | undefined;
    /** Optional. Matches if the host name of the URL is equal to a specified string.  */
    hostEquals?: string | undefined;
    /** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
    urlEquals?: string | undefined;
    /** Optional. Matches if the query segment of the URL contains a specified string.  */
    queryContains?: string | undefined;
    /** Optional. Matches if the path segment of the URL starts with a specified string.  */
    pathPrefix?: string | undefined;
    /** Optional. Matches if the path segment of the URL is equal to a specified string.  */
    pathEquals?: string | undefined;
    /** Optional. Matches if the path segment of the URL ends with a specified string.  */
    pathSuffix?: string | undefined;
    /** Optional. Matches if the query segment of the URL is equal to a specified string.  */
    queryEquals?: string | undefined;
    /** Optional. Matches if the query segment of the URL starts with a specified string.  */
    queryPrefix?: string | undefined;
    /** Optional. Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
    urlSuffix?: string | undefined;
    /** Optional. Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.  */
    ports?: (number | number[])[] | undefined;
    /**
     * Optional.
     * Since Chrome 28.
     * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
     */
    originAndPathMatches?: string | undefined;
}

export interface BaseEvent<T extends Function> {
    addListener(callback: T, filter?: webRequest.RequestFilter): void;
    /**
     * Returns currently registered rules.
     * @param callback Called with registered rules.
     * The callback parameter should be a function that looks like this:
     * function(array of Rule rules) {...};
     * Parameter rules: Rules that were registered, the optional parameters are filled with values.
     */
    getRules(callback: (rules: Rule[]) => void): void;
    /**
     * Returns currently registered rules.
     * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
     * @param callback Called with registered rules.
     * The callback parameter should be a function that looks like this:
     * function(array of Rule rules) {...};
     * Parameter rules: Rules that were registered, the optional parameters are filled with values.
     */
    getRules(ruleIdentifiers: string[], callback: (rules: Rule[]) => void): void;
    /**
     * @param callback Listener whose registration status shall be tested.
     */
    hasListener(callback: T): boolean;
    /**
     * Unregisters currently registered rules.
     * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
     * @param callback Called when rules were unregistered.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    removeRules(ruleIdentifiers?: string[], callback?: () => void): void;
    /**
     * Unregisters currently registered rules.
     * @param callback Called when rules were unregistered.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    removeRules(callback?: () => void): void;
    /**
     * Registers rules to handle events.
     * @param rules Rules to be registered. These do not replace previously registered rules.
     * @param callback Called with registered rules.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function(array of Rule rules) {...};
     * Parameter rules: Rules that were registered, the optional parameters are filled with values.
     */
    addRules(rules: Rule[], callback?: (rules: Rule[]) => void): void;
    /**
     * Deregisters an event listener callback from an event.
     * @param callback Listener that shall be unregistered.
     * The callback parameter should be a function that looks like this:
     * function() {...};
     */
    removeListener(callback: T): void;
    hasListeners(): boolean;
}

interface Event<T extends Function> extends BaseEvent<T> {
    /**
     * Registers an event listener callback to an event.
     * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
     * The callback parameter should be a function that looks like this:
     * function() {...};
     */
    addListener(callback: T): void;
}

export interface EventWithRequiredFilterInAddListener<T extends Function> extends BaseEvent<T> {
    addListener(callback: T, filter: webRequest.RequestFilter): void;
}

export interface Rule {
    /** Optional. Optional priority of this rule. Defaults to 100.  */
    priority?: number | undefined;
    /** List of conditions that can trigger the actions. */
    conditions: any[];
    /** Optional. Optional identifier that allows referencing this rule.  */
    id?: string | undefined;
    /** List of actions that are triggered if one of the condtions is fulfilled. */
    actions: any[];
    /**
     * Optional.
     * Since Chrome 28.
     * Tags can be used to annotate rules and perform operations on sets of rules.
     */
    tags?: string[] | undefined;
}
