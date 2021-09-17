import { Redirect } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import MainPage from '../Components/MainPage'
import ChooseField from '../Components/ChooseField'
import BottomNav from '../Components/BottomNav'
import Loading from '../Components/Loading'
import { useEffect, useState } from 'react'
import { getCategories, getTopics } from '../Services/api-service'
import ChooseBoxRandom from '../Components/ChooseBoxRandom'
import ChooseBoxCategory from '../Components/ChooseBoxCategory'
import ChooseBoxTopic from '../Components/ChooseBoxTopic'
import ChooseBoxSpecial from '../Components/ChooseBoxSpecial'

export default function HomePage() {
  const { user, token } = useAuth()
  const [topics, setTopics] = useState()
  const [categories, setCategories] = useState()

  useEffect(() => {
    setupTopics(token).catch(error => console.log(error.message))
    setupCategories(token).catch(error => console.log(error.message))
  }, [token])

  const setupTopics = token =>
    getTopics(token)
      .then(response => response.data)
      .then(setTopics)
  const setupCategories = token =>
    getCategories(token)
      .then(response => response.data)
      .then(setCategories)

  while (!user) {
    return <Redirect to="/login" />
  }
  while (!categories || !topics) {
    return (
      <MainPage>
        <Loading />
      </MainPage>
    )
  }
  return (
    <MainPage>
      <ChooseField>
        <ChooseBoxSpecial>Doppelte Punkte</ChooseBoxSpecial>
        {categories.map(category => (
          <ChooseBoxCategory>{category.category}</ChooseBoxCategory>
        ))}
        <ChooseBoxRandom>Random</ChooseBoxRandom>
        {topics.map(topic => (
          <ChooseBoxTopic>{topic.topic}</ChooseBoxTopic>
        ))}
      </ChooseField>
      <BottomNav />
    </MainPage>
  )
}
