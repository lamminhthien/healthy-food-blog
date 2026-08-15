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
  return {
    title: recipe.seoTitle || recipe.title,
    description: recipe.seoDescription || recipe.description,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const recipe = findById(getRecipes(), (await params).id);
  if (!recipe) notFound();
  return <DetailPage item={recipe} type="recipe" />;
}
