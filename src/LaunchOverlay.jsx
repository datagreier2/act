import './LaunchOverlay.css'

function LaunchOverlay() {
  return (
    <div className="launch-overlay" role="dialog" aria-modal="true" aria-label="Kommer snart">
      <div className="launch-overlay-card">
        <img src="/Act.2.svg" alt="Act logo" className="launch-overlay-logo" />
        <h1>Kommer snart</h1>
        <p>Vi finpusser nettsiden før lansering.</p>
        <p>
          Intern visning er tilgjengelig på <strong>/preview/</strong>.
        </p>
        <a className="button ghost compact launch-overlay-link" href="/preview/">
          Åpne forhåndsvisning
        </a>
      </div>
    </div>
  )
}

export default LaunchOverlay
