import Image from 'next/image'

interface FeaturedSectionProps {
  title: string
  description: string
  image: string
  alt: string
  imagePosition?: 'left' | 'right'
  reverse?: boolean
}

export function FeaturedSection({
  title,
  description,
  image,
  alt,
  imagePosition = 'right',
  reverse = false,
}: FeaturedSectionProps) {
  const flexOrder = (reverse || imagePosition === 'left') ? 'md:flex-row-reverse' : 'md:flex-row'

  return (
    <section className="py-12 md:py-20">
      <div className={`flex flex-col ${flexOrder} gap-8 md:gap-12 items-center`}>
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            {title}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed text-balance">
            {description}
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 w-full">
          <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={alt}
              width={600}
              height={400}
              className="object-cover w-full h-auto"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
