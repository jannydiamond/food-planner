import styled from 'styled-components/macro'

const HeaderWrapper = styled('header')`
  display: grid;
  grid-template-columns: max-content auto max-content;
  grid-gap: 24px;
  align-items: center;

  padding: 0 12px;
  height: 48px;

  border-bottom: 1px solid rgba(255, 255, 255, 20%);
`

export default HeaderWrapper
