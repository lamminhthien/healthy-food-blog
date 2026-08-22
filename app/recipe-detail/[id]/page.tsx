import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPage } from '../../components/detail';
import { findById, getRecipes } from '../../../lib/content';

export function generateStaticParams() {
  return getRecipes().map((recipe) => ({ id: String(recipe.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const recipe = findById(getRecipes(), (await params).id);
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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const recipe = findById(getRecipes(), (await params).id);
  if (!recipe) notFound();
  return <DetailPage item={recipe} type="recipe" />;
}
