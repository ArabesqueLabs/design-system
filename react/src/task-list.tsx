import type { ReactNode } from "react";
import { Badge, type BadgeTone } from "./badge.js";
import { cx } from "./util.js";

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
export function TaskList({ tasks, className }: { tasks: Task[]; className?: string }) {
  return (
    <ul className={cx("al-task-list", className)}>
      {tasks.map((t, i) => (
        <li key={i} className="al-task-list__item">
          <span className="al-task-list__name">{t.href ? <a href={t.href}>{t.name}</a> : t.name}</span>
          {t.hint && <span className="al-task-list__hint">{t.hint}</span>}
          <Badge tone={t.tone} className="al-task-list__status">{t.status}</Badge>
        </li>
      ))}
    </ul>
  );
}
