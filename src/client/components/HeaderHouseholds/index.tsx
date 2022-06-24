import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderHouseholds = () => {
  return (
    <header>
      <nav>
        <NavLink to="details">
          {({ isActive }) => <span>Details{isActive ? ' (active)' : ''}</span>}
        </NavLink>
        <NavLink to="inventories">
          {({ isActive }) => (
            <span>Inventories{isActive ? ' (active)' : ''}</span>
          )}
        </NavLink>
        <NavLink to="shopping-lists">
          {({ isActive }) => (
            <span>Shopping lists{isActive ? ' (active)' : ''}</span>
          )}
        </NavLink>
      </nav>
    </header>
  )
}

export default React.memo(HeaderHouseholds)
