'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ArrowRight, Leaf, Heart, Zap } from 'lucide-react'
import Link from 'next/link'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogs = () => {
      const saved = localStorage.getItem('sciafricaBlogs')
      if (saved) {
        setBlogs(JSON.parse(saved))
      }
      setLoading(false)
    }

    loadBlogs()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sciafricaBlogs') {
        loadBlogs()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Poll for changes every 2 seconds
    const interval = setInterval(() => {
      loadBlogs()
    }, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const categories = [
    { id: 'all', name: 'All Articles', icon: null },
    { id: 'agriculture', name: 'Agriculture & Food', icon: Leaf },
    { id: 'health', name: 'Health & Digital Health', icon: Heart },
    { id: 'emerging-tech', name: 'Emerging Tech', icon: Zap }
  ]

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.icon
  }

  return (
    <main className="bg-background">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog & Articles</h1>
          <p className="text-lg text-foreground/80">Discover the latest research, innovations, and insights from Africa's scientific frontier</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles yet</h3>
              <p className="text-muted-foreground">Check back soon for new content on {selectedCategory === 'all' ? 'these topics' : categories.find(c => c.id === selectedCategory)?.name}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map(blog => {
                const CategoryIcon = getCategoryIcon(blog.category)
                return (
                  <Card key={blog.id} className="group overflow-hidden border border-border hover:shadow-lg transition-all hover:border-primary">
                    {/* Image */}
                    {blog.image && (
                      <div className="relative w-full h-40 overflow-hidden bg-muted">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {CategoryIcon && (
                          <CategoryIcon className="w-4 h-4 text-primary" />
                        )}
                        <span className="text-xs font-semibold text-primary uppercase">
                          {categories.find(c => c.id === blog.category)?.name}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-foreground/80 text-sm mb-4 line-clamp-3">
                        {blog.content}
                      </p>

                      {/* Images in blog */}
                      {blog.images && blog.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {blog.images.slice(0, 2).map((img: string, idx: number) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`Article image ${idx + 1}`}
                              className="w-full h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">{blog.date}</span>
                        <Link href={`/blog/${blog.id}`} className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
