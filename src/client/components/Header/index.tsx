import React from 'react'
import { NavLink } from 'react-router-dom'

import LogoutButton from 'client/components/Buttons/LogoutButton'

const Header = () => {
  return (
    <header>
      <NavLink to={'/'}>Foodplanner</NavLink>
      <LogoutButton />
    </header>
  )
}

export default React.memo(Header)
