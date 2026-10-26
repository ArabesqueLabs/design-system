// The documents' links, as the theme's, but those to the rest of the site
// (https://design.arabesquelabs.com/README, the examples, a document in the
// other language: scripts/sync.mjs writes them so), which go there as an
// ordinary link, in the same tab. Docusaurus would otherwise take them for
// another site's, and open them in a new one; and it puts its base URL
// (/docs/) before any path of the site's own.

import React from 'react';
import A from '@theme-original/MDXComponents/A';

const SITE = 'https://design.arabesquelabs.com';

export default function MDXA(props) {
  const {href} = props;
  if (href?.startsWith(`${SITE}/`)) {
    // eslint-disable-next-line @docusaurus/no-html-links
    return <a {...props} href={href.slice(SITE.length)} />;
  }
  return <A {...props} />;
}
