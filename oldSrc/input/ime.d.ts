import { Event } from '../events';
import { ime } from '../input';

export interface KeyboardEvent {
    /**
     * Optional.
     * Whether or not the SHIFT key is pressed.
     */
    shiftKey?: boolean | undefined;
    /**
     * Optional.
     * Whether or not the ALT key is pressed.
     */
    altKey?: boolean | undefined;
    /**
     * Optional.
     * Whether or not the ALTGR key is pressed.
     * @since Chrome 79.
     */
    altgrKey?: boolean | undefined;
    /**
     * Optional.
     * The ID of the request. Use the requestId param from the onKeyEvent event instead.
     * @deprecated since Chrome 79.
     */
    requestId?: string | undefined;
    /** Value of the key being pressed */
    key: string;
    /**
     * Optional.
     * Whether or not the CTRL key is pressed.
     */
    ctrlKey?: boolean | undefined;
    /** One of keyup or keydown. */
    type: string;
    /**
     * Optional.
     * The extension ID of the sender of this keyevent.
     * @since Chrome 34.
     */
    extensionId?: string | undefined;
    /**
     * Optional.
     * Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state.
     * @since Chrome 26.
     */
    code: string;
    /**
     * Optional.
     * The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed.
     * @since Chrome 37.
     */
    keyCode?: number | undefined;
    /**
     * Optional.
     * Whether or not the CAPS_LOCK is enabled.
     * @since Chrome 29.
     */
    capsLock?: boolean | undefined;
}

export type AutoCapitalizeType = 'characters' | 'words' | 'sentences';
export interface InputContext {
    /** This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called. */
    contextID: number;
    /** Type of value this text field edits, (Text, Number, URL, etc) */
    type: string;
    /**
     * Whether the text field wants auto-correct.
     * @since Chrome 40.
     */
    autoCorrect: boolean;
    /**
     * Whether the text field wants auto-complete.
     * @since Chrome 40.
     */
    autoComplete: boolean;
    /**
     * Whether the text field wants spell-check.
     * @since Chrome 40.
     */
    spellCheck: boolean;
    /**
     * The auto-capitalize type of the text field.
     * @since Chrome 69.
     */
    autoCapitalize: AutoCapitalizeType;
    /**
     * Whether text entered into the text field should be used to improve typing suggestions for the user.
     * @since Chrome 68.
     */
    shouldDoLearning: boolean;
}

export interface MenuItem {
    /** String that will be passed to callbacks referencing this MenuItem. */
    id: string;
    /** Optional. Text displayed in the menu for this item. */
    label?: string | undefined;
    /** Optional. The type of menu item. */
    style?: string | undefined;
    /** Optional. Indicates this item is visible. */
    visible?: boolean | undefined;
    /** Indicates this item should be drawn with a check. */
    checked?: boolean | undefined;
    /** Indicates this item is enabled. */
    enabled?: boolean | undefined;
}

export interface ImeParameters {
    /** MenuItems to use. */
    items: MenuItem[];
    /** ID of the engine to use */
    engineID: string;
}

export interface CommitTextParameters {
    /** The text to commit */
    text: string;
    /** ID of the context where the text will be committed */
    contextID: number;
}

export interface CandidateUsage {
    /** The title string of details description. */
    title: string;
    /** The body string of detail description. */
    body: string;
}

export interface CandidateTemplate {
    /** The candidate */
    candidate: string;
    /** The candidate's id */
    id: number;
    /**
     * Optional.
     * The id to add these candidates under
     */
    parentId?: number | undefined;
    /**
     * Optional.
     * Short string displayed to next to the candidate, often the shortcut key or index
     */
    label?: string | undefined;
    /**
     * Optional.
     * Additional text describing the candidate
     */
    annotation?: string | undefined;
    /**
     * Optional.
     * The usage or detail description of word.
     */
    usage?: CandidateUsage | undefined;
}

export interface CandidatesParameters {
    /** ID of the context that owns the candidate window. */
    contextID: number;
    /** List of candidates to show in the candidate window */
    candidates: CandidateTemplate[];
}

export interface CompositionParameterSegment {
    /** Index of the character to start this segment at */
    start: number;
    /** Index of the character to end this segment after. */
    end: number;
    /** The type of the underline to modify this segment. */
    style: string;
}

export interface CompositionParameters {
    /** ID of the context where the composition text will be set */
    contextID: number;
    /** Text to set */
    text: string;
    /** Optional. List of segments and their associated types. */
    segments?: CompositionParameterSegment[] | undefined;
    /** Position in the text of the cursor. */
    cursor: number;
    /** Optional. Position in the text that the selection starts at. */
    selectionStart?: number | undefined;
    /** Optional. Position in the text that the selection ends at. */
    selectionEnd?: number | undefined;
}

export interface MenuItemParameters {
    items: Object[];
    engineId: string;
}

export type AssistiveWindowType = 'undo';
export type AssistiveWindowButton = 'undo' | 'addToDictionary';
export interface AssistiveWindowProperties {
    type: AssistiveWindowType;
    visible: boolean;
    announceString?: string | undefined;
}

export interface CandidateWindowParameterProperties {
    /**
     * Optional.
     * True to show the cursor, false to hide it.
     */
    cursorVisible?: boolean | undefined;
    /**
     * Optional.
     * True if the candidate window should be rendered vertical, false to make it horizontal.
     */
    vertical?: boolean | undefined;
    /**
     * Optional.
     * The number of candidates to display per page.
     */
    pageSize?: number | undefined;
    /**
     * Optional.
     * True to display the auxiliary text, false to hide it.
     */
    auxiliaryTextVisible?: boolean | undefined;
    /**
     * Optional.
     * Text that is shown at the bottom of the candidate window.
     */
    auxiliaryText?: string | undefined;
    /**
     * Optional.
     * True to show the Candidate window, false to hide it.
     */
    visible?: boolean | undefined;
    /**
     * Optional.
     * Where to display the candidate window.
     * @since Chrome 28.
     */
    windowPosition?: string | undefined;
    /**
     * Optional.
     * The index of the current chosen candidate out of total candidates.
     * @since Chrome 84.
     */
    currentCandidateIndex?: number | undefined;
    /**
     * Optional.
     * The total number of candidates for the candidate window.
     * @since Chrome 84.
     */
    totalCandidates?: number | undefined;
}

export interface CandidateWindowParameter {
    /** ID of the engine to set properties on. */
    engineID: string;
    properties: CandidateWindowParameterProperties;
}

export interface ClearCompositionParameters {
    /** ID of the context where the composition will be cleared */
    contextID: number;
}

export interface CursorPositionParameters {
    /** ID of the candidate to select. */
    candidateID: number;
    /** ID of the context that owns the candidate window. */
    contextID: number;
}

export interface SendKeyEventParameters {
    /** ID of the context where the key events will be sent, or zero to send key events to non-input field. */
    contextID: number;
    /** Data on the key event. */
    keyData: KeyboardEvent[];
}

export interface DeleteSurroundingTextParameters {
    /** ID of the engine receiving the event. */
    engineID: string;
    /** ID of the context where the surrounding text will be deleted. */
    contextID: number;
    /** The offset from the caret position where deletion will start. This value can be negative. */
    offset: number;
    /** The number of characters to be deleted */
    length: number;
}

export interface SurroundingTextInfo {
    /** The text around cursor. */
    text: string;
    /** The ending position of the selection. This value indicates caret position if there is no selection. */
    focus: number;
    /** The beginning position of the selection. This value indicates caret position if is no selection. */
    anchor: number;
}

export interface AssistiveWindowButtonClickedDetails {
    /** The ID of the button clicked. */
    buttonID: AssistiveWindowButton;
    /** The type of the assistive window. */
    windowType: AssistiveWindowType;
}

export interface BlurEvent extends Event<(contextID: number) => void> {}

export interface AssistiveWindowButtonClickedEvent
    extends Event<(details: AssistiveWindowButtonClickedDetails) => void> {}

export interface CandidateClickedEvent extends Event<(engineID: string, candidateID: number, button: string) => void> {}

export interface KeyEventEvent extends Event<(engineID: string, keyData: KeyboardEvent, requestId: string) => void> {}

export interface DeactivatedEvent extends Event<(engineID: string) => void> {}

export interface InputContextUpdateEvent extends Event<(context: InputContext) => void> {}

export interface ActivateEvent extends Event<(engineID: string, screen: string) => void> {}

export interface FocusEvent extends Event<(context: InputContext) => void> {}

export interface MenuItemActivatedEvent extends Event<(engineID: string, name: string) => void> {}

export interface SurroundingTextChangedEvent
    extends Event<(engineID: string, surroundingInfo: SurroundingTextInfo) => void> {}

export interface InputResetEvent extends Event<(engineID: string) => void> {}

export function setMenuItems(parameters: ImeParameters, callback?: () => void): void;
export function commitText(parameters: CommitTextParameters, callback?: (success: boolean) => void): void;
export function setCandidates(parameters: CandidatesParameters, callback?: (success: boolean) => void): void;
export function setComposition(parameters: CompositionParameters, callback?: (success: boolean) => void): void;
export function updateMenuItems(parameters: MenuItemParameters, callback?: () => void): void;
export function setAssistiveWindowProperties(
    parameters: {
        contextID: number;
        properties: ime.AssistiveWindowProperties;
    },
    callback?: (success: boolean) => void,
): void;
export function setAssistiveWindowButtonHighlighted(
    parameters: {
        contextID: number;
        buttonID: ime.AssistiveWindowButton;
        windowType: ime.AssistiveWindowType;
        announceString?: string | undefined;
        highlighted: boolean;
    },
    callback?: () => void,
): void;
export function setCandidateWindowProperties(
    parameters: CandidateWindowParameter,
    callback?: (success: boolean) => void,
): void;
export function clearComposition(parameters: ClearCompositionParameters, callback?: (success: boolean) => void): void;
export function setCursorPosition(parameters: CursorPositionParameters, callback?: (success: boolean) => void): void;
export function sendKeyEvents(parameters: SendKeyEventParameters, callback?: () => void): void;
export function hideInputView(): void;
export function deleteSurroundingText(parameters: DeleteSurroundingTextParameters, callback?: () => void): void;
export function keyEventHandled(requestId: string, response: boolean): void;
export var onBlur: BlurEvent;
export var onAssistiveWindowButtonClicked: AssistiveWindowButtonClickedEvent;
export var onCandidateClicked: CandidateClickedEvent;
export var onKeyEvent: KeyEventEvent;
export var onDeactivated: DeactivatedEvent;
export var onInputContextUpdate: InputContextUpdateEvent;
export var onActivate: ActivateEvent;
export var onFocus: FocusEvent;
export var onMenuItemActivated: MenuItemActivatedEvent;
export var onSurroundingTextChanged: SurroundingTextChangedEvent;
export var onReset: InputResetEvent;
