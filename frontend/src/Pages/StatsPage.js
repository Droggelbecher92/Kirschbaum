import Page from '../Components/Page'
import StatsBox from '../Components/StatsBox'
import { useAuth } from '../Auth/AuthProvider'
import { useEffect, useState } from 'react'
import {
  getBestCategory,
  getBestTopic,
  getWorstCategory,
  getWorstTopic,
} from '../Services/api-service'
import Main from '../Components/Main'
import Loading from '../Components/Loading'
import BottomNav from '../Components/BottomNav'
import Error from '../Components/Error'
import BottomNavAdmin from '../Components/BottomNavAdmin'
import StatsBoxBad from '../Components/StatsBoxBad'

export default function StatsPage() {
  const { token } = useAuth()
  const [bestCategory, setBestCategory] = useState([])
  const [bestCategoryAmount, setBestCategoryAmount] = useState(0)
  const [worstCategory, setWorstCategory] = useState([])
  const [worstCategoryAmount, setWorstCategoryAmount] = useState(0)
  const [bestTopic, setBestTopic] = useState([])
  const [bestTopicAmount, setBestTopicAmount] = useState(0)
  const [worstTopic, setWorstTopic] = useState([])
  const [worstTopicAmount, setWorstTopicAmount] = useState(0)
  const [error, setError] = useState()

  const percent = (all, actual) => Math.round((actual * 100) / all)

  useEffect(() => {
    getBestCategory(token)
      .then(setBestCategory)
      .catch(e => setError(e))
    getWorstCategory(token)
      .then(setWorstCategory)
      .catch(e => setError(e))
    getBestTopic(token)
      .then(setBestTopic)
      .catch(e => setError(e))
    getWorstTopic(token)
      .then(setWorstTopic)
      .catch(e => setError(e))
  }, [token])

  useEffect(() => {
    const filteredBestCategory = bestCategory.filter(answer => answer.score > 0)
    setBestCategoryAmount(filteredBestCategory.length)
  }, [bestCategory])

  useEffect(() => {
    const filteredBestTopic = bestTopic.filter(answer => answer.score > 0)
    setBestTopicAmount(filteredBestTopic.length)
  }, [bestTopic])

  useEffect(() => {
    const filteredWorstCategory = worstCategory.filter(
      answer => answer.score === 0
    )
    setWorstCategoryAmount(filteredWorstCategory.length)
  }, [worstCategory])

  useEffect(() => {
    const filteredWorstTopic = worstTopic.filter(answer => answer.score === 0)
    setWorstTopicAmount(filteredWorstTopic.length)
  }, [worstTopic])

  if (
    worstTopic.length === 0 ||
    worstCategory.length === 0 ||
    bestCategory.length === 0 ||
    bestTopic.length === 0
  ) {
    return (
      <Page>
        <Loading />
        <BottomNav />
      </Page>
    )
  }

  return (
    <Page>
      <Main>
        <StatsBox
          text={'Aktuell beste Kategorie:' + bestCategory[0].category}
          percent={percent(bestCategory.length, bestCategoryAmount)}
        />
        <StatsBox
          text={'Aktuell bestes Topic:' + bestTopic[0].topic}
          percent={percent(bestTopic.length, bestTopicAmount)}
        />
        <StatsBoxBad
          text={'Aktuell schlechteste Kategorie:' + worstCategory[0].category}
          percent={percent(worstCategory.length, worstCategoryAmount)}
        />
        <StatsBoxBad
          text={'Aktuell schlechtestes Topic:' + worstTopic[0].topic}
          percent={percent(worstTopic.length, worstTopicAmount)}
        />
        {error && <Error>{error.message}</Error>}
      </Main>
      <BottomNavAdmin />
    </Page>
  )
}
