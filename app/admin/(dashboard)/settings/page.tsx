import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SettingsForm } from '@/components/admin/SettingsForm'

export const revalidate = 0

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold">Site Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Update your business contact details and social media links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm settings={settings} />
        </CardContent>
      </Card>
    </div>
  )
}


