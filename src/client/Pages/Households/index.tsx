import LogoutButton from 'client/components/Buttons/LogoutButton'
import React from 'react'

const Households = () => {
  return (
    <div>
      <h1>Households</h1>
      <LogoutButton />
    </div>
  )
}

export default React.memo(Households)
