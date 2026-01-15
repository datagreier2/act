import './App.css'
import AboutSection from './components/AboutSection'
import CoursesSection from './components/CoursesSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import InstructorsSection from './components/InstructorsSection'
import KartleggingskursSection from './components/KartleggingskursSection'
import Menu from './components/Menu'
import NewsSection from './components/NewsSection'
import ThemesSection from './components/ThemesSection'
import TipsSection from './components/TipsSection'

function App() {
  return (
    <div className="app">
      <Menu />
      <main className="app-content">
        <Hero />
        <InstructorsSection />
        <ThemesSection />
        <CoursesSection />
        <KartleggingskursSection />
        <TipsSection />
        <NewsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
