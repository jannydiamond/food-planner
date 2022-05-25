import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'client/App/App'
import GlobalStyles from 'client/GlobalStyles'
import defaultTheme from 'theme/defaultTheme'
import { ThemeProvider } from 'styled-components/macro'
import { Provider } from 'react-redux'
import { store } from 'client/Redux/store'
//import reportWebVitals from './client/reportWebVitals'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
