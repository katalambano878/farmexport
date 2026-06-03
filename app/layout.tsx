import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://africmasdakebfarmltd.com"),
  title: {
    default: "Africma’s & Dakeb Farm LTD | Premium African Agricultural Exporter",
    template: "%s | Africma’s & Dakeb Farm LTD",
  },
  description: "Your trusted partner for exporting Grade A Unrefined Shea Butter, Sesame Seeds, Soybean, Cashew Nuts, and more. Premium quality, ethically sourced from Africa.",
  keywords: [
    "Shea Butter Export", "African Agricultural Exports", "Unrefined Shea Butter",
    "Sesame Seeds Exporter", "Cashew Nuts Supply", "Soybean Export Ghana",
    "Baobab Oil", "African Farmers", "Agro Commodities", "Bulk Shea Butter",
    "Africma's & Dakeb Farm"
  ],
  authors: [{ name: "Africma’s & Dakeb Farm LTD" }],
  creator: "Africma’s & Dakeb Farm LTD",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://africmasdakebfarmltd.com",
    title: "Africma’s & Dakeb Farm LTD | Premium African Agricultural Exports",
    description: "Sourcing and exporting the finest African agricultural products including Shea Butter, Sesame, and Cashew to the global market.",
    siteName: "Africma’s & Dakeb Farm LTD",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Africma’s & Dakeb Farm LTD Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Africma’s & Dakeb Farm LTD | Premium Exports",
    description: "Exporting premium African agricultural commodities globally. Shea Butter, Sesame, Cashew, and more.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Africma’s & Dakeb Farm LTD",
              "url": "https://africmasdakebfarmltd.com",
              "logo": "https://africmasdakebfarmltd.com/images/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+233-24-820-9525",
                "contactType": "sales",
                "areaServed": "World",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.facebook.com/africmadakeb",
                "https://www.linkedin.com/company/africmadakeb",
                "https://twitter.com/africmadakeb"
              ]
            })
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
