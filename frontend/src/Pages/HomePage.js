import { Redirect } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import ChooseField from '../Components/ChooseField'
import BottomNav from '../Components/BottomNav'
import Loading from '../Components/Loading'
import { useEffect, useState } from 'react'
import { getCategories, getTopics, getUser } from '../Services/api-service'
import ChooseBoxRandom from '../Components/ChooseBoxRandom'
import ChooseBoxCategory from '../Components/ChooseBoxCategory'
import ChooseBoxTopic from '../Components/ChooseBoxTopic'
import ChooseBoxSpecial from '../Components/ChooseBoxSpecial'
import Error from '../Components/Error'
import Page from '../Components/Page'
import Onboarding from '../Components/Onboarding'
import Main from '../Components/Main'
import ChooseBoxStart from '../Components/ChooseBoxStart'
import PageWithHeader from '../Components/PageWithHeader'
import logo from '../img/logo.png'
import styled from 'styled-components/macro'

export default function HomePage() {
  const { user, token } = useAuth()
  const [topics, setTopics] = useState()
  const [categories, setCategories] = useState()
  const [error, setError] = useState()
  const [actualUser, setActualUser] = useState()
  const [url, setUrl] = useState('')

  useEffect(() => {
    setupTopics(token).catch(error => setError(error.message))
    setupCategories(token).catch(error => setError(error.message))
    getUser(token, user.userName)
      .then(setActualUser)
      .catch(e => setError(e))
  }, [token, user])

  const setupTopics = token => getTopics(token).then(setTopics)
  const setupCategories = token => getCategories(token).then(setCategories)

  const handleRedirect = (filer2, which) => {
    setUrl(`/quiz/${which}/${filer2}`)
  }

  if (!user) {
    return <Redirect to="/login" />
  }
  if (!categories || !topics || !actualUser) {
    return (
      <Page>
        <Loading />
      </Page>
    )
  }
  if (url) {
    return <Redirect to={url} />
  }
  if (actualUser.score === 0) {
    return (
      <PageWithHeader>
        <Logo src={logo} alt="logo" width="25%" height="100%" />
        <Main>
          <Onboarding />
          <ChooseBoxStart
            value="Random"
            type="submit"
            onClick={() => handleRedirect('random', 'Random')}
          >
            Starte hier!
          </ChooseBoxStart>
        </Main>
      </PageWithHeader>
    )
  }

  return (
    <Page>
      <ChooseField>
        {error && <Error />}
        <Logo src={logo} alt="logo" height="100%" />
        <ChooseBoxSpecial
          value="Special"
          type="submit"
          onClick={() => handleRedirect('random', 'Special')}
        >
          Doppelte Punkte
        </ChooseBoxSpecial>
        <ChooseBoxRandom
          value="Random"
          type="submit"
          onClick={() => handleRedirect('random', 'Random')}
        >
          Zufällige Fragen
        </ChooseBoxRandom>
        {categories.map(category => (
          <ChooseBoxCategory
            value={category.category}
            type="submit"
            key={category.category}
            onClick={() => handleRedirect(category.category, 'Category')}
          >
            {category.category}
          </ChooseBoxCategory>
        ))}
        {topics.map(topic => (
          <ChooseBoxTopic
            value={topic.topic}
            type="submit"
            key={topic.topic}
            onClick={() => handleRedirect(topic.topic, 'Topic')}
          >
            {topic.topic}
          </ChooseBoxTopic>
        ))}
      </ChooseField>
      <BottomNav />
    </Page>
  )
}
const Logo = styled.img`
  padding-top: var(--size-xl);
  grid-column: span 2;
  padding-left: 40%;
`
