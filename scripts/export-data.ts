import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function exportData() {
  console.log('📦 Exporting database data to static JSON files...')
  
  try {
    // Create data directory
    const dataDir = path.join(process.cwd(), 'src', 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Export Disorders
    console.log('📚 Exporting disorders...')
    const disorders = await prisma.disorder.findMany({
      orderBy: { name: 'asc' }
    })
    fs.writeFileSync(
      path.join(dataDir, 'disorders.json'),
      JSON.stringify(disorders, null, 2)
    )
    console.log(`✅ Exported ${disorders.length} disorders`)
    
    // Export Assessments
    console.log('📝 Exporting assessments...')
    const assessments = await prisma.assessment.findMany({
      orderBy: { name: 'asc' }
    })
    fs.writeFileSync(
      path.join(dataDir, 'assessments.json'),
      JSON.stringify(assessments, null, 2)
    )
    console.log(`✅ Exported ${assessments.length} assessments`)
    
    // Export Meditations
    console.log('🧘 Exporting meditations...')
    const meditations = await prisma.meditation.findMany({
      orderBy: { title: 'asc' }
    })
    fs.writeFileSync(
      path.join(dataDir, 'meditations.json'),
      JSON.stringify(meditations, null, 2)
    )
    console.log(`✅ Exported ${meditations.length} meditations`)
    
    // Export Therapy Techniques
    console.log('🧠 Exporting therapy techniques...')
    const therapyTechniques = await prisma.therapyTechnique.findMany({
      orderBy: { name: 'asc' }
    })
    fs.writeFileSync(
      path.join(dataDir, 'therapy-techniques.json'),
      JSON.stringify(therapyTechniques, null, 2)
    )
    console.log(`✅ Exported ${therapyTechniques.length} therapy techniques`)
    
    // Export Crisis Resources
    console.log('📞 Exporting crisis resources...')
    const crisisResources = await prisma.crisisResource.findMany({
      orderBy: { country: 'asc' }
    })
    fs.writeFileSync(
      path.join(dataDir, 'crisis-resources.json'),
      JSON.stringify(crisisResources, null, 2)
    )
    console.log(`✅ Exported ${crisisResources.length} crisis resources`)
    
    console.log('✨ Data export complete!')
    
  } catch (error) {
    console.error('❌ Error exporting data:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

exportData()
