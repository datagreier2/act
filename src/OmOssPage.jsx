import { useEffect, useState } from 'react'
import { getOmOssPage } from './sanity/data'
import './OmOssPage.css'

const fallbackPeople = [
  {
    _key: 'fallback-bjorn',
    name: 'Bjørn',
    bio: 'Bjørn er skuespillerlærer og veileder i ACT. Denne teksten er en plassholder som kan erstattes med en kort bio i norsk.',
    email: 'bjorn@placeholder.no',
    phone: '+47 400 00 001',
  },
  {
    _key: 'fallback-grettir',
    name: 'Grettir',
    bio: 'Grettir er skuespiller og instruktør i ACT. Denne teksten er en plassholder som kan erstattes med en kort bio i norsk.',
    email: 'grettir@placeholder.no',
    phone: '+47 400 00 002',
  },
]

const fallbackPage = {
  heading: 'Om oss',
  body: 'Dette er en kort plassholdertekst om ACT. Her kan dere senere legge inn en tydelig beskrivelse av hvem dere er og hva dere tilbyr.',
  people: fallbackPeople,
}

function OmOssPage() {
  const [omOssPage, setOmOssPage] = useState(null)

  useEffect(() => {
    let isMounted = true

    getOmOssPage()
      .then((data) => {
        if (isMounted) {
          setOmOssPage(data)
        }
      })
      .catch((error) => {
        console.error('Failed to load Om oss content from Sanity:', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const page = omOssPage || fallbackPage
  const introImageUrl = page?.introImage?.asset?.url
  const introImageAlt = page?.introImage?.alt || page?.heading || 'Om oss'
  const people =
    Array.isArray(page?.people) && page.people.length > 0 ? page.people : fallbackPeople

  return (
    <div className="om-page">
      <header className="om-topbar">
        <img src="../Act.2.svg" alt="Act logo" className="om-brand-mark" />
        <a className="om-back-link" href="../">
          Til forsiden
        </a>
      </header>

      <main className="om-content">
        <section className="om-intro">
          <h1>{page?.heading || fallbackPage.heading}</h1>
          {page?.body ? <p>{page.body}</p> : null}
          {introImageUrl ? (
            <figure className="om-intro-image">
              <img src={introImageUrl} alt={introImageAlt} />
            </figure>
          ) : null}
        </section>

        <section className="om-card-grid" aria-label="Team">
          {people.map((person, index) => {
            const cardImageUrl = person?.image?.asset?.url
            const cardImageAlt = person?.image?.alt || person?.name || 'Person'
            const key = person?._key || person?.name || `om-oss-person-${index}`
            return (
              <article key={key} className="om-card">
                {cardImageUrl ? (
                  <figure className="om-card-image">
                    <img src={cardImageUrl} alt={cardImageAlt} />
                  </figure>
                ) : null}
                <h2>{person?.name || 'Navn'}</h2>
                {person?.bio ? <p>{person.bio}</p> : null}
                {person?.email ? (
                  <p>
                    E-post:{' '}
                    <a href={`mailto:${person.email}`} className="om-contact-link">
                      {person.email}
                    </a>
                  </p>
                ) : null}
                {person?.phone ? (
                  <p>
                    Telefon:{' '}
                    <a
                      href={`tel:${String(person.phone).replace(/\s+/g, '')}`}
                      className="om-contact-link"
                    >
                      {person.phone}
                    </a>
                  </p>
                ) : null}
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default OmOssPage
