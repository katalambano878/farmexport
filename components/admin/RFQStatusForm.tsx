'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface RFQStatusFormProps {
  rfqId: string
  currentStatus: string
  currentNotes?: string
}

const statuses = ['NEW', 'IN_PROGRESS', 'QUOTED', 'CONVERTED', 'CLOSED']

export function RFQStatusForm({ rfqId, currentStatus, currentNotes }: RFQStatusFormProps) {
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState(currentNotes || '')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('rfqs')
        .update({
          status,
          internal_notes: notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', rfqId)

      if (error) throw error

      toast.success('RFQ updated successfully')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update RFQ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Internal Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes about this RFQ..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update RFQ
      </Button>
    </form>
  )
}


