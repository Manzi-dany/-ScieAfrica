'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('/')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setActiveLink(window.location.pathname)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blog' },
    { href: '/scientists', label: 'Scientists' },
    { href: '/innovations', label: 'Innovations' },
    { href: '/research', label: 'Research' },
    { href: '/news', label: 'News' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-lg shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group relative overflow-hidden"
          >
            <div className="relative transition-transform duration-300 group-hover:scale-110">
              <Image 
                src="/logo.svg" 
                alt="SciAfrica Logo" 
                width={160} 
                height={40} 
                className="h-10 w-auto"
              />
            </div>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                  activeLink === link.href
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span 
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    activeLink === link.href
                      ? 'bg-primary/10 scale-100'
                      : 'bg-primary/0 scale-75 group-hover:bg-primary/10 group-hover:scale-100'
                  }`}
                />
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    activeLink === link.href ? 'w-1/2' : 'w-0 group-hover:w-1/3'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
                ) : (
                  <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
                )}
              </Button>
            )}

            {/* Subscribe Button */}
            <Button 
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              asChild
            >
              <Link href="/contact">Subscribe</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-primary/10 rounded-full transition-all duration-300 hover:rotate-90"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 space-y-1 bg-background/95 backdrop-blur-lg rounded-2xl mt-2 p-4 border border-border">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setIsOpen(false)
                  setActiveLink(link.href)
                }}
                className={`block px-4 py-3 rounded-xl transition-all duration-300 transform ${
                  activeLink === link.href
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground/80 hover:bg-primary/5 hover:text-primary hover:translate-x-2'
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
