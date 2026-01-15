import type { FC } from 'react'

type AvailabilityDay = {
  date: string
  weekday: string
  slots: Array<{ time: string; status: 'available' | 'few' | 'full' }>
}

const availability: AvailabilityDay[] = [
  {
    weekday: 'Mandag',
    date: '2. juni',
    slots: [
      { time: '09:30', status: 'available' },
      { time: '11:00', status: 'few' },
      { time: '13:30', status: 'available' },
      { time: '15:00', status: 'full' },
    ],
  },
  {
    weekday: 'Onsdag',
    date: '4. juni',
    slots: [
      { time: '10:00', status: 'few' },
      { time: '12:30', status: 'available' },
      { time: '14:00', status: 'available' },
      { time: '16:30', status: 'few' },
    ],
  },
  {
    weekday: 'Fredag',
    date: '6. juni',
    slots: [
      { time: '09:00', status: 'available' },
      { time: '11:30', status: 'available' },
      { time: '13:00', status: 'few' },
      { time: '15:30', status: 'available' },
    ],
  },
  {
    weekday: 'Mandag',
    date: '9. juni',
    slots: [
      { time: '09:30', status: 'available' },
      { time: '11:00', status: 'available' },
      { time: '13:30', status: 'few' },
      { time: '15:00', status: 'few' },
    ],
  },
]

const statusLabel: Record<AvailabilityDay['slots'][number]['status'], string> = {
  available: 'Ledig',
  few: 'Få plasser',
  full: 'Venteliste',
}

const KartleggingskursSection: FC = () => {
  return (
    <section className="section" id="kartleggingskurs">
      <div className="section-header">
        <span className="section-kicker">Kartleggingskurs</span>
        <h2>Velg tidspunkt for individuell kartlegging</h2>
        <p>
          Før du melder deg på hovedkurset anbefaler vi et kort kartleggingsmøte.
          Vi kartlegger mål, erfaring og ønsker slik at du får mest mulig ut av
          treningen. Finn en ledig tid i kalenderen og reserver plass.
        </p>
      </div>
      <div className="availability-calendar">
        {availability.map((day) => (
          <article className="availability-day" key={`${day.weekday}-${day.date}`}>
            <header className="availability-day-header">
              <span className="availability-day-weekday">{day.weekday}</span>
              <span className="availability-day-date">{day.date}</span>
            </header>
            <ul className="availability-slots">
              {day.slots.map((slot) => (
                <li
                  key={`${day.date}-${slot.time}`}
                  className={`availability-slot availability-slot-${slot.status}`}
                >
                  <span className="availability-slot-time">{slot.time}</span>
                  <span className="availability-slot-status">
                    {statusLabel[slot.status]}
                  </span>
                </li>
              ))}
            </ul>
            <button className="availability-reserve" type="button">
              Reserver tid
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default KartleggingskursSection
