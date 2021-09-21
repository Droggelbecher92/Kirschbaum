import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import {
  AccountBox,
  ExitToApp,
  Home,
  SupervisorAccount,
} from '@material-ui/icons'
import styled from 'styled-components/macro'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'

export default function BottomNav() {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <BottomNavi>
      <BottomNavigation value={location.pathname}>
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<Home />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Details"
          value="/user"
          icon={<AccountBox />}
          component={Link}
          to="/user"
        />
        {user.role === 'admin' && (
          <BottomNavigationAction
            label="Admin"
            value="/admin"
            icon={<SupervisorAccount />}
            component={Link}
            to="/admin"
          />
        )}
        <BottomNavigationAction
          label="Logout"
          value="/logout"
          icon={<ExitToApp />}
          component={Link}
          to="/logout"
        />
      </BottomNavigation>
    </BottomNavi>
  )
}
const BottomNavi = styled.div`
  background-color: var(--background-light);
  width: 100%;
`
