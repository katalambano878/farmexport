import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Eye, Plus, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 0

export default async function LeadsPage() {
  const supabase = await createClient()
  
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  // Stats
  const { count: newCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'NEW')

  const { count: qualifiedCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'QUALIFIED')

  const { count: convertedCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'CONVERTED')

  const statusColors: Record<string, string> = {
    NEW: 'default',
    CONTACTED: 'secondary',
    QUALIFIED: 'default',
    CONVERTED: 'default',
    LOST: 'destructive',
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage your sales pipeline and potential customers</p>
        </div>
        <Button asChild>
          <Link href="/admin/crm/leads/new">
            <Plus className="mr-2 h-4 w-4" /> Add Lead
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newCount || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting first contact</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualifiedCount || 0}</div>
            <p className="text-xs text-muted-foreground">Hot prospects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertedCount || 0}</div>
            <p className="text-xs text-muted-foreground">Became customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Est. Value</TableHead>
              <TableHead>Next Follow-up</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads && leads.length > 0 ? (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.company_name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{lead.contact_person}</span>
                      <span className="text-muted-foreground text-xs">{lead.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.country}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.source || 'Unknown'}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[lead.status] as any}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {lead.estimated_value 
                      ? `$${lead.estimated_value.toLocaleString()}`
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {lead.next_follow_up_date 
                      ? new Date(lead.next_follow_up_date).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/crm/leads/${lead.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No leads yet. Start adding potential customers!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


