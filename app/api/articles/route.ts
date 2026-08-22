import { NextResponse } from 'next/server';
import { findById, getArticles } from '../../../lib/content';

export function GET(request: Request) {
  const articles = getArticles();
  const id = new URL(request.url).searchParams.get('id') ?? undefined;
  return NextResponse.json(id ? findById(articles, id) : articles);
}
