import { useEffect, useState } from 'react'
import { getKontaktPage } from './sanity/data'
import './KontaktPage.css'

const fallbackPage = {
  heading: 'Kontakt',
  body: 'Ta kontakt med oss for workshops, privattimer eller samarbeid.',
  email: 'hei@actstudio.no',
  phone: '+47 400 00 000',
  address: 'Eksempelgata 1, 0000 Oslo',
  openingHours: 'Man-fre 09:00-16:00',
  mapLink: '',
  formTitle: 'Send melding',
  formBody: 'Bruk skjemaet under, så tar vi kontakt.',
}

function KontaktPage() {
  const formsparkAction = 'https://submit-form.com/v1phnx4Ik'
  const [kontaktPage, setKontaktPage] = useState(null)

  useEffect(() => {
    let isMounted = true

    getKontaktPage()
      .then((data) => {
        if (isMounted) {
          setKontaktPage(data)
        }
      })
      .catch((error) => {
        console.error('Failed to load Kontakt content from Sanity:', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const page = kontaktPage || fallbackPage
  const introImageUrl = page?.introImage?.asset?.url
  const introImageAlt = page?.introImage?.alt || page?.heading || 'Kontakt'
  const email = page?.email || fallbackPage.email
  const phone = page?.phone || fallbackPage.phone
  const phoneHref = `tel:${String(phone).replace(/\s+/g, '')}`
  const address = page?.address || fallbackPage.address
  const openingHours = page?.openingHours || fallbackPage.openingHours
  const mapLink = page?.mapLink

  return (
    <div className="kontakt-page">
      <header className="kontakt-topbar">
        <img src="../Act.2.svg" alt="Act logo" className="kontakt-brand-mark" />
        <a className="kontakt-back-link" href="../">
          Til forsiden
        </a>
      </header>

      <main className="kontakt-content">
        <section className="kontakt-intro">
          <h1>{page?.heading || fallbackPage.heading}</h1>
          {page?.body ? <p>{page.body}</p> : null}
          {introImageUrl ? (
            <figure className="kontakt-intro-image">
              <img src={introImageUrl} alt={introImageAlt} />
            </figure>
          ) : null}
        </section>

        <section className="kontakt-grid">
          <article className="kontakt-card">
            <h2>Kontaktinfo</h2>
            <p>
              E-post:{' '}
              <a href={`mailto:${email}`} className="kontakt-link">
                {email}
              </a>
            </p>
            <p>
              Telefon:{' '}
              <a href={phoneHref} className="kontakt-link">
                {phone}
              </a>
            </p>
            <p>Adresse: {address}</p>
            <p>Åpningstider: {openingHours}</p>
            {mapLink ? (
              <a className="button ghost compact kontakt-map-link" href={mapLink} target="_blank" rel="noreferrer">
                Se kart
              </a>
            ) : null}
          </article>

          <article className="kontakt-card">
            <h2>{page?.formTitle || fallbackPage.formTitle}</h2>
            {page?.formBody ? <p>{page.formBody}</p> : null}
            <form className="kontakt-form" action={formsparkAction} method="POST">
              <input type="hidden" name="skjema" value="Kontakt (kontakt-side)" />
              <label className="kontakt-field">
                <span>Navn</span>
                <input type="text" name="navn" placeholder="Ditt navn" required />
              </label>
              <label className="kontakt-field">
                <span>E-post</span>
                <input type="email" name="email" placeholder="hei@eksempel.no" required />
              </label>
              <label className="kontakt-field">
                <span>Melding</span>
                <textarea
                  name="melding"
                  rows="5"
                  placeholder="Skriv meldingen din her."
                  required
                />
              </label>
              <button type="submit" className="button primary">
                Send
              </button>
            </form>
          </article>
        </section>
      </main>
    </div>
  )
}

export default KontaktPage
