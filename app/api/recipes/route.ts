import { NextResponse } from 'next/server';
import { findBySlug, getRecipes } from '../../../lib/content';

export function GET(request: Request) {
  const recipes = getRecipes();
  const slug = new URL(request.url).searchParams.get('slug') ?? undefined;
  return NextResponse.json(slug ? findBySlug(recipes, slug) : recipes);
}
