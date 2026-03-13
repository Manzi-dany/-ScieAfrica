'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { FeaturedSection } from '@/components/featured-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Leaf, Heart, Zap, ArrowRight, BookOpen, Users, Lightbulb, Search, Calendar, User, Play, TrendingUp, Microscope } from 'lucide-react'
import Link from 'next/link'

// Hook for scroll animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

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
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="SciAfrica Hero - Science and Innovation in Africa"
          fill
          className="object-cover absolute inset-0"
          priority
        />
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6 animate-fade-in">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium text-sm">Leading African Science Platform</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance animate-fade-in-up">
              Science & Innovation{' '}
              <span className="gradient-text">Transforming</span>{' '}
              Africa
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-10 text-balance max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover breakthrough discoveries in agriculture, health, biotechnology, and emerging technologies shaping the future of our continent.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shine-hover animate-pulse-glow transition-all duration-300 hover:-translate-y-1" 
                asChild
              >
                <Link href="/blogs">
                  Explore Research 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-1" 
                asChild
              >
                <Link href="/scientists">
                  <Microscope className="mr-2 h-5 w-5" />
                  Meet Scientists
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {[
                { value: '500+', label: 'Research Articles' },
                { value: '200+', label: 'Scientists' },
                { value: '50+', label: 'Innovations' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Articles Carousel */}
        <section className="py-20 md:py-32">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Featured <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-foreground/70 text-lg">Latest breakthroughs and discoveries from African researchers</p>
            </div>
            <Button 
              variant="outline" 
              asChild 
              className="hidden sm:flex rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              <Link href="/blogs">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Card 
                key={index} 
                className="group overflow-hidden hover-lift border-0 shadow-lg bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm shadow-lg">
                    {article.category}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button size="sm" className="w-full bg-white/90 text-foreground hover:bg-white rounded-full">
                      <Play className="h-4 w-4 mr-2" /> Read Article
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    <Link href="/blogs">{article.title}</Link>
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{article.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Latest Research",
                description: "Explore peer-reviewed articles and scientific discoveries from across Africa.",
                href: "/blogs",
                gradient: "from-primary/20 to-primary/5",
                borderColor: "border-primary/30",
                iconBg: "bg-primary/10",
              },
              {
                icon: Users,
                title: "Meet Our Scientists",
                description: "Discover profiles of leading African researchers and their groundbreaking work.",
                href: "/scientists",
                gradient: "from-emerald-500/20 to-emerald-500/5",
                borderColor: "border-emerald-500/30",
                iconBg: "bg-emerald-500/10",
              },
              {
                icon: Lightbulb,
                title: "Innovations",
                description: "Explore cutting-edge technologies and startups transforming African industries.",
                href: "/innovations",
                gradient: "from-teal-500/20 to-teal-500/5",
                borderColor: "border-teal-500/30",
                iconBg: "bg-teal-500/10",
              },
            ].map((item, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden bg-gradient-to-br ${item.gradient} ${item.borderColor} border-2 hover-lift cursor-pointer`}
              >
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-foreground/70 mb-6 text-lg">{item.description}</p>
                  <Button 
                    variant="outline" 
                    className="rounded-full group/btn border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" 
                    asChild
                  >
                    <Link href={item.href}>
                      Explore 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
                {/* Hover glow effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
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
        <section className="py-20 md:py-32">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-600 to-teal-600" />
            
            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative z-10 p-8 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Stay Ahead with <span className="text-emerald-200">African Science</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get weekly curated stories on breakthrough research, innovative technologies, and inspiring scientists from across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/95 border-0 h-14 rounded-full px-6 text-lg shadow-xl"
                />
                <Button 
                  className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-8 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" 
                  asChild
                >
                  <Link href="/contact">Subscribe Free</Link>
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-6">Join 5,000+ subscribers. No spam, unsubscribe anytime.</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Focus Areas</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Exploring the key sectors driving Africa's scientific and technological transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Agriculture',
                description: 'Sustainable farming innovations and food security solutions',
                color: 'from-green-500 to-emerald-600',
                stats: '150+ Projects',
              },
              {
                icon: Heart,
                title: 'Health',
                description: 'Digital health solutions and medical breakthroughs',
                color: 'from-rose-500 to-pink-600',
                stats: '200+ Research',
              },
              {
                icon: Zap,
                title: 'Emerging Tech',
                description: 'AI, Data Science, and cutting-edge technologies',
                color: 'from-amber-500 to-orange-600',
                stats: '100+ Innovations',
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-card rounded-3xl p-8 text-center border border-border hover-lift overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
                      <item.icon className="text-white" size={32} />
                    </div>
                  </div>
                  
                  <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    {item.stats}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-foreground/70 text-lg">{item.description}</p>
                  
                  <Button 
                    variant="ghost" 
                    className="mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                    asChild
                  >
                    <Link href="/blogs">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
