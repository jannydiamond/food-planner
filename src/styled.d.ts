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
  }
}
