import type { FC } from 'react'

const themes = [
  {
    title: 'Følelser i fokus',
    description:
      'Utforsk teknikker for å hente frem ekte følelser, bygge relasjoner på scenen og holde energien levende gjennom hele scenen.',
    image: '/images/pexels-cottonbro-6896194.jpg',
  },
  {
    title: 'Kropp og stemme',
    description:
      'Lær hvordan du bruker pust, bevegelse og stemmebruk til å formidle historier som fenger publikum fra første replikk.',
    image: '/images/pexels-gesel-763214.jpg',
  },
  {
    title: 'Tekstarbeid',
    description:
      'Jobb strukturert med manus, undertekst og rytme for å finne nye innganger til karakteren og teksten.',
    image: '/images/pexels-cottonbro-10558685.jpg',
  },
]

const ThemesSection: FC = () => {
  return (
    <section className="section" id="temaer">
      <div className="section-header">
        <span className="section-kicker">Temaer</span>
        <h2>Moduler som bygger deg opp steg for steg</h2>
        <p>
          Hver kurskveld tar for seg et nytt tema. Kombinasjonen av teori,
          praktiske øvelser og refleksjon gir deg et solid grunnlag for både
          scene og kamera.
        </p>
      </div>
      <div className="card-grid">
        {themes.map((theme) => (
          <article className="card card-theme" key={theme.title}>
            <img
              className="card-image"
              src={theme.image}
              alt={theme.title}
              width={320}
              height={240}
            />
            <div className="card-body">
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ThemesSection
