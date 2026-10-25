// The homepage (index.html, ar/index.html): what Arabesque is and why, a
// few of its elements working together, the same card in both directions,
// the questions people ask, and how to start. Every element is on the
// Elements page (showcase.tsx), not here. Rendered on the server, then
// brought to life in the browser by client.tsx.

import { useMemo, useState, type ReactNode } from "react";
import type { Numerals } from "../../js/format.js";
import { formatMoney, formatNumber } from "../../js/format.js";
import {
  ArabesqueProvider, Avatar, AvatarStack, Badge, Button, CallToAction, Card, Cluster, Command, Disclosure, DisclosureGroup, Field, Grid, Hero, HeroCaption, Icon, Input,
  List, PhaseBanner, Range, Section, Stat, Stats, Status, Stepper, TextLink, Timeline, useArabesque, type IconName,
} from "../../react/src/index.js";
import { RELEASE } from "./repo.js";
import { translator } from "./app.js";
import { demos } from "./demos.js";
import { RepoLink, SiteFoot, SiteTop, docPage, pages, type Lang, type T } from "./site.js";

export interface HomepageProps {
  lang?: Lang;
  /** From the page to the site's root: "" for index.html, "../" for ar/index.html. */
  root?: string;
  numerals?: Numerals;
}

const WHY: [IconName, string, string][] = [
  ["check", "Accessible, and measured", "WCAG 2.2 AA as a floor. Every colour pair is measured at each build, in both themes, and the build fails if one falls short."],
  ["language", "Right to left from the start", "Every element is written for Arabic as well as English: logical properties, mirrored icons, Arabic type, and Arabic-Indic digits when chosen."],
  ["arrow", "The fewest steps", "Actions say what they do, and every consequence shows before, during and after: what else will change, what's saving, what was put back."],
  ["file", "Plain CSS, and React", "Tokens as custom properties, and plain HTML with classes: no framework, no runtime dependency. The React components write the same markup."],
];

/** Digits in the page's own. */
function useN() {
  const { lang, numerals } = useArabesque();
  return { n: (v: number) => formatNumber(v, { lang, numerals }), money: (v: number) => formatMoney(v, "GBP", { lang, numerals }) };
}

/** A form part-way through: the card shown in the preview, and again in both directions. */
function ProjectCard({ t, level = 3 }: { t: T; level?: 2 | 3 }) {
  const { money } = useN();
  return (
    <Card title={t("New project")} level={level}
      footer={<><Button size="sm" variant="quiet">{t("Back")}</Button><Button size="sm" variant="primary">{t("Continue")}</Button></>}>
      <Stepper steps={[t("Details"), t("Team"), t("Budget"), t("Check")]} current={3} />
      <Field label={t("Budget, a month")}><Range min={0} max={2000} step={50} defaultValue={1200} format={money} /></Field>
      <Field label={t("Work email")} hint={t("For the invoice.")}><Input type="email" icon="mail" autoComplete="off" spellCheck={false} dir="ltr" defaultValue="finance@example.com" /></Field>
    </Card>
  );
}

function Preview({ t }: { t: T }) {
  return (
    <Grid className="hm-preview">
      <ProjectCard t={t} />
      <Card title={t("Activity")}>
        <Timeline events={[
          { time: t("Today, 09:40"), title: t("Request approved"), icon: "check", tone: "success" },
          { time: t("Yesterday, 16:05"), title: t("Budget changed to £1,200 a month"), icon: "edit" },
          { time: t("22 October"), title: t("Request sent"), tone: "accent" },
        ]} />
      </Card>
      <Card title={t("Team")} footer={<Button size="sm">{t("Invite people")}</Button>}>
        <Cluster justify="between">
          <AvatarStack label={t("Shared with Lina, Sam, Yusuf and 3 others")} more="+3">
            <Avatar tint="teal">LH</Avatar><Avatar tint="orange">SO</Avatar><Avatar tint="blue">YA</Avatar>
          </AvatarStack>
          <Status tone="success" live>{t("Online")}</Status>
        </Cluster>
        <List flush label={t("Notifications")} rows={[
          { title: t("Lina approved your request"), start: <Status tone="info" dotOnly>{t("Unread")}</Status>, end: t("2 min"), href: "#preview" },
          { title: t("Your export is ready"), start: <Status dotOnly>{t("Read")}</Status>, end: <Badge tone="success">{t("Done")}</Badge>, href: "#preview" },
        ]} />
      </Card>
    </Grid>
  );
}

/** The same card in the page's language and in the other one, each in its own direction. */
function BothWays({ lang, numerals, root }: { lang: Lang; numerals: Numerals; root: string }) {
  const side = (l: Lang): ReactNode => (
    <div lang={l} dir={l === "ar" ? "rtl" : "ltr"} className="hm-side">
      <ArabesqueProvider lang={l} numerals={numerals} sprite={`${root}dist/icons.svg`}>
        <ProjectCard t={translator(l)} level={3} />
      </ArabesqueProvider>
    </div>
  );
  return <div className="hm-both">{side(lang)}{side(lang === "ar" ? "en" : "ar")}</div>;
}

function Figures({ t }: { t: T }) {
  const { n } = useN();
  return (
    <Stats>
      <Stat label={t("Elements, each working")} value={n(demos.length)} />
      <Stat label={t("Languages, in both directions")} value={n(2)} />
      <Stat label={t("Themes, every pair measured")} value={n(2)} />
      <Stat label={t("Runtime dependencies")} value={n(0)} />
    </Stats>
  );
}

export function Homepage({ lang = "en", root = "", numerals: initialNumerals = "latn" }: HomepageProps) {
  const [numerals, setNumerals] = useState<Numerals>(initialNumerals);
  const t = useMemo(() => translator(lang), [lang]);
  const p = pages(lang, root);
  const changelog = docPage("CHANGELOG.md", lang, root);

  return (
    <ArabesqueProvider lang={lang} numerals={numerals} sprite={`${root}dist/icons.svg`}>
      <SiteTop t={t} lang={lang} root={root} page="home" numerals={numerals} onNumerals={setNumerals} />
      <div className="al-page">
        <PhaseBanner phase={<Badge tone="warning">{t("Experimental")}</Badge>}>
          {t("Arabesque is new, and is actively being evolved.")} {t("This is version")} <a href={`${changelog}#${RELEASE.changelog}`}><bdi dir="ltr">{RELEASE.version}</bdi></a>. <a href={changelog}>{t("Check the changelog")}</a>.
        </PhaseBanner>
      </div>

      <main id="main" tabIndex={-1} className="hm-main">
        <Hero className="sc-hero">
          <div className="al-page al-stack">
            <h1 className="al-display sc-hero__title">{t("Arabesque")}</h1>
            <p className="al-lede">
              {t("A design system built by")} <TextLink external href="https://arabesquelabs.com/">{t("Arabesque Labs")}</TextLink> {t("to set the standard for every product we make. Written for left-to-right and right-to-left alike, and designed so people get things done in the fewest steps, seeing every consequence.")}
            </p>
            <Cluster>
              <Button variant="primary" href={p.elements}>{t("Browse all elements")}</Button>
              <Button href={p.use}>{t("Add it to your project")}</Button>
              <RepoLink t={t} />
            </Cluster>
            <HeroCaption />
          </div>
        </Hero>

        <Section id="why" heading={t("What it's for")} lede={t("Four things every product we make should get right, built in so they're right by default.")}>
          <Grid className="hm-why">
            {WHY.map(([icon, title, body]) => (
              <div key={title} className="hm-why__item">
                <Icon name={icon} />
                <h3>{t(title)}</h3>
                <p className="al-muted">{t(body)}</p>
              </div>
            ))}
          </Grid>
        </Section>

        <Section id="preview" heading={t("The elements, working together")} lede={t("A few of them, as they'd sit in a product. Try them: they're the real thing.")}>
          <Preview t={t} />
          <p><TextLink arrow href={p.elements}>{t("See all elements")}</TextLink></p>
        </Section>

        <Section id="both-ways" heading={t("One page, read both ways")} lede={t("The same card, in English and in Arabic. Nothing is redrawn for right to left: the layout, the icons, the slider and the steps follow the direction of the text.")}>
          <BothWays lang={lang} numerals={numerals} root={root} />
        </Section>

        <Section id="figures" heading={t("In figures")}>
          <Figures t={t} />
        </Section>

        <Section id="questions" heading={t("Questions")}>
          <DisclosureGroup className="hm-faq">
            <Disclosure summary={t("Does it work in Arabic?")}><p>{t("Yes: every component is written for right to left as well as left to right, and every spec is in Arabic too.")} <a href={docPage("docs/rtl.md", lang, root)}>{t("How right to left works")}</a></p></Disclosure>
            <Disclosure summary={t("Do I need React?")}><p>{t("No. The CSS and the small helpers in js/ work on any page; the React components write the same markup.")}</p></Disclosure>
            <Disclosure summary={t("How is contrast checked?")}><p>{t("The build measures every colour pair the system relies on, in both themes, and fails if any falls short.")}</p></Disclosure>
            <Disclosure summary={t("Can I use it in my own product?")}><p>{t("Yes: the code is MIT licensed. The Arabesque and Arabesque Labs logos and marks aren't, so leave them out of your product.")}</p></Disclosure>
          </DisclosureGroup>
        </Section>

        <CallToAction heading={t("Start with one stylesheet.")} lede={t("Link a released version, which never changes, or install it from GitHub.")}
          actions={<>
            <Button variant="primary" href={p.use}>{t("Add it to your project")}</Button>
            <Button href={p.elements}>{t("Browse all elements")}</Button>
            <Command>{`npm i github:ArabesqueLabs/design-system#v${RELEASE.version}`}</Command>
          </>} />
      </main>

      <SiteFoot t={t} lang={lang} root={root} />
    </ArabesqueProvider>
  );
}
