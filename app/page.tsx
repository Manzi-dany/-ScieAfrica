'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FeaturedSection } from '@/components/featured-section'
import { Button } from '@/components/ui/button'
import { Leaf, Heart, Zap } from 'lucide-react'

export default function Home() {
  const [featuredVideo, setFeaturedVideo] = useState<any>(null)
  const [defaultVideoId] = useState('Z0c5jeuJI40')

  useEffect(() => {
    const loadFeaturedVideo = () => {
      const saved = localStorage.getItem('sciafricaFeatured')
      if (saved) {
        setFeaturedVideo(JSON.parse(saved))
      }
    }

    loadFeaturedVideo()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sciafricaFeatured') {
        loadFeaturedVideo()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Poll for changes every 2 seconds
    const interval = setInterval(() => {
      loadFeaturedVideo()
    }, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const getVideoId = (url: string) => {
    if (!url) return defaultVideoId
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : defaultVideoId
  }

  const videoId = featuredVideo ? getVideoId(featuredVideo.videoUrl) : defaultVideoId

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen md:h-[600px] w-full overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="SciAfrica Hero - Science and Innovation in Africa"
          fill
          className="object-cover absolute inset-0"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
              Science & Innovation Transforming Africa
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance">
              Exploring breakthrough discoveries in agriculture, health, biotechnology, and emerging technologies
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg" asChild>
              <a href="#featured">Explore Now</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <section className="py-12 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Welcome to SciAfrica</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              SciAfrica highlights groundbreaking research, discoveries, and technological advancements across Africa that often receive limited global attention. We amplify the voices of African scientists and innovators, bridging the gap between cutting-edge science and the world.
            </p>
          </div>
        </section>

        {/* Featured YouTube Video */}
        <section id="featured" className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Featured Video</h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="SciAfrica Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
          {featuredVideo && (
            <p className="text-sm text-muted-foreground mt-4">Last updated: {featuredVideo.lastUpdated}</p>
          )}
        </section>

        {/* Agriculture & Food Innovation */}
        <FeaturedSection
          id="agriculture"
          title="Agriculture & Food Innovation"
          description="Discover how African farmers and scientists are revolutionizing agriculture through sustainable practices, precision farming, and biotechnology. From drought-resistant crops to innovative farming techniques, explore the innovations that are ensuring food security across the continent."
          image="/agriculture.jpg"
          alt="Agriculture Innovation in Africa"
        />

        {/* Health & Digital Health */}
        <FeaturedSection
          title="Health & Digital Health"
          description="Explore how digital health technologies and innovative medical solutions are improving healthcare access across Africa. From telemedicine platforms to AI-powered diagnostics, discover how technology is saving lives and advancing healthcare in the region."
          image="/health.jpg"
          alt="Health Innovation in Africa"
          reverse
        />

        {/* Emerging Tech & Data Science */}
        <FeaturedSection
          title="Emerging Tech & Data Science"
          description="Witness the emergence of AI, machine learning, and data science innovations driving transformation across Africa. From smart cities to data-driven solutions, explore how cutting-edge technologies are creating opportunities and solving complex problems."
          image="/emerging-tech.jpg"
          alt="Emerging Technologies in Africa"
        />

        {/* Call to Action Section */}
        <section className="py-12 md:py-20">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Stay Updated</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest science and innovation news from Africa delivered directly to your inbox.
            </p>
            <Button className="bg-background text-foreground hover:bg-background/90" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Agriculture',
                description: 'Sustainable farming innovations',
              },
              {
                icon: Heart,
                title: 'Health',
                description: 'Digital health solutions',
              },
              {
                icon: Zap,
                title: 'Emerging Tech',
                description: 'AI & Data Science',
              },
            ].map((item, index) => (
              <div key={index} className="bg-card rounded-xl p-8 text-center shadow-md border border-border">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <item.icon className="text-primary-foreground" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
