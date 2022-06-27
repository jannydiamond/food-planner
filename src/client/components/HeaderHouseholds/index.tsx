import React from 'react'
import Navigation from './Navigation'
import HeaderWrapper from './__styled__/HeaderWrapper'

const HeaderHouseholds = () => {
  return (
    <HeaderWrapper>
      <Navigation />
    </HeaderWrapper>
  )
}

export default React.memo(HeaderHouseholds)
