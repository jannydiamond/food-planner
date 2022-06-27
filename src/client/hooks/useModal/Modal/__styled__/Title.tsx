import styled from 'styled-components/macro'

type Props = {
  themeColor: string
}

const Title = styled('h1')<Props>`
  color: ${(props) => props.themeColor};
  font-size: 18px;
  margin-right: calc(12px + 64px);

  @media (min-width: ${(props) => props.theme.mediaQuerys.desktop.minWidth}) {
    font-size: 24px;
  }
`

export default Title
