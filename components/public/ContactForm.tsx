'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle2, MapPin, Phone, Mail, Clock, MessageSquare, Globe, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)

    // For form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSent(true)
    }

    if (isSent) {
        return (
            <div className="flex items-center justify-center py-10 w-full h-full min-h-[500px]">
                <Card className="max-w-md w-full text-center p-8 shadow-none border-none bg-transparent">
                    <CardContent className="space-y-8 pt-8">
                        <div className="mx-auto w-24 h-24 bg-green-100/50 rounded-full flex items-center justify-center text-green-600 animate-in fade-in zoom-in duration-700 ring-8 ring-green-50">
                            <CheckCircle2 className="h-12 w-12" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Message Sent!</h2>
                            <p className="text-lg text-muted-foreground">
                                Thank you for reaching out. We will get back to you within 24 hours.
                            </p>
                        </div>
                        <Button onClick={() => setIsSent(false)} size="lg" variant="outline" className="rounded-full px-8">
                            Send Another Message
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row gap-0 min-h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all hover:shadow-3xl">

            {/* Visual Sidebar (Desktop) */}
            <div className="hidden lg:block lg:w-[400px] relative overflow-hidden bg-slate-900 shrink-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <Image
                    src="/images/contact-hero-bg.png"
                    alt="Contact Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col p-8 text-white h-full justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                        <p className="text-white/80 leading-relaxed">
                            We are available for international enquiries and look forward to supplying your business with premium African produce.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-4">
                            <ContactItem
                                icon={MapPin}
                                title="Headquarters"
                                content="P.O Box Legon Accra, Ghana"
                            />
                            <div className="h-px bg-white/10" />
                            <ContactItem
                                icon={Phone}
                                title="Phone & WhatsApp"
                                content="+233 24 820 9525"
                            />
                            <div className="h-px bg-white/10" />
                            <ContactItem
                                icon={Mail}
                                title="Email Us"
                                content="ann@africmasdakebfarmltd.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-white/80">
                                <Clock className="h-4 w-4 text-primary" /> Mon - Fri: 8:00 AM - 6:00 PM (GMT)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 flex flex-col p-6 lg:p-10">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
                    <p className="text-slate-500">Fill out the form below and we'll direct your inquiry to the right department.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@company.com"
                                required
                                className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Product Inquiry, Partnership..."
                            required
                            className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2 flex-1">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="How can we help you today?"
                            className="min-h-[150px] border-slate-200 bg-slate-50 focus:bg-white transition-colors resize-none h-full"
                            required
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg h-12 rounded-lg text-lg font-medium"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending Message...' : (
                                <span className="flex items-center gap-2">Send Message <Send className="w-4 h-4" /></span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function ContactItem({ icon: Icon, title, content }: any) {
    return (
        <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
                <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{title}</p>
                <p className="text-sm font-medium text-white">{content}</p>
            </div>
        </div>
    )
}
