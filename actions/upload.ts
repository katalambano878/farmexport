'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

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

// Upload product image
export async function uploadProductImage(productId: string, formData: FormData) {
  try {
    const { supabase } = await requireAdmin()
    
    const file = formData.get('file') as File
    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' }
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File too large. Maximum size is 5MB' }
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `${productId}/${Date.now()}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filename)

    // Get current max sort order
    const { data: images } = await supabase
      .from('product_images')
      .select('sort_order')
      .eq('product_id', productId)
      .order('sort_order', { ascending: false })
      .limit(1)

    const sortOrder = (images?.[0]?.sort_order ?? -1) + 1

    // Save image reference to database
    const { error: dbError } = await supabase
      .from('product_images')
      .insert({
        product_id: productId,
        url: publicUrl,
        sort_order: sortOrder,
      })

    if (dbError) throw dbError

    revalidatePath(`/admin/products/${productId}`)
    revalidatePath('/products')
    revalidatePath('/')

    return { success: true, url: publicUrl }
  } catch (error: any) {
    console.error('Upload product image error:', error)
    return { success: false, error: error.message }
  }
}

// Delete product image
export async function deleteProductImage(imageId: string, imageUrl: string) {
  try {
    const { supabase } = await requireAdmin()

    // Extract path from URL for storage deletion
    const urlParts = imageUrl.split('/product-images/')
    const storagePath = urlParts[1]

    if (storagePath) {
      await supabase.storage
        .from('product-images')
        .remove([storagePath])
    }

    // Delete from database
    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('id', imageId)

    if (error) throw error

    revalidatePath('/admin/products')
    revalidatePath('/products')

    return { success: true }
  } catch (error: any) {
    console.error('Delete product image error:', error)
    return { success: false, error: error.message }
  }
}

// Upload spec sheet (PDF)
export async function uploadSpecSheet(productId: string, formData: FormData) {
  try {
    const { supabase } = await requireAdmin()
    
    const file = formData.get('file') as File
    const title = formData.get('title') as string || file.name

    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return { success: false, error: 'Only PDF files are allowed for spec sheets' }
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: 'File too large. Maximum size is 10MB' }
    }

    // Generate unique filename
    const filename = `${productId}/${Date.now()}-${file.name}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('spec-sheets')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('spec-sheets')
      .getPublicUrl(filename)

    // Save spec sheet reference to database
    const { error: dbError } = await supabase
      .from('spec_sheets')
      .insert({
        product_id: productId,
        title,
        file_url: publicUrl,
      })

    if (dbError) throw dbError

    revalidatePath(`/admin/products/${productId}`)
    revalidatePath(`/products`)

    return { success: true, url: publicUrl }
  } catch (error: any) {
    console.error('Upload spec sheet error:', error)
    return { success: false, error: error.message }
  }
}

// Delete spec sheet
export async function deleteSpecSheet(specSheetId: string, fileUrl: string) {
  try {
    const { supabase } = await requireAdmin()

    // Extract path from URL for storage deletion
    const urlParts = fileUrl.split('/spec-sheets/')
    const storagePath = urlParts[1]

    if (storagePath) {
      await supabase.storage
        .from('spec-sheets')
        .remove([storagePath])
    }

    // Delete from database
    const { error } = await supabase
      .from('spec_sheets')
      .delete()
      .eq('id', specSheetId)

    if (error) throw error

    revalidatePath('/admin/products')
    revalidatePath('/products')

    return { success: true }
  } catch (error: any) {
    console.error('Delete spec sheet error:', error)
    return { success: false, error: error.message }
  }
}

// Upload gallery image
export async function uploadGalleryImage(formData: FormData) {
  try {
    const { supabase } = await requireAdmin()
    
    const file = formData.get('file') as File
    const title = formData.get('title') as string || 'Gallery Image'
    const caption = formData.get('caption') as string || ''

    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, WebP' }
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File too large. Maximum size is 5MB' }
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filename)

    // Get current max sort order
    const { data: items } = await supabase
      .from('gallery_items')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)

    const sortOrder = (items?.[0]?.sort_order ?? -1) + 1

    // Save gallery item to database
    const { error: dbError } = await supabase
      .from('gallery_items')
      .insert({
        title,
        url: publicUrl,
        caption,
        sort_order: sortOrder,
        is_active: true,
      })

    if (dbError) throw dbError

    revalidatePath('/gallery')
    revalidatePath('/')

    return { success: true, url: publicUrl }
  } catch (error: any) {
    console.error('Upload gallery image error:', error)
    return { success: false, error: error.message }
  }
}

// Upload blog cover image
export async function uploadBlogCover(formData: FormData) {
  try {
    const { supabase } = await requireAdmin()
    
    const file = formData.get('file') as File

    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, WebP' }
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File too large. Maximum size is 5MB' }
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-covers')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-covers')
      .getPublicUrl(filename)

    return { success: true, url: publicUrl }
  } catch (error: any) {
    console.error('Upload blog cover error:', error)
    return { success: false, error: error.message }
  }
}


