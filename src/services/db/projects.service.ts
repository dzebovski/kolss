import {type ProjectRow} from '@/src/lib/projects/projects';
import {createClient} from '@/src/lib/supabase/server';

export async function getFeaturedProjects(): Promise<ProjectRow[]> {
  try {
    const supabase = await createClient();
    const {data, error} = await supabase.from('projects').select('*').eq('is_featured', true);

    if (error) {
      console.error('[projects.service] failed to fetch featured projects:', error);
      return [];
    }

    return (data ?? []) as ProjectRow[];
  } catch (error) {
    console.error('[projects.service] unexpected error while fetching featured projects:', error);
    return [];
  }
}

export async function getAllProjects(): Promise<ProjectRow[]> {
  try {
    const supabase = await createClient();
    const {data, error} = await supabase.from('projects').select('*');

    if (error) {
      console.error('[projects.service] failed to fetch all projects:', error);
      return [];
    }

    return (data ?? []) as ProjectRow[];
  } catch (error) {
    console.error('[projects.service] unexpected error while fetching all projects:', error);
    return [];
  }
}
