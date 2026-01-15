import type { FC } from 'react'

const instructors = [
  {
    name: 'Ida Solberg',
    focus: 'Impro og samspill',
    description:
      'Ida kombinerer improvisasjon og bevegelse for å gi deg verktøy som åpner for spontanitet og nærvær på scenen.',
    image: '/images/pexels-cottonbro-6896192.jpg',
  },
  {
    name: 'Marius Holte',
    focus: 'Karakterarbeid',
    description:
      'Marius hjelper deg å bygge karakterer fra første idé til ferdig rolle, med teknikker som gir dybde og troverdighet.',
    image: '/images/pexels-cottonbro-6896221.jpg',
  },
  {
    name: 'Selma Aksnes',
    focus: 'Film og audition',
    description:
      'Selma deler konkrete tips for å skille deg ut på self-tapes, kameraøvelser og audition-situasjoner.',
    image: '/images/pexels-rdne-5756571.jpg',
  },
]

const InstructorsSection: FC = () => {
  return (
    <section className="section" id="kursholdere">
      <div className="section-header">
        <span className="section-kicker">Kursholdere</span>
        <h2>Erfarne skuespillere og pedagoger</h2>
        <p>
          Møt teamet som leder deg gjennom øvelser, workshops og individuell
          oppfølging. Hver samling ledes av fagpersoner som brenner for å løfte
          nye stemmer i norsk scenekunst.
        </p>
      </div>
      <div className="card-grid">
        {instructors.map((instructor) => (
          <article className="card" key={instructor.name}>
            <img
              className="card-image"
              src={instructor.image}
              alt={instructor.name}
              width={320}
              height={240}
            />
            <div className="card-body">
              <h3>{instructor.name}</h3>
              <p className="card-tag">{instructor.focus}</p>
              <p>{instructor.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default InstructorsSection
