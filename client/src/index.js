import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  container
)
