import { Mail, MapPin, Phone, Clock, Linkedin, Twitter, Facebook } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Contact SciAfrica - Get in Touch',
  description: 'Contact SciAfrica to learn more about science and innovation in Africa',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Get in Touch with SciAfrica
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about science, innovation, or our mission? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>

              {/* Email */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:sciafrica@gmail.com"
                      className="text-primary hover:underline"
                    >
                      sciafrica@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">Africa</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                    <p className="text-foreground/80">We typically respond to inquiries within 24-48 hours during business days.</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    >
                      <option value="">Select a category</option>
                      <option value="agriculture">Agriculture & Food Innovation</option>
                      <option value="health">Health & Digital Health</option>
                      <option value="emerging-tech">Emerging Technologies</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="Tell us more..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
                <p className="text-sm text-muted-foreground mt-4">
                  We'll get back to you as soon as possible. Thank you for reaching out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">How can I contribute articles to SciAfrica?</h3>
              <p className="text-muted-foreground">
                We welcome contributions from scientists, researchers, and enthusiasts. Please reach out via email with your article proposal and we'll discuss collaboration opportunities.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">How often do you publish new content?</h3>
              <p className="text-muted-foreground">
                We aim to publish new articles and insights regularly to keep you updated on the latest developments in science and innovation across Africa.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Can I partner with SciAfrica?</h3>
              <p className="text-muted-foreground">
                Yes! We're always interested in partnerships with organizations, research institutions, and innovators. Please contact us at sciafrica@gmail.com to discuss potential collaborations.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">How do I stay updated with SciAfrica news?</h3>
              <p className="text-muted-foreground">
                Follow our social media channels and subscribe to our newsletter for the latest updates on agriculture, health, and emerging technologies in Africa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
