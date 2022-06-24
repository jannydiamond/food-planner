import React from 'react'
import NavLink from './__styled__/NavLink'
import NavWrapper from './__styled__/NavWrapper'

const Navigation = () => {
  return (
    <NavWrapper>
      <NavLink to="households">
        <span>Households</span>
      </NavLink>
      <NavLink to="groceries">
        <span>Groceries</span>
      </NavLink>
      <NavLink to="settings">
        <span>Settings</span>
      </NavLink>
    </NavWrapper>
  )
}

export default React.memo(Navigation)
