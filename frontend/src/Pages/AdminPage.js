import Main from '../Components/Main'
import Page from '../Components/Page'
import BottomNavAdmin from '../Components/BottomNavAdmin'
import { Typography } from '@material-ui/core'
import { useAuth } from '../Auth/AuthProvider'
import { useEffect, useState } from 'react'
import { getStats } from '../Services/api-service'
import Loading from '../Components/Loading'
import StatsBoxGlobal from '../Components/StatsBoxGlobal'
import MainPage from '../Components/MainPage'
import MainAdmin from '../Components/MainAdmin'

export default function AdminPage() {
  const { user, token } = useAuth()
  const [answers, setAnswers] = useState([])
  const [overall, setOverall] = useState(0)
  const [right, setRight] = useState(0)
  const [wrong, setWrong] = useState()
  const [error, setError] = useState()

  const getRight = answers => {
    const rightAnswers = answers.filter(answer => answer.score > 0)
    return rightAnswers.length
  }

  const getWrong = answers => {
    const wrongAnswers = answers.filter(answer => answer.score < 1)
    return wrongAnswers.length
  }

  useEffect(() => {
    getStats(token)
      .then(response => response.data)
      .then(data => {
        setAnswers(data)
        setOverall(data.length)
        setRight(getRight(data))
        setWrong(getWrong(data))
      })
      .catch(e => setError(e))
  }, [token, user])

  if (!answers) {
    return (
      <Page>
        <div></div>
        <Loading />
      </Page>
    )
  }

  return (
    <MainPage>
      <MainAdmin>
        <Typography variant="h3">{'Hallo ' + user.name}</Typography>
        <StatsBoxGlobal right={right} wrong={wrong} all={overall} />
      </MainAdmin>
      <BottomNavAdmin />
    </MainPage>
  )
}
