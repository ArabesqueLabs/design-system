// @ts-check
// The design system's documents, with Docusaurus and the Arabesque theme:
// served at /docs/ (and the Arabic at /ar/docs/), beside the rest of the
// site (the homepage, the Elements page, the examples), which
// scripts/build-react.mjs writes. scripts/sync.mjs writes the pages (docs/,
// and the Arabic in i18n/ar/) and sidebar.json from the repository's docs/;
// scripts/site.mjs, at the repository's root, puts the build in the site.

import {lightCodeTheme, darkCodeTheme} from '@arabesquelabs/docusaurus-theme-arabesque/prism';
import catalogue from '../showcase-ar.js';
import specs from './src/remark/specs.mjs';

// Docusaurus loads the config once per language it builds, and says which.
const ar = process.env.DOCUSAURUS_CURRENT_LOCALE === 'ar';
// npm run docs (docusaurus start), not a build: the rest of the site (the
// example pages the specs embed) is served from the repository (.site/, its
// links, from scripts/sync.mjs), under the base URL; built, it's the site's
// own, at its root.
const dev = process.argv.includes('start');
const SITE = 'https://design.arabesquelabs.com';
const source = 'https://github.com/ArabesqueLabs/design-system';

// A page of the site's own, from here, by its full address: Docusaurus
// would put its base URL (/docs/) before a path. Each such link says
// target: '_self', or Docusaurus opens it in a new tab, as another site's,
// and the class site-link, or it has the icon of another site's (src/css/custom.css).
const site = (path) => `${SITE}/${path}`;
const p = {
  home: site(ar ? 'ar/' : ''),
  elements: site(ar ? 'ar/elements/' : 'elements/'),
  examples: site('examples/'),
  readme: site(ar ? 'ar/README' : 'README'),
  templates: site('templates/README'),
  changelog: site('CHANGELOG'),
};

// The site's words, in Arabic from its catalogue (showcase-ar.js), as the
// homepage's header and footer say them (examples/src/site.tsx).
const t = (s) => (ar && catalogue[s]) || s;
const out = (href, text, attrs = '') => `<a href="${href}" target="_blank" rel="noopener"${attrs}>${text}</a>`;
const words = {
  name: t('Arabesque'),
  tagline: t('Arabesque, the Arabesque Labs design system'),
  blurb: t('The Arabesque Labs design system: accessible, written for right to left and left to right alike, and built for the fewest steps.'),
  // attribution: ar ? 'من منتجات معامل آرابيسك' : 'A product of Arabesque Labs',
  attribution: ar ? 'من منتجات معامل آرابيسك' : 'A product of Arabesque Labs',
  copyright: [
    `<p>${t('Made with ♥ by')} ${out('https://mosab.co.uk', t('Mosab'))} ${t('at')} ${out(ar ? 'https://arabesquelabs.com/ar/' : 'https://arabesquelabs.com', t('Arabesque Labs'))} | © <bdi>2026${years()}</bdi></p>`,
    `<p>${t('Mostly under')} ${out(`${source}/blob/main/LICENSE`, 'MIT', ' lang="en" dir="ltr"')}${t(' licence,')} ${t("except where detailed in ")} <a href="${source}/blob/main/NOTICE.md">${t('NOTICE.md')}</a></p>`,
  ].join(''),
};

/** "–2027", from 2027 on: the years since 2026. */
function years() {
  const year = new Date().getFullYear();
  return year > 2026 ? `–${year}` : '';
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: words.name,
  tagline: words.tagline,
  favicon: 'arabesque-favicon.svg',

  future: {
    v4: true,
    // Lightning CSS, minifying the Arabic (right to left), turns Docusaurus's
    // cascade layers into the polyfill for older browsers (:not(#\#)),
    // whatever the browserslist, and Infima's colours then outrank the theme's.
    faster: {lightningCssMinimizer: false},
  },

  url: SITE,
  customFields: {siteRoot: dev ? (ar ? '/ar/docs/' : '/docs/') : '/'},
  staticDirectories: dev ? ['static', '.site'] : ['static'],
  baseUrl: '/docs/',
  // As the rest of the site's folders: /docs/components/, not /docs/components.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    // The documents are CommonMark, written for GitHub, not MDX.
    format: 'md',
    hooks: {onBrokenMarkdownLinks: 'throw'},
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      // At /ar/docs/, as the site's Arabic is at /ar/. Only the component
      // specs are translated; the other documents are the English.
      ar: {label: 'العربية', direction: 'rtl', htmlLang: 'ar', baseUrl: '/ar/docs/'},
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // The documents are the whole of this site.
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Each page says where it's edited (custom_edit_url, from sync.mjs).
          // The specs: their demos, Do and Don't, and tokens laid out.
          beforeDefaultRemarkPlugins: [specs],
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    // Search, built with the docs (no service to call): an index per
    // language, at the docs' /search/ for the full results. Above the
    // sidebar on a wider screen, in the navbar on a phone.
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        language: ['en', 'ar'],
        docsRouteBasePath: '/',
        indexBlog: false,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        // Its results open from the sidebar's side (src/theme/DocSidebar).
        searchBarPosition: 'left',
      }),
    ],
    [
      '@arabesquelabs/docusaurus-theme-arabesque',
      {
        footer: {
          blurb: words.blurb,
          greeting: '',
          attribution: {label: words.attribution, href: ar ? 'https://arabesquelabs.com/ar/' : 'https://arabesquelabs.com'},
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: words.name,
        logo: {
          alt: words.name,
          src: 'arabesque-mark-ink.svg',
          srcDark: 'arabesque-mark-reversed.svg',
          href: p.home,
          target: '_self',
          width: 28,
          height: 28,
        },
        items: [
          {href: p.elements, label: t('Elements'), position: 'right', target: '_self', className: 'site-link'},
          {href: p.examples, label: t('Examples'), position: 'right', target: '_self', className: 'site-link'},
          {type: 'docSidebar', sidebarId: 'docs', label: ar ? 'التوثيق' : 'Docs', position: 'right'},
          {href: p.readme, label: t('Docs'), position: 'right', target: '_self', className: 'site-link'},
          // GitHub's mark, not its name (the theme's .al-brand-link).
          {href: source, position: 'right', className: 'al-brand-link al-brand-link--github', 'aria-label': 'GitHub'},
          {type: 'localeDropdown', position: 'right'},
          // On a phone, where the sidebar is in the menu; on a wider
          // screen, the search is above the sidebar (src/theme/DocSidebar).
          {type: 'search', position: 'right'},
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: words.name,
            items: [
              {label: t('Elements'), href: p.elements, target: '_self', className: 'site-link'},
              {label: t('Examples'), href: p.examples, target: '_self', className: 'site-link'},
              {label: t('Templates'), href: p.templates, target: '_self', className: 'site-link'},
              {label: t('Changelog'), href: p.changelog, target: '_self', className: 'site-link'},
            ],
          },
          {
            title: t('Guides'),
            items: [
              {label: t('Docs'), href: p.readme, target: '_self', className: 'site-link'},
              {label: ar ? 'التوثيق' : 'Docs', to: '/'},
              {label: t('Components'), to: '/components/'},
            ],
          },
          {
            title: t('Project'),
            items: [
              {label: 'GitHub', href: source},
              {label: t('Report a problem'), href: `${source}/issues`},
              {label: t('Licences'), href: `${source}/blob/main/NOTICE.md`},
              {label: t('Contact'), href: 'mailto:hello@arabesquelabs.com'},
            ],
          },
        ],
        copyright: words.copyright,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'tsx'],
      },
      docs: {
        sidebar: {autoCollapseCategories: false},
      },
    }),
};

export default config;
