import type { ContentBlock } from '@/lib/types';
import styles from './Accordion.module.css';

type AccordionBlock = Extract<ContentBlock, { _type: 'accordion' }>;

// Adapted from the source template with a local type and stable CMS item keys.
export function Accordion({ data }: { data: AccordionBlock }) {
  return (
    <div className={styles.accordion} data-accordion="">
      {data.items.map((item) => (
        <details key={item._key} className={styles.item} data-accordion-item="">
          <summary className={styles.heading} data-accordion-heading="">
            <span>{item.heading}</span>
            <span className={styles.indicator} data-accordion-indicator="" aria-hidden="true" />
          </summary>
          <div className={styles.content} data-accordion-content=""><p>{item.content}</p></div>
        </details>
      ))}
    </div>
  );
}
