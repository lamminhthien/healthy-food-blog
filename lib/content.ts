import fs from 'node:fs';
import path from 'node:path';

export type Recipe = Record<string, any> & { id: number; title: string };
export type Article = Record<string, any> & { id: number; title: string };
export type MealPlan = Record<string, any> & { title: string; description: string; shopping: string[]; days: any[] };

function readData<T>(name: string): T[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', `${name}.json`), 'utf8'));
}

export function getRecipes() {
  return readData<Recipe>('recipes');
}

export function getArticles() {
  return readData<Article>('articles');
}

export function getMealPlans() {
  return readData<MealPlan>('meal-plans');
}

export function findById<T extends { id: number }>(items: T[], id?: string) {
  return items.find((item) => String(item.id) === id) ?? items[0];
}
