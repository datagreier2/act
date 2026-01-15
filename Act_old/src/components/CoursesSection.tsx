import type { FC } from 'react'

const courses = [
  {
    title: 'Scene 1: Introduksjon og tilstedeværelse',
    date: 'Mandag 6. mai',
    description:
      'Vi blir kjent gjennom lek og improvisasjon, og jobber med å finne trygghet i rommet og foran publikum.',
    image: '/images/pexels-rdne-5756661.jpg',
  },
  {
    title: 'Scene 2: Karakter og tekst',
    date: 'Mandag 13. mai',
    description:
      'Fra analyse til uttrykk: Du får verktøy for å bryte ned teksten og bygge karakteren lag for lag.',
    image: '/images/pexels-pixabay-275200.jpg',
  },
  {
    title: 'Scene 3: Kamera og audition',
    date: 'Mandag 20. mai',
    description:
      'Vi trener på self-tapes, kamerateknikk og presentasjon av monolog. Du får personlig tilbakemelding underveis.',
    image: '/images/pexels-tima-miroshnichenko-5710941.jpg',
  },
]

const CoursesSection: FC = () => {
  return (
    <section className="section" id="kurs">
      <div className="section-header">
        <span className="section-kicker">Kurs</span>
        <h2>Tre kvelder med fokusert scenetrening</h2>
        <p>
          Hovedkurset går over tre mandager i Oslo sentrum. Hver kveld har et
          eget fokus, og du kan delta på enkeltdager eller hele rekken.
        </p>
      </div>
      <div className="card-grid">
        {courses.map((course) => (
          <article className="card" key={course.title}>
            <img
              className="card-image"
              src={course.image}
              alt={course.title}
              width={320}
              height={240}
            />
            <div className="card-body">
              <h3>{course.title}</h3>
              <p className="card-tag">{course.date}</p>
              <p>{course.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CoursesSection
