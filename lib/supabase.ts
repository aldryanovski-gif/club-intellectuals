import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

let browserClient: SupabaseClient | null = null;

/** Client for use in the browser (shared instance, keeps auth session). */
export function supabaseBrowser(): SupabaseClient {
  if (!browserClient) browserClient = createClient(url, anon);
  return browserClient;
}

/** Client for use in server components (fresh instance, no session). */
export function supabaseServer(): SupabaseClient {
  return createClient(url, anon, { auth: { persistSession: false } });
}

export type PostType = 'news' | 'event' | 'project';

export interface Post {
  id: string;
  type: PostType;
  slug: string;
  title_en: string;
  title_sk: string;
  excerpt_en: string;
  excerpt_sk: string;
  body_en: string;
  body_sk: string;
  cover_url: string | null;
  event_date: string | null;
  external_url: string | null;
  published: boolean;
  created_at: string;
}

export async function getPosts(type: PostType, limit = 50): Promise<Post[]> {
  try {
    const { data, error } = await supabaseServer()
      .from('posts')
      .select('*')
      .eq('type', type)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) return [];
    // Sort by the display date (event_date when set, created_at otherwise),
    // so posts entered later with a historical event_date keep their place.
    return (data as Post[]).sort((a, b) => {
      const da = a.event_date || a.created_at.slice(0, 10);
      const db = b.event_date || b.created_at.slice(0, 10);
      return db.localeCompare(da);
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabaseServer()
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (error) return null;
    return data as Post;
  } catch {
    return null;
  }
}
