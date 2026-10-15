// A badge is a short status beside something; a tag is a label someone
// gave a thing, removable.

import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "./icon.js";
import { fill, useArabesque } from "./settings.js";
import type { Tint } from "./tint.js";
import { cx } from "./util.js";

export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info" | "outline";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  tone?: BadgeTone;
  /** A count ("3"), with what it counts for screen readers ("unread"). */
  count?: boolean;
  /** A soft colour of its own (a tint) instead of a tone. */
  tint?: Tint;
}

export function Badge({ tone = "neutral", count, tint, className, ...rest }: BadgeProps) {
  return <span className={cx("al-badge", tone !== "neutral" && `al-badge--${tone}`, count && "al-badge--count", className)} data-tint={tint} {...rest} />;
}

export interface TagProps {
  children: string;
  /** Its colour: a chart series colour or a tint. */
  color?: string;
  tint?: Tint;
  /** A Remove button, named "Remove tag …". */
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, color, tint, onRemove, className }: TagProps) {
  const { labels } = useArabesque();
  return (
    <span className={cx("al-tag", className)} data-tint={tint} style={color ? ({ "--al-tag-color": color } as Record<string, string>) : undefined}>
      {children}
      {onRemove && <button type="button" className="al-tag__remove" aria-label={fill(labels.removeTag, { name: children })} onClick={onRemove}><Icon name="close" size="sm" /></button>}
    </span>
  );
}
