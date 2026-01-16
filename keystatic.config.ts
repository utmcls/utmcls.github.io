import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'utmcls',
      name: 'utmcls.github.io',
    },
  },
  collections: {
    // Future content types like:
    // - pages
    // - blog posts
    // - events
    // - team members
  },
});
