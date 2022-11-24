import { Event } from '../events';
import { Window } from '../windows';
import { inspectedWindow } from '../devtools';

export interface PanelShownEvent extends Event<(window: Window) => void> {}

export interface PanelHiddenEvent extends Event<() => void> {}

export interface PanelSearchEvent extends Event<(action: string, queryString?: string) => void> {}

export interface ExtensionPanel {
    /**
     * Appends a button to the status bar of the panel.
     * @param iconPath Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed.
     * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
     * @param disabled Whether the button is disabled.
     */
    createStatusBarButton(iconPath: string, tooltipText: string, disabled: boolean): Button;
    /** Fired when the user switches to the panel. */
    onShown: PanelShownEvent;
    /** Fired when the user switches away from the panel. */
    onHidden: PanelHiddenEvent;
    /** Fired upon a search action (start of a new search, search result navigation, or search being canceled). */
    onSearch: PanelSearchEvent;
}

export interface ButtonClickedEvent extends Event<() => void> {}

export interface Button {
    /**
     * Updates the attributes of the button. If some of the arguments are omitted or null, the corresponding attributes are not updated.
     * @param iconPath Path to the new icon of the button.
     * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
     * @param disabled Whether the button is disabled.
     */
    update(iconPath?: string | null, tooltipText?: string | null, disabled?: boolean | null): void;
    /** Fired when the button is clicked. */
    onClicked: ButtonClickedEvent;
}

export interface SelectionChangedEvent extends Event<() => void> {}

export interface ElementsPanel {
    /**
     * Creates a pane within panel's sidebar.
     * @param title Text that is displayed in sidebar caption.
     * @param callback A callback invoked when the sidebar is created.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function( ExtensionSidebarPane result) {...};
     * Parameter result: An ExtensionSidebarPane object for created sidebar pane.
     */
    createSidebarPane(title: string, callback?: (result: ExtensionSidebarPane) => void): void;
    /** Fired when an object is selected in the panel. */
    onSelectionChanged: SelectionChangedEvent;
}

export interface SourcesPanel {
    /**
     * Creates a pane within panel's sidebar.
     * @param title Text that is displayed in sidebar caption.
     * @param callback A callback invoked when the sidebar is created.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function( ExtensionSidebarPane result) {...};
     * Parameter result: An ExtensionSidebarPane object for created sidebar pane.
     */
    createSidebarPane(title: string, callback?: (result: ExtensionSidebarPane) => void): void;
    /** Fired when an object is selected in the panel. */
    onSelectionChanged: SelectionChangedEvent;
}

export interface ExtensionSidebarPaneShownEvent extends Event<(window: Window) => void> {}

export interface ExtensionSidebarPaneHiddenEvent extends Event<() => void> {}

export interface ExtensionSidebarPane {
    /**
     * Sets the height of the sidebar.
     * @param height A CSS-like size specification, such as '100px' or '12ex'.
     */
    setHeight(height: string): void;
    /**
     * Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.
     * @param expression An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.
     * @param rootTitle An optional title for the root of the expression tree.
     * @param callback A callback invoked after the sidebar pane is updated with the expression evaluation results.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    setExpression(expression: string, rootTitle?: string, callback?: () => void): void;
    /**
     * Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.
     * @param expression An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.
     * @param callback A callback invoked after the sidebar pane is updated with the expression evaluation results.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    setExpression(expression: string, callback?: () => void): void;
    /**
     * Sets a JSON-compliant object to be displayed in the sidebar pane.
     * @param jsonObject An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).
     * @param rootTitle An optional title for the root of the expression tree.
     * @param callback A callback invoked after the sidebar is updated with the object.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    setObject(jsonObject: Object, rootTitle?: string, callback?: () => void): void;
    /**
     * Sets a JSON-compliant object to be displayed in the sidebar pane.
     * @param jsonObject An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).
     * @param callback A callback invoked after the sidebar is updated with the object.
     * If you specify the callback parameter, it should be a function that looks like this:
     * function() {...};
     */
    setObject(jsonObject: Object, callback?: () => void): void;
    /**
     * Sets an HTML page to be displayed in the sidebar pane.
     * @param path Relative path of an extension page to display within the sidebar.
     */
    setPage(path: string): void;
    /** Fired when the sidebar pane becomes visible as a result of user switching to the panel that hosts it. */
    onShown: ExtensionSidebarPaneShownEvent;
    /** Fired when the sidebar pane becomes hidden as a result of the user switching away from the panel that hosts the sidebar pane. */
    onHidden: ExtensionSidebarPaneHiddenEvent;
}

export var elements: ElementsPanel;
export var sources: SourcesPanel;
export function create(
    title: string,
    iconPath: string,
    pagePath: string,
    callback?: (panel: ExtensionPanel) => void,
): void;
export function setOpenResourceHandler(callback?: (resource: inspectedWindow.Resource) => void): void;
export function openResource(url: string, lineNumber: number, callback: () => void): void;
export var themeName: 'default' | 'dark';
