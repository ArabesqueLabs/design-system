// Code, as the theme's; and a colour in code (a token's name, --al-color-…,
// or as the tokens' reference names it, color-…; or a value, oklch(…), #…)
// with a swatch of it before it. A token's swatch is the token itself, so
// it follows the theme.

import React from 'react';
import Code from '@theme-original/MDXComponents/Code';

const COLOUR = /^(--al-color-[\w-]+|color-[\w-]+|oklch\([^)]*\)|#[0-9a-f]{3,8})$/i;

export default function MDXCode(props) {
  const {children, className} = props;
  if (!className && typeof children === 'string' && COLOUR.test(children)) {
    const fill = children.startsWith('--') ? `var(${children})` : children.startsWith('color-') ? `var(--al-${children})` : children;
    return (
      <span className="colour-swatch">
        <span className="colour-swatch__chip" style={{background: fill}} aria-hidden="true" />
        <Code {...props} />
      </span>
    );
  }
  return <Code {...props} />;
}
