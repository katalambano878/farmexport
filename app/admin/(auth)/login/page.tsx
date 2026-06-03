'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2, Mail, KeyRound } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Email + Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check if user is admin
      const { data: adminData } = await supabase
        .from('admins')
        .select('email')
        .eq('email', email)
        .single()

      if (!adminData) {
        await supabase.auth.signOut()
        throw new Error('Unauthorized: Not an admin user')
      }

      toast.success('Login successful!')
      router.push('/admin')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // Magic Link Login
  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Only allow existing users (admins)
          emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
        },
      })

      if (error) throw error

      toast.success('Check your email for the login link!')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password" className="gap-2">
                <KeyRound className="h-4 w-4" />
                Password
              </TabsTrigger>
              <TabsTrigger value="magic-link" className="gap-2">
                <Mail className="h-4 w-4" />
                Magic Link
              </TabsTrigger>
            </TabsList>

            {/* Password Login Tab */}
            <TabsContent value="password">
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-password">Email</Label>
                  <Input
                    id="email-password"
                    type="email"
                    placeholder="ann@africmasdakebfarmltd.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* Magic Link Tab */}
            <TabsContent value="magic-link">
              <form onSubmit={handleMagicLinkLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-magic">Email</Label>
                  <Input
                    id="email-magic"
                    type="email"
                    placeholder="ann@africmasdakebfarmltd.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-slate-500">
                    We'll send a magic link to your email
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Magic Link
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}





