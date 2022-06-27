import React from 'react'

import ModalBodyWrapper from './ModalBodyWrapper'
import ModalFooterWrapper from './ModalFooterWrapper'

const Prompt = ({
  yesHandler,
  noHandler,
  children,
}: {
  yesHandler: () => void
  noHandler: () => void
  children?: React.ReactChild
}) => {
  return (
    <React.Fragment>
      <ModalBodyWrapper hasFooter>{children}</ModalBodyWrapper>
      <ModalFooterWrapper>
        <button onClick={noHandler} data-test="NO">
          No
        </button>
        <button onClick={yesHandler} data-test="YES">
          Yes
        </button>
      </ModalFooterWrapper>
    </React.Fragment>
  )
}

export default React.memo(Prompt)
