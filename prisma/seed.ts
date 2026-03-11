import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create admin user with hashed password
  // Password: Kabayamarcel1970@#
  const adminPassword = 'Kabayamarcel1970@#'
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.adminUser.upsert({
    where: { email: 'manzidany72@gmail.com' },
    update: {},
    create: {
      email: 'manzidany72@gmail.com',
      passwordHash: passwordHash,
      name: 'Admin User',
    },
  })
  console.log('Created admin user:', admin.email)

  // Seed sample articles
  const articles = await prisma.article.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Revolutionary Drought-Resistant Maize Varieties Transforming African Agriculture',
        content: 'Scientists at the African Agricultural Technology Foundation (AATF) have developed new maize varieties that can withstand prolonged drought periods. These varieties have shown 30% higher yields compared to traditional crops during dry seasons. The research, conducted across Kenya, Tanzania, and Uganda, represents a significant breakthrough in ensuring food security across East Africa.\n\nThe new varieties incorporate genes from drought-resistant wild relatives of maize, combined with modern marker-assisted breeding techniques. Farmers participating in field trials have reported not only better yields but also improved resilience to climate variability.\n\nThis innovation comes at a critical time when climate change is increasingly affecting agricultural productivity across the continent. The project demonstrates how African-led research can address continental challenges effectively.',
        category: 'agriculture',
        tags: ['agriculture', 'biotechnology', 'climate-resilience', 'food-security'],
        author: 'SciAfrica Research Team',
        published: true,
        viewCount: 1250,
      },
      {
        title: 'AI-Powered Diagnostic Tool for Malaria Detection Shows 95% Accuracy',
        content: 'A team of researchers from the University of Lagos has developed an artificial intelligence system that can detect malaria parasites in blood samples with 95% accuracy. The system uses deep learning algorithms trained on thousands of microscopic images of blood samples.\n\nThe technology, which can run on smartphones, promises to revolutionize malaria diagnosis in rural areas where access to trained laboratory technicians is limited. Early detection and treatment are crucial in reducing malaria mortality rates, particularly among children under five.\n\nThe research team is now working with the Nigerian Ministry of Health to pilot the technology in 50 rural health centers. If successful, the system could be deployed across West Africa, potentially saving thousands of lives annually.\n\nThis breakthrough exemplifies how African researchers are leveraging cutting-edge AI technology to solve pressing health challenges on the continent.',
        category: 'health',
        tags: ['health', 'ai', 'digital-health', 'malaria', 'diagnostics'],
        author: 'SciAfrica Health Desk',
        published: true,
        viewCount: 2100,
      },
      {
        title: 'Kenyan Startup Develops Blockchain Solution for Agricultural Supply Chain',
        content: 'Twiga Foods, a Kenyan agricultural technology company, has launched a blockchain-based platform that tracks produce from farm to market. The system ensures transparency, reduces food waste, and guarantees fair prices for smallholder farmers.\n\nThe platform uses IoT sensors and mobile technology to monitor produce quality during transportation, automatically updating the blockchain ledger with temperature, humidity, and location data. This creates an immutable record of the supply chain journey.\n\nSince its launch six months ago, the platform has onboarded over 5,000 farmers and processed transactions worth over $2 million. The company plans to expand to Tanzania and Rwanda by the end of the year.\n\nThis innovation showcases how African startups are combining multiple technologies to solve complex agricultural challenges while creating economic opportunities for rural communities.',
        category: 'emerging-tech',
        tags: ['blockchain', 'agriculture', 'startups', 'supply-chain', 'iot'],
        author: 'SciAfrica Tech Team',
        published: true,
        viewCount: 890,
      },
      {
        title: 'Rwanda Launches First African mRNA Vaccine Manufacturing Facility',
        content: 'Rwanda has inaugurated the first mRNA vaccine manufacturing facility in Africa, marking a historic milestone in the continent\'s pharmaceutical capabilities. The $50 million facility, a partnership between the Rwandan government and international health organizations, aims to produce vaccines for diseases prevalent in Africa.

The facility will initially focus on COVID-19 and malaria vaccines, with plans to expand to other diseases including HIV and tuberculosis. It represents a significant step toward vaccine self-sufficiency for the continent, which has historically relied on imported vaccines.

The project includes a training component that will equip African scientists with mRNA technology expertise, creating a pool of skilled professionals for the continent\'s growing biotech industry.

This development is expected to reduce vaccine inequity and improve pandemic preparedness across Africa.',
        category: 'health',
        tags: ['biotech', 'vaccines', 'manufacturing', 'rwanda', 'mRNA'],
        author: 'SciAfrica Biotech Desk',
        published: true,
        viewCount: 3200,
      },
      {
        title: 'South African Researchers Pioneer Quantum Computing Applications in Mining',
        content: 'A team from the University of the Witwatersrand has successfully demonstrated how quantum algorithms can optimize mineral exploration and extraction processes. The research, conducted in partnership with major mining companies, shows potential for significant efficiency improvements.\n\nThe quantum algorithms can process complex geological data to identify promising mining sites with greater accuracy than classical computing methods. This could reduce environmental impact by minimizing unnecessary drilling and excavation.\n\nWhile full-scale quantum computing is still years away, the research provides a roadmap for integrating quantum technologies into African industries. The team is now exploring applications in other sectors including finance and logistics.\n\nThis work positions South Africa at the forefront of quantum computing research in the developing world, demonstrating that African institutions can contribute to cutting-edge technological advancement.',
        category: 'emerging-tech',
        tags: ['quantum-computing', 'mining', 'ai', 'optimization', 'south-africa'],
        author: 'SciAfrica Research Team',
        published: true,
        viewCount: 1560,
      },
    ],
  })
  console.log('Created articles:', articles.count)

  // Seed scientist profiles
  const scientists = await prisma.scientistProfile.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Dr. Ameenah Gurib-Fakim',
        title: 'Dr.',
        institution: 'University of Mauritius',
        bio: 'Former President of Mauritius and renowned biodiversity scientist. Her research focuses on the study of medicinal plants and their bioactive compounds, contributing significantly to the understanding of Africa\'s rich botanical heritage.',
        researchAreas: ['Biodiversity', 'Medicinal Plants', 'Ethnobotany', 'Chemistry'],
        country: 'Mauritius',
        publications: 150,
        featured: true,
      },
      {
        name: 'Prof. Calestous Juma',
        title: 'Prof.',
        institution: 'Harvard Kennedy School',
        bio: 'Late Kenyan professor who was a leading authority on sustainable development and innovation in Africa. His work on technology and development has influenced policy across the continent.',
        researchAreas: ['Innovation Policy', 'Sustainable Development', 'Technology Transfer'],
        country: 'Kenya',
        publications: 280,
        featured: true,
      },
      {
        name: 'Dr. Nnaemeka Ikegwuonu',
        title: 'Dr.',
        institution: 'ColdHubs',
        bio: 'Nigerian social entrepreneur and inventor who developed solar-powered cold storage rooms for small-scale farmers. His innovation has reduced post-harvest losses by up to 80% for participating farmers.',
        researchAreas: ['Agricultural Technology', 'Solar Energy', 'Food Preservation', 'Social Entrepreneurship'],
        country: 'Nigeria',
        publications: 25,
        featured: true,
      },
      {
        name: 'Prof. Glenda Gray',
        title: 'Prof.',
        institution: 'South African Medical Research Council',
        bio: 'Leading HIV/AIDS researcher who has been instrumental in groundbreaking vaccine trials. Her work has significantly advanced our understanding of HIV prevention and treatment in Africa.',
        researchAreas: ['HIV/AIDS', 'Vaccine Development', 'Pediatric Health', 'Clinical Trials'],
        country: 'South Africa',
        publications: 320,
        featured: true,
      },
      {
        name: 'Dr. Yvonne Mburu',
        title: 'Dr.',
        institution: 'Institut Curie',
        bio: 'Kenyan immunologist working on cancer immunotherapy. She founded Nexakili, an organization that connects African scientists with global research opportunities and resources.',
        researchAreas: ['Immunology', 'Cancer Research', 'Immunotherapy', 'Science Diplomacy'],
        country: 'Kenya',
        publications: 45,
        featured: false,
      },
    ],
  })
  console.log('Created scientist profiles:', scientists.count)

  // Seed innovations
  const innovations = await prisma.innovation.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'M-Pesa',
        description: 'Mobile money transfer service that revolutionized financial inclusion in Africa. Started in Kenya, it has expanded to multiple countries and inspired similar systems worldwide.',
        category: 'tech',
        country: 'Kenya',
        stage: 'commercial',
        founders: ['Safaricom', 'Vodafone'],
        yearFounded: 2007,
        impact: 'Over 50 million active users, processed $314 billion in transactions in 2022',
        featured: true,
      },
      {
        name: 'Flutterwave',
        description: 'Payment infrastructure company that enables businesses to make and accept payments across Africa. Supports multiple currencies and payment methods.',
        category: 'tech',
        country: 'Nigeria',
        stage: 'commercial',
        founders: ['Olugbenga Agboola', 'Iyinoluwa Aboyeji'],
        yearFounded: 2016,
        impact: 'Processed over $16 billion in transactions, valued at $3 billion',
        featured: true,
      },
      {
        name: 'Cardiopad',
        description: 'First African medical tablet enabling cardiac examinations in remote areas. Performs ECGs and transmits results to cardiologists for remote diagnosis.',
        category: 'health',
        country: 'Cameroon',
        stage: 'commercial',
        founders: ['Arthur Zang'],
        yearFounded: 2016,
        impact: 'Deployed in over 100 hospitals across Africa, saving thousands of lives',
        featured: true,
      },
      {
        name: 'SolarTurtle',
        description: 'Solar-powered battery charging stations housed in shipping containers. Provides clean energy access to off-grid communities and powers small businesses.',
        category: 'energy',
        country: 'South Africa',
        stage: 'commercial',
        founders: ['James van der Walt'],
        yearFounded: 2015,
        impact: 'Deployed in 15 communities, providing power to over 50,000 people',
        featured: true,
      },
      {
        name: 'Zipline',
        description: 'Drone delivery service for medical supplies, including blood and vaccines. Uses autonomous drones to reach remote health facilities quickly.',
        category: 'health',
        country: 'Rwanda',
        stage: 'commercial',
        founders: ['Keller Rinaudo', 'Will Hetzler'],
        yearFounded: 2016,
        impact: 'Delivered over 5 million doses of vaccines and critical supplies',
        featured: true,
      },
    ],
  })
  console.log('Created innovations:', innovations.count)

  // Seed research statistics for visualizations
  const stats = await prisma.researchStats.createMany({
    skipDuplicates: true,
    data: [
      // Publications by country (2023)
      { category: 'overall', metric: 'publications', value: 125000, year: 2023, country: 'South Africa', source: 'Scimago' },
      { category: 'overall', metric: 'publications', value: 45000, year: 2023, country: 'Egypt', source: 'Scimago' },
      { category: 'overall', metric: 'publications', value: 32000, year: 2023, country: 'Nigeria', source: 'Scimago' },
      { category: 'overall', metric: 'publications', value: 28000, year: 2023, country: 'Morocco', source: 'Scimago' },
      { category: 'overall', metric: 'publications', value: 24000, year: 2023, country: 'Tunisia', source: 'Scimago' },
      { category: 'overall', metric: 'publications', value: 18000, year: 2023, country: 'Kenya', source: 'Scimago' },
      { category: 'overall', metric: 'publications', value: 15000, year: 2023, country: 'Ghana', source: 'Scimago' },
      { category: 'overall', metric: 'publications', value: 12000, year: 2023, country: 'Ethiopia', source: 'Scimago' },

      // Research funding (millions USD)
      { category: 'overall', metric: 'funding', value: 850, year: 2023, country: 'South Africa', source: 'World Bank' },
      { category: 'overall', metric: 'funding', value: 420, year: 2023, country: 'Egypt', source: 'World Bank' },
      { category: 'overall', metric: 'funding', value: 380, year: 2023, country: 'Nigeria', source: 'World Bank' },
      { category: 'overall', metric: 'funding', value: 290, year: 2023, country: 'Kenya', source: 'World Bank' },
      { category: 'overall', metric: 'funding', value: 250, year: 2023, country: 'Morocco', source: 'World Bank' },

      // Patents filed
      { category: 'overall', metric: 'patents', value: 4500, year: 2023, country: 'South Africa', source: 'WIPO' },
      { category: 'overall', metric: 'patents', value: 2100, year: 2023, country: 'Egypt', source: 'WIPO' },
      { category: 'overall', metric: 'patents', value: 1800, year: 2023, country: 'Morocco', source: 'WIPO' },
      { category: 'overall', metric: 'patents', value: 1200, year: 2023, country: 'Nigeria', source: 'WIPO' },

      // Historical growth data for charts
      { category: 'agriculture', metric: 'publications', value: 15000, year: 2019, source: 'Scimago' },
      { category: 'agriculture', metric: 'publications', value: 16500, year: 2020, source: 'Scimago' },
      { category: 'agriculture', metric: 'publications', value: 18200, year: 2021, source: 'Scimago' },
      { category: 'agriculture', metric: 'publications', value: 20100, year: 2022, source: 'Scimago' },
      { category: 'agriculture', metric: 'publications', value: 22500, year: 2023, source: 'Scimago' },

      { category: 'health', metric: 'publications', value: 28000, year: 2019, source: 'Scimago' },
      { category: 'health', metric: 'publications', value: 32000, year: 2020, source: 'Scimago' },
      { category: 'health', metric: 'publications', value: 38000, year: 2021, source: 'Scimago' },
      { category: 'health', metric: 'publications', value: 42000, year: 2022, source: 'Scimago' },
      { category: 'health', metric: 'publications', value: 48500, year: 2023, source: 'Scimago' },

      { category: 'tech', metric: 'publications', value: 12000, year: 2019, source: 'Scimago' },
      { category: 'tech', metric: 'publications', value: 15500, year: 2020, source: 'Scimago' },
      { category: 'tech', metric: 'publications', value: 19800, year: 2021, source: 'Scimago' },
      { category: 'tech', metric: 'publications', value: 25200, year: 2022, source: 'Scimago' },
      { category: 'tech', metric: 'publications', value: 31800, year: 2023, source: 'Scimago' },

      // Researchers count
      { category: 'overall', metric: 'researchers', value: 85000, year: 2023, country: 'South Africa', source: 'UNESCO' },
      { category: 'overall', metric: 'researchers', value: 72000, year: 2023, country: 'Egypt', source: 'UNESCO' },
      { category: 'overall', metric: 'researchers', value: 45000, year: 2023, country: 'Morocco', source: 'UNESCO' },
      { category: 'overall', metric: 'researchers', value: 38000, year: 2023, country: 'Nigeria', source: 'UNESCO' },
      { category: 'overall', metric: 'researchers', value: 28000, year: 2023, country: 'Tunisia', source: 'UNESCO' },
    ],
  })
  console.log('Created research stats:', stats.count)

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
