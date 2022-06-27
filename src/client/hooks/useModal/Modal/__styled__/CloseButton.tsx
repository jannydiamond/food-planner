import styled from 'styled-components/macro'

const CloseButton = styled('button')`
  position: absolute;
  right: 0;
  top: 0;

  height: 64px;
  width: 64px;

  border: none;
  background: transparent;
  color: ${(props) => props.theme.modal.color};

  font-size: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }
`

export default CloseButton
