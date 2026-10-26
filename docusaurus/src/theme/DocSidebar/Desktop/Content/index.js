// The docs' sidebar, as the theme's, with the search above it (on a wider
// screen: on a phone, the sidebar is in the navbar's menu, and the search
// is in the navbar; src/css/custom.css hides the navbar's otherwise).

import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import SearchBar from '@theme/SearchBar';

export default function DocSidebarDesktopContent(props) {
  return (
    <>
      <div className="sidebar-search">
        <SearchBar />
      </div>
      <Content {...props} />
    </>
  );
}
