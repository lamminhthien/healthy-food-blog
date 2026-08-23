import { NextResponse } from 'next/server';
import { findBySlug, getArticles } from '../../../lib/content';

export function GET(request: Request) {
  const articles = getArticles();
  const slug = new URL(request.url).searchParams.get('slug') ?? undefined;
  return NextResponse.json(slug ? findBySlug(articles, slug) : articles);
}
