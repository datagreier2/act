import './App.css'

function withBase(path) {
  const base = import.meta.env.BASE_URL || '/'
  if (path.startsWith('/')) {
    return `${base}${path.slice(1)}`
  }
  return `${base}${path}`
}

function App() {
  return (
    <main className="landing">
      <section className="landing-card" aria-label="Kommer snart">
        <img src={withBase('/Act.2.svg')} alt="Act logo" className="landing-logo" />
        <h1>Kommer snart</h1>
        <p>Vi jobber med en ny nettside.</p>
      </section>
    </main>
  )
}

export default App
