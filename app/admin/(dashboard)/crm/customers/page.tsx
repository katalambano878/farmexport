import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Eye, Plus, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 0

export default async function CustomersPage() {
  const supabase = await createClient()
  
  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  // Stats
  const { count: activeCount } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ACTIVE')

  const totalRevenue = customers?.reduce((sum, c) => sum + (c.total_revenue || 0), 0) || 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Active buyers and converted leads</p>
        </div>
        <Button asChild>
          <Link href="/admin/crm/customers/new">
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers && customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.company_name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{customer.contact_person}</span>
                      <span className="text-muted-foreground text-xs">{customer.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.country}</TableCell>
                  <TableCell>{customer.industry || '-'}</TableCell>
                  <TableCell>{customer.total_orders || 0}</TableCell>
                  <TableCell>${(customer.total_revenue || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/crm/customers/${customer.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No customers yet. Convert some leads first!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


