import './LaunchOverlay.css'

function LaunchOverlay() {
  return (
    <div className="launch-overlay" role="dialog" aria-modal="true" aria-label="Kommer snart">
      <div className="launch-overlay-card">
        <img src="/Act.2.svg" alt="Act logo" className="launch-overlay-logo" />
        <h1>Kommer snart</h1>
        <p>Vi finpusser nettsiden før lansering.</p>
      </div>
    </div>
  )
}

export default LaunchOverlay
