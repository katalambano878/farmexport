'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Validation schemas
const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  short_desc: z.string().optional(),
  long_desc: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
})

const productSpecsSchema = z.object({
  grade_type: z.string().optional(),
  moisture: z.string().optional(),
  purity: z.string().optional(),
  origin: z.string().default('Ghana'),
  packaging_options: z.array(z.string()).optional(),
  moq: z.string().optional(),
  shelf_life: z.string().optional(),
  lead_time: z.string().optional(),
  documentation: z.array(z.string()).optional(),
  applications: z.array(z.string()).optional(),
})

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

// Create Product
export async function createProduct(formData: {
  product: z.infer<typeof productSchema>
  specs: z.infer<typeof productSpecsSchema>
}) {
  try {
    const { supabase } = await requireAdmin()

    // Validate input
    const validProduct = productSchema.parse(formData.product)
    const validSpecs = productSpecsSchema.parse(formData.specs)

    // Check slug uniqueness
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', validProduct.slug)
      .single()

    if (existing) {
      return { success: false, error: 'A product with this slug already exists' }
    }

    // Insert product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert(validProduct)
      .select()
      .single()

    if (productError) throw productError

    // Insert specs
    const { error: specsError } = await supabase
      .from('product_specs')
      .insert({
        product_id: product.id,
        ...validSpecs,
      })

    if (specsError) throw specsError

    revalidatePath('/admin/products')
    revalidatePath('/products')
    revalidatePath('/')

    return { success: true, productId: product.id }
  } catch (error: any) {
    console.error('Create product error:', error)
    return { success: false, error: error.message }
  }
}

// Update Product
export async function updateProduct(
  productId: string,
  formData: {
    product: z.infer<typeof productSchema>
    specs: z.infer<typeof productSpecsSchema>
  }
) {
  try {
    const { supabase } = await requireAdmin()

    // Validate input
    const validProduct = productSchema.parse(formData.product)
    const validSpecs = productSpecsSchema.parse(formData.specs)

    // Check slug uniqueness (excluding current product)
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', validProduct.slug)
      .neq('id', productId)
      .single()

    if (existing) {
      return { success: false, error: 'A product with this slug already exists' }
    }

    // Update product
    const { error: productError } = await supabase
      .from('products')
      .update({ ...validProduct, updated_at: new Date().toISOString() })
      .eq('id', productId)

    if (productError) throw productError

    // Update or insert specs
    const { data: existingSpecs } = await supabase
      .from('product_specs')
      .select('id')
      .eq('product_id', productId)
      .single()

    if (existingSpecs) {
      const { error: specsError } = await supabase
        .from('product_specs')
        .update({ ...validSpecs, updated_at: new Date().toISOString() })
        .eq('product_id', productId)
      if (specsError) throw specsError
    } else {
      const { error: specsError } = await supabase
        .from('product_specs')
        .insert({ product_id: productId, ...validSpecs })
      if (specsError) throw specsError
    }

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${productId}`)
    revalidatePath('/products')
    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    console.error('Update product error:', error)
    return { success: false, error: error.message }
  }
}

// Delete Product
export async function deleteProduct(productId: string) {
  try {
    const { supabase } = await requireAdmin()

    // Delete product (cascades to specs, images, spec_sheets via FK)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)

    if (error) throw error

    revalidatePath('/admin/products')
    revalidatePath('/products')
    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    console.error('Delete product error:', error)
    return { success: false, error: error.message }
  }
}

// Toggle Product Status
export async function toggleProductStatus(productId: string, isActive: boolean) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('products')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', productId)

    if (error) throw error

    revalidatePath('/admin/products')
    revalidatePath('/products')

    return { success: true }
  } catch (error: any) {
    console.error('Toggle product status error:', error)
    return { success: false, error: error.message }
  }
}

// Toggle Featured Status
export async function toggleProductFeatured(productId: string, isFeatured: boolean) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('products')
      .update({ is_featured: isFeatured, updated_at: new Date().toISOString() })
      .eq('id', productId)

    if (error) throw error

    revalidatePath('/admin/products')
    revalidatePath('/')

    return { success: true }
  } catch (error: any) {
    console.error('Toggle featured error:', error)
    return { success: false, error: error.message }
  }
}


