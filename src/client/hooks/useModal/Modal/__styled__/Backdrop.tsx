import styled, { css } from 'styled-components/macro'

type Props = {
  hasNoBackdrop?: boolean
}

const Backdrop = styled('div')<Props>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  ${(props) =>
    !props.hasNoBackdrop
      ? css`
          background: ${(props) => props.theme.modal.backdropColor};
        `
      : ''};
`

export default Backdrop
