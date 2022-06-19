import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={'/settings/units'}>Manage units</Link>
        </li>
      </ul>
    </>
  )
}

export default React.memo(Settings)
