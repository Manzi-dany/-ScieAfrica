'use client'

import { useEffect, useState } from 'react'
import { ImageIcon } from 'lucide-react'

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImages = () => {
      const saved = localStorage.getItem('sciafricaImages')
      if (saved) {
        setImages(JSON.parse(saved))
      }
      setLoading(false)
    }

    loadImages()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sciafricaImages') {
        loadImages()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Poll for changes every 2 seconds
    const interval = setInterval(() => {
      loadImages()
    }, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <main className="bg-background">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Media Gallery</h1>
          <p className="text-lg text-foreground/80">Discover visual stories from African science and innovation initiatives</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-lg p-8">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Images Yet</h3>
              <p className="text-muted-foreground">Check back soon for photo galleries from our research and field initiatives</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, idx) => (
                  <div
                    key={image.id || idx}
                    onClick={() => setSelectedImage(image.src)}
                    className="relative group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
                  >
                    <img
                      src={image.src}
                      alt={`Gallery image ${idx + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">View</span>
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2">
                      {image.uploaded || 'Uploaded'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Lightbox Modal */}
              {selectedImage && (
                <div
                  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-w-4xl w-full h-auto max-h-[90vh]">
                    <img
                      src={selectedImage}
                      alt="Full size"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
