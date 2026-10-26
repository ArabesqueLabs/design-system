// The component specs, laid out for the site (their Markdown stays as
// GitHub shows it):
//
//   - the demos (front matter `demos`, from scripts/sync.mjs) working, before
//     the first section (src/components/Demo);
//   - Do and Don't side by side, as notices: what to do, and what not to;
//   - the tokens a component uses, folded away under their heading.
//
// It runs before Docusaurus's own plugins, so the notices it makes are
// turned into its admonitions like any written as :::tip.

const WORDS = {
  en: { do: "Do", dont: "Don't", both: "Do and don't", tokens: "Tokens", used: (n) => `The ${n} tokens it uses` },
  ar: { do: "افعل", dont: "لا تفعل", both: "افعل ولا تفعل", tokens: "الرموز", used: (n) => `الرموز التي يستخدمها (${n})` },
};

const text = (node) => (node.value ?? "") + (node.children ?? []).map(text).join("");
const jsx = (name, attributes, children) => ({
  type: "mdxJsxFlowElement",
  name,
  attributes: Object.entries(attributes).map(([k, v]) => ({ type: "mdxJsxAttribute", name: k, value: v })),
  children,
});
const heading = (value) => ({ type: "heading", depth: 2, children: [{ type: "text", value }] });

/** A section: its h2's index, and the nodes up to the next h2 (or the end). */
function section(tree, title) {
  const at = tree.children.findIndex((n) => n.type === "heading" && n.depth === 2 && text(n).trim() === title);
  if (at < 0) return undefined;
  let end = at + 1;
  while (end < tree.children.length && !(tree.children[end].type === "heading" && tree.children[end].depth <= 2)) end += 1;
  return { at, end, body: tree.children.slice(at + 1, end) };
}

export default function specs() {
  return (tree, file) => {
    const front = file.data.frontMatter ?? {};
    if (!front.spec) return;
    const w = WORDS[front.spec] ?? WORDS.en;

    // The tokens, folded: the line of them, under a summary saying how many.
    const tokens = section(tree, w.tokens);
    if (tokens) {
      const n = (text({ children: tokens.body }).match(/--al-[\w-]+/g) ?? []).length;
      tree.children.splice(tokens.at + 1, tokens.end - tokens.at - 1,
        jsx("details", {}, [jsx("summary", {}, [{ type: "text", value: w.used(n) }]), ...tokens.body]));
    }

    // Do and Don't: one section, two notices side by side.
    const dos = section(tree, w.do);
    const donts = section(tree, w.dont);
    if (dos && donts && donts.at === dos.end) {
      const notice = (name, title, body) => ({ type: "containerDirective", name, attributes: { title }, children: body });
      tree.children.splice(dos.at, donts.end - dos.at, heading(w.both),
        jsx("div", { className: "spec-dodont" }, [notice("tip", w.do, dos.body), notice("danger", w.dont, donts.body)]));
    }

    // The demos, working, before the first section.
    const demos = front.demos ?? [];
    if (demos.length) {
      const first = tree.children.findIndex((n) => n.type === "heading" && n.depth === 2);
      tree.children.splice(first < 0 ? tree.children.length : first, 0,
        ...demos.map((d) => jsx("Demo", { id: d.id, title: d.title, lang: front.spec }, [])));
    }
  };
}
