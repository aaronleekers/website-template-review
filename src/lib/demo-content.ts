import type { PortableTextBlock } from '@portabletext/types';
import type { Page } from './types';

const paragraph = (key: string, text: string): PortableTextBlock => ({
  _type: 'block', _key: key, style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: `${key}-text`, text, marks: [] }],
});

// Entirely fictional local fixtures. Demo mode never contacts a content service.
export const demoPages: Page[] = [
  {
    _id: 'demo-home', slug: '', title: 'A small foundation for content-driven sites.',
    description: 'Three content blocks. One simple rendering flow. A focused website architecture sample.',
    blocks: [
      { _key: 'intro', _type: 'richText', content: [paragraph('intro-copy', 'A page is a title and an ordered list of content blocks. The same React components render these local examples or published content from your own Sanity project.')] },
      { _key: 'image', _type: 'imageBlock', url: '/demo-grid.svg', alt: 'Abstract geometric composition of blue and pale green shapes', caption: 'A local illustration included with the review sample.' },
      { _key: 'questions', _type: 'accordion', title: 'How the pieces fit', items: [
        { _key: 'routing', heading: 'Where do pages come from?', content: 'The route passes its URL path to a single content loader. Demo mode reads local fixtures; Sanity mode reads published page documents.' },
        { _key: 'blocks', heading: 'How are blocks rendered?', content: 'Each block has a type and a stable key. A small renderer chooses rich text, an image, or a native accordion.' },
        { _key: 'styles', heading: 'Where does the design live?', content: 'Presentation lives in React components and CSS. Editors control page content and block order in Sanity Studio.' },
      ] },
    ],
  },
  {
    _id: 'demo-about', slug: 'about', title: 'Built to be easy to follow.',
    description: 'A second page demonstrates the same route and renderer with different content.',
    blocks: [{ _key: 'about-copy', _type: 'richText', content: [
      paragraph('about-one', 'This repository is a reduced review edition of a larger website template. It preserves the core content-to-component architecture with a deliberately small feature set.'),
      paragraph('about-two', 'Start with the README, then follow the architecture guide from the route through the content loader to the block renderer.'),
    ] }],
  },
];
