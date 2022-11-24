import { Event } from './events';
import { Tab } from './tabs';

export interface Command {
    /** Optional. The name of the Extension Command  */
    name?: string | undefined;
    /** Optional. The Extension Command description  */
    description?: string | undefined;
    /** Optional. The shortcut active for this command, or blank if not active.  */
    shortcut?: string | undefined;
}

export interface CommandEvent extends Event<(command: string, tab: Tab) => void> {}

export function getAll(): Promise<Command[]>;
export function getAll(callback: (commands: Command[]) => void): void;
export var onCommand: CommandEvent;
