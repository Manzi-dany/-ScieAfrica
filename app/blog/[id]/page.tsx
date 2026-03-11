'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Leaf, Zap, Share2, Download, FileText } from 'lucide-react'

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [blogId, setBlogId] = useState<string | null>(null)

  useEffect(() => {
    // Resolve the params promise
    Promise.resolve(params).then((resolvedParams) => {
      setBlogId(resolvedParams.id)
    })
  }, [params])

  useEffect(() => {
    if (!blogId) return

    const loadBlog = () => {
      const saved = localStorage.getItem('sciafricaBlogs')
      if (saved) {
        const blogs = JSON.parse(saved)
        const id = parseInt(blogId)
        console.log('[v0] Looking for blog ID:', id)
        console.log('[v0] Available blogs:', blogs.map((b: any) => b.id))
        const foundBlog = blogs.find((b: any) => b.id === id)
        setBlog(foundBlog)
        if (!foundBlog) {
          console.log('[v0] Blog not found with ID:', id)
        } else {
          console.log('[v0] Blog found:', foundBlog.title)
        }
      } else {
        console.log('[v0] No blogs in localStorage')
      }
      setLoading(false)
    }

    // Small delay to ensure localStorage is ready
    setTimeout(loadBlog, 100)

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sciafricaBlogs') {
        loadBlog()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [blogId])

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'agriculture':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
      case 'health':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
      case 'emerging-tech':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
      default:
        return { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'agriculture':
        return Leaf
      case 'health':
        return Heart
      case 'emerging-tech':
        return Zap
      default:
        return null
    }
  }

  if (loading) {
    return (
      <main className="bg-background">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <p className="text-center text-muted-foreground">Loading article...</p>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="bg-background">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
            <Link href="/blogs" className="text-primary hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const CategoryIcon = getCategoryIcon(blog.category)
  const colors = getCategoryColor(blog.category)

  return (
    <main className="bg-background">
      {/* Header with back button */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blogs" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Category Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${colors.bg} ${colors.text} border ${colors.border}`}>
            {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
            <span className="font-semibold text-sm uppercase">{blog.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-between pb-8 border-b border-border mb-8">
            <span className="text-muted-foreground">{blog.date}</span>
            <button className="text-primary hover:text-primary/80 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content with embedded images */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-wrap mb-6">
              {blog.content}
            </p>

            {/* Embedded Images */}
            {blog.images && blog.images.length > 0 && (
              <div className="my-8 space-y-6">
                {blog.images.map((img: string, idx: number) => (
                  <figure key={idx} className="my-8">
                    <img
                      src={img}
                      alt={`Article image ${idx + 1}`}
                      className="w-full rounded-lg shadow-md"
                    />
                    <figcaption className="text-center text-sm text-muted-foreground mt-2">
                      Figure {idx + 1}: Illustration from the article
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>

          {/* PDF Attachment Section */}
          {blog.pdf && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Download Full Document</h3>
                    <p className="text-sm text-muted-foreground">{blog.pdf.name}</p>
                  </div>
                </div>
                <a
                  href={blog.pdf.data}
                  download={blog.pdf.name}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="pt-8 border-t border-border">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
