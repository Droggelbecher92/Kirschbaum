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
import Error from '../Components/Error'

export default function HomePage() {
  const { user, token } = useAuth()
  const [topics, setTopics] = useState()
  const [categories, setCategories] = useState()
  const [error, setError] = useState()
  const [url, setUrl] = useState('')

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

  const handleRedirect = (event, which) => {
    event.preventDefault()
    setUrl(`/quiz/${which}/${event.target.value}`)
  }

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
  if (url) {
    return <Redirect to={url} />
  }

  return (
    <MainPage>
      <ChooseField>
        {error && <Error />}
        <ChooseBoxSpecial
          value="Special"
          type="submit"
          onClick={e => handleRedirect(e, 'Special')}
        >
          Doppelte Punkte
        </ChooseBoxSpecial>
        {categories.map(category => (
          <ChooseBoxCategory
            value={category.category}
            type="submit"
            key={category.category}
            onClick={e => handleRedirect(e, 'Category')}
          >
            {category.category}
          </ChooseBoxCategory>
        ))}
        <ChooseBoxRandom
          value="Random"
          type="submit"
          onClick={e => handleRedirect(e, 'Random')}
        >
          Random
        </ChooseBoxRandom>
        {topics.map(topic => (
          <ChooseBoxTopic
            value={topic.topic}
            type="submit"
            key={topic.topic}
            onClick={e => handleRedirect(e, 'topic')}
          >
            {topic.topic}
          </ChooseBoxTopic>
        ))}
      </ChooseField>
      <BottomNav />
    </MainPage>
  )
}
