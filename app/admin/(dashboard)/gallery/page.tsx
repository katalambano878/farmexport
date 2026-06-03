import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { DeleteGalleryButton } from '@/components/admin/DeleteGalleryButton'

export const revalidate = 0

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data: galleryItems } = await supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Upload Image
        </Button>
      </div>

      {galleryItems && galleryItems.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={item.url}
                    alt={item.title || 'Gallery image'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{item.title || 'Untitled'}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.caption}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <DeleteGalleryButton itemId={item.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No gallery images yet</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Upload First Image
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


