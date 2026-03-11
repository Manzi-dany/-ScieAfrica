'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Linkedin, Twitter, BookOpen, MapPin, Search, Award, ExternalLink, Mail, Globe } from 'lucide-react'
import Link from 'next/link'

interface Scientist {
  id: string
  name: string
  title: string
  institution: string
  bio: string
  researchAreas: string[]
  image: string | null
  linkedIn: string | null
  twitter: string | null
  publications: number
  country: string
  featured: boolean
}

export default function ScientistsPage() {
  const [scientists, setScientists] = useState<Scientist[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedArea, setSelectedArea] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchScientists()
  }, [selectedCountry, selectedArea])

  const fetchScientists = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCountry !== 'all') params.append('country', selectedCountry)
      if (selectedArea !== 'all') params.append('area', selectedArea)

      const response = await fetch(`/api/scientists?${params.toString()}`)
      const data = await response.json()
      setScientists(data.scientists || [])
    } catch (error) {
      console.error('Error fetching scientists:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredScientists = scientists.filter(scientist => 
    searchQuery === '' || 
    scientist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scientist.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scientist.researchAreas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const countries = ['all', 'Kenya', 'Nigeria', 'South Africa', 'Mauritius', 'Cameroon', 'Ghana', 'Egypt', 'Morocco', 'Rwanda', 'Ethiopia', 'Tunisia', 'Uganda', 'Tanzania']
  const researchAreas = ['all', 'Biotechnology', 'Agriculture', 'Health', 'AI & Data Science', 'Climate Science', 'Renewable Energy', 'Quantum Computing']

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">African Scientists</h1>
          <p className="text-lg text-foreground/80 max-w-2xl">
            Discover the brilliant minds driving scientific innovation across Africa. From biotechnology to quantum computing, these researchers are shaping the future.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 border-b border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search scientists by name, expertise, or research area..."
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Country Filter */}
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Filter by Country:</p>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCountry === country
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {country === 'all' ? 'All Countries' : country}
                </button>
              ))}
            </div>
          </div>
          
          {/* Research Area Filter */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Filter by Research Area:</p>
            <div className="flex flex-wrap gap-2">
              {researchAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedArea === area
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-card border border-border text-foreground hover:border-secondary'
                  }`}
                >
                  {area === 'all' ? 'All Areas' : area}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scientists Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading scientists...</p>
            </div>
          ) : filteredScientists.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">No scientists found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScientists.map((scientist) => (
                <Card key={scientist.id} className="overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group">
                  {/* Header with Image */}
                  <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
                    <div className="absolute -bottom-10 left-6">
                      <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          {scientist.image ? (
                            <Image
                              src={scientist.image}
                              alt={scientist.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-primary">
                              {scientist.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {scientist.featured && (
                      <Badge className="absolute top-4 right-4 bg-amber-500 text-white">
                        <Award className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="pt-12 pb-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{scientist.name}</h3>
                      <p className="text-sm text-primary font-medium">{scientist.title}</p>
                      <p className="text-sm text-muted-foreground">{scientist.institution}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        {scientist.country}
                      </div>
                    </div>

                    <p className="text-sm text-foreground/80 mb-4 line-clamp-3">
                      {scientist.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {scientist.researchAreas.slice(0, 3).map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{scientist.publications} publications</span>
                      </div>
                      <div className="flex gap-2">
                        {scientist.linkedIn && (
                          <a
                            href={scientist.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {scientist.twitter && (
                          <a
                            href={scientist.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
