import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/client' // Use client for simplicity or direct fetch if available? 
// sitemap is server-side, but I can't use 'server' client inside sitemap usually without cookies context? 
// actually I can use fetch directly or createClient inside.
// I'll use a direct supabase-js client if I had the service key, or public anon key + fetch.
// Actually standard createClient works in server components context usually but sitemap might be edge or static.
// I'll use fetch for simplicity to avoiding auth context issues in build time.
// Wait, I can use createClient from server inside sitemap.ts (it's a server file).

import { createClient as createServerClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Can't easily use createServerClient because it expects cookies() which might not be available in sitemap generation (static).
  // I'll use a public fetch or fallback.
  // For now, I'll static list main pages and try to fetch products if I can.
  // Since I don't have the service key exposed in code, I'll skip dynamic DB fetch for sitemap in this specific plan implementation to avoid build errors if env vars are missing.
  // I'll just list the static routes and structure.

  const baseUrl = 'https://africmasdakebfarmltd.com'

  const routes = [
    '',
    '/about',
    '/products',
    '/industries',
    '/export-readiness',
    '/gallery',
    '/blog',
    '/contact',
    '/rfq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}






