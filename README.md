## Goals
The website should, in (subjective) order of priority

1. Be easy to maintain across years as execs and website devs change
2. Allow non-devs to edit content easily
3. Be low-cost, preferably free
4. Optimize for speed and SEO (search-engine optimization)
5. Reflect the unique brand of UTMCLS

## High level Architecture of Site
The site should be built as a static website, which means pages are generated build-time and served as plain HTML/CSS/JS

This meets objectives 1, 3, and 4

- Results in simple code and fast page loads
- No server needed
- Allows for web crawlers to easily read site content

## Tech Stack
### Web Framework: [Astro](https://astro.build)
*(Next JS was considered, but violates objective 1 and probably 3)*

- Meant for content-oriented sites
- Supports static websites (SSR is also supported, but does not work with Github Pages)
- Light on the javascript, but supports "islands" where stuff like react components can be inserted

### Content Management System: Keystatic
*(A CMS is software that helps users manage digital content without needing to code. Supports objective 2)*

- Content lives in the GitHub repository as text files. Added bonus of version history with Git
- Instead of editing the raw files, provides a form-based UI
- Completely free, unless we use Keystatic Cloud (we won't)

### Hosting: Github Pages

- What was decided from the start
- Free monetarily and also hassle-free (objectives 1 and 3)

### Styling: Tailwind CSS

- My personal favorite (not agenda)
- Faster and less confusing development compared to alternatives, supports objective 1
- Does not sacrifice on performance due to CSS transpilation at build-time, as well as tree-shaking to remove excess CSS

## Design System

- Centralized guidelines for website design stored on [Figma](https://www.figma.com/design/3KOSWwaepsSyVpOp1NHZCQ/UTMCLS-Website-Design?node-id=0-1&t=IrtWVQYqnnXwDZW0-1), reducing design hesitancy and design drift. Supports objective 1 and 5
- Colors, typography, canonical layout, components all fall under this umbrella
- Allows for tight integration with the graphics team, supporting objective 5
