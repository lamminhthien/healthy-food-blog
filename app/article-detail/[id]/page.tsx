import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '../../components/detail';
import { findById, getArticles } from '../../../lib/content';

export function generateStaticParams() {
  return getArticles().map((article) => ({ id: String(article.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const article = findById(getArticles(), (await params).id);
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const article = findById(getArticles(), (await params).id);
  if (!article) notFound();
  return <DetailPage item={article} type="article" />;
}
