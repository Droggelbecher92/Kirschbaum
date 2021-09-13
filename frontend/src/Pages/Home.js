import { Redirect } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import MainPage from '../Components/MainPage'
import ChooseField from '../Components/ChooseField'
import BottomNav from '../Components/BottomNav'

export default function Home() {
  const { user } = useAuth()
  while (!user) {
    return <Redirect to="/login" />
  }
  return (
    <MainPage>
      <ChooseField>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
        <button>hi</button>
      </ChooseField>
      <BottomNav />
    </MainPage>
  )
}
