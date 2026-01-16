import { useEffect, useRef, useState } from 'react'
import { getHomePage } from './sanity/data'
import './App.css'

const sectionConfig = {
  sectionAktuelt: { id: 'aktuelt', label: 'Aktuelt' },
  sectionKalender: { id: 'kalender', label: 'Kalender' },
  sectionAnnet: { id: 'annet', label: 'Annet' },
  sectionKjope: { id: 'kjope', label: 'Kjøpe' },
  sectionKontakt: { id: 'kontakt', label: 'Kontakt' },
  sectionOmOss: { id: 'om-oss', label: 'Om oss' },
}

function App() {
  const baseUrl = import.meta.env.BASE_URL
  const withBase = (path) => {
    if (!path) return path
    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
      return path
    }
    if (path.startsWith('/')) {
      return `${baseUrl}${path.slice(1)}`
    }
    return `${baseUrl}${path}`
  }
  const formatDateTime = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return new Intl.DateTimeFormat('no-NO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }
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

  const header = homePage?.header || {}
  const heroImageUrl = header?.heroImage?.asset?.url || withBase('/pexels-cottonbro-6896192.jpg')
  const heroImageAlt = header?.heroImage?.alt || 'Instruktør som veileder foran to skuespillere'
  const sections = homePage?.sections || []
  const interests = sections
    .flatMap((section) => section?.events?.map((event) => `Kalender: ${event.title}`) || [])
    .concat('Annet')
  const contactSection = sections.find((section) => section._type === 'sectionKontakt')
  const contactEmail = contactSection?.email || 'hei@actstudio.no'
  const contactPhone = contactSection?.phone || '+47 400 00 000'
  const contactPhoneHref = `tel:${contactPhone.replace(/\s+/g, '')}`
  const footer = homePage?.footer || {}

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <img src={withBase('/Act.2.svg')} alt="Act logo" className="brand-mark" />
        </div>
        <nav className="nav">
          <a href="#forside">Forside</a>
          {sections.map((section) => {
            const config = sectionConfig[section._type]
            if (!config) return null
            return (
              <a key={section._key || section._type} href={`#${config.id}`}>
                {config.label}
              </a>
            )
          })}
        </nav>
      </header>

      <main className="content">
        <section id="forside" className="hero">
          <div className="hero-text">
            <p className="eyebrow">Act</p>
            <h1>{header?.heroTitle || 'Trening for scenen og kameraet.'}</h1>
            <p className="lede">
              {header?.heroLead ||
                'Act er studioet til skuespillerlærer Bjørn Kolstø og skuespiller Grettir Einarsson. Vi tilbyr workshops og privattimer for deg som vil styrke nærvær, presisjon og lek.'}
            </p>
            <p className="lede">
              {header?.heroLeadSecondary ||
                'Vi jobber håndfast og jordet: tekst, impuls, fysisk spill og stemme. Målet er at du møter audition, sett og scene med trygghet og egne valg.'}
            </p>
            <div className="cta-row">
              <a className="button primary" href={header?.ctaPrimaryHref || '#kalender'}>
                {header?.ctaPrimaryLabel || 'Se kalender'}
              </a>
              <a className="button ghost" href={header?.ctaSecondaryHref || '#kontakt'}>
                {header?.ctaSecondaryLabel || 'Kontakt oss'}
              </a>
            </div>
          </div>
          <div className="hero-card">
            <figure className="hero-image">
              <img src={heroImageUrl} alt={heroImageAlt} />
            </figure>
          </div>
        </section>

        {sections.map((section) => {
          const config = sectionConfig[section._type]
          if (!config) return null

          if (section._type === 'sectionKalender') {
            const events = [...(section.events || [])].sort((a, b) =>
              (a.dateTime || '').localeCompare(b.dateTime || '')
            )
            return (
              <section key={section._key} id={config.id} className="section">
                <div className="section-head">
                  <p className="eyebrow">{config.label}</p>
                  <h2>{section.title || config.label}</h2>
                  {section.body ? <p className="muted">{section.body}</p> : null}
                </div>
                <div className="workshop-grid">
                  {events.map((event) => (
                    <article key={event._id} className="workshop-card">
                      <div className="meta-line">
                        <span className="pill">{formatDateTime(event.dateTime)}</span>
                      </div>
                      <h3>{event.title}</h3>
                      {event.details ? <p>{event.details}</p> : null}
                      <a className="button ghost" href="#interesse">
                        Meld interesse
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )
          }

          if (section._type === 'sectionKontakt') {
            return (
              <section key={section._key} id={config.id} className="section contact">
                <div className="section-head">
                  <p className="eyebrow">{config.label}</p>
                  <h2>{section.title || config.label}</h2>
                  {section.body ? <p className="muted">{section.body}</p> : null}
                </div>
                <div className="contact-grid">
                  <form id="interesse" className="contact-form">
                    <p className="eyebrow">Meld interesse</p>
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
                      <textarea
                        name="ønske"
                        rows="4"
                        placeholder="Workshop, audition eller privattime?"
                      ></textarea>
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
            )
          }

          return (
            <section key={section._key} id={config.id} className="section">
              <div className="section-head">
                <p className="eyebrow">{config.label}</p>
                <h2>{section.title || config.label}</h2>
                {section.body ? <p className="muted">{section.body}</p> : null}
              </div>
            </section>
          )
        })}
      </main>

      <footer className="footer">
        {footer.title ? <p>{footer.title}</p> : <p>Act © {new Date().getFullYear()}</p>}
        {footer.body ? <p className="muted">{footer.body}</p> : null}
      </footer>
    </div>
  )
}

export default App
