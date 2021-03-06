// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// Import your own reducer
import userSlice from '../features/user/state/userSlice'
import characterSlice from '../features/character/characterSlice'
import campaignSlice from '../features/campaign/campaignSlice'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        user: userSlice,
        character: characterSlice,
        campaign: campaignSlice,
      },
      preloadedState,
    }),
    route = '/',
    ...renderOptions
  } = {}
) {
  window.history.pushState({}, 'Test Page', route)
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
