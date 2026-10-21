import type { ReactNode } from "react";
import { type BadgeTone } from "./badge.js";
export interface Task {
    name: ReactNode;
    /** A link to the task, while it can be started. */
    href?: string;
    status: ReactNode;
    /** The status badge's tone: success for done, outline for can't start yet. */
    tone?: BadgeTone;
    /** Why it can't start yet. */
    hint?: ReactNode;
}
/** The parts of a long job, each with its status, done in any order. */
export declare function TaskList({ tasks, className }: {
    tasks: Task[];
    className?: string;
}): import("react").JSX.Element;
