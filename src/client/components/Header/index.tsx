import React from 'react'
import { NavLink } from 'react-router-dom'

import LogoutButton from 'client/components/Buttons/LogoutButton'

const Header = () => {
  return (
    <header>
      <NavLink to={'/'}>Foodplanner</NavLink>
      <LogoutButton />
      <NavLink to="households">
        {({ isActive }) => <span>Households{isActive ? ' (active)' : ''}</span>}
      </NavLink>
      <NavLink to="groceries">
        {({ isActive }) => <span>Groceries{isActive ? ' (active)' : ''}</span>}
      </NavLink>
    </header>
  )
}

export default React.memo(Header)
