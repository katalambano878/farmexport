import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-[var(--hero-bg)] text-slate-200">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img
                src="/images/logo.png"
                alt="Africmas Dakeb Logo"
                className="h-16 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Your trusted partner for premium Grade A Unrefined Shea Butter, Shea Oil, and agricultural exports from Africa to the world. Sustainable, ethical, and reliable.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-white/5">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-white/5">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-white/5">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Products</h4>
            <ul className="space-y-4">
              <li><Link href="/products/unrefined-shea-butter-grade-a" className="hover:text-primary transition-colors">Shea Butter (Grade A)</Link></li>
              <li><Link href="/products/shea-oil" className="hover:text-primary transition-colors">Shea Oil</Link></li>
              <li><Link href="/products/premium-grade-soybean" className="hover:text-primary transition-colors">Premium Soybean</Link></li>
              <li><Link href="/products/baobab-oil" className="hover:text-primary transition-colors">Baobab Oil</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors underline decoration-primary/50 underline-offset-4">View Full Catalogue</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/industries" className="hover:text-primary transition-colors">Industries Served</Link></li>
              <li><Link href="/export-readiness" className="hover:text-primary transition-colors">Export Process</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Market Insights</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white mb-6 text-lg">Get in Touch</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>P.O Box Legon Accra Headquarters<br />Branch: Tamale - Fou</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>+233 24 820 9525</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>ann@africmasdakebfarmltd.com</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-slate-800">
              <p className="text-sm font-medium text-white mb-2">Subscribe to Export Updates</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input placeholder="Email address" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-primary flex-1" />
                <Button className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">Join</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Africma’s & Dakeb Farm LTD. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Trade</Link>
            <a href="https://doctorbarns.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Powered By Doctor Barns Tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
