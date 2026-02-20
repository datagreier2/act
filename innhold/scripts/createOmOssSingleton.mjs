import { getCliClient } from 'sanity/cli'

const OM_OSS_PAGE_DOCUMENT_ID =
  process.env.SANITY_STUDIO_OM_OSS_PAGE_ID || 'om-oss-page'

async function createOmOssSingleton() {
  const client = getCliClient({ apiVersion: '2024-01-01' })
  const existingDocument = await client.getDocument(OM_OSS_PAGE_DOCUMENT_ID)

  if (existingDocument) {
    console.log(`Dokument finnes allerede: ${OM_OSS_PAGE_DOCUMENT_ID}`)
    return
  }

  await client.create({
    _id: OM_OSS_PAGE_DOCUMENT_ID,
    _type: 'omOssPage',
    title: 'Om oss',
    heading: 'Om oss',
    body: 'Kort plassholdertekst om ACT. Oppdater teksten i Studio.',
    people: [
      {
        _key: 'bjorn-placeholder',
        _type: 'omOssPerson',
        name: 'Bjørn',
        bio: 'Kort plassholdertekst om Bjørn. Oppdater med bio i Studio.',
        email: 'bjorn@placeholder.no',
        phone: '+47 400 00 001',
      },
      {
        _key: 'grettir-placeholder',
        _type: 'omOssPerson',
        name: 'Grettir',
        bio: 'Kort plassholdertekst om Grettir. Oppdater med bio i Studio.',
        email: 'grettir@placeholder.no',
        phone: '+47 400 00 002',
      },
    ],
  })

  console.log(`Opprettet dokument: ${OM_OSS_PAGE_DOCUMENT_ID}`)
}

createOmOssSingleton().catch((error) => {
  console.error(error)
  process.exit(1)
})
