# Review guide

The goal is to review the core website architecture: URL resolution, structured content, component boundaries, and the development experience. This is a reduced sample with fictional fixtures and fresh history, so it does not represent every feature or constraint of the larger application.

## Suggested reading order

| Step | Read | Question |
| --- | --- | --- |
| 1 | `README.md` | Can a new reviewer start the app without additional context? |
| 2 | `src/lib/types.ts` and `src/lib/demo-content.ts` | Is the content shape clear and easy to author? |
| 3 | `src/app/[[...slug]]/page.tsx` | Is URL handling, metadata, and 404 behavior understandable? |
| 4 | `src/lib/content.ts` | Is the source boundary explicit, and is the query narrowly scoped? |
| 5 | `src/components/PageRenderer.tsx` and `Accordion.tsx` | Are the rendering and accessibility decisions sound? |
| 6 | `src/sanity/schema.ts` and the Studio files | Do the editing model and frontend model agree? |
| 7 | `docs/ARCHITECTURE.md` | Would the extension steps work without hidden assumptions? |

## Run and inspect

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm test
```

The automated smoke test checks a built demo app over HTTP. It does not establish that a separately configured Sanity project, editor session, or every browser interaction works.

For manual review, start `npm run dev` or run `npm start` after building:

- Visit `/`, `/about`, `/studio`, and a path that does not exist.
- Resize to a narrow viewport and check text wrapping, image layout, and navigation.
- Use only the keyboard to navigate links and open or close accordion items.
- Change text and block order in `demo-content.ts` and check the output.
- Optionally connect your own public sample dataset, publish `home` and `about`, and verify that unpublished changes do not appear until publication.

## Feedback that would be most useful

- **Architecture:** Is the route → loader → renderer separation clear? Where would a new content type create unnecessary coupling?
- **Data model:** Are the schemas and TypeScript definitions aligned? Which fields would benefit from runtime validation?
- **Rendering:** Are stable keys, semantic HTML, link handling, and missing-content behavior appropriate?
- **Maintainability:** Could a developer add a fourth block using only the documentation? Are any names or boundaries misleading?
- **Performance:** What image and cache policies would you introduce when moving beyond a review sample?
- **Developer experience:** Do startup, production build, verification, and optional CMS setup have any hidden requirements?

Please distinguish a defect in the included behavior from a feature deliberately outside this edition. The absence of accounts, integrations, advanced editors, or operational workflows is part of the reduced scope.

## Dependency maintenance

The review edition pins its direct package versions and includes a lockfile. CI rejects high or critical npm audit findings. Moderate advisories in the Sanity CLI and ESLint dependency chains may still appear; inspect `npm audit` for the current report before extending or deploying the sample. Passing the audit threshold is not a guarantee that every dependency is free of vulnerabilities.

Two dependency overrides keep the YAML 3.x and TOML parsers on patched releases within their existing major versions. These cover the Sanity CLI's indirect dependencies and do not change the page content model.

## Reporting an observation

Include the file or route, the steps or code that demonstrate the issue, the expected behavior, the observed behavior, and a suggested change if you have one. Small, concrete examples are more useful than a general rewrite recommendation.

For example: “After adding an image with a different aspect ratio, its initial layout reserves the wrong height. Consider querying intrinsic dimensions and passing them to the image component.”
