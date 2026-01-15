import type { FC } from 'react'

const Hero: FC = () => {
  return (
    <section className="hero">
      <span className="hero-badge">Skuespillerkurs</span>
      <h1 className="hero-title">Utvid repertoaret ditt på scenen og foran kamera.</h1>
      <p className="hero-subtitle">
        Akt-kurset samler erfarne kursholdere, praktiske øvelser og personlig
        veiledning for å gi deg trygghet i alt fra improvisasjon til karakterarbeid.
        Perfekt som smakebit før audition eller som påfyll for etablerte skuespillere.
      </p>
      <div className="hero-actions">
        <a className="hero-cta" href="#kurs">
          Meld deg på
        </a>
        <a className="hero-link" href="#om-oss">
          Les mer
        </a>
      </div>
    </section>
  )
}

export default Hero
