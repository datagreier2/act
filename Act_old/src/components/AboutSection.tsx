import type { FC } from 'react'

const AboutSection: FC = () => {
  return (
    <section className="section section-about" id="om-oss">
      <div className="section-header">
        <span className="section-kicker">Om oss</span>
        <h2>Akt er et fellesskap for skuespillere i utvikling</h2>
        <p>
          Vi startet Akt fordi vi savnet et uformelt, men faglig sterkt sted å
          øve. Hos oss kan du prøve nye tekster, jobbe med teknikker du er nysgjerrig
          på og bygge nettverk med andre skuespillere og kursholdere.
        </p>
      </div>
      <div className="about-body">
        <p>
          Kursene våre foregår i små grupper for at alle skal få personlig veiledning.
          Vi veksler mellom faste kursrekker og drop-in kvelder, slik at du kan
          delta når det passer. Det viktigste er at du får et trygt rom til å prøve,
          feile og vokse.
        </p>
        <p>
          Vil du bidra eller holde kurs? Ta kontakt – vi er alltid på jakt etter
          nye samarbeidspartnere som vil dele erfaring og inspirasjon.
        </p>
      </div>
    </section>
  )
}

export default AboutSection
