import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '../../components/detail';
import { findBySlug, getRecipes } from '../../../lib/content';

export function generateStaticParams() {
  return getRecipes().map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const recipe = findBySlug(getRecipes(), (await params).slug);
  if (!recipe) return {};

  const title = recipe.seoTitle || recipe.title;
  const description = recipe.seoDescription || recipe.description;
  const image = recipe.seoThumbnail || recipe.image || '/assets/images/recipe-placeholder.svg';
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const recipe = findBySlug(getRecipes(), (await params).slug);
  if (!recipe) notFound();
  return <DetailPage item={recipe} type="recipe" />;
}
