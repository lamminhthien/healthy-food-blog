import { NextResponse } from 'next/server';
import { findById, getRecipes } from '../../../lib/content';

export function GET(request: Request) {
  const recipes = getRecipes();
  const id = new URL(request.url).searchParams.get('id') ?? undefined;
  return NextResponse.json(id ? findById(recipes, id) : recipes);
}
