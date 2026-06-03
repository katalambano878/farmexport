'use client'

import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'

interface DeleteGalleryButtonProps {
  itemId: string
}

export function DeleteGalleryButton({ itemId }: DeleteGalleryButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this image?')) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error

      toast.success('Image deleted successfully')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  )
}


