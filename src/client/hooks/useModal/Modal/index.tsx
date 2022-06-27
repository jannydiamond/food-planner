import React from 'react'
import ReactDOM from 'react-dom'

import Wrapper from './__styled__/Wrapper'
import Backdrop from './__styled__/Backdrop'
import Content from './__styled__/Content'
import Header from './__styled__/Header'
import Body from './__styled__/Body'
import Title from './__styled__/Title'
import CloseButton from './__styled__/CloseButton'

type Props = {
  titleLabel: string
  titleColor: string
  hasNoHeader?: boolean
  children: React.ReactChild
  closeModal: () => void
  hasNoBackdrop?: boolean
}

const Modal = ({
  titleColor,
  titleLabel,
  hasNoHeader,
  children,
  closeModal,
  hasNoBackdrop,
}: Props) => {
  const domEl = document.getElementById('modal-root')

  if (!domEl) return null

  return ReactDOM.createPortal(
    <React.Fragment>
      <Wrapper data-test="modal" hasNoBackdrop={hasNoBackdrop}>
        <Backdrop hasNoBackdrop={hasNoBackdrop} onClick={closeModal} />
        <Content>
          <Header hasNoHeader={hasNoHeader}>
            <Title themeColor={titleColor}>{titleLabel}</Title>
            <CloseButton onClick={closeModal} data-test="modal__btn-close">
              X
            </CloseButton>
          </Header>
          <Body>{children}</Body>
        </Content>
      </Wrapper>
    </React.Fragment>,
    domEl
  )
}

export default React.memo(Modal)
