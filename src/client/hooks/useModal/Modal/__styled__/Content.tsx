import styled from 'styled-components/macro'

const Content = styled('div')`
  background: ${(props) => props.theme.modal.backgroundColor};
  box-shadow: ${(props) => props.theme.modal.boxShadow};
  position: relative;

  max-width: calc(100% - 24px);
  max-height: 100vh;
  width: 100%;

  @media (min-width: ${(props) => props.theme.mediaQuerys.desktop.minWidth}) {
    max-width: 737px;
  }
`

export default Content
