import styled from 'styled-components/macro'

const ModalFooterWrapper = styled('div')`
  margin: auto;
  height: ${(props) => props.theme.modal.footerHeight};
  width: 100%;
  padding: 0 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.modal.dividerColor};
  margin-top: -1px;

  button,
  [type='submit'] {
    width: 100%;
  }

  button + button,
  button + [type='submit'] {
    margin-left: 16px;
  }
`

export default ModalFooterWrapper
