import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import {
  AccountBox,
  ExitToApp,
  Home,
  SupervisorAccount,
} from '@material-ui/icons'
import styled from 'styled-components/macro'
import { useState } from 'react'

export default function BottomNav() {
  const [value, setValue] = useState('home')
  return (
    <BottomNavi>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
      >
        <BottomNavigationAction label="Home" value="home" icon={<Home />} />
        <BottomNavigationAction
          label="Details"
          value="details"
          icon={<AccountBox />}
        />
        <BottomNavigationAction
          label="Admin"
          value="admin"
          icon={<SupervisorAccount />}
        />
        <BottomNavigationAction
          label="Logout"
          value="logout"
          icon={<ExitToApp />}
        />
      </BottomNavigation>
    </BottomNavi>
  )
}
const BottomNavi = styled.div`
  background-color: var(--background-light);
  width: 100%;
`
