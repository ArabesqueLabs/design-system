// Every component, working: one demo each, written in English. Each page
// shows its demo twice, in English and in Arabic (right to left); `t`
// translates through the showcase's catalogue (showcase-ar.js) and this
// folder's own (ar.ts). The build fails on a sentence with no Arabic.

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { onShortcut, setShortcutsEnabled, shortcutsEnabled } from "../../js/keys.js";
import { forgetDismissal } from "../../js/announcement.js";
import { ColourDemo, MotionDemo, SpaceDemo, TintsDemo, TypeDemo } from "./foundations.js";
import { formatMoney, formatNumber, formatPercent } from "../../js/format.js";
import {
  Affix, AffixText, Announcement, Avatar, BackLink, BackToTop, Badge, CallToAction, CodeBlock, Command, DisclosureGroup, FeatureTabs, LogoWordmark, Logos, OnThisPage, Quote, Stats, Breadcrumbs, BulkBar, BulletChart, Button, Card, CharacterCount, ChartFigure, Checkbox,
  Choices, ColumnChart, Confirmation, LanguageLink, Section, Star, TextLink, iconNames, ConstructionFigure, DateExample, DateInput, DatePicker, Dialog, Disclosure, EmptyState, ErrorSummary,
  Field, Fieldset, Footer, Grid, Hero, HeroCaption, Highlight, Icon, Input, Lockup, Mark, Menu, Notice, PageHead, Panel, Pattern, PhaseBanner,
  Progress, Radio, RollbackNote, SaveState, Search, Segmented, Select, Shell, Shortcuts, SideEffect, SiteHeader, Skeleton, Spinner, SplitBar,
  Stack, Cluster, Stat, Steps, StaleNote, Stale, SummaryList, Switch, Table, Tabs, Tag, TaskList, useArabesque, useToast, type IconName, type SaveStatus, type Tint,
} from "../../react/src/index.js";

export type T = (english: string) => string;
export interface DemoProps { t: T }

export interface Demo {
  id: string;
  title: string;
  group: string;
  /** What it is, in a sentence. */
  lead: string;
  /** Its spec, from the repository's root. */
  spec: string;
  Demo: (props: DemoProps) => ReactNode;
}

const useDigits = () => {
  const { lang, numerals } = useArabesque();
  return { lang, numerals, money: (v: number) => formatMoney(v, "GBP", { lang, numerals }), n: (v: number) => formatNumber(v, { lang, numerals }) };
};

// ---- actions --------------------------------------------------------------------------------

function ButtonDemo({ t }: DemoProps) {
  const why = `why-${useId().replace(/\W/g, "")}`;
  return (
    <Stack>
      <Cluster>
        <Button variant="primary">{t("Save changes")}</Button>
        <Button>{t("Add item")}</Button>
        <Button variant="quiet">{t("Edit")}</Button>
        <Button variant="danger">{t("Delete item")}</Button>
        <Button icon="edit" label={t("Edit item")} />
      </Cluster>
      <Cluster>
        <Button variant="primary" size="sm">{t("Save")}</Button>
        <Button size="sm">{t("Cancel")}</Button>
        <Button variant="primary" busy>{t("Saving changes")}</Button>
        <Button aria-disabled="true" aria-describedby={why}>{t("Export")}</Button>
        <span id={why} className="al-hint">{t("Add an item to export.")}</span>
      </Cluster>
    </Stack>
  );
}

function BreadcrumbsDemo({ t }: DemoProps) {
  return (
    <Stack>
      <BackLink href="#">{t("Back")}</BackLink>
      <Breadcrumbs items={[{ label: t("Home"), href: "#" }, { label: t("Section"), href: "#" }, { label: t("Page title") }]} />
    </Stack>
  );
}

// ---- forms ------------------------------------------------------------------------------------

function TextInputDemo({ t }: DemoProps) {
  return (
    <Grid className="ex-form">
      <Field label={t("Full name")}><Input autoComplete="name" spellCheck={false} /></Field>
      <Field label={t("Email address")} optional hint={t("We'll only use this to reply to you.")}><Input type="email" autoComplete="email" spellCheck={false} dir="ltr" /></Field>
      <Field label={t("Amount")} hint={t("Type 5000, 5k or ٥٬٠٠٠.")}>
        <Affix>
          <select className="al-select" aria-label={t("Currency")}><option>GBP</option><option>USD</option><option>EUR</option></select>
          <Input number defaultValue="5,000" />
          <AffixText>{t("a month")}</AffixText>
        </Affix>
      </Field>
      <Field label={t("Reference")} error={t("Enter a reference that's 2 letters then 6 numbers, like AB123456")}><Input defaultValue="12" dir="ltr" /></Field>
      <Field label={t("Account number")}><Input defaultValue="40-12-76" readOnly dir="ltr" /></Field>
      <Field label={t("Quantity")} changed={t("Changed, not saved")}><Input number inputMode="numeric" defaultValue="12" /></Field>
    </Grid>
  );
}

function SelectDemo({ t }: DemoProps) {
  const list = `groups-${useId().replace(/\W/g, "")}`;
  return (
    <Grid className="ex-form">
      <Field label={t("Sort by")}>
        <Select><option>{t("Newest first")}</option><option>{t("Oldest first")}</option><option>{t("Name, A to Z")}</option></Select>
      </Field>
      <Field label={t("Group")}>
        <Input list={list} placeholder={t("Choose, or type a new one")} />
        <datalist id={list}><option value={t("Group one")} /><option value={t("Group two")} /><option value={t("Group three")} /></datalist>
        <SideEffect>{t("A new group is created when you save.")}</SideEffect>
      </Field>
    </Grid>
  );
}

function CharacterCountDemo({ t }: DemoProps) {
  return (
    <Field label={t("Description")} hint={t("A sentence or two is enough.")} className="ex-narrow">
      <CharacterCount max={120} defaultValue={t("A short description, so people know what this is for before they open it.")} />
    </Field>
  );
}

function DateInputDemo({ t }: DemoProps) {
  return <DateInput legend={t("Date of birth")} hint={t("For example, 27 3 1990")} birthday />;
}

function DatePickerDemo({ t }: DemoProps) {
  return (
    <DatePicker label={t("Due date")} hint={<>{t("For example,")} <DateExample date="2026-11-30" /></>} name="due" defaultValue="2026-11-30" />
  );
}

function SearchDemo({ t }: DemoProps) {
  return <Search label={t("Search")} defaultValue={t("report")} className="ex-narrow" />;
}

function CheckboxesDemo({ t }: DemoProps) {
  return (
    <Fieldset legend={t("How should we contact you?")}>
      <Choices>
        <Checkbox label={t("Email")} defaultChecked />
        <Checkbox label={t("Text message")} hint={t("To the number on your account")} />
        <Checkbox label={t("Post")} disabled />
      </Choices>
    </Fieldset>
  );
}

function SelectAllDemo({ t }: DemoProps) {
  const items = ["Email", "Text message", "Post"];
  const [on, setOn] = useState<string[]>(["Email"]);
  const all = on.length === items.length;
  return (
    <Fieldset legend={t("How should we contact you?")}>
      <Choices>
        <Checkbox label={t("All of them")} checked={all} indeterminate={on.length > 0 && !all} onChange={() => setOn(all ? [] : items)} />
        {items.map((i) => <Checkbox key={i} label={t(i)} checked={on.includes(i)} onChange={() => setOn(on.includes(i) ? on.filter((x) => x !== i) : [...on, i])} />)}
      </Choices>
    </Fieldset>
  );
}

function RadiosDemo({ t }: DemoProps) {
  const name = useId();
  return (
    <Fieldset legend={t("Who can see this?")}>
      <Choices>
        <Radio name={name} label={t("Only you")} defaultChecked />
        <Radio name={name} label={t("Your team")} />
        <Radio name={name} label={t("Anyone with the link")} />
      </Choices>
    </Fieldset>
  );
}

function SwitchDemo({ t }: DemoProps) {
  return (
    <Stack gap="tight">
      <Switch label={t("Show details")} defaultChecked />
      <Switch label={t("Compact view")} />
    </Stack>
  );
}

function SegmentedDemo({ t }: DemoProps) {
  const name = useId();
  const [view, setView] = useState<"list" | "grid" | "calendar">("list");
  return (
    <Fieldset legend={t("View")}>
      <Segmented name={name} value={view} onChange={setView} options={[{ value: "list", label: t("List") }, { value: "grid", label: t("Grid") }, { value: "calendar", label: t("Calendar") }]} />
    </Fieldset>
  );
}

function ErrorSummaryDemo({ t }: DemoProps) {
  return <ErrorSummary autoFocus={false} errors={[{ href: "#", message: t("Enter your full name") }, { href: "#", message: t("Enter a reference that's 2 letters then 6 numbers, like AB123456") }]} />;
}

// ---- content ----------------------------------------------------------------------------------

function DisclosureDemo({ t }: DemoProps) {
  return (
    <div className="ex-narrow">
      <Disclosure summary={t("Advanced settings")} value={t("3 changed")}><p className="al-muted">{t("Settings most people never need.")}</p></Disclosure>
      <Disclosure summary={t("Keep deleted items for")} value={t("90 days")} open>
        <Field label={t("Days")}><Input number inputMode="numeric" defaultValue="90" /></Field>
      </Disclosure>
    </div>
  );
}

function CardDemo({ t }: DemoProps) {
  const { n } = useDigits();
  return (
    <Grid>
      <Card title={t("Card title")} level={2} description={t("Supporting text · updated today")}>
        <p>{t("A card groups one thing: its summary, and what you can do with it.")}</p>
        <Cluster><Button size="sm">{t("Open")}</Button><Button size="sm" variant="quiet">{t("Edit")}</Button></Cluster>
      </Card>
      <Stat label={t("Figure, this month")} value={n(12480)} note={<>{t("last month:")} <bdi>{n(11902)}</bdi></>} />
      <Panel><h2>{t("Panel title")}</h2><p className="al-muted">{t("A rule above a group: most groupings need no box.")}</p></Panel>
      <Stats style={{ gridColumn: "1 / -1" }}>
        <Stat label={t("Components")} value={n(42)} />
        <Stat label={t("Tokens")} value={n(164)} />
        <Stat label={t("Contrast pairs measured")} value={n(112)} note={t("none failing")} />
      </Stats>
    </Grid>
  );
}

function SummaryListDemo({ t }: DemoProps) {
  return (
    <SummaryList rows={[
      { key: t("Name"), value: t("Sam Taylor"), change: { href: "#", what: t("name") } },
      { key: t("Email address"), value: <bdi>sam@example.com</bdi>, change: { href: "#", what: t("email address") } },
      { key: t("Member since"), value: t("4 January 2024") },
    ]} />
  );
}

function TableDemo({ t }: DemoProps) {
  const { lang, numerals, n } = useDigits();
  const rows: [string, number, number][] = [["Item one", 2, 12], ["Item two", 1, 120], ["Item three", 4, 2.5]];
  const total = rows.reduce((a, [, q, p]) => a + q * p, 0);
  const m = (v: number) => formatMoney(v, "GBP", { lang, numerals, minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <Table label={t("Example table")}
      columns={[{ label: t("Item") }, { label: t("Quantity"), numeric: true }, { label: t("Price"), numeric: true }, { label: t("Total"), numeric: true }]}
      rows={[
        ...rows.map(([name, q, p]) => ({ head: t(name), cells: [n(q), <bdi key="p">{m(p)}</bdi>, <bdi key="t">{m(q * p)}</bdi>] })),
        { head: t("Total"), cells: ["", "", <bdi key="t">{m(total)}</bdi>], kind: "total" as const },
        { head: t("Of which VAT, at 20%"), cells: ["", "", <bdi key="v">{m(total / 6)}</bdi>], kind: "aside" as const },
      ]} />
  );
}

function BadgeDemo({ t }: DemoProps) {
  const { n } = useDigits();
  return (
    <Cluster>
      <Badge>{t("Draft")}</Badge>
      <Badge tone="accent">{t("Active")}</Badge>
      <Badge tone="success">{t("Done")}</Badge>
      <Badge tone="warning">{t("Beta")}</Badge>
      <Badge tone="danger">{t("Overdue")}</Badge>
      <Badge tone="info">{t("New")}</Badge>
      <Badge tone="outline" count>{n(3)}<span className="al-visually-hidden"> {t("unread")}</span></Badge>
    </Cluster>
  );
}

function TintDemo({ t }: DemoProps) {
  const [tags, setTags] = useState<[string, Tint][]>([["Design", "blue"], ["Urgent", "pink"], ["Research", "purple"]]);
  return (
    <Stack>
      <Cluster>
        {tags.map(([name, tint]) => <Tag key={name} tint={tint} onRemove={() => setTags(tags.filter(([x]) => x !== name))}>{t(name)}</Tag>)}
        <Tag color="var(--al-color-chart-1)">{t("Plain tag")}</Tag>
      </Cluster>
      <p className="al-measure">
        {t("Highlights draw the eye to")} <Highlight tint="teal">{t("key words")}</Highlight>, <Highlight tint="yellow">{t("names")}</Highlight> {t("and")} <Highlight tint="pink">{t("ideas")}</Highlight>{t(", in")} <Highlight tint="purple">{t("any of eight tints")}</Highlight>.
      </p>
      <Cluster>
        <Avatar tint="teal">LH</Avatar><Avatar tint="orange">SO</Avatar><Avatar tint="blue">YA</Avatar><Avatar tint="green" large>ST</Avatar>
      </Cluster>
    </Stack>
  );
}

function TaskListDemo({ t }: DemoProps) {
  return (
    <TaskList className="ex-narrow" tasks={[
      { name: t("Add your details"), href: "#", status: t("Done"), tone: "success" },
      { name: t("Upload a document"), href: "#", status: t("In progress"), tone: "info" },
      { name: t("Choose your settings"), href: "#", status: t("Not started") },
      { name: t("Review and send"), hint: t("Finish the other tasks first"), status: t("Can't start yet"), tone: "outline" },
    ]} />
  );
}

export const STAGES = [
  ["Discover", "Start with the real problem, not the assumed solution. We take time to understand the constraints before writing a line of code."],
  ["Design", "Structure comes before pixels. We sketch the system's shape, its data, flows and edge cases, so the build has a foundation."],
  ["Build", "Small, deliberate increments instead of big-bang releases. Working software, reviewed and tested at every step."],
  ["Refine", "The first version is rarely the right one. We revisit, simplify and polish until the details hold up."],
] as const;

function StepsDemo({ t }: DemoProps) {
  return <Steps level={2} steps={STAGES.map(([title, body]) => ({ title: t(title), body: t(body) }))} />;
}

// ---- navigation -------------------------------------------------------------------------------

function PageHeadDemo({ t }: DemoProps) {
  const { n } = useDigits();
  return (
    <div className="ex-frame">
      <PageHead title={t("Page title")} badge={<Badge tone="warning">{t("Beta")}</Badge>}
        end={<><span className="al-muted al-nowrap">{t("Period")}</span><select className="al-select" aria-label={t("Period")} style={{ inlineSize: "auto" }}><option>{t("Last 30 days")}</option><option>{t("Last 7 days")}</option></select></>} />
      <Tabs label={t("Page title")} tabs={[
        { id: "overview", label: t("Overview"), content: <p>{t("The first view.")}</p> },
        { id: "activity", label: t("Activity"), count: n(12), content: <p>{t("The second view.")}</p> },
        { id: "settings", label: t("Settings"), content: <p>{t("The third view.")}</p> },
      ]} />
    </div>
  );
}

function SidebarDemo({ t }: DemoProps) {
  return (
    <Shell className="ex-shell" label={t("Sections (example)")}
      links={[{ label: t("Home"), href: "#", icon: "board", current: true }, { label: t("Calendar"), href: "#", icon: "calendar" }, { label: t("Files"), href: "#", icon: "file" }]}
      footLinks={[{ label: t("Settings"), href: "#", icon: "settings" }]}>
      <div className="ex-shell__main"><p className="al-muted">{t("The main column.")}</p></div>
    </Shell>
  );
}

function SiteHeaderDemo({ t }: DemoProps) {
  return (
    <div className="ex-flush">
      <SiteHeader home="#" skipTo={false} language={useArabesque().lang === "ar" ? { href: "#", lang: "en" } : { href: "#", lang: "ar" }}
        links={[{ label: t("The idea"), href: "#", current: true }, { label: t("Approach"), href: "#" }, { label: t("Contact"), href: "#" }]}
        action={<Button size="sm" variant="primary" href="#">{t("Say hello")}</Button>} />
    </div>
  );
}

function FooterDemo({ t }: DemoProps) {
  return (
    <Footer links={[{ label: t("Principles"), href: "../docs/principles.md" }, { label: t("Accessibility"), href: "../docs/accessibility.md" }, { label: t("Right to left"), href: "../docs/rtl.md" }]}
      legal={t("© 2026 Arabesque Labs Ltd. Structure. Clarity. Craftsmanship.")} />
  );
}

function TextLinkDemo({ t }: DemoProps) {
  return (
    <Stack>
      <Cluster><Button variant="primary">{t("Say hello")}</Button><TextLink arrow href="#">{t("See how we build")}</TextLink></Cluster>
      <p><TextLink external href="https://www.w3.org/WAI/standards-guidelines/wcag/">{t("The accessibility guidelines")}</TextLink></p>
      <p><TextLink href="mailto:hello@arabesquelabs.com"><bdi>hello@arabesquelabs.com</bdi></TextLink></p>
      <p><TextLink muted href="#">{t("Privacy notice")}</TextLink></p>
    </Stack>
  );
}

function LanguageDemo() {
  const { lang } = useArabesque();
  // On the English page, the link to the Arabic one; and the other way.
  return <LanguageLink href="#" lang={lang === "ar" ? "en" : "ar"} />;
}

function SectionDemo({ t }: DemoProps) {
  const { n } = useDigits();
  return (
    <div className="ex-sections">
      <Section eyebrow={t("Who we are")} index={n(1).padStart(2, n(0))} heading={t("The name is the method")} lede={t("Four stages, repeated as many times as it takes to get something right.")}>
        <p className="al-muted al-measure">{t("Settings most people never need.")}</p>
      </Section>
      <Section heading={<>{t("How we build.")} <span className="al-muted">{t("Small parts, one rule, repeated with care.")}</span></>} />
    </div>
  );
}

function FeatureTabsDemo({ t }: DemoProps) {
  const { n } = useDigits();
  return (
    <FeatureTabs label={t("What it does for you")} tabs={[
      { id: "rtl", label: t("Right to left"), description: t("Logical properties mirror with the page."), content: <CodeBlock language="css" code={".al-toc a {\n  padding-inline-start: var(--al-space-3);\n  border-inline-start: 2px solid var(--al-color-line);\n}"} mark={[2, 3]} /> },
      { id: "contrast", label: t("Contrast, measured"), description: t("Every pair, in both themes, at every build."), content: <Stats><Stat label={t("Contrast pairs measured")} value={n(154)} note={t("none failing")} /><Stat label={t("Themes")} value={n(2)} /></Stats> },
      { id: "keys", label: t("The keyboard"), description: t("Everything works without a mouse."), content: <p className="al-lede">{t("Tab reaches every control; arrow keys move within tabs, menus and dates; Escape closes what opened.")}</p> },
    ]} />
  );
}

function LogosDemo({ t }: DemoProps) {
  const names: [string, IconName][] = [["Organisation A", "board"], ["Organisation B", "calendar"], ["Organisation C", "file"], ["Organisation D", "search"], ["Organisation E", "settings"], ["Organisation F", "mail"]];
  return <Logos label={t("Who builds with it")} logos={names.map(([name, icon]) => <LogoWordmark key={name}><Icon name={icon} />{t(name)}</LogoWordmark>)} />;
}

function QuoteDemo({ t }: DemoProps) {
  return (
    <Grid>
      <Quote eyebrow={t("What it's about")} name={t("Their name")} role={t("Their role, at their organisation")} avatar={<Avatar tint="pink" />}>
        {t("What they said, in their own words: trimmed, never reworded, and shown with their permission.")}
      </Quote>
      <Quote name={t("Another name")} role={t("Their role")} avatar={<Avatar tint="blue" />}>
        {t("A second person's words, beside the first.")}
      </Quote>
    </Grid>
  );
}

function FaqDemo({ t }: DemoProps) {
  return (
    <DisclosureGroup>
      <Disclosure summary={t("Does it work in Arabic?")}><p>{t("Yes: every component is written for right to left as well as left to right, and every spec is in Arabic too.")} <a href="../docs/rtl.html">{t("How right to left works")}</a></p></Disclosure>
      <Disclosure summary={t("Do I need React?")}><p>{t("No. The CSS and the small helpers in js/ work on any page; the React components write the same markup.")}</p></Disclosure>
      <Disclosure summary={t("How is contrast checked?")}><p>{t("The build measures every colour pair the system relies on, in both themes, and fails if any falls short.")}</p></Disclosure>
    </DisclosureGroup>
  );
}

function CtaDemo({ t }: DemoProps) {
  return (
    <CallToAction heading={t("Your next page, built from the same tile.")} lede={t("Start from the template, or take only the parts you need.")}
      actions={<>
        <Button variant="primary" href="../templates/home.html">{t("Open the template")}</Button>
        <Button href="../README.html">{t("Read how to use it")}</Button>
        <Command>npm run build</Command>
      </>} />
  );
}

function BackToTopDemo({ t }: DemoProps) {
  return (
    <div className="ex-frame ex-back-to-top al-stack">
      <p className="al-muted">{t("Scroll this page two screens down: this link appears in the corner, at the end of the line.")}</p>
      <BackToTop />
    </div>
  );
}

function OnThisPageDemo({ t }: DemoProps) {
  const base = `toc-${useId().replace(/\W/g, "")}`;
  const parts = [t("The idea"), t("Approach"), t("Contact")];
  return (
    <div className="ex-toc">
      <OnThisPage links={parts.map((p, i) => ({ href: `#${base}-${i}`, label: p }))} />
      <div className="al-stack">
        {parts.map((p, i) => <section key={p} aria-labelledby={`${base}-${i}`}><h3 id={`${base}-${i}`}>{p}</h3><p className="al-muted">{t("Scroll the page: the link to the part you're reading is marked.")}</p></section>)}
      </div>
    </div>
  );
}

const HTML_SAMPLE = `<link rel="stylesheet" href="dist/arabesque.css">
<header class="al-site-header">…</header>
<script type="module">
  import { initSiteHeaders } from "./js/site-header.js";
  initSiteHeaders();
</script>`;

const REACT_SAMPLE = `import { ArabesqueProvider, SiteHeader } from "@arabesquelabs/design-system/react";

export const Top = () => (
  <ArabesqueProvider lang="ar" sprite="/dist/icons.svg">
    <SiteHeader links={links} />
  </ArabesqueProvider>
);`;

function CodeDemo({ t }: DemoProps) {
  return (
    <Stack>
      <CodeBlock label={t("Written as")} samples={[
        { id: "html", label: "HTML", code: HTML_SAMPLE, mark: [4, 5], language: "html" },
        { id: "react", label: "React", code: REACT_SAMPLE, mark: [4, 5], language: "tsx" },
      ]} />
      <CodeBlock caption="css/components/code.css" code={".al-code__pre {\n  direction: ltr;\n  text-align: start;\n}"} mark={[2]} language="css" />
      <div><Command>npm run build</Command></div>
    </Stack>
  );
}

// ---- feedback ---------------------------------------------------------------------------------

function NoticeDemo({ t }: DemoProps) {
  return (
    <Stack>
      <DismissibleNotice t={t} />
      <Notice title={t("Planned maintenance")}>{t("On Sunday, from 2am to 4am, saving may be slow.")}</Notice>
      <Notice kind="success" title={t("Changes saved")}>{t("Everyone with access can see them now.")}</Notice>
      <Notice kind="warning" title={t("Check your details")} actions={<Button size="sm">{t("Review details")}</Button>}>{t("Some of your details may be out of date.")}</Notice>
      <Notice kind="danger" title={t("Couldn't load this page")} actions={<Button size="sm">{t("Try again")}</Button>}>{t("The connection dropped. Check you're online, then try again.")}</Notice>
      <SideEffect>{t("Changing this also updates")} <strong>{t("2 related items")}</strong>.</SideEffect>
    </Stack>
  );
}

function DismissibleNotice({ t }: DemoProps) {
  const [shown, setShown] = useState(true);
  return shown ? <Notice kind="success" onDismiss={() => setShown(false)}>{t("Your changes are saved.")}</Notice> : <Button size="sm" onClick={() => setShown(true)}>{t("Show the notice again")}</Button>;
}

function PhaseBannerDemo({ t }: DemoProps) {
  const [shown, setShown] = useState(0);
  const id = `demo-${useArabesque().lang}`;
  return (
    <Stack>
      <Announcement key={shown} id={id}>{t("Code blocks now have syntax colour.")} <a href="#">{t("See what's new")}</a></Announcement>
      <PhaseBanner phase={<Badge tone="warning">{t("Beta")}</Badge>}>{t("This is a new service.")} <a href="#">{t("Tell us what you think")}</a>.</PhaseBanner>
      <div><Button size="sm" variant="quiet" onClick={() => { forgetDismissal(id); setShown((n) => n + 1); }}>{t("Show the announcement again")}</Button></div>
    </Stack>
  );
}

function ToastDemo({ t }: DemoProps) {
  const say = useToast();
  return <Button onClick={() => say(t("Process archived"), { action: t("Undo"), onAction: () => say(t("Process restored")) })}>{t("Archive item")}</Button>;
}

function DialogDemo({ t }: DemoProps) {
  const say = useToast();
  const [open, setOpen] = useState<"rename" | "confirm" | null>(null);
  const [error, setError] = useState(false);
  const rename = useRef<HTMLButtonElement>(null);
  const remove = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Cluster>
        <Button ref={rename} onClick={() => setOpen("rename")}>{t("Rename item…")}</Button>
        <Button ref={remove} variant="danger" onClick={() => { setError(false); setOpen("confirm"); }}>{t("Delete account…")}</Button>
      </Cluster>
      <Dialog open={open === "rename"} onClose={() => setOpen(null)} returnFocusTo={rename} title={t("Rename item")} guardChanges
        actions={<><Button value="cancel" type="submit">{t("Cancel")}</Button><Button variant="primary" value="save" type="submit">{t("Save name")}</Button></>}>
        <Field label={t("Name")}><Input name="name" defaultValue={t("Item one")} /></Field>
      </Dialog>
      <Dialog open={open === "confirm"} returnFocusTo={remove} title={t("Delete your account?")}
        onClose={(value) => { setOpen(null); if (value === "delete") say(t("Account deleted (not really: this is an example)")); }}
        onSubmit={(value, form) => {
          if (value !== "delete") return;
          const word = (form.elements.namedItem("word") as HTMLInputElement).value.trim().toLocaleLowerCase();
          const ok = word === t("delete");
          setError(!ok);
          return ok;
        }}
        actions={<><Button value="cancel" type="submit" autoFocus>{t("Keep my account")}</Button><Button variant="danger-primary" value="delete" type="submit">{t("Delete account and data")}</Button></>}>
        <p>{t("This deletes your account and everything in it: 12 items, 3 folders and 40 files. It can't be undone.")}</p>
        <Field label={t("To confirm, type delete")} hint={t("This is an example: nothing is deleted.")} error={error ? t("Type delete to confirm") : undefined}>
          <Input name="word" autoComplete="off" spellCheck={false} />
        </Field>
      </Dialog>
    </>
  );
}

function MenuDemo({ t }: DemoProps) {
  const say = useToast();
  const did = (what: string) => () => say(`${t(what)} (${t("an example")})`);
  return (
    <Menu label={t("Actions")} items={[
      { label: t("Duplicate"), onSelect: did("Duplicate") },
      { label: t("Rename"), onSelect: did("Rename") },
      { label: t("Move to…"), onSelect: did("Move to…") },
      { label: t("Archive"), description: t("Hidden from lists; still found by search."), onSelect: did("Archive") },
      { separator: true },
      { label: t("Delete"), danger: true, onSelect: did("Delete") },
    ]} />
  );
}

function TooltipDemo({ t }: DemoProps) {
  return (
    <Cluster>
      <Button icon="copy" label={t("Copy link")} data-al-tip={t("Copy link|to this page")} />
      <Button icon="settings" label={t("Settings")} />
    </Cluster>
  );
}

function EmptyStateDemo({ t }: DemoProps) {
  return <EmptyState title={t("No items yet")} text={t("Add one to get started. You can import several at once, too.")} action={<Button variant="primary" size="sm">{t("Add item")}</Button>} />;
}

function ProgressDemo({ t }: DemoProps) {
  const id = `progress-${useId().replace(/\W/g, "")}`;
  return (
    <Stack className="ex-narrow" aria-busy="true">
      <span className="al-visually-hidden">{t("Loading items")}</span>
      <Skeleton width="60%" /><Skeleton width="90%" /><Skeleton width="75%" />
      <p className="al-muted"><Spinner /> {t("Loading items")}</p>
      <Cluster className="ex-spinners"><Spinner /><span style={{ fontSize: "1.5rem" }}><Spinner /></span><span style={{ fontSize: "2.5rem", color: "var(--al-color-accent)" }}><Spinner label /></span></Cluster>
      <label className="al-label" htmlFor={id}>{t("Uploading, 60%")}</label>
      <Progress id={id} value={60} />
    </Stack>
  );
}

function ConfirmationDemo({ t }: DemoProps) {
  return <Confirmation title={t("Request sent")} autoFocus={false}><p>{t("Your reference")} <strong><bdi>AL-4K7Q-92</bdi></strong></p></Confirmation>;
}

// ---- pending changes --------------------------------------------------------------------------

function SaveStateDemo({ t }: DemoProps) {
  const { money } = useDigits();
  const say = useToast();
  const [amount, setAmount] = useState("550");
  const [saved, setSaved] = useState("550");
  const [state, setState] = useState<SaveStatus>("saved");
  const [figure, setFigure] = useState(550);
  const [stale, setStale] = useState(false);
  const value = (s: string) => Number(s.replace(/[^\d.]/g, "")) || 0;
  const edit = (next: string) => {
    setAmount(next);
    setState(next === saved ? "saved" : "unsaved");
    setStale(true);
    setTimeout(() => { setFigure(value(next)); setStale(false); }, 900);
  };
  const save = (ok: boolean) => {
    const draft = amount;
    setState("saving");
    setTimeout(() => { if (ok) { setSaved(draft); setState("saved"); } else setState("failed"); }, 900);
  };
  return (
    <Card>
      <Stack>
        <Cluster justify="between">
          <Field label={t("Amount")} style={{ flex: "1 1 16rem" }}>
            <Affix><AffixText>£</AffixText><Input number value={amount} onChange={(e) => edit(e.target.value)} /></Affix>
          </Field>
          <SaveState state={state} onRetry={() => save(true)} />
        </Cluster>
        <SideEffect>{t("Changing the amount also updates")} <strong>{t("2 related items")}</strong>.</SideEffect>
        <Cluster>
          <Button variant="primary" size="sm" onClick={() => save(true)}>{t("Save")}</Button>
          <Button size="sm" onClick={() => save(false)}>{t("Save, and fail")}</Button>
          <Button variant="quiet" size="sm" onClick={() => {
            if (amount === saved) return;
            const draft = amount;
            edit(saved);
            say(t("Changes discarded"), { action: t("Undo"), onAction: () => edit(draft) });
          }}>{t("Discard changes")}</Button>
        </Cluster>
        <Stack gap="tight">
          <StaleNote hidden={!stale} />
          <Stale stale={stale}><p><span>{t("Over 12 months:")}</span> <strong><bdi>{money(figure * 12)}</bdi></strong></p></Stale>
        </Stack>
      </Stack>
    </Card>
  );
}

function RollbackDemo({ t }: DemoProps) {
  const say = useToast();
  const [items, setItems] = useState([{ name: "Item one", fails: true, failed: false }, { name: "Item two", fails: false, failed: false }]);
  const [hidden, setHidden] = useState<string[]>([]);
  const archive = (name: string, fails: boolean) => {
    setHidden((h) => [...h, name]);
    if (!fails) {
      say(t("Archived {name}").replace("{name}", t(name)), { action: t("Undo"), onAction: () => setHidden((h) => h.filter((x) => x !== name)) });
      return;
    }
    setTimeout(() => {
      setHidden((h) => h.filter((x) => x !== name));
      setItems((list) => list.map((i) => (i.name === name ? { ...i, failed: true, fails: false } : i)));
    }, 900);
  };
  return (
    <ul className="ex-list ex-narrow">
      {items.filter((i) => !hidden.includes(i.name)).map((i) => (
        <li key={i.name} className={i.failed ? "al-rolled-back" : undefined}>
          <span>{t(i.name)}</span>{" "}
          <Button variant="quiet" size="sm" onClick={() => archive(i.name, i.fails)}>{t(i.fails ? "Archive, and fail" : "Archive")}</Button>
          {i.failed && <RollbackNote onRetry={() => { setItems((list) => list.map((x) => (x.name === i.name ? { ...x, failed: false } : x))); archive(i.name, false); }}>
            {t("Couldn't archive {name}: the server didn't answer. It's back where it was.").replace("{name}", t(i.name))}
          </RollbackNote>}
        </li>
      ))}
    </ul>
  );
}

function BulkBarDemo({ t }: DemoProps) {
  const { n } = useDigits();
  const [count, setCount] = useState(3);
  return count ? (
    <BulkBar count={count} onClear={() => setCount(0)} actions={<><Button size="sm">{t("Move {n} to…").replace("{n}", n(count))}</Button><Button size="sm">{t("Archive {n}").replace("{n}", n(count))}</Button></>} />
  ) : <Button size="sm" onClick={() => setCount(3)}>{t("Select {n} items").replace("{n}", n(3))}</Button>;
}

// The shortcuts work on the page, once, however many times the demo shows.
let shortcutsOn = 0;

function KeyboardDemo({ t }: DemoProps) {
  const say = useToast();
  const [single, setSingle] = useState(true);
  const live = useRef({ t, say });
  live.current = { t, say };
  useEffect(() => {
    setSingle(shortcutsEnabled());
    if (shortcutsOn++) return () => { shortcutsOn--; };
    const off = [
      onShortcut("n", () => live.current.say(live.current.t("New item (an example: nothing is added)"))),
      onShortcut("/", () => document.querySelector<HTMLInputElement>('input[type="search"]')?.focus()),
      onShortcut("mod+k", () => live.current.say(live.current.t("Command menu (an example: there isn't one here)"))),
      onShortcut("?", () => { const s = document.querySelector<HTMLInputElement>("[data-shortcuts-switch]"); s?.scrollIntoView({ block: "center" }); s?.focus(); }),
    ];
    return () => { shortcutsOn--; off.forEach((f) => f()); };
  }, []);
  return (
    <Stack>
      <Shortcuts titles={{ apple: t("Command"), other: t("Control") }} shortcuts={[
        { keys: ["N"], does: t("New item") },
        { keys: ["/"], does: t("Search") },
        { keys: ["mod", "K"], does: t("Open the command menu") },
        { keys: ["mod", "Z"], does: t("Undo") },
        { keys: ["?"], does: t("Show the shortcuts") },
      ]} />
      <Switch label={t("Single-key shortcuts")} checked={single} data-shortcuts-switch="" onChange={(e) => { setSingle(e.target.checked); setShortcutsEnabled(e.target.checked); }} />
    </Stack>
  );
}

// ---- charts -----------------------------------------------------------------------------------

function ColumnsDemo({ t }: DemoProps) {
  const { money, n, lang, numerals } = useDigits();
  const series = [{ name: t("Offer A"), series: "1" as const, values: [120900, 107600, 107600, 107600] }, { name: t("Offer B"), series: "2" as const, values: [92600, 92600, 92600, 92600] }, { name: t("Offer C"), series: "3" as const, values: [98000, 101000, 104000, 107000] }];
  const want = 84000;
  const always = series.filter((s) => s.values.every((v) => v >= want)).length;
  return (
    <ChartFigure title={t("Take-home pay a year, by offer")}
      summary={t("{n} of {total} offers are at or above what you want, {want}, in every year.").replace("{n}", n(always)).replace("{total}", n(series.length)).replace("{want}", money(want))}>
      <ColumnChart categories={["Year 1", "Year 2", "Year 3", "Year 4"].map((y) => t(y).replace(/\d/g, (d) => n(Number(d))))} series={series} max={150000} grid={[0, 50000, 100000, 150000]}
        target={{ value: want, name: t("What you want") }} format={money} formatAxis={(v) => `£${formatNumber(v / 1000, { lang, numerals })}k`} />
    </ChartFigure>
  );
}

function SplitDemo({ t }: DemoProps) {
  const { money, lang, numerals } = useDigits();
  const parts = [{ name: t("Take-home pay"), series: "1" as const, value: 71597 }, { name: t("Tax, NI and loans"), series: "2" as const, value: 36402 }, { name: t("Your pension"), series: "3" as const, value: 5400 }, { name: t("Other"), series: "4" as const, value: 1200 }];
  const total = parts.reduce((a, p) => a + p.value, 0);
  const pct = (f: number) => formatPercent(f, { lang, numerals });
  return (
    <ChartFigure title={t("Where a year's pay goes")} summary={t("{part} is the largest part: {pct} of {total}.").replace("{part}", parts[0]!.name).replace("{pct}", pct(parts[0]!.value / total)).replace("{total}", money(total))}>
      <SplitBar label={t("Where a year's pay goes")} parts={parts} format={money} formatPercent={pct} />
    </ChartFigure>
  );
}

function BulletDemo({ t }: DemoProps) {
  const { money, n } = useDigits();
  const rows = [{ name: t("Offer A"), series: "1" as const, value: 10075 }, { name: t("Offer B"), series: "2" as const, value: 7718 }, { name: t("Offer C"), series: "3" as const, value: 8167 }];
  const target = 7000;
  const lowest = rows.reduce((a, r) => (r.value < a.value ? r : a));
  return (
    <ChartFigure title={t("Take-home pay a month, against what you want")}
      summary={t("All {total} are at or above what you want; the lowest, {name}, is {diff} more.").replace("{total}", n(rows.length)).replace("{name}", lowest.name).replace("{diff}", money(lowest.value - target))}>
      <BulletChart rows={rows} target={{ value: target, name: t("What you want") }} max={12000} format={money}
        formatDiff={(d) => `${d >= 0 ? "+" : "−"}${money(Math.abs(d))} ${t(d >= 0 ? "more" : "short")}`} />
    </ChartFigure>
  );
}

// ---- brand ------------------------------------------------------------------------------------

function LockupDemo({ t }: DemoProps) {
  return (
    <Stack>
      <Lockup />
      <Lockup product={t("Product name")} />
      <Lockup stacked />
      <Cluster className="ex-marks"><Star style={{ fontSize: "calc(16px / 1.5)" }} /><Star style={{ fontSize: "calc(24px / 1.5)" }} /></Cluster>
      <Cluster className="ex-marks">{[16, 32, 64].map((px) => <Mark key={px} style={{ fontSize: `calc(${px}px / 1.5)` }} />)}</Cluster>
    </Stack>
  );
}

function PatternDemo() {
  return (
    <Stack>
      <Pattern full className="al-card ex-pattern" aria-hidden="true" />
      <Pattern quiet className="al-card ex-pattern ex-pattern--small" aria-hidden="true" />
    </Stack>
  );
}

function HeroDemo({ t }: DemoProps) {
  return (
    <Hero className="ex-hero">
      <div className="al-stack ex-hero__body">
        <p className="al-display ex-hero__title">{t("One tile, a whole system.")}</p>
        <HeroCaption />
      </div>
    </Hero>
  );
}

function ConstructionDemo() {
  return <ConstructionFigure adjustable />;
}

function IconDemo() {
  return (
    <ul className="ex-icons">
      {iconNames.map((n) => (
        <li key={n}><Icon name={n} /><span lang="en">{n}</span></li>
      ))}
    </ul>
  );
}

// ---- patterns ---------------------------------------------------------------------------------

/** Ask, check, confirm: errors on submit with an error summary, check the answers, then confirm. */
function FlowDemo({ t }: DemoProps) {
  const base = `flow-${useId().replace(/\W/g, "")}`;
  const [step, setStep] = useState<"ask" | "check" | "done">("ask");
  const [answers, setAnswers] = useState({ name: "", email: "", contact: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = { name: String(data.get("name") ?? "").trim(), email: String(data.get("email") ?? "").trim(), contact: String(data.get("contact") ?? "") };
    const found: Record<string, string> = {};
    if (!next.name) found.name = t("Enter your full name");
    if (!next.email) found.email = t("Enter your email address");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) found.email = t("Enter an email address in the correct format, like name@example.com");
    if (!next.contact) found.contact = t("Choose how we should contact you");
    setAnswers(next);
    setErrors(found);
    if (!Object.keys(found).length) setStep("check");
  };
  if (step === "done") {
    return (
      <Card><Stack>
        <Confirmation title={t("Request sent")}><p>{t("Your reference")} <strong><bdi>AL-4K7Q-92</bdi></strong></p></Confirmation>
        <h3>{t("What happens next")}</h3>
        <p className="al-measure">{t("We've sent a confirmation to your email address. We'll reply within 2 working days.")}</p>
        <Cluster><Button onClick={() => { setAnswers({ name: "", email: "", contact: "" }); setStep("ask"); }}>{t("Start again")}</Button></Cluster>
      </Stack></Card>
    );
  }
  if (step === "check") {
    const change = (what: string) => ({ href: "#", what: t(what).toLocaleLowerCase(), onClick: (e: { preventDefault: () => void }) => { e.preventDefault(); setStep("ask"); } });
    return (
      <Card><Stack>
        <h3 tabIndex={-1} ref={(h) => h?.focus()}>{t("Check your answers")}</h3>
        <SummaryList rows={[
          { key: t("Full name"), value: <bdi>{answers.name}</bdi>, change: change("Full name") },
          { key: t("Email address"), value: <bdi>{answers.email}</bdi>, change: change("Email address") },
          { key: t("How should we contact you?"), value: t(answers.contact), change: change("How should we contact you?") },
        ]} />
        <Cluster><Button variant="primary" onClick={() => setStep("done")}>{t("Send request")}</Button></Cluster>
      </Stack></Card>
    );
  }
  return (
    <Card>
      <form className="al-stack" noValidate onSubmit={submit}>
        <h3>{t("Your details")}</h3>
        <ErrorSummary errors={Object.entries(errors).map(([k, message]) => ({ href: `#${base}-${k}`, message }))} />
        <Field label={t("Full name")} id={`${base}-name`} error={errors.name}><Input name="name" autoComplete="name" spellCheck={false} defaultValue={answers.name} /></Field>
        <Field label={t("Email address")} id={`${base}-email`} hint={t("We'll send a confirmation here.")} error={errors.email}><Input name="email" type="email" autoComplete="email" spellCheck={false} dir="ltr" defaultValue={answers.email} /></Field>
        <Fieldset legend={t("How should we contact you?")}>
          {errors.contact && <p className="al-error" id={`${base}-contact-error`}><Icon name="danger" size="sm" />{errors.contact}</p>}
          <Choices>
            {["Email", "Phone", "Post"].map((v, i) => <Radio key={v} id={i === 0 ? `${base}-contact` : undefined} name="contact" value={v} label={t(v)} defaultChecked={answers.contact === v} />)}
          </Choices>
        </Fieldset>
        <Cluster><Button variant="primary" type="submit">{t("Continue")}</Button></Cluster>
      </form>
    </Card>
  );
}

// ---- the list ---------------------------------------------------------------------------------

const d = (id: string, title: string, group: string, lead: string, spec: string, Demo: Demo["Demo"]): Demo => ({ id, title, group, lead, spec: `docs/components/${spec}.md`, Demo });

export const demos: Demo[] = [
  { id: "colour", title: "Colour", group: "Foundations", lead: "Roles, not hues: each name says what the colour is for. Every pair the system relies on is measured at build time.", spec: "docs/foundations/colour.md", Demo: ColourDemo },
  d("tints", "Tints", "Foundations", "Eight bright tints for identity and emphasis: tags, highlights, avatars. Each ink is readable on its ground.", "tint", TintsDemo),
  { id: "type", title: "Type", group: "Foundations", lead: "Jost for the interface and headings, Newsreader for reading. Arabic falls through to IBM Plex Sans Arabic, Kufam and Amiri: a little larger, more line height, no letter-spacing.", spec: "docs/foundations/typography.md", Demo: TypeDemo },
  { id: "space", title: "Space and shape", group: "Foundations", lead: "A 4px step for everything spatial. Corners are crisp (2px); depth comes from borders and surface steps, never shadows.", spec: "docs/foundations/space-and-shape.md", Demo: SpaceDemo },
  { id: "motion", title: "Motion", group: "Foundations", lead: "Quick, and only in answer to something done: 150ms for feedback, 250ms for disclosure and themes. With reduced motion, things change at once.", spec: "docs/foundations/motion.md", Demo: MotionDemo },
  { id: "icons", title: "Icons", group: "Foundations", lead: "Line icons on a 24-unit grid. Those that point along the reading direction mirror in right-to-left.", spec: "docs/foundations/iconography.md", Demo: IconDemo },
  d("button", "Button", "Actions", "Does something. One primary per view; the label names the action and its object.", "button", ButtonDemo),
  d("text-link", "Text link", "Actions", "A link that stands on its own: underlined in the accent, with an arrow to a next step, or an icon to another site.", "link", TextLinkDemo),
  d("back-link", "Back link and breadcrumbs", "Actions", "A way back, before the page's title: a back link for the previous step, breadcrumbs for where a page sits.", "breadcrumbs", BreadcrumbsDemo),
  d("text-input", "Text input", "Forms", "A visible label, an optional hint, the field; optional fields say so.", "field", TextInputDemo),
  d("select", "Select and combobox", "Forms", "A select for a fixed list; a combobox (a datalist) where people may also type their own.", "field", SelectDemo),
  d("textarea", "Textarea and character count", "Forms", "For longer answers. With a limit, it says what's left in words, and lets people type past it.", "character-count", CharacterCountDemo),
  d("date-input", "Date input", "Forms", "Three fields for dates people know. For a date near today, use the date picker.", "date-input", DateInputDemo),
  d("date-picker", "Date picker", "Forms", "A date near today, typed or chosen from a calendar in the page's language: in Arabic, Arabic month and day names, the week from Saturday, the chosen digits, and a grid that runs from the right.", "date-picker", DatePickerDemo),
  d("search", "Search", "Forms", "A field with its icon, and Clear once there's text. Escape clears it too.", "search", SearchDemo),
  d("select-all", "Select all", "Forms", "A checkbox for all of a group, mixed while some are chosen and some aren't.", "choice", SelectAllDemo),
  d("checkboxes", "Checkboxes", "Forms", "Independent options, in a fieldset with a legend; the whole row is the target.", "choice", CheckboxesDemo),
  d("radios", "Radios", "Forms", "One of several, with a sensible default where there is one.", "choice", RadiosDemo),
  d("switch", "Switch", "Forms", "A setting that applies the moment it's flipped: no Save.", "choice", SwitchDemo),
  d("segmented", "Segmented control", "Forms", "Two to five short options, all visible: a choice in a form, or a view switch.", "segmented", SegmentedDemo),
  d("error-summary", "Error summary", "Forms", "When a form is submitted with errors: every error, at the top, each a link to its field. It takes focus, and the page title starts with “Error:”.", "error-summary", ErrorSummaryDemo),
  d("disclosure", "Disclosure", "Content", "What's secondary, folded away, with the value inside shown beside its name.", "disclosure", DisclosureDemo),
  d("card", "Card, panel and stat", "Content", "A card holds one thing people act on; a panel is a rule above a group; a stat is a figure with its label.", "card", CardDemo),
  d("code", "Code and command", "Content", "Code to read or copy, left to right in either language, with the lines that matter marked. A command is one line to paste.", "code", CodeDemo),
  d("feature-tabs", "Feature tabs", "Content", "A column of tabs, each a name and a line about it, beside what the chosen one shows.", "nav", FeatureTabsDemo),
  d("logos", "Logo wall", "Content", "Who uses it, as their marks in one colour, as many to a row as fit. Never a scrolling marquee.", "logos", LogosDemo),
  d("quote", "Quote", "Content", "What someone said, in their words, then who they are.", "card", QuoteDemo),
  d("cta", "Call to action", "Content", "The page's last word: one line, then what to do.", "cta", CtaDemo),
  d("summary-list", "Summary list", "Content", "Facts about one thing, each with its own action: for checking answers, and for any record.", "summary-list", SummaryListDemo),
  d("table", "Table", "Content", "For comparing values: numbers line up, the total stands out, asides recede. Wide tables scroll in their own region.", "table", TableDemo),
  d("badge", "Badge", "Content", "A short status beside something, in words. Sentence case, never capitals.", "badge", BadgeDemo),
  d("tag", "Tag, highlight and avatar", "Content", "Colour for identity and emphasis, in eight bright tints; never for status.", "tint", TintDemo),
  d("task-list", "Task list", "Content", "The parts of a longer job, each with its status in words; done in any order.", "task-list", TaskListDemo),
  d("section", "Section", "Content", "A band of the page: a hairline from the one before, its heading and lede.", "page-head", SectionDemo),
  d("steps", "Steps", "Content", "A numbered sequence: the stages of how something is done. Only for real sequences.", "steps", StepsDemo),
  d("page-head", "Page head and tabs", "Navigation", "The page's title, what applies to the whole page, then its views.", "page-head", PageHeadDemo),
  d("sidebar", "Sidebar", "Navigation", "An app's sections, collapsible to icons; on a phone, behind a menu button.", "sidebar", SidebarDemo),
  d("site-header", "Site header", "Navigation", "A website's top bar: the lockup, the sections, and the language and theme controls. Under the md breakpoint the sections fold into a menu.", "site-header", SiteHeaderDemo),
  d("on-this-page", "On this page", "Navigation", "A page's sections beside it, with the one being read marked as it scrolls.", "toc", OnThisPageDemo),
  d("back-to-top", "Back to top", "Navigation", "On a long page, a link back up, in the corner once the page has scrolled two screens. Followed, it moves focus to the top too.", "back-to-top", BackToTopDemo),
  d("language-link", "Language link", "Navigation", "The same page in the other language, named in that language. Never a flag.", "language-switch", LanguageDemo),
  d("footer", "Footer", "Navigation", "Who made it, where to go next, and the legal line; quiet, and the same on every page.", "footer", FooterDemo),
  d("notice", "Notice and side-effect note", "Feedback", "A message in the page, in four kinds, each with an icon and a title. A side-effect note says what else will change, before it does.", "notice", NoticeDemo),
  d("phase-banner", "Phase banner", "Feedback", "Under the header: the product, or part of it, is new or changing, and feedback is welcome.", "phase-banner", PhaseBannerDemo),
  d("toast", "Toast", "Feedback", "What just happened, briefly, with Undo when it can be undone.", "toast", ToastDemo),
  d("dialog", "Dialog", "Feedback", "A decision that needs attention now. It never loses what was typed, and confirms only what can't be undone. A sheet on small screens.", "dialog", DialogDemo),
  d("menu", "Menu", "Feedback", "Actions on one thing, behind a button. Arrow keys move; Escape closes; destructive items last.", "menu", MenuDemo),
  d("tooltip", "Tooltip", "Feedback", "A short label for an icon or a mark, on hover and on focus. Never essential.", "tooltip", TooltipDemo),
  d("empty-state", "Empty state", "Feedback", "Why there's nothing here, and the next action. Never a dead end.", "empty-state", EmptyStateDemo),
  d("loading", "Loading and progress", "Feedback", "Progress where the work happens: a skeleton, a spinner, or a bar when it can be measured.", "progress", ProgressDemo),
  d("confirmation", "Confirmation", "Feedback", "The end of a flow that sends something: it's done, the reference, then what happens next.", "confirmation", ConfirmationDemo),
  d("save-state", "Save state, changes and stale results", "Pending changes", "Whether a change is kept, what else it touches, and which figures are being worked out again. Try them.", "save-state", SaveStateDemo),
  d("rollback", "Rolled back", "Pending changes", "A change shown at once that the server then refused: put back where it was, with why, and Retry.", "save-state", RollbackDemo),
  d("bulk-bar", "Bulk action bar", "Pending changes", "Once things are selected: how many, what can be done to all of them, and a way to clear.", "bulk-bar", BulkBarDemo),
  d("keyboard", "Keyboard shortcuts", "Pending changes", "The platform's modifier: ⌘ on Apple devices, Ctrl elsewhere. Single keys never fire while typing.", "kbd", KeyboardDemo),
  d("columns", "Column chart", "Charts", "Values over time or across categories, grouped, with an optional target line.", "chart", ColumnsDemo),
  d("split-bar", "Split bar", "Charts", "The parts of a whole, in one bar, with a key.", "chart", SplitDemo),
  d("bullet", "Bullet chart", "Charts", "Each value against its target, with the difference in words.", "chart", BulletDemo),
  d("lockup", "Mark and lockup", "Brand", "The mark beside the wordmark, built from the logo pack. One colour; never redrawn.", "brand", LockupDemo),
  d("pattern", "Pattern", "Brand", "The 4.8.8 tessellation of the mark's tile, contact angle 67.5°, drawn by rule: as texture behind a band, or across a hero with its focal tile (as at the top of this page).", "pattern", PatternDemo),
  d("hero", "Hero", "Brand", "One quiet line across the section, and one focal tile in the accent, with its caption. It draws itself in once.", "pattern", HeroDemo),
  d("construction", "Construction figure", "Brand", "How the pattern is made, in three steps, each read as software.", "construction", ConstructionDemo),
  { id: "faq", title: "Questions and answers", group: "Patterns", lead: "The questions people ask before they start, each folded under its question, each answer short, with a link for more.", spec: "docs/patterns.md", Demo: FaqDemo },
  { id: "ask-check-confirm", title: "Ask, check, confirm", group: "Patterns", lead: "For anything sent, or hard to take back: ask; check errors on submit, with an error summary; let people check their answers; then confirm, with what happens next. Try submitting it empty.", spec: "docs/patterns.md", Demo: FlowDemo },
];

export const groups = [...new Set(demos.map((x) => x.group))];
