import type { FC } from 'react'

const Footer: FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer-text">
        © {year} Akt. Laget med React og Vite.
      </p>
    </footer>
  )
}

export default Footer
