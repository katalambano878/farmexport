import { createClient } from '@/lib/supabase/server'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Package, TrendingUp } from 'lucide-react'

export const revalidate = 0

export default async function InventoryPage() {
  const supabase = await createClient()
  
  const { data: inventory } = await supabase
    .from('inventory')
    .select(`
      *,
      product:products(name, slug)
    `)
    .order('updated_at', { ascending: false })

  const lowStockItems = inventory?.filter(item => 
    item.reorder_level && item.available_quantity <= item.reorder_level
  ) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">Track stock levels and manage warehouse</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventory?.reduce((sum, i) => sum + (i.reserved_quantity || 0), 0).toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">For pending orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Reserved</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Reorder Level</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory && inventory.length > 0 ? (
              inventory.map((item) => {
                const isLowStock = item.reorder_level && item.available_quantity <= item.reorder_level
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product?.name}</TableCell>
                    <TableCell className="font-semibold">{item.available_quantity}</TableCell>
                    <TableCell>{item.reserved_quantity || 0}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.reorder_level || '-'}</TableCell>
                    <TableCell>{item.warehouse_location || '-'}</TableCell>
                    <TableCell>
                      {isLowStock ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="default">In Stock</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No inventory records. Start adding stock levels!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


