import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Calendar, Clock, ChevronRight, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as motion from "framer-motion/client"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Insights & News | Africma\'s & Dakeb Farm LTD',
    description: 'Latest updates on agricultural trends, export markets, and sustainable farming practices. Stay informed on the Shea, Cocoa, and Grain markets.',
    openGraph: {
        title: 'Insights & News | Africma\'s & Dakeb Farm LTD',
        description: 'Latest updates on agricultural trends, export markets, and sustainable farming practices.',
        url: 'https://africmasdakebfarmltd.com/blog',
    },
    alternates: {
        canonical: 'https://africmasdakebfarmltd.com/blog',
    }
}

// Mock data until Supabase table is connected
const blogs = [
    {
        id: 1,
        title: "The Rising Demand for Organic Shea Butter in Europe",
        excerpt: "Analysis of the current market trends showing a 15% increase in demand for unrefined shea butter across the EU market.",
        category: "Market Trends",
        author: "Kwame Asante",
        date: "Dec 12, 2025",
        readTime: "5 min read",
        image: "/images/shea-butter.png"
    },
    {
        id: 2,
        title: "Sustainable Soybeans: Our Farm-to-Table Process",
        excerpt: "How our new tracking system ensures 100% traceability for our non-GMO soybean exports.",
        category: "Sustainability",
        author: "Ama Mensah",
        date: "Nov 28, 2025",
        readTime: "4 min read",
        image: "/images/industry-food.png"
    },
    {
        id: 3,
        title: "Understanding Incoterms: A Guide for New Importers",
        excerpt: "Breaking down the differences between FOB, CIF, and EXW to help you choose the right shipping term for your business.",
        category: "Logistics",
        author: "John Doe",
        date: "Nov 15, 2025",
        readTime: "8 min read",
        image: "/images/export-ready-hero-bg.png"
    },
    {
        id: 4,
        title: "Health Benefits of Baobab Oil in Skincare",
        excerpt: "Why cosmetic giants are turning to this African super-fruit oil for their new anti-aging product lines.",
        category: "Product Spotlight",
        author: "Sarah Osei",
        date: "Oct 30, 2025",
        readTime: "6 min read",
        image: "/images/baobab-oil.png"
    },
    {
        id: 5,
        title: "Expanding Our Network: New Partnerships in Asia",
        excerpt: "We are excited to announce our new distribution hubs opening in Singapore and Tokyo later this year.",
        category: "Company News",
        author: "Kwame Asante",
        date: "Oct 12, 2025",
        readTime: "3 min read",
        image: "/images/rfq-hero-bg.png"
    },
    {
        id: 6,
        title: "2026 Harvest Forecast: What to Expect",
        excerpt: "Early indicators suggest a bumper harvest for cashews and shea nuts. Here is what this means for pricing.",
        category: "Market Trends",
        author: "Ama Mensah",
        date: "Sep 25, 2025",
        readTime: "5 min read",
        image: "/images/gallery-hero-bg.png"
    }
]

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[450px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/blog-hero-bg.png"
                        alt="Agricultural Insights"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <Container className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
                            Insights & <span className="text-primary-foreground">News</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Stay updated with the latest trends in global agriculture, export logistics, and sustainable farming.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <Section spacing="loose">
                <Container>
                    {/* Featured / Filter Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b pb-6">
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                            {['All', 'Market Trends', 'Sustainability', 'Logistics', 'Company News'].map((cat, i) => (
                                <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm" className="rounded-full">
                                    {cat}
                                </Button>
                            ))}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            Showing {blogs.length} articles
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Card className="h-full flex flex-col hover:shadow-lg transition-all group border-none bg-muted/30 overflow-hidden">
                                    <div className="relative aspect-video overflow-hidden bg-slate-200">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                        <Badge className="absolute top-4 left-4 z-10 bg-primary/90 hover:bg-primary backdrop-blur-sm">{post.category}</Badge>
                                    </div>

                                    <CardHeader className="p-6 pb-3 space-y-3">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            <Link href={`/blog/${post.id}`} className="hover:underline focus:outline-none">
                                                {post.title}
                                            </Link>
                                        </h3>
                                    </CardHeader>

                                    <CardContent className="p-6 py-0 flex-1">
                                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="p-6 pt-6 border-t mt-6 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-muted-foreground">
                                                <User className="w-4 h-4" />
                                            </div>
                                            {post.author}
                                        </div>
                                        <Button variant="ghost" size="sm" className="group/btn" asChild>
                                            <Link href={`/blog/${post.id}`}>
                                                Read <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="min-w-[200px]">
                            Load More Articles
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    )
}
