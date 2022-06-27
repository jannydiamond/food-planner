import styled from 'styled-components/macro'

const Body = styled('div')`
  height: calc(100% - ${(props) => props.theme.modal.footerHeight});
  color: ${(props) => props.theme.modal.color};
`

export default Body
