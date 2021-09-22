import Main from '../Components/Main'
import Page from '../Components/Page'
import BottomNavAdmin from '../Components/BottomNavAdmin'
import { Typography } from '@material-ui/core'

export default function AdminPage() {
  return (
    <Page>
      <Typography variant="h3">Hallo Admin!</Typography>
      <Main></Main>
      <BottomNavAdmin />
    </Page>
  )
}
