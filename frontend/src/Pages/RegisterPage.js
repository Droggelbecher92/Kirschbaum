import Page from '../Components/Page'
import BottomNavAdmin from '../Components/BottomNavAdmin'
import MainAdmin from '../Components/MainAdmin'
import NewUser from '../Components/NewUser'
import NewQuestion from '../Components/NewQuestion'
import NewCategory from '../Components/NewCategory'
import NewTopic from '../Components/NewTopic'

export default function RegisterPage() {
  return (
    <Page>
      <MainAdmin>
        <NewUser />
        <NewQuestion />
        <NewCategory />
        <NewTopic />
      </MainAdmin>
      <BottomNavAdmin />
    </Page>
  )
}
