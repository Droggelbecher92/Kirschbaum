import Page from '../Components/Page'
import { Button, Typography } from '@material-ui/core'
import { useAuth } from '../Auth/AuthProvider'
import { Redirect } from 'react-router-dom'
import BottomNav from '../Components/BottomNav'

export default function LogoutPage() {
  const { user, logout } = useAuth()
  while (!user) {
    return <Redirect to="/login" />
  }
  return (
    <Page>
      <Typography variant="h3">{'Bis bald ' + user.userName}</Typography>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
      <BottomNav />
    </Page>
  )
}
