import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { registerMythosServiceWorker } from './pwa'
import { applyTurkishCopyPolish } from './turkishCopyPolish'
import './styles.css'
import './refinements.css'

applyTurkishCopyPolish()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerMythosServiceWorker()
