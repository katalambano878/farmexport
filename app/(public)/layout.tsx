import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'
import { RealtimeProvider } from '@/components/shared/RealtimeProvider'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RealtimeProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </RealtimeProvider>
  )
}






