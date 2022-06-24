import React from 'react'

import HeaderWrapper from './__styled__/HeaderWrapper'
import Logo from './Logo'
import Navigation from './Navigation'
import LogoutButton from './LogoutButton'

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />

      <Navigation />

      <LogoutButton />
    </HeaderWrapper>
  )
}

export default React.memo(Header)
