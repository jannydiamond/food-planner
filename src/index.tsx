import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'client/App/App'
import GlobalStyles from 'client/GlobalStyles'
import defaultTheme from 'theme/defaultTheme'
import { ThemeProvider } from 'styled-components/macro'
import { Provider } from 'react-redux'
import { actions, store } from 'client/Redux/store'
import { BrowserRouter } from 'react-router-dom'
import { getAuthToken } from 'client/utils/localStorage'
//import reportWebVitals from './client/reportWebVitals'

const root = createRoot(document.getElementById('root') as HTMLElement)

// If the user already has a auth token, we set it to the store,
// so they will be logged in automatically
const token = getAuthToken()

if (token) {
  store.dispatch(actions.authentication.setToken(token))
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
