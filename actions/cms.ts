'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Helper to check admin status
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized: Not logged in')
  }

  const { data: admin } = await supabase
    .from('admins')
    .select('email')
    .eq('email', user.email!)
    .single()

  if (!admin) {
    throw new Error('Unauthorized: Not an admin')
  }

  return { supabase, user }
}

// Update page section content
export async function updatePageSection(sectionId: string, content: Record<string, any>) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('page_sections')
      .update({ 
        content, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', sectionId)

    if (error) throw error

    // Revalidate all public pages that might use CMS content
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/industries')
    revalidatePath('/export-readiness')
    revalidatePath('/admin/cms')

    return { success: true }
  } catch (error: any) {
    console.error('Update page section error:', error)
    return { success: false, error: error.message }
  }
}

// Create new page section
export async function createPageSection(data: {
  page_key: string
  title: string
  content: Record<string, any>
}) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('page_sections')
      .insert(data)

    if (error) throw error

    revalidatePath('/admin/cms')
    return { success: true }
  } catch (error: any) {
    console.error('Create page section error:', error)
    return { success: false, error: error.message }
  }
}

// Delete page section
export async function deletePageSection(sectionId: string) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('page_sections')
      .delete()
      .eq('id', sectionId)

    if (error) throw error

    revalidatePath('/admin/cms')
    return { success: true }
  } catch (error: any) {
    console.error('Delete page section error:', error)
    return { success: false, error: error.message }
  }
}

// Update site settings
export async function updateSiteSettings(settings: {
  business_name?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  socials?: Record<string, string>
  seo_defaults?: Record<string, string>
  gsc_verification_code?: string
  ga_measurement_id?: string
}) {
  try {
    const { supabase } = await requireAdmin()

    // Get existing settings ID
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .single()

    if (existing) {
      const { error } = await supabase
        .from('site_settings')
        .update({ ...settings, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('site_settings')
        .insert(settings)
      if (error) throw error
    }

    // Revalidate all pages that use site settings
    revalidatePath('/', 'layout')

    return { success: true }
  } catch (error: any) {
    console.error('Update site settings error:', error)
    return { success: false, error: error.message }
  }
}

// Gallery management
export async function addGalleryItem(data: {
  title: string
  url: string
  caption?: string
  sort_order?: number
}) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('gallery_items')
      .insert({ ...data, is_active: true })

    if (error) throw error

    revalidatePath('/gallery')
    revalidatePath('/admin/cms')
    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    console.error('Add gallery item error:', error)
    return { success: false, error: error.message }
  }
}

export async function updateGalleryItem(itemId: string, data: {
  title?: string
  url?: string
  caption?: string
  sort_order?: number
  is_active?: boolean
}) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('gallery_items')
      .update(data)
      .eq('id', itemId)

    if (error) throw error

    revalidatePath('/gallery')
    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    console.error('Update gallery item error:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteGalleryItem(itemId: string) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', itemId)

    if (error) throw error

    revalidatePath('/gallery')
    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    console.error('Delete gallery item error:', error)
    return { success: false, error: error.message }
  }
}

// Blog post management
export async function createBlogPost(data: {
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_image_url?: string
  tags?: string[]
  is_published?: boolean
}) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('blog_posts')
      .insert({
        ...data,
        published_at: data.is_published ? new Date().toISOString() : null,
      })

    if (error) throw error

    revalidatePath('/blog')
    revalidatePath('/admin/cms')

    return { success: true }
  } catch (error: any) {
    console.error('Create blog post error:', error)
    return { success: false, error: error.message }
  }
}

export async function updateBlogPost(postId: string, data: {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  cover_image_url?: string
  tags?: string[]
  is_published?: boolean
}) {
  try {
    const { supabase } = await requireAdmin()

    const updateData: any = {
      ...data,
      updated_at: new Date().toISOString(),
    }

    // Set published_at if publishing for the first time
    if (data.is_published) {
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('published_at')
        .eq('id', postId)
        .single()
      
      if (!existing?.published_at) {
        updateData.published_at = new Date().toISOString()
      }
    }

    const { error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', postId)

    if (error) throw error

    revalidatePath('/blog')
    revalidatePath(`/blog/${data.slug}`)

    return { success: true }
  } catch (error: any) {
    console.error('Update blog post error:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteBlogPost(postId: string) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId)

    if (error) throw error

    revalidatePath('/blog')

    return { success: true }
  } catch (error: any) {
    console.error('Delete blog post error:', error)
    return { success: false, error: error.message }
  }
}


