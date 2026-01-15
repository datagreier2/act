import type { FC } from 'react'
import { useState } from 'react'

const newsItems = [
  {
    title: 'Åpen visning',
    date: '26. mai 2025',
    time: '18:00 – 20:00',
    location: 'Kulturhuset, Youngstorget',
    description:
      'Vi avslutter vårens kursrekke med en uformell visning der deltakerne viser frem arbeid fra øktene. Venner og familie er hjertelig velkommen.',
    link: '#',
  },
  {
    title: 'Sommerkurs – intensiv uke',
    date: '15.–19. juli 2025',
    time: '17:30 – 21:00',
    location: 'Nordisk Filmstudio',
    description:
      'Vi planlegger et intensivt sommerkurs med fokus på audition og self-tape. Meld deg på nyhetsbrevet for å få beskjed først.',
    link: '#',
  },
  {
    title: 'Drop-in sceneverksted',
    date: 'Hver torsdag i august',
    time: '19:00 – 21:30',
    location: 'Akt Studio, Grünerløkka',
    description:
      'Uformelle kvelder der du kan prøve nye scener, lese tekster og få tilbakemelding fra andre deltakere og kursholdere.',
    link: '#',
  },
]

const NewsSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section className="section" id="kalender">
      <div className="section-header">
        <span className="section-kicker">Kalender</span>
        <h2>Det skjer hos Akt</h2>
        <p>
          Følg med på kommende arrangementer, visninger og nye kurs. Vi oppdaterer
          kalenderen fortløpende gjennom året.
        </p>
      </div>
      <ol className="calendar">
        {newsItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <li key={item.title} className="calendar-item">
              <button
                className={`calendar-summary${
                  isOpen ? ' calendar-summary-open' : ''
                }`}
                type="button"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                aria-controls={`calendar-panel-${index}`}
                id={`calendar-summary-${index}`}
              >
                <div className="calendar-meta">
                  <span className="calendar-date">{item.date}</span>
                  <span className="calendar-time">{item.time}</span>
                </div>
                <div className="calendar-title-wrapper">
                  <h3>{item.title}</h3>
                  <span className="calendar-location">{item.location}</span>
                </div>
                <span className="calendar-icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
              <div
                className={`calendar-panel${isOpen ? ' calendar-panel-open' : ''}`}
                id={`calendar-panel-${index}`}
                role="region"
                aria-labelledby={`calendar-summary-${index}`}
              >
                <p>{item.description}</p>
                <a className="calendar-link" href={item.link}>
                  Les mer
                </a>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default NewsSection
