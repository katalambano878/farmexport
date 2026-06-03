import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Eye, Plus, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 0

export default async function OrdersPage() {
  const supabase = await createClient()
  
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      customer:customers(company_name, contact_person)
    `)
    .order('created_at', { ascending: false })

  // Stats
  const { count: pendingCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .in('status', ['PENDING', 'CONFIRMED', 'IN_PRODUCTION'])

  const { count: shippedCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'SHIPPED')

  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0

  const statusColors: Record<string, string> = {
    PENDING: 'secondary',
    CONFIRMED: 'default',
    IN_PRODUCTION: 'default',
    READY: 'default',
    SHIPPED: 'default',
    DELIVERED: 'default',
    CANCELLED: 'destructive',
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Confirmed sales and export orders</p>
        </div>
        <Button asChild>
          <Link href="/admin/erp/orders/new">
            <Plus className="mr-2 h-4 w-4" /> Create Order
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount || 0}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippedCount || 0}</div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm font-medium">{order.order_no}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">{order.customer?.company_name || 'N/A'}</span>
                      <span className="text-muted-foreground text-xs">{order.customer?.contact_person}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.destination_country}</TableCell>
                  <TableCell className="font-medium">
                    ${order.total_amount.toLocaleString()} {order.currency}
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.payment_status === 'PAID' ? 'default' : 'secondary'}>
                      {order.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[order.status] as any}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/erp/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No orders yet. Convert RFQs to orders!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


