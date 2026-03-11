'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Users, Calendar, MapPin } from 'lucide-react'

interface Innovation {
  id: string
  name: string
  description: string
  category: string
  country: string
  stage: string
  image: string | null
  website: string | null
  founders: string[]
  yearFounded: number | null
  impact: string | null
  featured: boolean
}

const categoryColors: Record<string, string> = {
  tech: 'bg-blue-100 text-blue-800',
  health: 'bg-red-100 text-red-800',
  agriculture: 'bg-green-100 text-green-800',
  energy: 'bg-yellow-100 text-yellow-800',
  biotech: 'bg-purple-100 text-purple-800',
}

const stageLabels: Record<string, string> = {
  research: 'Research',
  prototype: 'Prototype',
  commercial: 'Commercial',
}

export default function InnovationsPage() {
  const [innovations, setInnovations] = useState<Innovation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchInnovations()
  }, [selectedCategory])

  const fetchInnovations = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') params.append('category', selectedCategory)

      const response = await fetch(`/api/innovations?${params.toString()}`)
      const data = await response.json()
      setInnovations(data.innovations || [])
    } catch (error) {
      console.error('Error fetching innovations:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Innovations' },
    { id: 'tech', name: 'Technology' },
    { id: 'health', name: 'Health' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'energy', name: 'Energy' },
    { id: 'biotech', name: 'Biotech' },
  ]

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">African Innovations</h1>
          <p className="text-lg text-foreground/80 max-w-2xl">
            Explore groundbreaking innovations and startups from across the continent. From mobile money to medical devices, African innovators are solving global challenges.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:border-primary'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Innovations Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading innovations...</p>
            </div>
          ) : innovations.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">No innovations found</h3>
              <p className="text-muted-foreground">Check back soon for more innovations</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {innovations.map((innovation) => (
                <Card key={innovation.id} className="overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  {innovation.image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={innovation.image}
                        alt={innovation.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={categoryColors[innovation.category] || 'bg-gray-100'}>
                        {innovation.category}
                      </Badge>
                      <Badge variant="outline">{stageLabels[innovation.stage]}</Badge>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">{innovation.name}</h3>

                    <p className="text-sm text-foreground/80 mb-4 line-clamp-3">
                      {innovation.description}
                    </p>

                    {innovation.impact && (
                      <div className="bg-primary/5 rounded-lg p-3 mb-4">
                        <p className="text-sm text-primary font-medium">Impact</p>
                        <p className="text-sm text-foreground/80">{innovation.impact}</p>
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {innovation.country}
                      </div>

                      {innovation.founders.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {innovation.founders.join(', ')}
                        </div>
                      )}

                      {innovation.yearFounded && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Founded {innovation.yearFounded}
                        </div>
                      )}
                    </div>

                    {innovation.website && (
                      <a
                        href={innovation.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
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
