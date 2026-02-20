import { useEffect, useRef, useState } from 'react'
import { getAktueltPage, getCalendarSection, getHomePage } from './sanity/data'
import LaunchOverlay from './LaunchOverlay'
import { getIsPreviewMode } from './previewMode'
import './App.css'

const sectionConfig = {
  sectionKalender: { id: 'kalender', label: 'Kalender' },
  sectionAnnet: { label: 'Om oss', href: '/om-oss/' },
  sectionKjope: { id: 'kjope', label: 'Kjøpe' },
  sectionKontakt: { id: 'kontakt', label: 'Kontakt', href: '/kontakt/' },
  sectionOmOss: { id: 'om-oss', label: 'Om oss' },
}

function App() {
  const isPreviewMode = getIsPreviewMode()
  const formsparkAction = 'https://submit-form.com/v1phnx4Ik'
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
  const normalizeEventLink = (value) => {
    const href = String(value || '').trim()
    if (!href) return ''
    if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href
    }
    return withBase(href)
  }
  const isExternalHref = (href) => /^(https?:)?\/\//.test(String(href || ''))
  const formatEventDate = (value) => {
    if (!value) return { date: 'Dato mangler', time: '' }
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return { date: String(value), time: '' }

    const dateLabel = new Intl.DateTimeFormat('no-NO', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
      .format(date)
      .replace(',', '')

    const timeLabel = new Intl.DateTimeFormat('no-NO', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)

    return {
      date: dateLabel,
      time: `kl. ${timeLabel}`,
    }
  }
  const toTimestamp = (value) => {
    if (!value) return null
    const timestamp = new Date(value).getTime()
    return Number.isNaN(timestamp) ? null : timestamp
  }
  const [interest, setInterest] = useState('')
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [homePage, setHomePage] = useState(null)
  const [aktueltPage, setAktueltPage] = useState(null)
  const [calendarSection, setCalendarSection] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [expandedLineEventKey, setExpandedLineEventKey] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    async function loadContent() {
      const [page, aktuelt, calendar] = await Promise.all([
        getHomePage(),
        getAktueltPage(),
        getCalendarSection(),
      ])
      if (isMounted) {
        setHomePage(page)
        setAktueltPage(aktuelt)
        setCalendarSection(calendar)
      }
    }

    loadContent().catch((error) => {
      console.error('Failed to load Sanity content:', error)
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!selectedEvent) return undefined

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSelectedEvent(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedEvent])

  const header = homePage?.header || {}
  const heroImageUrl = header?.heroImage?.asset?.url || withBase('/pexels-cottonbro-6896192.jpg')
  const heroImageAlt = header?.heroImage?.alt || 'Instruktør som veileder foran to skuespillere'
  const sections = (homePage?.sections || []).filter(
    (section) =>
      section &&
      typeof section === 'object' &&
      section?._type !== 'sectionAktuelt' &&
      section?.hide !== true
  )
  const hasCalendarSection = sections.some((section) => section?._type === 'sectionKalender')
  const sectionsWithCalendar =
    !hasCalendarSection && calendarSection
      ? [
          {
            _key: 'singleton-calendar-section',
            _type: 'sectionKalender',
            title: calendarSection?.title,
            body: calendarSection?.body,
          },
          ...sections,
        ]
      : sections
  const sectionsToRender = sectionsWithCalendar
  const nowTimestamp = Date.now()
  const upcomingCalendarEntries = [...(calendarSection?.entries || [])]
    .filter((entry) => entry && typeof entry === 'object')
    .map((entry) => ({ ...entry, _timestamp: toTimestamp(entry?.dateTime) }))
    .filter((entry) => entry._timestamp !== null && entry._timestamp >= nowTimestamp)
    .sort((a, b) => a._timestamp - b._timestamp)
  const featuredCalendarEntries = upcomingCalendarEntries.slice(0, 3)
  const remainingCalendarEntries = upcomingCalendarEntries.slice(3)
  const interests = [
    ...new Set(
      upcomingCalendarEntries
        .map((entry) => entry?.title?.trim())
        .filter(Boolean)
        .map((title) => `Kalender: ${title}`)
        .concat('Annet')
    ),
  ]
  const contactSection = sectionsToRender.find((section) => section?._type === 'sectionKontakt')
  const contactEmail = contactSection?.email || 'hei@actstudio.no'
  const contactPhone = contactSection?.phone || '+47 400 00 000'
  const contactPhoneHref = `tel:${String(contactPhone).replace(/\s+/g, '')}`
  const footer = homePage?.footer || {}
  const aktueltButtonHref = aktueltPage?.buttonHref || '/aktuelt'
  const defaultEventSignupHref = withBase('/kontakt/')
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <img src={withBase('/Act.2.svg')} alt="Act logo" className="brand-mark" />
        </div>
        <button
          type="button"
          className={`nav-toggle${isMobileMenuOpen ? ' is-open' : ''}`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-nav"
          aria-label={isMobileMenuOpen ? 'Lukk meny' : 'Åpne meny'}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="site-nav" className={`nav${isMobileMenuOpen ? ' is-open' : ''}`}>
          <a href="#forside" onClick={closeMobileMenu}>
            Forside
          </a>
          {!aktueltPage?.hide ? (
            <a href="#aktuelt" onClick={closeMobileMenu}>
              Aktuelt
            </a>
          ) : null}
          <a href={withBase('/kontakt/')} onClick={closeMobileMenu}>
            Kontakt oss
          </a>
          {sectionsToRender.map((section, index) => {
            if (section?._type === 'sectionKontakt') return null
            const config = sectionConfig[section?._type]
            if (!config) return null
            const href = config?.href ? withBase(config.href) : `#${config.id}`
            return (
              <a
                key={section?._key || section?._type || `section-link-${index}`}
                href={href}
                onClick={closeMobileMenu}
              >
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
            <p className="lede lede-intro">
              {header?.heroLead ||
                'Act er studioet til skuespillerlærer Bjørn Kolstø og skuespiller Grettir Einarsson. Vi tilbyr workshops og privattimer for deg som vil styrke nærvær, presisjon og lek.'}
            </p>
            <p className="lede lede-secondary">
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

        {!aktueltPage?.hide ? (
          <section id="aktuelt" className="section">
            <div className="section-head">
              <h2>Aktuelt</h2>
              {aktueltPage?.body ? <p className="aktuelt-body">{aktueltPage.body}</p> : null}
            </div>
            {!aktueltPage?.hideButton ? (
              <a className="button ghost compact aktuelt-link" href={withBase(aktueltButtonHref)}>
                Les mer
              </a>
            ) : null}
          </section>
        ) : null}

        {sectionsToRender.map((section, index) => {
          const config = sectionConfig[section?._type]
          if (!config) return null

          if (section._type === 'sectionKalender') {
            const sectionKey = section?._key || section?._type || `section-${index}`
            const calendarTitle = calendarSection?.title || section.title || config.label
            const calendarBody = calendarSection?.body || section.body
            return (
              <section key={sectionKey} id={config.id} className="section">
                <div className="section-head">
                  <p className="eyebrow">{config.label}</p>
                  <h2>{calendarTitle}</h2>
                  {calendarBody ? <p className="muted">{calendarBody}</p> : null}
                </div>
                {upcomingCalendarEntries.length === 0 ? (
                  <p className="muted">Ingen kommende arrangementer publisert enda.</p>
                ) : (
                  <>
                    <div className="workshop-grid">
                      {featuredCalendarEntries.map((event, eventIndex) => {
                        const cardDetails = event?.cardDetails || event?.details
                        const eventImageUrl = event?.cardImage?.asset?.url
                        const eventImageAlt = event?.cardImage?.alt || event?.title || 'Arrangement'
                        const eventDate = formatEventDate(event?.dateTime)
                        const hasFewSpots = event?.fewSpots === true
                        const showSignupButton = event?.hideSignupButton !== true
                        const signupHref =
                          normalizeEventLink(event?.signupLink) || defaultEventSignupHref
                        const isExternalSignupHref = isExternalHref(signupHref)
                        return (
                          <article
                            key={event?._key || `${event?.title || 'event'}-${event?.dateTime || eventIndex}`}
                            className="workshop-card"
                          >
                            <div className="meta-line">
                              <span className="pill pill-date">
                                <span className="pill-date-main">{eventDate.date}</span>
                                {eventDate.time ? (
                                  <span className="pill-date-time">{eventDate.time}</span>
                                ) : null}
                              </span>
                              {hasFewSpots ? <span className="pill pill-spots">Få plasser</span> : null}
                            </div>
                            {eventImageUrl ? (
                              <figure className="workshop-thumb">
                                <img src={eventImageUrl} alt={eventImageAlt} />
                              </figure>
                            ) : null}
                            <h3>{event?.title || 'Arrangement'}</h3>
                            {cardDetails ? <p>{cardDetails}</p> : null}
                            <div className="event-actions">
                              <button
                                type="button"
                                className="button ghost compact"
                                onClick={() => setSelectedEvent(event)}
                              >
                                Les mer
                              </button>
                              {showSignupButton ? (
                                <a
                                  className="button primary compact"
                                  href={signupHref}
                                  target={isExternalSignupHref ? '_blank' : undefined}
                                  rel={isExternalSignupHref ? 'noreferrer' : undefined}
                                >
                                  Meld interesse
                                </a>
                              ) : null}
                            </div>
                          </article>
                        )
                      })}
                    </div>
                    {remainingCalendarEntries.length > 0 ? (
                      <div className="event-lines-wrap">
                        <p className="eyebrow">Flere kommende arrangementer</p>
                        <div className="event-line-list">
                          {remainingCalendarEntries.map((event, eventIndex) => {
                            const eventKey =
                              event?._key || `${event?.title || 'event'}-${event?.dateTime || eventIndex}`
                            const detailsId = `event-line-details-${String(eventKey).replace(/[^a-zA-Z0-9_-]/g, '-')}`
                            const isExpanded = expandedLineEventKey === eventKey
                            const cardDetails = event?.cardDetails || event?.details
                            const eventImageUrl = event?.cardImage?.asset?.url
                            const eventImageAlt = event?.cardImage?.alt || event?.title || 'Arrangement'
                            const eventDate = formatEventDate(event?.dateTime)
                            const hasFewSpots = event?.fewSpots === true
                            const showSignupButton = event?.hideSignupButton !== true
                            const signupHref =
                              normalizeEventLink(event?.signupLink) || defaultEventSignupHref
                            const isExternalSignupHref = isExternalHref(signupHref)
                            return (
                              <article key={`line-${eventKey}`} className={`event-line${isExpanded ? ' is-expanded' : ''}`}>
                                <div className="event-line-summary">
                                  <span className="pill pill-date">
                                    <span className="pill-date-main">{eventDate.date}</span>
                                    {eventDate.time ? (
                                      <span className="pill-date-time">{eventDate.time}</span>
                                    ) : null}
                                  </span>
                                  <div className="event-line-main">
                                    <p className="event-line-title">{event?.title || 'Arrangement'}</p>
                                    {hasFewSpots ? <span className="pill pill-spots">Få plasser</span> : null}
                                  </div>
                                  <button
                                    type="button"
                                    className="button ghost compact event-line-toggle"
                                    aria-expanded={isExpanded}
                                    aria-controls={detailsId}
                                    onClick={() =>
                                      setExpandedLineEventKey((currentKey) =>
                                        currentKey === eventKey ? null : eventKey
                                      )
                                    }
                                  >
                                    {isExpanded ? 'Skjul' : 'Utvid'}
                                  </button>
                                </div>
                                <div
                                  id={detailsId}
                                  className={`event-line-details${eventImageUrl ? '' : ' no-image'}`}
                                  aria-hidden={!isExpanded}
                                >
                                  <div className="event-line-details-inner">
                                    {eventImageUrl ? (
                                      <figure className="event-line-thumb">
                                        <img src={eventImageUrl} alt={eventImageAlt} />
                                      </figure>
                                    ) : null}
                                    <div className="event-line-content">
                                      <h3>{event?.title || 'Arrangement'}</h3>
                                      {cardDetails ? <p>{cardDetails}</p> : null}
                                      <div className="event-actions">
                                        <button
                                          type="button"
                                          className="button ghost compact"
                                          onClick={() => setSelectedEvent(event)}
                                          disabled={!isExpanded}
                                          tabIndex={isExpanded ? 0 : -1}
                                        >
                                          Les mer
                                        </button>
                                        {showSignupButton ? (
                                          <a
                                            className="button primary compact"
                                            href={signupHref}
                                            target={isExternalSignupHref ? '_blank' : undefined}
                                            rel={isExternalSignupHref ? 'noreferrer' : undefined}
                                            tabIndex={isExpanded ? 0 : -1}
                                          >
                                            Meld interesse
                                          </a>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            )
                          })}
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </section>
            )
          }

          if (section._type === 'sectionAnnet') {
            return null
          }

          if (section._type === 'sectionKontakt') {
            const sectionKey = section?._key || section?._type || `section-${index}`
            return (
              <section key={sectionKey} id={config.id} className="section contact">
                <div className="section-head">
                  <p className="eyebrow">{config.label}</p>
                  <h2>{section.title || config.label}</h2>
                  {section.body ? <p className="muted">{section.body}</p> : null}
                </div>
                <div className="contact-grid">
                  <form
                    id="interesse"
                    className="contact-form"
                    action={formsparkAction}
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="skjema"
                      value="Meld interesse (forside)"
                    />
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
                      <input type="text" name="navn" placeholder="Ditt navn" required />
                    </label>
                    <label className="field">
                      <span>E-post</span>
                      <input type="email" name="email" placeholder="hei@eksempel.no" required />
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
                    <button type="submit" className="button primary">
                      Send
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
            <section
              key={section?._key || section?._type || `section-${index}`}
              id={config.id}
              className="section"
            >
              <div className="section-head">
                <p className="eyebrow">{config.label}</p>
                <h2>{section.title || config.label}</h2>
                {section.body ? <p className="muted">{section.body}</p> : null}
              </div>
            </section>
          )
        })}
      </main>

      {selectedEvent ? (
        <div
          className="event-dialog-backdrop"
          onClick={() => setSelectedEvent(null)}
          role="presentation"
        >
          <div
            className="event-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="event-dialog-close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Lukk dialog"
            >
              ×
            </button>
            <h3 id="event-dialog-title">{selectedEvent?.title || 'Arrangement'}</h3>
            <p>{selectedEvent?.details || 'Ingen detaljer tilgjengelig.'}</p>
            <div className="event-dialog-actions">
              <button
                type="button"
                className="button ghost compact"
                onClick={() => setSelectedEvent(null)}
              >
                Lukk
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <footer className="footer">
        {footer.title ? <p>{footer.title}</p> : <p>Act © {new Date().getFullYear()}</p>}
        {footer.body ? <p className="muted">{footer.body}</p> : null}
      </footer>
      {!isPreviewMode ? <LaunchOverlay /> : null}
    </div>
  )
}

export default App
