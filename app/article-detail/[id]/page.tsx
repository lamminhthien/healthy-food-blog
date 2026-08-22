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
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const image = article.seoThumbnail || article.image || '/assets/images/recipe-placeholder.svg';
  const imageUrl = image.startsWith('http') || image.startsWith('/') ? image : `/${image}`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const article = findById(getArticles(), (await params).id);
  if (!article) notFound();
  return <DetailPage item={article} type="article" />;
}
