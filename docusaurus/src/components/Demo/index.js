// A component working, beside its spec: its example page (examples/<id>.html)
// embedded, the demo alone (?embed: examples/src/client.tsx), in the page's
// language and theme. It says how tall it is, and follows the theme when
// it's changed here. Under it, a link to the page itself, with the demo in
// both languages.

import React, {useEffect, useRef, useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const WORDS = {
  en: {own: 'On its own page, in English and Arabic', working: (t) => `${t}, working`},
  ar: {own: 'في صفحته، بالإنجليزية والعربية', working: (t) => `${t}، يعمل`},
};

export default function Demo({id, title, lang = 'en'}) {
  const {colorMode} = useColorMode();
  const {siteConfig} = useDocusaurusContext();
  const frame = useRef(null);
  const [height, setHeight] = useState(240);
  // The site's root: its own in production, the repository (served under
  // the base URL) with npm run docs (docusaurus.config.js).
  const page = `${siteConfig.customFields.siteRoot}examples/${id}.html`;
  // The theme the page had first; after that, messages change it.
  const [first] = useState(colorMode);
  const w = WORDS[lang] ?? WORDS.en;

  useEffect(() => {
    const said = (e) => {
      if (e.source === frame.current?.contentWindow && typeof e.data?.height === 'number') setHeight(e.data.height);
    };
    window.addEventListener('message', said);
    // Loaded before this was listening: ask again (any message is answered).
    frame.current?.contentWindow?.postMessage({theme: colorMode}, '*');
    return () => window.removeEventListener('message', said);
  }, []);
  useEffect(() => {
    frame.current?.contentWindow?.postMessage({theme: colorMode}, '*');
  }, [colorMode]);

  return (
    <figure className={styles.demo}>
      <iframe
        ref={frame}
        className={styles.frame}
        src={`${page}?embed&lang=${lang}&theme=${first}`}
        title={w.working(title)}
        loading="lazy"
        style={{blockSize: `${height}px`}}
        onLoad={() => frame.current?.contentWindow?.postMessage({theme: colorMode}, '*')}
      />
      <figcaption className={styles.caption}>
        {/* eslint-disable-next-line @docusaurus/no-html-links */}
        <a href={page}>{w.own}</a>
      </figcaption>
    </figure>
  );
}
