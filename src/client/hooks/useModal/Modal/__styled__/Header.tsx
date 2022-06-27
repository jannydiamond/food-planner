import styled from 'styled-components/macro'

type HeaderProps = {
  hasNoHeader?: boolean
}

const Header = styled('div')<HeaderProps>`
  margin: auto;
  height: ${(props) => props.theme.modal.headerHeight};
  width: 100%;
  padding: 0 24px;
  position: relative;
  overflow: hidden;
  display: ${(props) => (props.hasNoHeader ? 'none' : 'flex')};
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.modal.dividerColor};
`

export default Header
