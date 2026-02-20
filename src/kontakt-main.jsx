import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KontaktPage from './KontaktPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KontaktPage />
  </StrictMode>,
)
