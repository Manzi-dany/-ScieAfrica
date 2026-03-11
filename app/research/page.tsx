'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Users } from 'lucide-react'

const COLORS = ['#1ea853', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export default function ResearchPage() {
  const [publicationsData, setPublicationsData] = useState<any[]>([])
  const [growthData, setGrowthData] = useState<any[]>([])
  const [fundingData, setFundingData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllStats()
  }, [])

  const fetchAllStats = async () => {
    try {
      // Fetch publications by country
      const pubResponse = await fetch('/api/stats/aggregated?type=publications-by-country')
      const pubData = await pubResponse.json()
      if (pubData.data) {
        setPublicationsData(
          pubData.data.labels.map((label: string, i: number) => ({
            country: label,
            publications: pubData.data.values[i],
          }))
        )
      }

      // Fetch growth by category
      const growthResponse = await fetch('/api/stats/aggregated?type=growth-by-category')
      const growthResult = await growthResponse.json()
      if (growthResult.data) {
        const categories = Object.keys(growthResult.data)
        const years = growthResult.data[categories[0]]?.years || [2019, 2020, 2021, 2022, 2023]
        const formatted = years.map((year: number, i: number) => {
          const point: any = { year }
          categories.forEach((cat) => {
            point[cat] = growthResult.data[cat].values[i]
          })
          return point
        })
        setGrowthData(formatted)
      }

      // Fetch funding by country
      const fundingResponse = await fetch('/api/stats/aggregated?type=funding-by-country')
      const fundingResult = await fundingResponse.json()
      if (fundingResult.data) {
        setFundingData(
          fundingResult.data.labels.map((label: string, i: number) => ({
            country: label,
            funding: fundingResult.data.values[i],
          }))
        )
      }

      // Fetch category distribution
      const catResponse = await fetch('/api/stats/aggregated?type=category-distribution')
      const catResult = await catResponse.json()
      if (catResult.data) {
        setCategoryData(
          catResult.data.labels.map((label: string, i: number) => ({
            name: label.charAt(0).toUpperCase() + label.slice(1),
            value: catResult.data.values[i],
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Research Statistics</h1>
          <p className="text-lg text-foreground/80 max-w-2xl">
            Explore data and insights on African scientific research output, funding trends, and innovation growth across the continent.
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">350K+</p>
              <p className="text-sm text-muted-foreground">Research Publications (2023)</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">$2.2B</p>
              <p className="text-sm text-muted-foreground">R&D Investment</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">267K</p>
              <p className="text-sm text-muted-foreground">Researchers</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <PieChartIcon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">12K+</p>
              <p className="text-sm text-muted-foreground">Patents Filed</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs defaultValue="publications" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="growth">Growth Trends</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="publications">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Publications by Country (2023)</h3>
                {loading ? (
                  <div className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading data...</p>
                  </div>
                ) : (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={publicationsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="country" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="publications" fill="#1ea853" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="growth">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Growth by Category (2019-2023)</h3>
                {loading ? (
                  <div className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading data...</p>
                  </div>
                ) : (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="agriculture" stroke="#1ea853" strokeWidth={2} />
                        <Line type="monotone" dataKey="health" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="tech" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="funding">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Funding by Country (Millions USD)</h3>
                {loading ? (
                  <div className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading data...</p>
                  </div>
                ) : (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={fundingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="funding" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Distribution by Category</h3>
                {loading ? (
                  <div className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading data...</p>
                  </div>
                ) : (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Data Source */}
      <section className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">
            Data sources: Scimago Journal & Country Rank, UNESCO Institute for Statistics, World Bank, WIPO
          </p>
        </div>
      </section>
    </main>
  )
}
