# Principles

What every Arabesque Labs interface holds to. When a rule elsewhere in these
docs seems to conflict with one of these, these win; when you need an
exception, write down why next to the code.

1. **Accessible by default.** WCAG 2.2 AA is the floor, not the goal. Every
   control has a visible label, a visible focus, a 24px target at least, and
   works from the keyboard. Nothing relies on colour alone.
2. **Bidirectional from the start.** English and Arabic, left to right and
   right to left. Use logical properties (`inline-start`, not `left`), isolate
   numbers, codes and emails, and test both directions before calling a change done.
3. **Semantic roles, not raw values.** Components use role tokens
   (`--al-color-text`, `--al-color-danger`), never primitives or hex values, so
   themes, modes and contrast stay correct in one place.
4. **Say the consequence.** Buttons name what they do ("Save name", not "OK").
   Before an action, say what it will touch; during it, show it's working;
   after it, say what happened.
5. **Fewest steps.** Ask only what's needed, in the order people think of it.
   Don't make people confirm what they can undo.
6. **Reversible where possible.** Do reversible actions at once, with Undo.
   Ask first only for what can't be undone, and say why.
7. **Never lose work.** Keep what was typed through errors, failed saves,
   language switches and dialogs closing.
8. **Honest states.** Show "Saved" only when the current value is saved; mark
   a figure as stale while it's worked out again; never show success before it's true.

## Scope

This system covers tokens, CSS components, optional JavaScript helpers and
the patterns in [patterns.md](patterns.md). It doesn't cover product copy,
pricing, legal text or business rules; those come from the product.
