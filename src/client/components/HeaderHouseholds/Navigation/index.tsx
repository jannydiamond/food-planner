import React from 'react'
import NavLink from './__styled__/NavLink'
import NavWrapper from './__styled__/NavWrapper'

const Navigation = () => {
  return (
    <NavWrapper>
      <NavLink to="inventories">
        <span>Inventories</span>
      </NavLink>
      <NavLink to="shopping-lists">
        <span>Shopping lists</span>
      </NavLink>
      <NavLink to="users">
        <span>Users</span>
      </NavLink>
    </NavWrapper>
  )
}

export default React.memo(Navigation)
