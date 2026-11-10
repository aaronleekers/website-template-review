import { StudioClient } from '@/components/StudioClient';

export const dynamic = 'force-dynamic';

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const isConfigured = process.env.NEXT_PUBLIC_CONTENT_SOURCE === 'sanity'
    && /^[a-z0-9]+$/.test(projectId ?? '')
    && /^[a-z0-9_-]+$/.test(dataset ?? '');

  if (!isConfigured) {
    return (
      <section className="shell message-page">
        <p className="eyebrow">Content editing</p>
        <h1>Connect your own Sanity project.</h1>
        <p>The review edition runs with local example content by default. Follow the README to configure your own project and open its Studio here.</p>
      </section>
    );
  }

  return <div className="studio-container"><StudioClient /></div>;
}
