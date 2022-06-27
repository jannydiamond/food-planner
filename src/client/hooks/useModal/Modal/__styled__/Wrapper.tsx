import styled, { css } from 'styled-components/macro'

type Props = {
  hasNoBackdrop?: boolean
}

const centering = css<Props>`
  ${(props) => {
    if (props.hasNoBackdrop) {
      return css`
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%);
      `
    } else {
      return css`
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        @media (min-width: ${(props) =>
            props.theme.mediaQuerys.desktop.minWidth}) {
          width: 100%;

          transition: width 0.2s ease-in-out;
        }
      `
    }
  }}
`

const Wrapper = styled('div')<Props>`
  ${centering}

  z-index: ${(props) => props.theme.zIndex.modal};
  padding: 0;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default Wrapper
