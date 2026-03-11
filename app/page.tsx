'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FeaturedSection } from '@/components/featured-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Leaf, Heart, Zap, ArrowRight, BookOpen, Users, Lightbulb, Search, Calendar, User } from 'lucide-react'
import Link from 'next/link'

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
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
              Science & Innovation Transforming Africa
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance">
              Exploring breakthrough discoveries in agriculture, health, biotechnology, and emerging technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg" asChild>
                <Link href="/blogs">Read Latest Research <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-3 text-lg" asChild>
                <Link href="/scientists">Explore Scientists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Articles Carousel */}
        <section className="py-12 md:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Stories</h2>
              <p className="text-foreground/70">Latest breakthroughs and discoveries from African researchers</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/blogs">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Revolutionizing Agriculture with AI-Powered Drones",
                excerpt: "How Kenyan researchers are using drone technology and machine learning to optimize crop yields and detect plant diseases early.",
                category: "Agriculture",
                author: "Dr. Amina Osei",
                date: "Mar 10, 2026",
                image: "/agriculture.jpg",
                readTime: "5 min read"
              },
              {
                title: "Breakthrough in Malaria Vaccine Development",
                excerpt: "Nigerian scientists announce promising results from Phase 2 clinical trials of a new malaria vaccine candidate.",
                category: "Health",
                author: "Prof. Kwame Asante",
                date: "Mar 8, 2026",
                image: "/health.jpg",
                readTime: "7 min read"
              },
              {
                title: "Quantum Computing Research Initiative Launches",
                excerpt: "South African universities collaborate on Africa's first quantum computing research center, opening new frontiers in computational science.",
                category: "Emerging Tech",
                author: "Dr. Nomsa Mbeki",
                date: "Mar 5, 2026",
                image: "/emerging-tech.jpg",
                readTime: "6 min read"
              }
            ].map((article, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90">{article.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href="/blogs">{article.title}</Link>
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Latest Research</h3>
                <p className="text-foreground/70 mb-4">Explore peer-reviewed articles and scientific discoveries from across Africa.</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blogs">Browse Articles <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-2">Meet Our Scientists</h3>
                <p className="text-foreground/70 mb-4">Discover profiles of leading African researchers and their groundbreaking work.</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/scientists">View Profiles <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <Lightbulb className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">Innovations</h3>
                <p className="text-foreground/70 mb-4">Explore cutting-edge technologies and startups transforming African industries.</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/innovations">Discover More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8">
          <div className="bg-muted rounded-xl p-6 md:p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Search Research & Articles</h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search articles, scientists, topics..." 
                    className="pl-10 h-12"
                  />
                </div>
                <Button size="lg">Search</Button>
              </div>
            </div>
          </div>
        </section>

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

        {/* Newsletter Section */}
        <section className="py-12 md:py-20">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Stay Ahead with African Science</h2>
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Get weekly curated stories on breakthrough research, innovative technologies, and inspiring scientists from across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/90 border-0 h-12"
              />
              <Button className="bg-background text-foreground hover:bg-background/90 h-12 px-6" asChild>
                <Link href="/contact">Subscribe Free</Link>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-4">Join 5,000+ subscribers. No spam, unsubscribe anytime.</p>
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
