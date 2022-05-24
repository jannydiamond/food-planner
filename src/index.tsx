import React from 'react'
import ReactDOM from 'react-dom'
import App from './client/App/App'
import GlobalStyles from 'client/GlobalStyles'
import defaultTheme from 'theme/defaultTheme'
import { ThemeProvider } from 'styled-components/macro'
//import reportWebVitals from './client/reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
