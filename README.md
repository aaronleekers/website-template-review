# Website Template Review Edition

A compact Next.js and Sanity website sample, prepared for code review. It shows how a URL becomes a content query, how structured content selects React components, and how editors can manage pages without changing application code.

This is a deliberately reduced edition of a larger template. The public repository starts with fresh Git history and contains fictional sample content. It is intended to make the core architecture easy to evaluate.

## What is included

| Feature | Implementation |
| --- | --- |
| Content-driven pages | Next.js App Router with one optional catch-all route |
| Two content sources | Local demo fixtures or your own public Sanity sample dataset |
| Three blocks | Portable Text, image with caption, and accessible native accordion |
| Basic SEO | Per-page title and description |
| Content editing | Sanity Studio at `/studio`, enabled only when configured |
| Styling | Plain CSS, a small shared layout, and an accordion CSS module |
| Verification | Lint, TypeScript checks, and a production HTTP smoke test |

The edition does not include the larger application's integrations, operational tools, account systems, or advanced editing features. There are no application API routes or content-write endpoints.

## Start locally

Use Node.js 22.14 or newer in the 22.x line (see [`.nvmrc`](.nvmrc)) and npm.

```sh
git clone https://github.com/aaronleekers/website-template-review.git
cd website-template-review
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No account, environment file, API key, or CMS is needed for the default demo.

| Route | Default behavior |
| --- | --- |
| `/` | Example homepage using all three blocks |
| `/about` | Second page using the same loader and renderer |
| `/studio` | Setup instructions until a Sanity project is configured |
| Any unknown path | HTTP 404 and the custom not-found page |

Edit [`src/lib/demo-content.ts`](src/lib/demo-content.ts) to change the local pages. Demo mode makes no CMS requests. The illustration is a local SVG.

## How it works

1. [`src/app/[[...slug]]/page.tsx`](src/app/[[...slug]]/page.tsx) turns URL segments into a path and requests the matching page. The same loader supplies metadata.
2. [`src/lib/content.ts`](src/lib/content.ts) chooses local fixtures or a published-only Sanity query and returns a common `Page` shape.
3. [`src/components/PageRenderer.tsx`](src/components/PageRenderer.tsx) renders the page heading and selects a component for each block's `_type`.
4. [`src/lib/types.ts`](src/lib/types.ts) describes the shared content contract. [`src/sanity/schema.ts`](src/sanity/schema.ts) describes the corresponding editing interface.

Editors own content and block order. React and CSS own presentation. Adding another page requires content; adding another kind of block requires schema, type, query, and rendering changes.

Read [Architecture](docs/ARCHITECTURE.md) for the full flow and a block-extension walkthrough. The [Review guide](docs/REVIEW_GUIDE.md) provides a suggested reading order and concrete review questions.

## Optional: connect your own Sanity project

Use a separate **public dataset containing sample content only**. This edition reads without a token and does not support private datasets or draft previews.

1. Create or select your own project and public dataset in [Sanity Manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env.local` and fill in:

   ```dotenv
   NEXT_PUBLIC_CONTENT_SOURCE=sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset
   ```

3. In the project's API settings, add `http://localhost:3000` as a CORS origin and allow credentials for Studio sign-in. For a hosted copy, add its exact origin as well.
4. Restart the development server. Visit `/studio` and sign in with a Sanity account that has access to your project.
5. Create and **publish** a Page document with slug `home`. Add blocks, then open `/`. Create `about` for `/about`; a slug such as `guides/getting-started` maps to that nested path.

`studio` and its descendants belong to the editor, so do not use them as content slugs. The website renders published documents only. An unpublished or missing page returns 404; a CMS configuration or connection failure surfaces as an error rather than silently showing demo content.

The `NEXT_PUBLIC_` values are browser-visible configuration, not secrets. Do not add tokens or connect this sample to private operational content. `.env.local` is ignored by Git.

Studio uses Sanity's own authenticated editing session. The website's server loader only reads content. Published reads bypass the Sanity CDN and use `cache: 'no-store'`; this edition has no webhook, persistent content cache, or preview pipeline.

## Verify the production app

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

Run the checks in demo mode for the included smoke test. `npm test` starts a production server against the completed build, makes HTTP requests, and stops the server afterward. Use `npm start` separately to inspect the production app manually.

## Design choices and limits

- The routing, content-loader boundary, `_type` block dispatch, and native accordion are adapted from the larger template. Other pieces have been simplified for this edition.
- TypeScript defines the expected data shape; it is not full runtime validation of arbitrary CMS records. Schema validation and explicit query projections keep the sample small and understandable.
- Rich-text links are filtered to supported URL schemes. Unknown block types are omitted until a renderer is added.
- The image block uses unoptimized images and a simple fixed size hint. Production image dimensions, optimization, and cache policy are review topics, not completed platform features.
- This is a focused review sample, not a production deployment checklist or the full product.

## Usage

Published for inspection and review. No open-source license or general reuse permission is granted by this repository. Contact the owner before using it in another project.
