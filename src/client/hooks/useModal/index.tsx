import React, { useCallback, useState } from 'react'

import Modal from './Modal'
import Prompt from './Prompt'

type ModalProps = {
  titleColor: string
  titleLabel: string
  hasNoHeader?: boolean
  hasNoBackdrop?: boolean
  children: React.ReactChild
  closeCallback?: () => void
}

export type RenderModalType = (props: ModalProps) => JSX.Element

// Renders a modal to the modal root and handles the visibility state
// of this modal.
//
// NOTE: Each modal you want to render should use a separate hook!!!
// Otherwise your modals will share their visibility state which might lead
// to overlapping and unclosable elements.
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)
  const show = useCallback(() => setIsVisible(true), [setIsVisible])
  const hide = useCallback(() => setIsVisible(false), [setIsVisible])

  const RenderModal: RenderModalType = ({
    titleColor,
    titleLabel,
    hasNoHeader,
    children,
    closeCallback,
    hasNoBackdrop,
  }) => {
    const handleClose = useCallback(() => {
      hide()
      if (closeCallback) {
        closeCallback()
      }
    }, [closeCallback])

    return (
      <React.Fragment>
        {isVisible && (
          <Modal
            hasNoBackdrop={hasNoBackdrop}
            titleColor={titleColor}
            titleLabel={titleLabel}
            hasNoHeader={hasNoHeader}
            closeModal={handleClose}
          >
            {children}
          </Modal>
        )}
      </React.Fragment>
    )
  }

  return {
    show,
    hide,
    isVisible,
    RenderModal,
  }
}

type PromptProps = {
  closeCallback?: () => void
  children?: React.ReactChild
  noHandler: () => void
  titleColor: string
  titleLabel: string
  yesHandler: () => void
}

export type RenderPromptType = (props: PromptProps) => JSX.Element

export const usePrompt = () => {
  const { show, hide, RenderModal } = useModal()

  const RenderPrompt: RenderPromptType = ({
    children,
    noHandler,
    titleColor,
    titleLabel,
    yesHandler,
  }) => (
    <RenderModal
      titleColor={titleColor}
      titleLabel={titleLabel}
      closeCallback={noHandler}
    >
      <Prompt yesHandler={yesHandler} noHandler={noHandler}>
        {children}
      </Prompt>
    </RenderModal>
  )

  return {
    show,
    hide,
    RenderPrompt,
  }
}
