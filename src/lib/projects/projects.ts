import {createClient} from '@/src/lib/supabase/server';

export type AppLocale = 'uk' | 'pl' | 'en';

export type ProjectRow = {
  id: string;
  slug: string | null;
  title_uk: string | null;
  title_pl: string | null;
  title_en: string | null;
  description_uk: string | null;
  description_pl: string | null;
  description_en: string | null;
  price_start: number | null;
  image_url: string | null;
  is_featured: boolean | null;
};

export async function getProjects() {
  const supabase = await createClient();
  const {data, error} = await supabase.from('projects').select('*');

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return (data ?? []) as ProjectRow[];
}

export function getLocalizedProjectText(project: ProjectRow, locale: AppLocale) {
  const localizedTitle =
    locale === 'pl' ? project.title_pl : locale === 'en' ? project.title_en : project.title_uk;
  const localizedDescription =
    locale === 'pl'
      ? project.description_pl
      : locale === 'en'
        ? project.description_en
        : project.description_uk;

  return {
    title: localizedTitle ?? project.title_uk ?? project.title_en ?? project.title_pl ?? 'Kitchen project',
    description:
      localizedDescription ??
      project.description_uk ??
      project.description_en ??
      project.description_pl ??
      ''
  };
}

export function normalizeLocale(input: string): AppLocale {
  if (input === 'pl' || input === 'en' || input === 'uk') {
    return input;
  }
  return 'uk';
}
