import React from 'react'
import LogoLink from './__styled__/LogoLink'

const Logo = () => {
  return <LogoLink to={'/'}>Foodplanner</LogoLink>
}

export default React.memo(Logo)
