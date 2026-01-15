import type { FC } from 'react'
import { useState } from 'react'

const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navId = 'primary-menu'

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="menu">
      <div className="menu-inner">
        <a className="menu-logo" href="#">
          <img
            className="menu-logo-icon"
            src="/VectorAct_v1_purp.svg"
            alt="Akt-logo"
            width={36}
            height={36}
          />
        </a>
        <button
          className={`menu-toggle${isOpen ? ' menu-toggle-open' : ''}`}
          type="button"
          aria-label={isOpen ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={isOpen}
          aria-controls={navId}
          onClick={handleToggle}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id={navId}
          className={`menu-links${isOpen ? ' menu-links-open' : ''}`}
        >
          <a href="#kursholdere" onClick={handleLinkClick}>
            Kursholdere
          </a>
          <a href="#temaer" onClick={handleLinkClick}>
            Temaer
          </a>
          <a href="#kurs" onClick={handleLinkClick}>
            Kurs
          </a>
          <a href="#kartleggingskurs" onClick={handleLinkClick}>
            Kartleggingskurs
          </a>
          <a href="#tips" onClick={handleLinkClick}>
            Tips og råd
          </a>
          <a href="#kalender" onClick={handleLinkClick}>
            Kalender
          </a>
          <a href="#om-oss" onClick={handleLinkClick}>
            Om oss
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Menu
