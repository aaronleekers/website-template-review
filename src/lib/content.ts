import 'server-only';
import { cache } from 'react';
import { createClient } from '@sanity/client';
import { demoPages } from './demo-content';
import type { Page } from './types';

// Explicit projection: extra fields in a CMS document do not enter the page payload.
export const pageQuery = `*[
  _type == "page" && slug.current == $slug && !(_id in path("drafts.**"))
][0]{
  _id, title, description, "slug": slug.current,
  "blocks": coalesce(blocks[_type in ["richText", "imageBlock", "accordion"]]{
    _key, _type,
    _type == "richText" => {content},
    _type == "imageBlock" => {"url": asset->url, alt, caption},
    _type == "accordion" => {title, items[]{_key, heading, content}}
  }, [])
}`;

export const getPage = cache(async (path: string): Promise<Page | null> => {
  const source = process.env.NEXT_PUBLIC_CONTENT_SOURCE || 'demo';
  if (source === 'demo') return demoPages.find((page) => page.slug === path) ?? null;
  if (source !== 'sanity') throw new Error('NEXT_PUBLIC_CONTENT_SOURCE must be demo or sanity.');

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !/^[a-z0-9]+$/.test(projectId) || !dataset || !/^[a-z0-9_-]+$/.test(dataset)) {
    throw new Error('Sanity mode needs your own valid project ID and dataset. See .env.example.');
  }
  const client = createClient({
    projectId, dataset, apiVersion: '2026-01-01',
    useCdn: false, perspective: 'published',
  });
  // No credentials, drafts, writes or live project defaults. Public sample datasets only.
  return client.fetch<Page | null>(pageQuery, { slug: path || 'home' }, { cache: 'no-store' });
});
