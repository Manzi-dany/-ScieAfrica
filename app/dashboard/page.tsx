'use client'

import { useState, useEffect } from 'react'
import {
  Lock,
  LogOut,
  Upload,
  FileText,
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Users,
  Lightbulb,
  BarChart3,
  Cpu,
  Newspaper,
  Search,
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { AwsBraketDemo } from '@/components/aws-braket-demo'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Article {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  image: string | null
  published: boolean
  viewCount: number
  createdAt: string
}

interface Scientist {
  id: string
  name: string
  title: string
  institution: string
  country: string
  featured: boolean
}

interface Innovation {
  id: string
  name: string
  category: string
  country: string
  stage: string
  featured: boolean
}

interface NewsArticle {
  title: string
  description: string
  url: string
  publishedAt: string
  source: { name: string }
}

export default function AdminPage() {
  const { isAuthenticated, isLoading, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')

  // Data states
  const [articles, setArticles] = useState<Article[]>([])
  const [scientists, setScientists] = useState<Scientist[]>([])
  const [innovations, setInnovations] = useState<Innovation[]>([])
  const [news, setNews] = useState<NewsArticle[]>([])
  const [stats, setStats] = useState({ articles: 0, scientists: 0, innovations: 0, views: 0 })

  // Article form states
  const [showArticleForm, setShowArticleForm] = useState(false)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [articleCategory, setArticleCategory] = useState('agriculture')
  const [articleTags, setArticleTags] = useState('')
  const [articleAuthor, setArticleAuthor] = useState('')
  const [articleImage, setArticleImage] = useState('')

  // Scientist form states
  const [showScientistForm, setShowScientistForm] = useState(false)
  const [scientistName, setScientistName] = useState('')
  const [scientistTitle, setScientistTitle] = useState('')
  const [scientistInstitution, setScientistInstitution] = useState('')
  const [scientistCountry, setScientistCountry] = useState('')
  const [scientistBio, setScientistBio] = useState('')
  const [scientistResearchAreas, setScientistResearchAreas] = useState('')
  const [scientistImage, setScientistImage] = useState('')
  const [scientistLinkedIn, setScientistLinkedIn] = useState('')
  const [scientistTwitter, setScientistTwitter] = useState('')
  const [scientistPublications, setScientistPublications] = useState('0')

  // Innovation form states
  const [showInnovationForm, setShowInnovationForm] = useState(false)
  const [innovationName, setInnovationName] = useState('')
  const [innovationCategory, setInnovationCategory] = useState('')
  const [innovationCountry, setInnovationCountry] = useState('')
  const [innovationStage, setInnovationStage] = useState('')
  const [innovationDescription, setInnovationDescription] = useState('')
  const [innovationYear, setInnovationYear] = useState(new Date().getFullYear().toString())

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData()
    }
  }, [isAuthenticated])

  const loadAllData = async () => {
    try {
      // Load articles
      const articlesRes = await fetch('/api/articles')
      const articlesData = await articlesRes.json()
      setArticles(articlesData.articles || [])

      // Load scientists
      const scientistsRes = await fetch('/api/scientists')
      const scientistsData = await scientistsRes.json()
      setScientists(scientistsData.scientists || [])

      // Load innovations
      const innovationsRes = await fetch('/api/innovations')
      const innovationsData = await innovationsRes.json()
      setInnovations(innovationsData.innovations || [])

      // Load news
      const newsRes = await fetch('/api/news')
      const newsData = await newsRes.json()
      setNews(newsData.articles?.slice(0, 5) || [])

      // Calculate stats
      const totalViews = (articlesData.articles || []).reduce(
        (sum: number, a: Article) => sum + a.viewCount,
        0
      )
      setStats({
        articles: articlesData.articles?.length || 0,
        scientists: scientistsData.scientists?.length || 0,
        innovations: innovationsData.innovations?.length || 0,
        views: totalViews,
      })
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const success = await login({ email, password })
    if (!success) {
      setError('Invalid email or password')
    }
  }

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: articleTitle,
          content: articleContent,
          category: articleCategory,
          tags: articleTags.split(',').map((t) => t.trim()).filter(Boolean),
          author: articleAuthor,
          image: articleImage,
          published: true,
        }),
      })

      if (response.ok) {
        setArticleTitle('')
        setArticleContent('')
        setArticleCategory('agriculture')
        setArticleTags('')
        setArticleAuthor('')
        setArticleImage('')
        setShowArticleForm(false)
        loadAllData()
      }
    } catch (error) {
      console.error('Error creating article:', error)
    }
  }

  const handleCreateScientist = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/scientists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: scientistName,
          title: scientistTitle,
          institution: scientistInstitution,
          country: scientistCountry,
          bio: scientistBio,
          researchAreas: scientistResearchAreas.split(',').map((t) => t.trim()).filter(Boolean),
          image: scientistImage,
          linkedIn: scientistLinkedIn,
          twitter: scientistTwitter,
          publications: parseInt(scientistPublications) || 0,
          featured: false,
        }),
      })

      if (response.ok) {
        setScientistName('')
        setScientistTitle('')
        setScientistInstitution('')
        setScientistCountry('')
        setScientistBio('')
        setScientistResearchAreas('')
        setScientistImage('')
        setScientistLinkedIn('')
        setScientistTwitter('')
        setScientistPublications('0')
        setShowScientistForm(false)
        loadAllData()
      }
    } catch (error) {
      console.error('Error creating scientist:', error)
    }
  }

  const handleCreateInnovation = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/innovations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: innovationName,
          category: innovationCategory,
          country: innovationCountry,
          stage: innovationStage,
          description: innovationDescription,
          year: parseInt(innovationYear),
          featured: false,
        }),
      })

      if (response.ok) {
        setInnovationName('')
        setInnovationCategory('')
        setInnovationCountry('')
        setInnovationStage('')
        setInnovationDescription('')
        setInnovationYear(new Date().getFullYear().toString())
        setShowInnovationForm(false)
        loadAllData()
      }
    } catch (error) {
      console.error('Error creating innovation:', error)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' })
      loadAllData()
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen bg-background" />
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-2 text-foreground">Admin Login</h1>
            <p className="text-center text-muted-foreground mb-8">Access SciAfrica admin dashboard</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <Link href="/" className="text-center block text-primary hover:underline text-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome to SciAfrica Admin Panel</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'articles', label: 'Articles', icon: FileText },
            { id: 'scientists', label: 'Scientists', icon: Users },
            { id: 'innovations', label: 'Innovations', icon: Lightbulb },
            { id: 'aws', label: 'AWS Braket', icon: Cpu },
            { id: 'news', label: 'News Feed', icon: Newspaper },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-1">Total Articles</p>
                <p className="text-3xl font-bold text-primary">{stats.articles}</p>
              </Card>
              <Card className="p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-1">Scientists</p>
                <p className="text-3xl font-bold text-secondary">{stats.scientists}</p>
              </Card>
              <Card className="p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-1">Innovations</p>
                <p className="text-3xl font-bold text-accent">{stats.innovations}</p>
              </Card>
              <Card className="p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-primary">{stats.views.toLocaleString()}</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="p-6 border border-border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveTab('articles')}
              >
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Manage Articles</h3>
                <p className="text-muted-foreground text-sm">Create and edit blog posts</p>
              </Card>
              <Card
                className="p-6 border border-border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveTab('scientists')}
              >
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Manage Scientists</h3>
                <p className="text-muted-foreground text-sm">Update researcher profiles</p>
              </Card>
              <Card
                className="p-6 border border-border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveTab('innovations')}
              >
                <Lightbulb className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Manage Innovations</h3>
                <p className="text-muted-foreground text-sm">Add new innovations</p>
              </Card>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Article Management</h2>
              <button
                onClick={() => setShowArticleForm(!showArticleForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Article
              </button>
            </div>

            {showArticleForm && (
              <Card className="p-6 mb-8 border border-border">
                <form onSubmit={handleCreateArticle} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <input
                      type="text"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      placeholder="Enter article title"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={articleCategory}
                      onChange={(e) => setArticleCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="agriculture">Agriculture</option>
                      <option value="health">Health</option>
                      <option value="emerging-tech">Emerging Tech</option>
                      <option value="biotech">Biotech</option>
                      <option value="ai">AI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Author</label>
                    <input
                      type="text"
                      value={articleAuthor}
                      onChange={(e) => setArticleAuthor(e.target.value)}
                      placeholder="Enter author name"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Image URL (optional)</label>
                    <input
                      type="text"
                      value={articleImage}
                      onChange={(e) => setArticleImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={articleTags}
                      onChange={(e) => setArticleTags(e.target.value)}
                      placeholder="e.g., research, innovation, africa"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Content</label>
                    <textarea
                      value={articleContent}
                      onChange={(e) => setArticleContent(e.target.value)}
                      placeholder="Write your article content..."
                      rows={8}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors"
                    >
                      Publish Article
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowArticleForm(false)}
                      className="bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Card>
            )}

            <div className="space-y-4">
              {articles.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No articles yet.</p>
              ) : (
                articles.map((article) => (
                  <Card key={article.id} className="p-6 border border-border">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {article.viewCount} views
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{article.title}</h3>
                        <p className="text-foreground/70 line-clamp-2">{article.content}</p>
                        {article.tags.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {article.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Scientists Tab */}
        {activeTab === 'scientists' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Scientist Profiles</h2>
              <button
                onClick={() => setShowScientistForm(!showScientistForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Scientist
              </button>
            </div>

            {showScientistForm && (
              <Card className="p-6 mb-8 border border-border">
                <h3 className="text-lg font-semibold mb-4">Add New Scientist</h3>
                <form onSubmit={handleCreateScientist} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={scientistName}
                        onChange={(e) => setScientistName(e.target.value)}
                        placeholder="Dr. Jane Doe"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Title/Position *</label>
                      <input
                        type="text"
                        value={scientistTitle}
                        onChange={(e) => setScientistTitle(e.target.value)}
                        placeholder="Senior Researcher"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Institution *</label>
                      <input
                        type="text"
                        value={scientistInstitution}
                        onChange={(e) => setScientistInstitution(e.target.value)}
                        placeholder="University of Nairobi"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                      <select
                        value={scientistCountry}
                        onChange={(e) => setScientistCountry(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select country</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Cameroon">Cameroon</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bio *</label>
                    <textarea
                      value={scientistBio}
                      onChange={(e) => setScientistBio(e.target.value)}
                      placeholder="Brief biography and research focus..."
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Research Areas (comma-separated)</label>
                    <input
                      type="text"
                      value={scientistResearchAreas}
                      onChange={(e) => setScientistResearchAreas(e.target.value)}
                      placeholder="e.g., Biotechnology, Agriculture, Climate Science"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Profile Image URL</label>
                      <input
                        type="text"
                        value={scientistImage}
                        onChange={(e) => setScientistImage(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">LinkedIn URL</label>
                      <input
                        type="text"
                        value={scientistLinkedIn}
                        onChange={(e) => setScientistLinkedIn(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Twitter URL</label>
                      <input
                        type="text"
                        value={scientistTwitter}
                        onChange={(e) => setScientistTwitter(e.target.value)}
                        placeholder="https://twitter.com/..."
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Number of Publications</label>
                    <input
                      type="number"
                      value={scientistPublications}
                      onChange={(e) => setScientistPublications(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors"
                    >
                      Add Scientist
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowScientistForm(false)}
                      className="bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scientists.map((scientist) => (
                <Card key={scientist.id} className="p-4 border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{scientist.name}</h3>
                      <p className="text-sm text-primary">{scientist.title}</p>
                      <p className="text-sm text-muted-foreground">{scientist.institution}</p>
                      <p className="text-sm text-muted-foreground">{scientist.country}</p>
                    </div>
                    {scientist.featured && <Badge>Featured</Badge>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Innovations Tab */}
        {activeTab === 'innovations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Innovations</h2>
              <button
                onClick={() => setShowInnovationForm(!showInnovationForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Innovation
              </button>
            </div>

            {showInnovationForm && (
              <Card className="p-6 mb-8 border border-border">
                <h3 className="text-lg font-semibold mb-4">Add New Innovation</h3>
                <form onSubmit={handleCreateInnovation} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Innovation Name *</label>
                      <input
                        type="text"
                        value={innovationName}
                        onChange={(e) => setInnovationName(e.target.value)}
                        placeholder="e.g., Solar-Powered Water Purifier"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                      <select
                        value={innovationCategory}
                        onChange={(e) => setInnovationCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Health">Health</option>
                        <option value="Energy">Energy</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Environment">Environment</option>
                        <option value="AI & Technology">AI & Technology</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                      <select
                        value={innovationCountry}
                        onChange={(e) => setInnovationCountry(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select country</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Cameroon">Cameroon</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Stage *</label>
                      <select
                        value={innovationStage}
                        onChange={(e) => setInnovationStage(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select stage</option>
                        <option value="Concept">Concept</option>
                        <option value="Prototype">Prototype</option>
                        <option value="Pilot">Pilot</option>
                        <option value="Growth">Growth</option>
                        <option value="Scale">Scale</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Year *</label>
                      <input
                        type="number"
                        value={innovationYear}
                        onChange={(e) => setInnovationYear(e.target.value)}
                        placeholder="2026"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                    <textarea
                      value={innovationDescription}
                      onChange={(e) => setInnovationDescription(e.target.value)}
                      placeholder="Describe the innovation, its impact, and how it works..."
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors"
                    >
                      Add Innovation
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInnovationForm(false)}
                      className="bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {innovations.map((innovation) => (
                <Card key={innovation.id} className="p-4 border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{innovation.name}</h3>
                      <p className="text-sm text-primary">{innovation.category}</p>
                      <p className="text-sm text-muted-foreground">{innovation.country}</p>
                      <Badge variant="outline" className="mt-2">
                        {innovation.stage}
                      </Badge>
                    </div>
                    {innovation.featured && <Badge>Featured</Badge>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* AWS Braket Tab */}
        {activeTab === 'aws' && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">AWS Braket Integration</h2>
            <AwsBraketDemo />
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">African Science News Feed</h2>
            <div className="space-y-4">
              {news.map((article, idx) => (
                <Card key={idx} className="p-4 border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{article.source.name}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{article.title}</h3>
                      <p className="text-sm text-foreground/70">{article.description}</p>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 ml-4"
                    >
                      <Search className="w-5 h-5" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
