import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/news
 * Fetch African science news from NewsAPI
 * Note: Requires NEWS_API_KEY environment variable
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || 'African science technology'
    const pageSize = searchParams.get('pageSize') || '10'

    const apiKey = process.env.NEWS_API_KEY

    // If no API key, return mock data for demo purposes
    if (!apiKey) {
      return NextResponse.json({
        articles: getMockNews(),
        source: 'mock',
        message: 'Using mock data. Set NEWS_API_KEY for real news.',
      })
    }

    // Build NewsAPI URL
    const newsApiUrl = new URL('https://newsapi.org/v2/everything')
    newsApiUrl.searchParams.append('q', query)
    newsApiUrl.searchParams.append('language', 'en')
    newsApiUrl.searchParams.append('sortBy', 'publishedAt')
    newsApiUrl.searchParams.append('pageSize', pageSize)
    newsApiUrl.searchParams.append('apiKey', apiKey)

    const response = await fetch(newsApiUrl.toString())

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      articles: data.articles,
      source: 'newsapi',
      totalResults: data.totalResults,
    })
  } catch (error) {
    console.error('News fetch error:', error)
    // Return mock data on error
    return NextResponse.json({
      articles: getMockNews(),
      source: 'mock',
      message: 'Error fetching news, using mock data.',
    })
  }
}

/**
 * Mock news data for demonstration when API is unavailable
 */
function getMockNews() {
  return [
    {
      title: 'Nigerian Scientists Develop New Solar-Powered Water Purification System',
      description: 'A team of researchers at the University of Lagos has created an affordable solar-powered water purification system that can provide clean drinking water to rural communities.',
      url: 'https://example.com/news/1',
      urlToImage: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800',
      publishedAt: '2024-03-10T10:00:00Z',
      source: { name: 'SciAfrica News' },
    },
    {
      title: 'Kenya Launches First Satellite Manufacturing Facility in East Africa',
      description: 'The new facility will produce small satellites for communication and earth observation, positioning Kenya as a regional hub for space technology.',
      url: 'https://example.com/news/2',
      urlToImage: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800',
      publishedAt: '2024-03-09T14:30:00Z',
      source: { name: 'Tech Africa' },
    },
    {
      title: 'South African Researchers Make Breakthrough in HIV Vaccine Development',
      description: 'Scientists at the University of Cape Town have identified a new antibody that shows promise in neutralizing multiple strains of HIV.',
      url: 'https://example.com/news/3',
      urlToImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
      publishedAt: '2024-03-08T09:15:00Z',
      source: { name: 'Health Africa' },
    },
    {
      title: 'Ghanaian Startup Uses AI to Predict Crop Diseases',
      description: 'AgroTech Ghana has developed a machine learning model that can identify plant diseases from smartphone photos, helping farmers take early action.',
      url: 'https://example.com/news/4',
      urlToImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      publishedAt: '2024-03-07T16:45:00Z',
      source: { name: 'AgriTech Today' },
    },
    {
      title: 'Rwanda Expands Drone Delivery Network for Medical Supplies',
      description: 'The country is expanding its drone delivery service to reach 500 health facilities, improving access to critical medicines in remote areas.',
      url: 'https://example.com/news/5',
      urlToImage: 'https://images.unsplash.com/photo-1508614589041-895b8c9d7ef5?w=800',
      publishedAt: '2024-03-06T11:20:00Z',
      source: { name: 'Innovation Africa' },
    },
    {
      title: 'Egyptian Engineers Develop Low-Cost Ventilator for Rural Hospitals',
      description: 'A team of biomedical engineers has created a ventilator design that costs under $500, making life-saving equipment more accessible.',
      url: 'https://example.com/news/6',
      urlToImage: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
      publishedAt: '2024-03-05T08:00:00Z',
      source: { name: 'Medical Africa' },
    },
    {
      title: 'Morocco Invests $1 Billion in Green Hydrogen Production',
      description: 'The investment aims to establish Morocco as a leading producer of green hydrogen, leveraging the country\'s abundant solar and wind resources.',
      url: 'https://example.com/news/7',
      urlToImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      publishedAt: '2024-03-04T13:10:00Z',
      source: { name: 'Energy Africa' },
    },
    {
      title: 'Ethiopian Scientists Develop Drought-Resistant Wheat Varieties',
      description: 'New wheat varieties developed at the Ethiopian Institute of Agricultural Research show 40% better yields under drought conditions.',
      url: 'https://example.com/news/8',
      urlToImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800',
      publishedAt: '2024-03-03T15:30:00Z',
      source: { name: 'Agriculture Today' },
    },
  ]
}
