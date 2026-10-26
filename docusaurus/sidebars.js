// @ts-check
// The documents, in the order they're read: the introduction, the guides,
// the foundations, the components (in the order of their index's table:
// sidebar.json, from scripts/sync.mjs), the generated references, and the
// project's own. Each page's label is its title; the categories' are
// translated in i18n/ar/docusaurus-plugin-content-docs/current.json.

import sidebar from './sidebar.json' with {type: 'json'};

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'README',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: ['principles', 'interaction', 'patterns', 'accessibility', 'screen-readers', 'rtl', 'react'],
    },
    {
      type: 'category',
      label: 'Foundations',
      items: ['colour', 'typography', 'space-and-shape', 'layout', 'iconography', 'motion', 'writing'].map((f) => `foundations/${f}`),
    },
    {
      type: 'category',
      label: 'Components',
      link: {type: 'doc', id: 'components/README'},
      items: sidebar.components,
    },
    {
      type: 'category',
      label: 'Reference',
      items: ['tokens', 'helpers', 'contrast'],
    },
    {
      type: 'category',
      label: 'Project',
      items: ['adoption', 'audit'],
    },
  ],
};

export default sidebars;
