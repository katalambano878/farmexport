"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Globe2, FileCheck, Package, Beaker, ChefHat, Pill } from 'lucide-react'
import { Section, SectionHeader } from '@/components/layout/Section'
import { TrustBar } from '@/components/marketing/TrustBar'
import { IndustryCard } from '@/components/marketing/IndustryCard'
import { Steps } from '@/components/marketing/Steps'
import { ProductCard } from '@/components/marketing/ProductCard'
import { GalleryPreview } from '@/components/marketing/GalleryPreview'
import { LatestInsights } from '@/components/marketing/LatestInsights'
import { FAQSection } from '@/components/marketing/FAQSection'
import { Badge } from '@/components/ui/badge'
import { HeroSlider } from '@/components/marketing/HeroSlider'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/shared/Animations'
import { motion } from 'framer-motion'

interface HomePageProps {
  products: any[]
}

export function HomePage({ products }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />

      {/* Products We Supply */}
      <Section spacing="default" className="py-12">
        <FadeIn>
          <SectionHeader
            title="Products We Supply"
            description="Grade A, raw, unrefined agricultural products sourced directly from our network of 500+ farmers in Ghana."
            className="mb-8"
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products?.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.5} className="text-center mt-10">
          <Button variant="outline" size="lg" asChild className="h-11 px-8 text-sm font-semibold border-slate-300">
            <Link href="/products">
              View Full Catalogue <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </Section>

      {/* Industries & Applications */}
      <Section background="muted" spacing="default" className="py-12">
        <FadeIn>
          <SectionHeader
            title="Industries & Applications"
            description="Our products serve diverse global markets with stringent quality requirements."
            className="mb-8"
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StaggerItem>
            <IndustryCard
              title="Cosmetics & Skincare"
              desc="Natural ingredients for premium beauty formulations"
              icon={Beaker}
            />
          </StaggerItem>
          <StaggerItem>
            <IndustryCard
              title="Haircare Products"
              desc="Nourishing oils and butters for hair treatments"
              icon={Package}
            />
          </StaggerItem>
          <StaggerItem>
            <IndustryCard
              title="Food Manufacturing"
              desc="Food-grade ingredients for global food processors"
              icon={ChefHat}
            />
          </StaggerItem>
          <StaggerItem>
            <IndustryCard
              title="Bulk Wholesalers"
              desc="Reliable supply for distributors and trading partners"
              icon={Pill}
            />
          </StaggerItem>
        </StaggerContainer>
      </Section>

      {/* Quality & Compliance */}
      <Section spacing="default" className="py-12">
        <FadeIn>
          <SectionHeader
            title="Quality & Compliance"
            description="Every shipment meets international standards with full documentation and traceability."
            className="mb-8"
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <TrustBar />
        </FadeIn>
      </Section>

      {/* Export & Logistics Readiness */}
      <Section background="dark" spacing="default" className="py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/10 -skew-x-12 -translate-x-1/2 blur-3xl" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-white order-2 lg:order-1"
          >
            <div className="space-y-3">
              <Badge variant="outline" className="text-primary-foreground border-primary-foreground/20 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                Global Supply Chain
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
                Export & Logistics <br className="hidden lg:block" /> Readiness
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light max-w-xl">
                We handle the complexities of international trade so you can focus on your business. From documentation to delivery, we ensure seamless execution.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 sm:p-5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <h3 className="font-semibold mb-3 text-base flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-accent" />
                  Incoterms Supported
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['EXW', 'FOB', 'CIF'].map((term) => (
                    <Badge key={term} variant="secondary" className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-mono text-xs">
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Package className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-base">Shipping Options</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Flexible air freight and sea freight solutions via Tema Port, Ghana.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-base">Documentation</h3>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/70 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-accent" /> Commercial Invoice & Packing List
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-accent" /> Certificate of Origin
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-accent" /> COA / MSDS / Phytosanitary
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 font-semibold h-10 px-6 text-sm shadow-lg shadow-white/10" asChild>
                <Link href="/export-readiness">
                  Talk to Export Team <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <img
                src="/images/hero-2.png"
                alt="Global Logistics Network"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-lg shadow-lg border border-white/20 inline-flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Export Reach</p>
                    <p className="text-sm sm:text-base font-bold text-slate-900">15+ Countries Served</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[url('/images/dots.svg')] opacity-20 hidden lg:block" />
          </motion.div>
        </div>
      </Section>

      {/* How Bulk Orders Work */}
      <Section background="muted" spacing="default" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <FadeIn>
          <SectionHeader
            title="How Bulk Orders Work"
            description="A transparent, straightforward process from inquiry to delivery."
            className="mb-12 relative z-10"
          />
        </FadeIn>
        <div className="relative z-10">
          <Steps />
        </div>
        <FadeIn delay={0.5} className="text-center mt-12 relative z-10">
          <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 h-11 px-8 text-sm font-semibold" asChild>
            <Link href="/rfq">
              Start Your RFQ <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </Section>

      {/* Gallery Preview */}
      <Section spacing="default" className="py-16">
        <FadeIn>
          <SectionHeader
            title="From Farm to Port"
            description="See our operations in action. We maintain transparency at every stage of the supply chain."
            className="mb-12"
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <GalleryPreview />
        </FadeIn>
      </Section>

      {/* Market Insights */}
      <Section background="muted" spacing="default" className="py-12">
        <FadeIn>
          <SectionHeader
            title="Market Insights"
            description="Latest news, trends, and sourcing guides for agricultural commodities."
            className="mb-8"
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <LatestInsights />
        </FadeIn>
      </Section>

      {/* FAQ */}
      <Section spacing="default" className="py-12">
        <FadeIn>
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions about sourcing, shipping, and quality assurance."
            className="mb-8"
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <FAQSection />
        </FadeIn>
      </Section>
    </div>
  )
}


