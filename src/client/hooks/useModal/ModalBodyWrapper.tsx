import styled from 'styled-components/macro'

type Props = {
  hasFooter?: boolean
}

const ModalBodyWrapper = styled('div')<Props>`
  margin: auto;
  max-height: ${(props) =>
    props.hasFooter
      ? `calc(100vh - ${props.theme.modal.footerHeight} - ${props.theme.modal.headerHeight})`
      : `calc(100vh - ${props.theme.modal.headerHeight})`};
  width: 100%;
  padding: 24px;
  position: relative;
  overflow-y: auto;

  > *:first-child {
    margin-top: 0;
  }
`

export default ModalBodyWrapper
