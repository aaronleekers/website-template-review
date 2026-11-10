import type { PortableTextBlock } from '@portabletext/types';

export type RichTextBlock = { _key: string; _type: 'richText'; content: PortableTextBlock[] };
export type ImageBlock = { _key: string; _type: 'imageBlock'; url: string; alt: string; caption?: string };
export type AccordionBlock = {
  _key: string; _type: 'accordion'; title?: string;
  items: { _key: string; heading: string; content: string }[];
};
export type ContentBlock = RichTextBlock | ImageBlock | AccordionBlock;
export type Page = {
  _id: string; title: string; description?: string; slug: string; blocks: ContentBlock[];
};
