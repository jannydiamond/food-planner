// import original module declarations
import 'styled-components/macro'

// and extend them!
declare module 'styled-components/macro' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string
        light: string
        dark: string
      }
      secondary: {
        main: string
        light: string
        dark: string
      }
    }
    mediaQuerys: {
      phone: {
        maxWidth: string
        minWidth: string
      }
      tablet: {
        portrait: {
          maxWidth: string
          minWidth: string
        }
        landscape: {
          maxWidth: string
          minWidth: string
        }
      }
      desktop: {
        maxWidth: string
        minWidth: string
      }
    }
    modal: {
      titleColor: string
      backgroundColor: string
      color: string
      backdropColor: string
      dividerColor: string
      boxShadow: string
      headerHeight: string
      footerHeight: string
    }
    zIndex: {
      modal: number
    }
  }
}
