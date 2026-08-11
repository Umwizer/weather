import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
// @ts-ignore: side-effect CSS import
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
