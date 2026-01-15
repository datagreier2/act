import { useEffect, useRef, useState } from 'react'
import { getHomePage } from './sanity/data'
import './App.css'

const fallbackWorkshops = [
  {
    title: 'Kamera & nærbilde',
    meta: ['20. september', 'Kl. 11–16', 'Nedre Storgate 12, Oslo'],
    image: '/pexels-gesel-763214.jpg',
    description:
      'Arbeid foran kamera med fokus på impuls, stillhet og presisjon i små formater.',
    bullets: [
      'Hvordan eie eget uttrykk i nærbilde.',
      'Tekstforståelse og subtekst.',
      'Repetisjonsteknikk for nerve og ro.',
    ],
  },
  {
    title: 'Audition & egenart',
    meta: ['Lør 4. oktober', 'Kl. 10–15', 'Act studio'],
    image: '/pexels-rdne-5756571.jpg',
    description:
      'Forberedelse til audition med tydelig identitet. Vi jobber med materiale du bringer selv.',
    bullets: [
      'Egenart som styrke, ikke hinder.',
      'Presentasjon på 5 minutter.',
      'Hvordan svare på regi-notater i rommet.',
    ],
  },
]

const fallbackPrivateSessions = [
  {
    title: 'Skuespillercoaching med Bjørn Kolstø',
    image: '/pexels-cottonbro-6896194.jpg',
    summary:
      'Metodisk arbeid med tekst, situasjon og karakter. For deg som vil bygge solide verktøy.',
    points: [
      'Scene- og kameraforberedelser til roller.',
      'Arbeid med undertekst, impuls og rytme.',
      'Tilpasset nivå fra nybegynner til profesjonell.',
    ],
  },
  {
    title: 'Rolle- og egenartarbeid med Grettir Einarsson',
    image: '/pexels-tima-miroshnichenko-5710941.jpg',
    summary:
      'Praktisk coaching fra en aktiv skuespiller. Fokus på nærvær, fysisk spill og tydelige valg.',
    points: [
      'Forberedelser til casting og sett.',
      'Bygge en karakter gjennom kropp, stemme og timing.',
      'Øvelser som låser opp spontanitet og lek.',
    ],
  },
  {
    title: 'Stemmetrening & tekst',
    image: '/pexels-cottonbro-6896324.jpg',
    summary: 'Pust, støtte og artikulasjon for et klart og bærekraftig uttrykk.',
    points: [
      'Teknikk for å tåle lange dager på sett og scene.',
      'Teksttolkning og rytme i dialog.',
      'Konkrete øvelser du kan gjøre hjemme.',
    ],
  },
]

const fallbackPrices = [
  {
    title: 'Privattime',
    body: '50 minutter individuell coaching med Bjørn eller Grettir.',
    price: 'fra 950,-',
  },
  {
    title: 'Pakke 5 timer',
    body: 'For deg som vil ha kontinuitet og progresjon uke for uke.',
    price: '4 400,-',
  },
  {
    title: 'Workshopplass',
    body: 'Gjelder åpne workshops i kalenderen. Studentpris tilgjengelig.',
    price: '750,- / 600,- (student)',
  },
]

function App() {
  const [interest, setInterest] = useState('')
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [homePage, setHomePage] = useState(null)
  const selectRef = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadHomePage() {
      const page = await getHomePage()
      if (isMounted) {
        setHomePage(page)
        console.log('Sanity home page:', page)
      }
    }

    loadHomePage().catch((error) => {
      console.error('Failed to load Sanity page:', error)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const heroImageUrl = homePage?.heroImage?.asset?.url || '/pexels-cottonbro-6896192.jpg'
  const heroImageAlt =
    homePage?.heroImage?.alt || 'Instruktør som veileder foran to skuespillere'
  const workshops = homePage?.workshops?.length ? homePage.workshops : fallbackWorkshops
  const privateSessions = homePage?.privateSessions?.length
    ? homePage.privateSessions
    : fallbackPrivateSessions
  const prices = homePage?.prices?.length ? homePage.prices : fallbackPrices
  const interests = [
    ...workshops.map((item) => `Workshop: ${item.title}`),
    ...privateSessions.map((item) => `Privattime: ${item.title}`),
    'Annet',
  ]
  const contactEmail = homePage?.contactEmail || 'hei@actstudio.no'
  const contactPhone = homePage?.contactPhone || '+47 400 00 000'
  const contactPhoneHref = `tel:${contactPhone.replace(/\s+/g, '')}`

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <img src="/Act.2.svg" alt="Act logo" className="brand-mark" />
        </div>
        <nav className="nav">
          <a href="#forside">
            Forside
          </a>
          <a href="#workshops">
            Workshops
          </a>
          <a href="#privattimer">
            Privattimer
          </a>
          <a href="#priser">
            Priser
          </a>
          <a href="#kontakt">
            Om oss
          </a>
        </nav>
      </header>

      <main className="content">
        <section id="forside" className="hero">
          <div className="hero-text">
            <p className="eyebrow">Act</p>
            <h1>{homePage?.heroTitle || 'Trening for scenen og kameraet.'}</h1>
            <p className="lede">
              {homePage?.heroLead ||
                'Act er studioet til skuespillerlærer Bjørn Kolstø og skuespiller Grettir Einarsson. Vi tilbyr workshops og privattimer for deg som vil styrke nærvær, presisjon og lek.'}
            </p>
            <p className="lede">
              {homePage?.heroLeadSecondary ||
                'Vi jobber håndfast og jordet: tekst, impuls, fysisk spill og stemme. Målet er at du møter audition, sett og scene med trygghet og egne valg.'}
            </p>
            <div className="cta-row">
              <a className="button primary" href={homePage?.ctaPrimaryHref || '#workshops'}>
                {homePage?.ctaPrimaryLabel || 'Se workshops'}
              </a>
              <a className="button ghost" href={homePage?.ctaSecondaryHref || '#interesse'}>
                {homePage?.ctaSecondaryLabel || 'Book privattime'}
              </a>
            </div>
          </div>
          <div className="hero-card">
            <figure className="hero-image">
              <img src={heroImageUrl} alt={heroImageAlt} />
            </figure>
          </div>
        </section>

        <section id="workshops" className="section">
          <div className="section-head">
            <p className="eyebrow">Workshops</p>
            <h2>{homePage?.workshopsTitle || 'Kalender'}</h2>
            <p className="muted">
              {homePage?.workshopsLead ||
                'Konsentrerte dager med små grupper. Påmelding er bindende – vi holder plass til deg.'}
            </p>
          </div>
          <div className="workshop-grid">
            {workshops.map((item) => {
              const metaItems =
                item.meta?.filter(Boolean) || [item.date, item.time, item.location].filter(Boolean)
              const imageUrl = item.image?.asset?.url || item.image
              const imageAlt = item.image?.alt || `${item.title} workshop`

              return (
                <article key={item.title} className="workshop-card">
                  <figure className="card-image">
                    <img src={imageUrl} alt={imageAlt} />
                  </figure>
                  <div className="meta-line">
                    {metaItems.map((chip) => (
                      <span key={chip} className="pill">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a className="button ghost" href="#interesse">
                    Meld interesse
                  </a>
                </article>
              )
            })}
          </div>
          <p className="muted small">
            {homePage?.workshopsNote ||
              'For å sikre plass, send navn og kontaktinfo på e-post. Alle påmeldinger er bindende.'}
          </p>
        </section>

        <section id="privattimer" className="section">
          <div className="section-head">
            <p className="eyebrow">Privattimer</p>
            <h2>{homePage?.privateSessionsTitle || 'Bygg ferdigheter med én-til-én veiledning.'}</h2>
            <p className="muted">
              {homePage?.privateSessionsLead ||
                'Skreddersydd coaching fra erfarne utøvere. Vi jobber mot audition, roller eller langsiktig utvikling.'}
            </p>
          </div>
          <div className="card-grid">
            {privateSessions.map((session) => {
              const imageUrl = session.image?.asset?.url || session.image
              const imageAlt = session.image?.alt || session.title

              return (
                <article key={session.title} className="card">
                  <figure className="card-image">
                    <img src={imageUrl} alt={imageAlt} />
                  </figure>
                  <h3>{session.title}</h3>
                  <p className="muted">{session.summary}</p>
                  <a className="button ghost" href="#interesse">
                    Book time
                  </a>
                </article>
              )
            })}
          </div>
        </section>

        <section id="priser" className="section">
          <div className="section-head">
            <p className="eyebrow">Priser</p>
            <h2>{homePage?.pricesTitle || 'Priser uten overraskelser.'}</h2>
            <p className="muted">
              {homePage?.pricesLead ||
                'Vi avklarer alt på forhånd og sender skriftlig bekreftelse før oppstart.'}
            </p>
          </div>
          <div className="card-grid prices">
            {prices.map((item) => (
              <article key={item.title} className="card price-card">
                <div className="price-top">
                  <h3>{item.title}</h3>
                  <span className="pill strong">{item.price}</span>
                </div>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="kontakt" className="section contact">
          <div className="section-head">
            <p className="eyebrow">Om oss</p>
            <h2>{homePage?.contactTitle || 'Snakk med Act.'}</h2>
            <p className="muted">
              {homePage?.contactLead ||
                'Fortell hva du vil jobbe med, så finner vi riktig opplegg. Vi svarer vanligvis innen 24 timer.'}
            </p>
          </div>
          <div className="contact-grid">
            <form id="interesse" className="contact-form">
              <p className="eyebrow">{homePage?.contactFormTitle || 'Meld interesse'}</p>
              <label className="field">
                <span>Jeg er interessert i</span>
                <div
                  className="custom-select"
                  data-open={isSelectOpen}
                  ref={selectRef}
                  onClick={() => setIsSelectOpen((open) => !open)}
                >
                  <button type="button" className="select-trigger">
                    {interest || 'Velg alternativ'}
                    <span className="chevron">▾</span>
                  </button>
                  {isSelectOpen && (
                    <ul className="select-menu">
                      {interests.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            className="select-option"
                            onClick={() => {
                              setInterest(option)
                              setIsSelectOpen(false)
                            }}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <input type="hidden" name="interesse" value={interest} />
                </div>
              </label>
              <label className="field">
                <span>Navn</span>
                <input type="text" name="navn" placeholder="Ditt navn" />
              </label>
              <label className="field">
                <span>E-post</span>
                <input type="email" name="email" placeholder="hei@eksempel.no" />
              </label>
              <label className="field">
                <span>Telefon</span>
                <input type="tel" name="telefon" placeholder="+47 400 00 000" />
              </label>
              <label className="field">
                <span>Hva vil du jobbe med?</span>
                <textarea name="ønske" rows="4" placeholder="Workshop, audition eller privattime?"></textarea>
              </label>
              <button type="button" className="button primary">
                Send (dummy)
              </button>
              <div className="inline-contact">
                <span className="muted">Eller kontakt oss direkte:</span>
                <a className="link" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                <a className="link" href={contactPhoneHref}>
                  {contactPhone}
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Act © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
