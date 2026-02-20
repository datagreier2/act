import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OmOssPage from './OmOssPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OmOssPage />
  </StrictMode>,
)
