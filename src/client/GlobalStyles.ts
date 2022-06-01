import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyle = createGlobalStyle`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Arial, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    margin: 0;
    padding: 0;

    background: #333;
    color: #fff;
  }

  a {
    color: #16a085;

    &:hover {
      color: #1abc9c;
    }
  }
`
export default GlobalStyle
