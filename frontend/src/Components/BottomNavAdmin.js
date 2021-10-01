import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Create, ExitToApp, Home } from '@material-ui/icons'
import styled from 'styled-components/macro'
import { Link, useLocation } from 'react-router-dom'
import { Analytics, FollowTheSigns } from '@mui/icons-material'

export default function BottomNavAdmin() {
  const location = useLocation()

  return (
    <BottomNavi>
      <BottomNavigation value={location.pathname} showLabels>
        <BottomNavigationAction
          label="Home"
          value="/admin"
          icon={<Home />}
          component={Link}
          to="/admin"
        />
        <BottomNavigationAction
          label="Stats"
          value="/admin/stats"
          icon={<Analytics />}
          component={Link}
          to="/admin/stats"
        />
        <BottomNavigationAction
          label="Bedarf"
          value="/admin/solution"
          icon={<FollowTheSigns />}
          component={Link}
          to="/admin/solution"
        />
        <BottomNavigationAction
          label="Nutzer"
          value="/admin/add"
          icon={<Create />}
          component={Link}
          to="/admin/add"
        />

        <BottomNavigationAction
          label="Zurück"
          value="/"
          icon={<ExitToApp />}
          component={Link}
          to="/"
        />
      </BottomNavigation>
    </BottomNavi>
  )
}
const BottomNavi = styled.div`
  background-color: var(--background-light);
  width: 100%;
  overflow-x: hidden;
`
