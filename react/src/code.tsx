// Code to read or copy (js/copy.js), in one language or several (tabs,
// js/tabs.js), always left to right; and a command, one line to paste.

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { initCopy } from "../../js/copy.js";
import { highlights, tokenize, type SyntaxKind } from "../../js/highlight.js";
import { initTabs } from "../../js/tabs.js";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

export interface CodeSample {
  id: string;
  /** The tab's name: the language ("TypeScript"). */
  label: ReactNode;
  code: string;
  /** Lines to mark, counted from 1. */
  mark?: number[];
  /** Its language, for syntax colour (js, ts, tsx, html, css, json, sh) and as language-{language} on the <code>. */
  language?: string;
}

export interface CodeBlockProps {
  /** The code, in one language; or samples, for several. */
  code?: string;
  mark?: number[];
  language?: string;
  /** The same code in several languages, one tab each, in place of code. */
  samples?: CodeSample[];
  /** What the tabs choose between ("Language"); needed with samples. */
  label?: string;
  /** In the bar: the file's name, or what the code is. */
  caption?: ReactNode;
  /** A copy button in the bar; on by default. */
  copy?: boolean;
  id?: string;
  className?: string;
}

/** The code's runs (coloured where the language has syntax colour), split into lines. */
function toLines(code: string, language?: string): [SyntaxKind, string][][] {
  const text = code.replace(/\n$/, "");
  const runs: [SyntaxKind, string][] = language && highlights(language) ? tokenize(text, language) : [["", text]];
  const lines: [SyntaxKind, string][][] = [[]];
  for (const [kind, run] of runs) {
    run.split("\n").forEach((part, j) => {
      if (j) lines.push([]);
      if (part) lines[lines.length - 1].push([kind, part]);
    });
  }
  return lines;
}

function Lines({ code, mark, language }: { code: string; mark?: number[]; language?: string }) {
  const lines = toLines(code, language);
  return (
    <pre className="al-code__pre" dir="ltr" tabIndex={0}>
      <code className={language ? `language-${language}` : undefined}>
        {lines.map((line, i) => {
          const Line = mark?.includes(i + 1) ? "mark" : "span";
          return (
            <Fragment key={i}>
              <Line className={cx("al-code__line", Line === "mark" && "al-code__line--mark")}>
                {line.map(([kind, run], j) => (kind ? <span key={j} className={`al-syntax-${kind}`}>{run}</span> : run))}
              </Line>
              {i < lines.length - 1 && "\n"}
            </Fragment>
          );
        })}
      </code>
    </pre>
  );
}

/** Copies its block's code (js/copy.js), then says "Copied". */
function CopyButton() {
  const { labels } = useArabesque();
  return (
    <button type="button" className="al-button al-button--quiet al-button--sm al-code__copy" data-copy="" data-label-copy={labels.copy} data-label-copied={labels.copied} data-label-failed={labels.copyFailed}>
      <Icon name="copy" className="al-code__copy-idle" /><Icon name="check" className="al-code__copy-done" />
      <span data-copy-label="">{labels.copy}</span>
    </button>
  );
}

/** A code sample, with its caption or language tabs, and a copy button. */
export function CodeBlock({ code = "", mark, language, samples, label, caption, copy = true, id, className }: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const base = useStableId(id, "code");
  useEffect(() => {
    if (!ref.current) return;
    initTabs(ref.current);
    initCopy(ref.current);
  }, []);
  const first = samples?.[0]?.id;
  return (
    <div ref={ref} className={cx("al-code", className)} id={id}>
      {(caption || samples || copy) && (
        <div className="al-code__bar">
          {caption && <span className="al-code__caption">{caption}</span>}
          {samples && (
            <div className="al-code__tabs" role="tablist" aria-label={label}>
              {samples.map((s) => (
                <button key={s.id} type="button" className="al-code__tab" role="tab" id={`${base}-${s.id}-tab`} aria-controls={`${base}-${s.id}`} aria-selected={s.id === first} tabIndex={s.id === first ? 0 : -1}>{s.label}</button>
              ))}
            </div>
          )}
          {copy && <CopyButton />}
        </div>
      )}
      {samples
        ? samples.map((s) => (
          <div key={s.id} role="tabpanel" id={`${base}-${s.id}`} aria-labelledby={`${base}-${s.id}-tab`} hidden={s.id !== first}>
            <Lines code={s.code} mark={s.mark} language={s.language} />
          </div>
        ))
        : <Lines code={code} mark={mark} language={language} />}
      {copy && <span className="al-visually-hidden" role="status" data-copy-status="" />}
    </div>
  );
}

export interface CommandProps {
  /** The command, as it's typed. */
  children: string;
  /** A "$" before it, shown but never copied or read out; on by default. */
  prompt?: boolean;
  className?: string;
}

/** One line to paste into a terminal, with its copy button. */
export function Command({ children, prompt = true, className }: CommandProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) initCopy(ref.current); }, []);
  return (
    <div ref={ref} className={cx("al-command", prompt && "al-command--prompt", className)}>
      <code dir="ltr">{children}</code>
      <CopyButton />
      <span className="al-visually-hidden" role="status" data-copy-status="" />
    </div>
  );
}
