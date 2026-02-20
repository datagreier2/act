import { getCliClient } from 'sanity/cli'

const HOME_PAGE_DOCUMENT_ID =
  process.env.SANITY_STUDIO_HOME_PAGE_ID || '5db524c7-6851-4f28-a326-b1735de0fcdb'
const AKTUELT_PAGE_DOCUMENT_ID =
  process.env.SANITY_STUDIO_AKTUELT_PAGE_ID || 'aktuelt-page'

async function migrate() {
  const client = getCliClient({ apiVersion: '2024-01-01' })

  const homePage = await client.getDocument(HOME_PAGE_DOCUMENT_ID)
  if (!homePage) {
    throw new Error(`Fant ikke Forside-dokumentet (${HOME_PAGE_DOCUMENT_ID}).`)
  }

  const sections = Array.isArray(homePage.sections) ? homePage.sections : []
  const embeddedAktueltSections = sections.filter((section) => section?._type === 'sectionAktuelt')
  const firstEmbeddedAktuelt = embeddedAktueltSections[0] || null
  const cleanedSections = sections.filter((section) => section?._type !== 'sectionAktuelt')

  const existingAktueltPage = await client.getDocument(AKTUELT_PAGE_DOCUMENT_ID)
  if (!existingAktueltPage) {
    await client.create({
      _id: AKTUELT_PAGE_DOCUMENT_ID,
      _type: 'aktueltPage',
      title: firstEmbeddedAktuelt?.title || 'Aktuelt',
      body: firstEmbeddedAktuelt?.body || '',
      hide: false,
      hideButton: false,
    })
    console.log(`Opprettet singleton-dokument: ${AKTUELT_PAGE_DOCUMENT_ID}`)
  } else {
    console.log(`Singleton finnes allerede: ${AKTUELT_PAGE_DOCUMENT_ID}`)
  }

  if (cleanedSections.length !== sections.length) {
    await client.patch(HOME_PAGE_DOCUMENT_ID).set({ sections: cleanedSections }).commit()
    console.log(`Fjernet ${sections.length - cleanedSections.length} innebygd(e) sectionAktuelt fra Forside.`)
  } else {
    console.log('Ingen innebygde sectionAktuelt-felt å fjerne fra Forside.')
  }
}

migrate().catch((error) => {
  console.error(error)
  process.exit(1)
})
