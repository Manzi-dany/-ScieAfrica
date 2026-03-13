'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">SciAfrica</h3>
            <p className="text-sm opacity-90">
              Bridging science and innovation across Africa for sustainable development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-bold text-lg mb-4">Topics</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blogs?category=agriculture" className="hover:text-primary transition-colors">
                  Agriculture & Food
                </Link>
              </li>
              <li>
                <Link href="/blogs?category=health" className="hover:text-primary transition-colors">
                  Health & Digital Health
                </Link>
              </li>
              <li>
                <Link href="/blogs?category=emerging-tech" className="hover:text-primary transition-colors">
                  Emerging Technologies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:sciafrica@gmail.com" className="hover:text-primary transition-colors">
                  sciafrica@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-90">
              © {new Date().getFullYear()} SciAfrica. <span className="opacity-50">All rights reserved</span><Link href="/dashboard" className="opacity-0 hover:opacity-100 transition-opacity text-xs ml-1">.</Link>
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
