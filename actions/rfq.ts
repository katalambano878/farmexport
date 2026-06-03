'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Validation schema for RFQ submission
const rfqSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  company_name: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  role: z.string().optional(),
  destination_country: z.string().min(2, 'Destination country is required'),
  incoterm: z.string().optional(),
  timeline: z.string().optional(),
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    qty: z.string(),
    packaging: z.string().optional(),
  })).min(1, 'At least one product must be selected'),
  intended_use: z.string().optional(),
  require_coa: z.boolean().default(false),
  notes: z.string().optional(),
})

// RFQ status enum
const rfqStatusSchema = z.enum(['NEW', 'CONTACTED', 'QUOTED', 'NEGOTIATING', 'WON', 'LOST', 'CANCELLED'])

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

// Submit new RFQ (public)
export async function submitRFQ(formData: {
  full_name: string
  company_name: string
  email: string
  phone?: string
  whatsapp?: string
  role?: string
  destination_country: string
  incoterm?: string
  timeline?: string
  products: Array<{ id: string; name: string; qty: string; packaging?: string }>
  intended_use?: string
  require_coa?: boolean
  notes?: string
}) {
  try {
    const supabase = await createClient()
    
    // Validate input
    const validData = rfqSchema.parse(formData)

    // Generate RFQ No (format: RFQ-YYYYMMDD-XXXX)
    const date = new Date()
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase()
    const rfqNo = `RFQ-${dateStr}-${randomStr}`

    const { data, error } = await supabase.from('rfqs').insert({
      rfq_no: rfqNo,
      full_name: validData.full_name,
      company_name: validData.company_name,
      email: validData.email,
      phone: validData.phone,
      whatsapp: validData.whatsapp,
      role: validData.role,
      destination_country: validData.destination_country,
      incoterm: validData.incoterm,
      timeline: validData.timeline,
      requested_products: validData.products,
      compliance_needs: {
        intended_use: validData.intended_use,
        require_coa: validData.require_coa,
      },
      notes: validData.notes,
      status: 'NEW',
    }).select().single()

    if (error) {
      console.error('RFQ submission error:', error)
      return { success: false, error: 'Failed to submit RFQ. Please try again.' }
    }

    // Send email notification (if Resend is configured)
    await sendRFQNotification(data)

    revalidatePath('/admin/rfq')
    return { success: true, rfqNo }
  } catch (error: any) {
    console.error('RFQ Error:', error)
    if (error instanceof z.ZodError) {
      const issues = error.issues || []
      return { success: false, error: issues[0]?.message || 'Validation error' }
    }
    return { success: false, error: error.message }
  }
}

// Update RFQ status (admin only)
export async function updateRFQStatus(rfqId: string, status: z.infer<typeof rfqStatusSchema>) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('rfqs')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', rfqId)

    if (error) throw error

    revalidatePath('/admin/rfq')
    return { success: true }
  } catch (error: any) {
    console.error('Update RFQ status error:', error)
    return { success: false, error: error.message }
  }
}

// Add internal notes to RFQ (admin only)
export async function updateRFQNotes(rfqId: string, internalNotes: string) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('rfqs')
      .update({ internal_notes: internalNotes, updated_at: new Date().toISOString() })
      .eq('id', rfqId)

    if (error) throw error

    revalidatePath('/admin/rfq')
    return { success: true }
  } catch (error: any) {
    console.error('Update RFQ notes error:', error)
    return { success: false, error: error.message }
  }
}

// Delete RFQ (admin only)
export async function deleteRFQ(rfqId: string) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('rfqs')
      .delete()
      .eq('id', rfqId)

    if (error) throw error

    revalidatePath('/admin/rfq')
    return { success: true }
  } catch (error: any) {
    console.error('Delete RFQ error:', error)
    return { success: false, error: error.message }
  }
}

// Get RFQ details (admin only)
export async function getRFQDetails(rfqId: string) {
  try {
    const { supabase } = await requireAdmin()

    const { data, error } = await supabase
      .from('rfqs')
      .select('*')
      .eq('id', rfqId)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    console.error('Get RFQ error:', error)
    return { success: false, error: error.message }
  }
}

// Send email notification for new RFQ
async function sendRFQNotification(rfq: any) {
  const resendApiKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL || 'export@africmadakeb.com'

  if (!resendApiKey) {
    console.log('Resend API key not configured, skipping email notification')
    return
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FarmExport <noreply@africmadakeb.com>',
        to: [adminEmail],
        subject: `New RFQ Received: ${rfq.rfq_no}`,
        html: `
          <h2>New Request for Quote</h2>
          <p><strong>RFQ Number:</strong> ${rfq.rfq_no}</p>
          <p><strong>Company:</strong> ${rfq.company_name}</p>
          <p><strong>Contact:</strong> ${rfq.full_name}</p>
          <p><strong>Email:</strong> ${rfq.email}</p>
          <p><strong>Phone:</strong> ${rfq.phone || 'Not provided'}</p>
          <p><strong>Destination:</strong> ${rfq.destination_country}</p>
          <p><strong>Incoterm:</strong> ${rfq.incoterm || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${rfq.timeline || 'Not specified'}</p>
          <h3>Requested Products:</h3>
          <ul>
            ${rfq.requested_products?.map((p: any) => `<li>${p.name} - Qty: ${p.qty}</li>`).join('') || 'None specified'}
          </ul>
          <p><strong>Notes:</strong> ${rfq.notes || 'None'}</p>
          <hr>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://farmexport-wuck.vercel.app'}/admin/rfq">View in Admin Dashboard</a></p>
        `,
      }),
    })

    if (!response.ok) {
      console.error('Failed to send email:', await response.text())
    }
  } catch (error) {
    console.error('Email notification error:', error)
  }
}

// Send confirmation email to customer
export async function sendRFQConfirmation(rfqId: string) {
  try {
    const { supabase } = await requireAdmin()
    
    const { data: rfq, error } = await supabase
      .from('rfqs')
      .select('*')
      .eq('id', rfqId)
      .single()

    if (error || !rfq) throw new Error('RFQ not found')

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return { success: false, error: 'Email service not configured' }
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Africma\'s & Dakeb Farm LTD <export@africmadakeb.com>',
        to: [rfq.email],
        subject: `Your Quote Request ${rfq.rfq_no} - Africma's & Dakeb Farm LTD`,
        html: `
          <h2>Thank You for Your Inquiry</h2>
          <p>Dear ${rfq.full_name},</p>
          <p>We have received your request for quote (Reference: <strong>${rfq.rfq_no}</strong>).</p>
          <p>Our export team will review your requirements and get back to you within 24-48 business hours with a detailed quotation.</p>
          <h3>Your Request Summary:</h3>
          <ul>
            ${rfq.requested_products?.map((p: any) => `<li>${p.name} - Qty: ${p.qty}</li>`).join('') || ''}
          </ul>
          <p><strong>Destination:</strong> ${rfq.destination_country}</p>
          <p>If you have any urgent questions, please contact us at:</p>
          <p>📧 export@africmadakeb.com<br>📞 +233 24 820 9525</p>
          <p>Best regards,<br>The Export Team<br>Africma's & Dakeb Farm LTD</p>
        `,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send confirmation email')
    }

    // Update RFQ status to CONTACTED
    await supabase
      .from('rfqs')
      .update({ status: 'CONTACTED', updated_at: new Date().toISOString() })
      .eq('id', rfqId)

    revalidatePath('/admin/rfq')
    return { success: true }
  } catch (error: any) {
    console.error('Send confirmation error:', error)
    return { success: false, error: error.message }
  }
}

