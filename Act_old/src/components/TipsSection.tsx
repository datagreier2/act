import type { FC } from 'react'

const tips = [
  {
    title: 'Varm opp stemmen',
    description:
      'En kort, bevisst stemmeoppvarming før hver øving løfter både energi og tydelighet i replikkene dine.',
  },
  {
    title: 'Finn partnerens blikk',
    description:
      'Fokuser på medspillerens reaksjoner fremfor din egen levering. Det åpner for ekte samspill.',
  },
  {
    title: 'Ta notater etter hver økt',
    description:
      'Skriv ned hva som fungerte, hvor du ble usikker og hvilke spørsmål du vil ta med til neste samling.',
  },
]

const TipsSection: FC = () => {
  return (
    <section className="section" id="tips">
      <div className="section-header">
        <span className="section-kicker">Tips og råd</span>
        <h2>Små grep som gir stor forskjell</h2>
        <p>
          Mellom kurskveldene anbefaler vi at du holder fokus gjennom enkle
          rutiner. Her er noen forslag du kan teste allerede i dag.
        </p>
      </div>
      <div className="tips-list">
        {tips.map((tip) => (
          <article className="tip-card" key={tip.title}>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TipsSection
