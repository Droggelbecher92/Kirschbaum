import { Redirect } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import MainPage from '../Components/MainPage'
import ChooseField from '../Components/ChooseField'
import BottomNav from '../Components/BottomNav'
import Loading from '../Components/Loading'
import { useEffect, useState } from 'react'
import { getCategories, getTopics } from '../Services/api-service'

export default function Home() {
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
        {categories.map(category => (
          <button>{category.category}</button>
        ))}
        {topics.map(topic => (
          <button>{topic.topic}</button>
        ))}
      </ChooseField>
      <BottomNav />
    </MainPage>
  )
}
