import Page from '../Components/Page'
import BottomNavAdmin from '../Components/BottomNavAdmin'
import { Typography } from '@material-ui/core'
import { useAuth } from '../Auth/AuthProvider'
import { useEffect, useState } from 'react'
import { getAllUsers, getStats } from '../Services/api-service'
import Loading from '../Components/Loading'
import StatsBoxGlobal from '../Components/StatsBoxGlobal'
import MainPage from '../Components/MainPage'
import MainAdmin from '../Components/MainAdmin'
import Error from '../Components/Error'
import StatsBox from '../Components/StatsBox'

export default function AdminPage() {
  const { user, token } = useAuth()
  const [answers, setAnswers] = useState([])
  const [overall, setOverall] = useState(0)
  const [right, setRight] = useState(0)
  const [wrong, setWrong] = useState()
  const [error, setError] = useState()
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [allUsers, setAllUsers] = useState(0)

  const getRight = answers => {
    const rightAnswers = answers.filter(answer => answer.score > 0)
    return rightAnswers.length
  }

  const getWrong = answers => {
    const wrongAnswers = answers.filter(answer => answer.score < 1)
    return wrongAnswers.length
  }

  const howMany = answers => {
    const users = answers.map(answer => answer.userName)
    console.log(users)
    const number = [...new Set(users)]
    console.log(number)
    return number.length
  }

  useEffect(() => {
    getAllUsers(token)
      .then(response => response.data)
      .then(data => {
        const users = data.map(dat => dat.id)
        setAllUsers(users.length)
      })
      .catch(e => setError(e))
    getStats(token)
      .then(response => response.data)
      .then(data => {
        setAnswers(data)
        setOverall(data.length)
        setRight(getRight(data))
        setWrong(getWrong(data))
        setNumberOfUsers(howMany(data))
      })
      .catch(e => setError(e))
  }, [token, user])

  if (!answers) {
    return (
      <Page>
        <Loading />
      </Page>
    )
  }

  return (
    <MainPage>
      <MainAdmin>
        <Typography variant="h3">{'Hallo ' + user.userName}</Typography>
        <StatsBoxGlobal right={right} wrong={wrong} all={overall} />
        <StatsBox
          text={'Wie viele Mitarbeiter nutzen die App?'}
          percent={Math.round((numberOfUsers * 100) / allUsers)}
        />
        {error && <Error>{error.message}</Error>}
      </MainAdmin>
      <BottomNavAdmin />
    </MainPage>
  )
}
