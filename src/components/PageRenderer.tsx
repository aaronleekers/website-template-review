import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { Page, ContentBlock } from '@/lib/types';
import { Accordion } from './Accordion';

// Reject executable, protocol-relative, and malformed URL schemes from CMS links.
function safeHref(value: unknown): string | undefined {
  if (typeof value !== 'string' || /[\u0000-\u0020\u007f\\]/.test(value)) return undefined;
  if (/^(\/(?!\/)|#)/.test(value)) return value;
  try {
    const url = new URL(value);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = safeHref(value?.href);
      return href ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};

function Block({ block }: { block: ContentBlock }) {
  switch (block._type) {
    case 'richText':
      return <div className="prose"><PortableText value={block.content} components={portableTextComponents} /></div>;
    case 'imageBlock':
      return (
        <figure className="image-block">
          <Image
            src={block.url}
            alt={block.alt}
            width={1200}
            height={800}
            unoptimized
          />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'accordion':
      return (
        <section className="accordion-block">
          {block.title && <h2>{block.title}</h2>}
          <Accordion data={block} />
        </section>
      );
    default:
      // Unknown CMS block types are omitted until a corresponding renderer exists.
      return null;
  }
}

export function PageRenderer({ page }: { page: Page }) {
  return (
    <article className="shell page">
      <header className="page-heading">
        <p className="eyebrow">A content-driven foundation</p>
        <h1>{page.title}</h1>
        {page.description && <p className="lead">{page.description}</p>}
      </header>
      <div className="page-blocks">
        {page.blocks.map((block) => <Block key={block._key} block={block} />)}
      </div>
    </article>
  );
}
