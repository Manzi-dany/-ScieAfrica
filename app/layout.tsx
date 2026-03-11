import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SciAfrica - African Science & Innovation Platform',
  description: 'Discover groundbreaking research, innovations, and scientific breakthroughs from across Africa. Explore agriculture, health, biotechnology, AI, and emerging technologies transforming the continent.',
  keywords: ['African science', 'African innovation', 'African research', 'biotechnology Africa', 'AI Africa', 'agriculture Africa', 'health Africa', 'African scientists', 'science news Africa'],
  authors: [{ name: 'SciAfrica' }],
  creator: 'SciAfrica',
  publisher: 'SciAfrica',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sciafrica.vercel.app',
    siteName: 'SciAfrica',
    title: 'SciAfrica - African Science & Innovation Platform',
    description: 'Discover groundbreaking research, innovations, and scientific breakthroughs from across Africa.',
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'SciAfrica - Science and Innovation in Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SciAfrica - African Science & Innovation Platform',
    description: 'Discover groundbreaking research, innovations, and scientific breakthroughs from across Africa.',
    images: ['/hero.jpg'],
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://sciafrica.vercel.app'),
}

export const viewport: Viewport = {
  themeColor: '#1ea853',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
