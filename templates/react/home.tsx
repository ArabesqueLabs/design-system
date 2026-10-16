// The studio homepage, as on arabesquelabs.com, built from the React
// components: copy it into a React site and change the words. The build
// renders it to templates/home.html and templates/ar/home.html, which work
// without React (the helpers in js/ wire them).
//
// Its page layout is templates/home.css (the tp- classes); everything else
// is the system's own.

import type { ReactNode } from "react";
import { ConstructionFigure, Footer, Hero, HeroCaption, Lockup, SiteHeader, Steps, TextLink } from "../../react/src/index.js";

export interface HomeCopy {
  lang: "en" | "ar";
  title: string;
  description: string;
  nav: { idea: string; approach: string; contact: string };
  /** The link to the page in the other language. */
  other: { href: string; lang: string; label: string };
  heading: string;
  lede: string;
  hello: string;
  how: string;
  idea: { heading: string; body: string[] };
  approach: { heading: string; lede: string; steps: { title: string; body: string }[] };
  contact: { heading: string; lede: string; ask: string };
  tagline: string;
  legal: ReactNode;
  privacy: string;
}

export const copy: Record<"en" | "ar", HomeCopy> = {
  en: {
    lang: "en",
    title: "Arabesque Labs — Intricate software from simple, rigorous rules.",
    description: "Arabesque Labs is an independent software studio. We're building our first product now, carefully, one well-made part at a time.",
    nav: { idea: "The idea", approach: "Approach", contact: "Contact" },
    other: { href: "ar/home.html", lang: "ar", label: "العربية" },
    heading: "Intricate software from simple, rigorous rules.",
    lede: "Arabesque Labs is an independent software studio. We're building our first product now, carefully, one well-made part at a time.",
    hello: "Say hello",
    how: "See how we build",
    idea: {
      heading: "The name is the method",
      body: [
        "Arabesque patterns look intricate, but they come from a few simple shapes and one rule, repeated with care. No line is there for decoration. Each one is where the geometry puts it.",
        "We build software the same way: small, well-made modules, clear interfaces between them, and a system that stays coherent as it grows.",
      ],
    },
    approach: {
      heading: "How we build",
      lede: "Four stages, repeated as many times as it takes to get something right.",
      steps: [
        { title: "Discover", body: "Start with the real problem, not the assumed solution. We take time to understand the constraints before writing a line of code." },
        { title: "Design", body: "Structure comes before pixels. We sketch the system's shape, its data, flows and edge cases, so the build has a foundation." },
        { title: "Build", body: "Small, deliberate increments instead of big-bang releases. Working software, reviewed and tested at every step." },
        { title: "Refine", body: "The first version is rarely the right one. We revisit, simplify and polish until the details hold up." },
      ],
    },
    contact: {
      heading: "Building quietly, for now",
      lede: "Our first product is in the works. We'll share it when it meets our own standard, not before.",
      ask: "Questions, ideas, or just want to say hello?",
    },
    tagline: "Structure. Clarity. Craftsmanship.",
    legal: <>Arabesque Labs Ltd is registered in England and Wales, company number <bdi>16408080</bdi>. Registered office: 71–75 Shelton Street, Covent Garden, London WC2H{" "}9JQ.<br />© <bdi>2026</bdi> Arabesque Labs Ltd.</>,
    privacy: "Privacy notice",
  },
  ar: {
    lang: "ar",
    title: "معامل آرابيسك — برمجيات متقنة من قواعد بسيطة وصارمة.",
    description: "معامل آرابيسك استوديو برمجيات مستقل. نبني منتجنا الأول الآن، بعناية، جزءًا متقنًا تلو الآخر.",
    nav: { idea: "الفكرة", approach: "المنهج", contact: "تواصل" },
    other: { href: "../home.html", lang: "en", label: "English" },
    heading: "برمجيات متقنة من قواعد بسيطة وصارمة.",
    lede: "معامل آرابيسك استوديو برمجيات مستقل. نبني منتجنا الأول الآن، بعناية، جزءًا متقنًا تلو الآخر.",
    hello: "راسلنا",
    how: "اطّلع على طريقة عملنا",
    idea: {
      heading: "الاسم هو المنهج",
      body: [
        "تبدو أنماط الأرابيسك معقدة، لكنها تنشأ من أشكال بسيطة قليلة وقاعدة واحدة تتكرر بعناية. لا يوجد خط للزينة؛ كل خط في المكان الذي تضعه فيه الهندسة.",
        "ونحن نبني البرمجيات بالطريقة نفسها: وحدات صغيرة متقنة، وواجهات واضحة بينها، ونظام يبقى متماسكًا كلما نما.",
      ],
    },
    approach: {
      heading: "كيف نبني",
      lede: "أربع مراحل، نكررها بقدر ما يلزم لنصل إلى الصواب.",
      steps: [
        { title: "اكتشاف", body: "نبدأ بالمشكلة الحقيقية لا بالحل المفترض. نأخذ وقتنا لفهم القيود قبل كتابة سطر من الشيفرة." },
        { title: "تصميم", body: "البنية قبل البكسلات. نرسم شكل النظام وبياناته وتدفقاته وحالاته الحدّية، ليقوم البناء على أساس." },
        { title: "بناء", body: "خطوات صغيرة ومدروسة بدلًا من الإصدارات الضخمة دفعة واحدة. برمجيات تعمل، تُراجَع وتُختبر في كل خطوة." },
        { title: "تحسين", body: "نادرًا ما تكون النسخة الأولى هي الصحيحة. نعود إليها ونبسّطها ونصقلها حتى تصمد التفاصيل." },
      ],
    },
    contact: {
      heading: "نبني بهدوء، في الوقت الحالي",
      lede: "منتجنا الأول قيد العمل. سنشاركه حين يبلغ معاييرنا، لا قبل ذلك.",
      ask: "أسئلة أو أفكار، أو تريد إلقاء التحية فقط؟",
    },
    tagline: "هيكل. وضوح. إتقان.",
    legal: <><span lang="en" dir="ltr">Arabesque Labs Ltd</span> شركة مسجّلة في إنجلترا وويلز، رقمها <bdi>16408080</bdi>. المكتب المسجّل: <bdi lang="en">71–75 Shelton Street, Covent Garden, London WC2H{" "}9JQ</bdi>.<br /><bdi lang="en">© 2026 Arabesque Labs Ltd.</bdi></>,
    privacy: "إشعار الخصوصية",
  },
};

/** The page's body: wrap it in <ArabesqueProvider lang={c.lang} sprite="…/dist/icons.svg">. */
export function Home({ c }: { c: HomeCopy }) {
  return (
    <>
      <Hero className="tp-hero">
        <SiteHeader home="#top" menuId="site-menu"
          links={[{ label: c.nav.idea, href: "#idea" }, { label: c.nav.approach, href: "#approach" }, { label: c.nav.contact, href: "#contact" }]}
          language={{ href: c.other.href, lang: c.other.lang, label: c.other.label }} />
        <div className="al-page tp-hero__body" id="top">
          <h1 className="al-display tp-hero__title">{c.heading}</h1>
          <p className="al-lede tp-hero__lede">{c.lede}</p>
          <div className="al-cluster tp-hero__actions">
            <a className="al-button al-button--primary" href="#contact">{c.hello}</a>
            <TextLink arrow href="#approach">{c.how}</TextLink>
          </div>
          <HeroCaption />
        </div>
      </Hero>

      <main id="main" tabIndex={-1}>
        <section className="al-section" id="idea" aria-labelledby="idea-h">
          <div className="al-page tp-two">
            <div>
              <h2 className="tp-h2" id="idea-h">{c.idea.heading}</h2>
              <div className="al-prose al-muted tp-copy">{c.idea.body.map((p) => <p key={p}>{p}</p>)}</div>
            </div>
            <ConstructionFigure />
          </div>
        </section>

        <section className="al-section" id="approach" aria-labelledby="approach-h">
          <div className="al-page">
            <div className="tp-two tp-two--baseline">
              <h2 className="tp-h2" id="approach-h">{c.approach.heading}</h2>
              <p className="al-lede tp-lede">{c.approach.lede}</p>
            </div>
            <Steps className="tp-steps" steps={c.approach.steps} />
          </div>
        </section>

        <section className="al-section" id="contact" aria-labelledby="contact-h">
          <div className="al-page tp-two">
            <div>
              <h2 className="tp-h2" id="contact-h">{c.contact.heading}</h2>
              <p className="al-lede tp-lede">{c.contact.lede}</p>
            </div>
            <div>
              <p className="al-muted">{c.contact.ask}</p>
              <p className="tp-email"><TextLink href="mailto:hello@arabesquelabs.com"><bdi>hello@arabesquelabs.com</bdi></TextLink></p>
            </div>
          </div>
        </section>
      </main>

      <div className="al-page">
        <Footer lockup={<Lockup name={<span lang="en" dir="ltr">Arabesque Labs Ltd.</span>} />}
          legal={<>{c.legal} · <TextLink muted href="https://arabesquelabs.com/privacy.html">{c.privacy}</TextLink></>}>
          <p className="tp-tagline">{c.tagline}</p>
        </Footer>
      </div>
    </>
  );
}
