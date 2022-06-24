import styled from 'styled-components/macro'

const ButtonWrapper = styled('button')`
  height: 48px;
  padding: 0 12px;
  margin-right: -12px;
  border: none;

  background: transparent;
  color: ${(props) => props.theme.colors.primary.main};
  font-size: 16px;
  cursor: pointer;

  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: white;
    background-color: ${(props) => props.theme.colors.primary.main};
  }
`

export default ButtonWrapper
