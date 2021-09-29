import BottomNavAdmin from '../Components/BottomNavAdmin'
import { Typography } from '@material-ui/core'
import { useAuth } from '../Auth/AuthProvider'
import { useEffect, useState } from 'react'
import { getAllUsers, getStats } from '../Services/api-service'
import Loading from '../Components/Loading'
import StatsBoxGlobal from '../Components/StatsBoxGlobal'
import MainAdmin from '../Components/MainAdmin'
import Error from '../Components/Error'
import StatsBox from '../Components/StatsBox'
import Page from '../Components/Page'
import PageWithHeader from '../Components/PageWithHeader'

export default function AdminPage() {
  const { user, token } = useAuth()
  const [answers, setAnswers] = useState([])
  const [overall, setOverall] = useState(0)
  const [right, setRight] = useState(0)
  const [error, setError] = useState()
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [allUsers, setAllUsers] = useState(0)

  const getRight = answers => {
    const rightAnswers = answers.filter(answer => answer.score > 0)
    return rightAnswers.length
  }

  const howMany = answers => {
    const users = answers.map(answer => answer.userName)
    const number = [...new Set(users)]
    return number.length
  }

  const percent = (all, actual) => Math.round((actual * 100) / all)

  useEffect(() => {
    getAllUsers(token)
      .then(users => {
        const mappedUsers = users.map(user => user.id)
        setAllUsers(mappedUsers.length)
      })
      .catch(e => setError(e))
    getStats(token)
      .then(stats => {
        setAnswers(stats)
        setOverall(stats.length)
        setRight(getRight(stats))
        setNumberOfUsers(howMany(stats))
      })
      .catch(e => setError(e))
  }, [token, user])

  if (!answers) {
    return (
      <Page>
        <Loading />
        <BottomNavAdmin />
      </Page>
    )
  }

  return (
    <PageWithHeader>
      <Typography variant="h3">{'Hallo ' + user.userName}</Typography>
      <MainAdmin>
        <StatsBoxGlobal all={overall} rightPercent={percent(overall, right)} />
        <StatsBox
          text={'Wie viele Mitarbeiter nutzen die App?'}
          percent={percent(allUsers, numberOfUsers)}
        />
        {error && <Error>{error.message}</Error>}
      </MainAdmin>
      <BottomNavAdmin />
    </PageWithHeader>
  )
}
