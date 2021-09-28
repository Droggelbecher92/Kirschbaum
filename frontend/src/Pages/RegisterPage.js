import Page from '../Components/Page'
import BottomNavAdmin from '../Components/BottomNavAdmin'
import MainAdmin from '../Components/MainAdmin'
import NewUser from '../Components/NewUser'
import NewQuestion from '../Components/NewQuestion'
import NewCategory from '../Components/NewCategory'
import NewTopic from '../Components/NewTopic'
import ResetUserPassword from '../Components/ResetUserPassword'

export default function RegisterPage() {
  return (
    <Page>
      <MainAdmin>
        <NewQuestion />
        <NewCategory />
        <NewTopic />
        <NewUser />
        <ResetUserPassword />
      </MainAdmin>
      <BottomNavAdmin />
    </Page>
  )
}
