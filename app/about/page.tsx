import type { Metadata } from 'next'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Microscope, Cpu, Heart, Linkedin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - SciAfrica',
  description: 'Learn about SciAfrica mission, founders, and vision for science and innovation in Africa',
}

export default function About() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SciAfrica</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Bridging the gap between groundbreaking science and public understanding across Africa.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                SciAfrica was founded to highlight groundbreaking research, discoveries, and technological advancements happening across the African continent that often receive limited global attention. We believe that Africa's scientific contributions are transformative and deserve recognition from the world.
              </p>
              <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                From agricultural breakthroughs to digital health solutions, from biotechnology advances to emerging technologies, African scientists and innovators are driving solutions to humanity's greatest challenges. Yet these stories often go untold globally, limiting opportunities and recognition.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our platform is dedicated to amplifying these narratives, connecting groundbreaking African science with the global audience it deserves, and inspiring the next generation of African scientists and entrepreneurs to dream bigger and achieve more.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero.jpg"
                alt="SciAfrica Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Ngabo Clinton',
                role: 'Co-founder & CEO',
                background: 'Biotechnologist - Pharmaceutical & Food Industry Expertise',
                bio: 'A dedicated biotechnologist with extensive experience in pharmaceutical and food industries, Clinton brings deep expertise in quality systems, biosafety, and One Health principles. His commitment to integrating human, animal, and environmental health drives innovation across multiple sectors.',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clinton-JSUabZB7DL8Evjz82NXvRfcQs6lad9.jpeg',
                linkedIn: 'https://www.linkedin.com/in/clinton-ngabo-2a1a23287/',
              },
              {
                name: 'Manzi Dany',
                role: 'Co-founder & Operations Lead',
                background: 'Biotechnology, Data Science & Machine Learning',
                bio: 'Driven by a passion for digital health innovation and technology integration, Manzi brings a multidisciplinary background in biotechnology, data science, and machine learning to advancing healthcare solutions. With foundational training in biotechnology, he transitioned into data science and machine learning to leverage data-driven approaches for improving healthcare systems and outcomes. His work focuses on connecting digital health technologies to underserved communities, supporting smarter decision-making, and enhancing healthcare accessibility across Africa. Combining strategic planning with practical implementation, Manzi aims to bridge science, technology, and innovation to develop scalable, impact-driven healthcare solutions that improve patient care and strengthen health systems.',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-aqvMT5lphQUcRCEB51Pp8K4aZ6l1h0.jpg',
                linkedIn: 'https://www.linkedin.com/in/manzi-dany-b2842030b',
              },
            ].map((founder, index) => (
              <Card key={index} className="p-8 border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={128}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-foreground">{founder.name}</h3>
                      <a
                        href={founder.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                    <p className="text-primary font-semibold mb-1">{founder.role}</p>
                    <p className="text-sm text-foreground/60 mb-3">{founder.background}</p>
                    <p className="text-foreground/80 leading-relaxed text-sm">{founder.bio}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed">
                To highlight groundbreaking research, discoveries, and technological advancements happening across the African continent that often receive limited global attention. We amplify African scientific excellence through compelling storytelling, connecting innovators, policymakers, and the global community to recognize and support Africa's transformative contributions to science and technology.
              </p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed">
                A future where African-led science and innovation drive sustainable development, create opportunities for millions, and position the continent as a global leader in addressing humanity's greatest challenges.
              </p>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We celebrate and promote high-quality science and innovation that makes real impact.',
              },
              {
                title: 'Accessibility',
                description: 'We believe scientific knowledge should be accessible to everyone, regardless of background.',
              },
              {
                title: 'Impact',
                description: 'We focus on innovations that solve real problems and improve lives across Africa.',
              },
              {
                title: 'Collaboration',
                description: 'We foster connections between scientists, innovators, and communities for greater impact.',
              },
              {
                title: 'Integrity',
                description: 'We maintain highest standards of accuracy, transparency, and ethical reporting.',
              },
              {
                title: 'Empowerment',
                description: 'We empower the next generation of African scientists and entrepreneurs.',
              },
            ].map((value, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border text-center">
                <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 md:py-20">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Join Our Community</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Whether you're a scientist, innovator, or science enthusiast, we'd love to hear from you. Get in touch to collaborate or share your story.
            </p>
            <a
              href="/contact"
              className="inline-block bg-background text-foreground hover:bg-background/90 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
