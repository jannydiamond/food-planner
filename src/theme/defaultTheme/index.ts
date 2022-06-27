import { DefaultTheme } from 'styled-components/macro'

const defaultTheme: DefaultTheme = {
  colors: {
    primary: {
      main: '#0fbcf9',
      light: '#4bcffa',
      dark: '',
    },
    secondary: {
      main: '',
      light: '',
      dark: '',
    },
  },
  mediaQuerys: {
    phone: {
      maxWidth: '480px',
      minWidth: '0',
    },
    tablet: {
      portrait: {
        maxWidth: '767px',
        minWidth: '481px',
      },
      landscape: {
        maxWidth: '1023px',
        minWidth: '768px',
      },
    },
    desktop: {
      maxWidth: '100%',
      minWidth: '1024px',
    },
  },
  modal: {
    titleColor: '#ffffff',
    backgroundColor: '#333',
    color: '#ffffff',
    backdropColor: 'rgb(0, 0, 0, 0.6)',
    dividerColor: `#dadada50`,
    boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.2)',
    headerHeight: '64px',
    footerHeight: '80px',
  },
  zIndex: {
    modal: 10000,
  },
}

export default defaultTheme
