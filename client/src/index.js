import React from 'react'
import './index.css'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
)
