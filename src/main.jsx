import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import './index.css'
import { ThemePreferenceContextProvider } from './contexts/ThemePreferenceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemePreferenceContextProvider>
      <Root />
    </ThemePreferenceContextProvider>
  </React.StrictMode>,
)
