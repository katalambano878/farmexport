'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface SettingsFormProps {
  settings: any
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    business_name: settings?.business_name || '',
    phone: settings?.phone || '',
    whatsapp: settings?.whatsapp || '',
    email: settings?.email || '',
    address: settings?.address || '',
    linkedin: settings?.socials?.linkedin || '',
    facebook: settings?.socials?.facebook || '',
    instagram: settings?.socials?.instagram || '',
    twitter: settings?.socials?.twitter || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        business_name: formData.business_name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        socials: {
          linkedin: formData.linkedin,
          facebook: formData.facebook,
          instagram: formData.instagram,
          twitter: formData.twitter,
        },
        updated_at: new Date().toISOString(),
      }

      if (settings?.id) {
        // Update existing
        const { error } = await supabase
          .from('site_settings')
          .update(payload)
          .eq('id', settings.id)

        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase
          .from('site_settings')
          .insert([payload])

        if (error) throw error
      }

      toast.success('Settings saved successfully!')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="business_name">Business Name</Label>
          <Input
            id="business_name"
            value={formData.business_name}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
          />
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-4">Social Media</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/company/..."
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                type="url"
                placeholder="https://facebook.com/..."
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                type="url"
                placeholder="https://instagram.com/..."
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter/X URL</Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/..."
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Settings
      </Button>
    </form>
  )
}


