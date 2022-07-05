import React from 'react';
import DocPaginator from '@theme-original/DocPaginator';
import { DiscussionEmbed } from 'disqus-react';

export default function DocPaginatorWrapper(props) {
  return (
    <>
      <DocPaginator {...props} />
      <DiscussionEmbed
        shortname='casdoor'
        config={
          {
            language: 'en'
          }
        }
      />
    </>
  );
}
