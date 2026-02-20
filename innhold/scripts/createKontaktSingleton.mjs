import { getCliClient } from 'sanity/cli'

const KONTAKT_PAGE_DOCUMENT_ID =
  process.env.SANITY_STUDIO_KONTAKT_PAGE_ID || 'kontakt-page'

async function createKontaktSingleton() {
  const client = getCliClient({ apiVersion: '2024-01-01' })
  const existingDocument = await client.getDocument(KONTAKT_PAGE_DOCUMENT_ID)

  if (existingDocument) {
    console.log(`Dokument finnes allerede: ${KONTAKT_PAGE_DOCUMENT_ID}`)
    return
  }

  await client.create({
    _id: KONTAKT_PAGE_DOCUMENT_ID,
    _type: 'kontaktPage',
    title: 'Kontakt',
    heading: 'Kontakt',
    body: 'Ta kontakt med oss for workshops, privattimer eller samarbeid.',
    email: 'hei@actstudio.no',
    phone: '+47 400 00 000',
    address: 'Eksempelgata 1, 0000 Oslo',
    openingHours: 'Man-fre 09:00-16:00',
    formTitle: 'Send melding',
    formBody: 'Bruk skjemaet under, så tar vi kontakt.',
  })

  console.log(`Opprettet dokument: ${KONTAKT_PAGE_DOCUMENT_ID}`)
}

createKontaktSingleton().catch((error) => {
  console.error(error)
  process.exit(1)
})
