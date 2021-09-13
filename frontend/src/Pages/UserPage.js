import { useAuth } from '../Auth/AuthProvider'
import { Redirect } from 'react-router-dom'
import Page from '../Components/Page'
import { Typography } from '@material-ui/core'
import BottomNav from '../Components/BottomNav'

export default function UserPage() {
  const { user } = useAuth()
  while (!user) {
    return <Redirect to="/login" />
  }

  return (
    <Page>
      <div>
        <Typography variant="h3" color="textSecondary">
          {'Moin ' + user.userName}
        </Typography>
        <Typography variant="h4" color="textSecondary">
          {'Your current score is: ' + user.score}
        </Typography>
      </div>
      <div></div>
      <BottomNav />
    </Page>
  )
}
