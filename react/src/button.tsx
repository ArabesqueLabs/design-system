import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./icon.js";
import { useTooltips } from "./tooltip.js";
import { cx } from "./util.js";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger" | "danger-primary";

interface Common {
  /** secondary (the default) is outlined; primary is the one main action; danger destroys. */
  variant?: ButtonVariant;
  size?: "sm";
  /** An icon before the text; with no children, an icon button named by `label`. */
  icon?: IconName;
  /** An icon after the text (a chevron for a menu, an arrow onwards). */
  iconEnd?: IconName;
  /** The name of an icon button, said by screen readers and shown as its tooltip. */
  label?: string;
  /** Busy: a spinner, and aria-busy, while the action runs. */
  busy?: boolean;
  children?: ReactNode;
}
type AsButton = Common & ComponentProps<"button"> & { href?: undefined };
type AsLink = Common & ComponentProps<"a"> & { href: string };
export type ButtonProps = AsButton | AsLink;

const variantClass = (v: ButtonVariant | undefined) =>
  v === "primary" ? "al-button--primary" : v === "quiet" ? "al-button--quiet" : v === "danger" ? "al-button--danger" : v === "danger-primary" ? "al-button--danger al-button--primary" : undefined;

/** An action: a <button>, or an <a> when it has an href. A `ref` reaches the element. */
export function Button(props: ButtonProps) {
  const { variant, size, icon, iconEnd, label, busy, className, children, ...rest } = props;
  const iconOnly = !!icon && children == null;
  useTooltips(iconOnly);
  const classes = cx("al-button", variantClass(variant), size === "sm" && "al-button--sm", iconOnly && "al-button--icon", className);
  const inner = (
    <>
      {icon && <Icon name={icon} />}
      {children}
      {iconEnd && <Icon name={iconEnd} />}
    </>
  );
  const named = iconOnly ? { "aria-label": label, "data-al-tip": label } : {};
  if (rest.href !== undefined) {
    return <a className={classes} {...named} {...(rest as ComponentProps<"a">)}>{inner}</a>;
  }
  const { type = "button", ...button } = rest as ComponentProps<"button">;
  return <button type={type} className={classes} aria-busy={busy || undefined} {...named} {...button}>{inner}</button>;
}
