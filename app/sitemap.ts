import type { MetadataRoute } from 'next';
import { getRecipes, getArticles, getMealPlans } from '../lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://healthy-food-blog.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/recipes`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/meal-prep`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const recipes = getRecipes().map((r) => ({
    url: `${SITE_URL}/recipe-detail/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articles = getArticles().map((a) => ({
    url: `${SITE_URL}/article-detail/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const mealPlans = getMealPlans().map((_m, idx) => ({
    url: `${SITE_URL}/meal-prep#plan-${idx + 1}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...recipes, ...articles, ...mealPlans];
}
