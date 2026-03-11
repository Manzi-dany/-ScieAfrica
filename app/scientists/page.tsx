'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Twitter, BookOpen, MapPin } from 'lucide-react'
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

  useEffect(() => {
    fetchScientists()
  }, [selectedCountry])

  const fetchScientists = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCountry !== 'all') params.append('country', selectedCountry)

      const response = await fetch(`/api/scientists?${params.toString()}`)
      const data = await response.json()
      setScientists(data.scientists || [])
    } catch (error) {
      console.error('Error fetching scientists:', error)
    } finally {
      setLoading(false)
    }
  }

  const countries = ['all', 'Kenya', 'Nigeria', 'South Africa', 'Mauritius', 'Cameroon', 'Ghana', 'Egypt', 'Morocco', 'Rwanda', 'Ethiopia', 'Tunisia', 'Uganda', 'Tanzania']

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

      {/* Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
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
      </section>

      {/* Scientists Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading scientists...</p>
            </div>
          ) : scientists.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">No scientists found</h3>
              <p className="text-muted-foreground">Check back soon for more profiles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scientists.map((scientist) => (
                <Card key={scientist.id} className="p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {scientist.image ? (
                        <img
                          src={scientist.image}
                          alt={scientist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-primary">
                          {scientist.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{scientist.name}</h3>
                      <p className="text-sm text-primary">{scientist.title}</p>
                      <p className="text-sm text-muted-foreground">{scientist.institution}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {scientist.country}
                      </div>
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
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {scientist.twitter && (
                        <a
                          href={scientist.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
