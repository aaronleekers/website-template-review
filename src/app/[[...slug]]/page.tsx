import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageRenderer } from '@/components/PageRenderer';
import { getPage } from '@/lib/content';

type PageProps = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug?.join('/') ?? '');
  return page ? { title: page.title, description: page.description } : { title: 'Page not found' };
}

export default async function WebsitePage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug?.join('/') ?? '');
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
