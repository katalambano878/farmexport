import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Eye, Plus, Ship } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 0

export default async function ShipmentsPage() {
  const supabase = await createClient()
  
  const { data: shipments } = await supabase
    .from('shipments')
    .select(`
      *,
      order:orders(order_no, customer:customers(company_name))
    `)
    .order('created_at', { ascending: false })

  // Stats
  const { count: inTransitCount } = await supabase
    .from('shipments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'IN_TRANSIT')

  const { count: preparingCount } = await supabase
    .from('shipments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PREPARING')

  const statusColors: Record<string, string> = {
    PREPARING: 'secondary',
    IN_TRANSIT: 'default',
    ARRIVED: 'default',
    CLEARED: 'default',
    DELIVERED: 'default',
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Shipments</h1>
          <p className="text-muted-foreground">Track export logistics and deliveries</p>
        </div>
        <Button asChild>
          <Link href="/admin/erp/shipments/new">
            <Plus className="mr-2 h-4 w-4" /> New Shipment
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preparing</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{preparingCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Ship className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inTransitCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Ship className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment No</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Container</TableHead>
              <TableHead>ETD / ETA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments && shipments.length > 0 ? (
              shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-mono text-sm font-medium">{shipment.shipment_no}</TableCell>
                  <TableCell>{shipment.order?.order_no || 'N/A'}</TableCell>
                  <TableCell>{shipment.order?.customer?.company_name || 'N/A'}</TableCell>
                  <TableCell>{shipment.destination_port}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{shipment.container_no || 'TBD'}</span>
                      <span className="text-muted-foreground text-xs">{shipment.container_type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>ETD: {shipment.etd ? new Date(shipment.etd).toLocaleDateString() : 'TBD'}</span>
                      <span className="text-muted-foreground text-xs">
                        ETA: {shipment.eta ? new Date(shipment.eta).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[shipment.status] as any}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/erp/shipments/${shipment.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No shipments yet. Create your first export shipment!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


