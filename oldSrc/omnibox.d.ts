import { Event } from './events';

export interface SuggestResult {
    /** The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry. */
    content: string;
    /** The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. You must escape the five predefined entities to display them as text: stackoverflow.com/a/1091953/89484 */
    description: string;
    /**
     * Whether the suggest result can be deleted by the user.
     * @since Chrome 63.
     */
    deletable?: boolean | undefined;
}

export interface Suggestion {
    /** The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. */
    description: string;
}

export type OnInputEnteredDisposition = 'currentTab' | 'newForegroundTab' | 'newBackgroundTab';
export interface OmniboxInputEnteredEvent
    extends Event<(text: string, disposition: OnInputEnteredDisposition) => void> {}

export interface OmniboxInputChangedEvent
    extends Event<(text: string, suggest: (suggestResults: SuggestResult[]) => void) => void> {}

export interface OmniboxInputStartedEvent extends Event<() => void> {}

export interface OmniboxInputCancelledEvent extends Event<() => void> {}

export interface OmniboxSuggestionDeletedEvent extends Event<(text: string) => void> {}

export function setDefaultSuggestion(suggestion: Suggestion): void;
export var onInputEntered: OmniboxInputEnteredEvent;
export var onInputChanged: OmniboxInputChangedEvent;
export var onInputStarted: OmniboxInputStartedEvent;
export var onInputCancelled: OmniboxInputCancelledEvent;
export var onDeleteSuggestion: OmniboxSuggestionDeletedEvent;
