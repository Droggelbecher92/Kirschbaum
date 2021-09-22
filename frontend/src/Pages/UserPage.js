import { useAuth } from '../Auth/AuthProvider'
import { Redirect } from 'react-router-dom'
import PageHeader from '../Components/PageHeader'
import { Button, TextField, Typography } from '@material-ui/core'
import BottomNav from '../Components/BottomNav'
import Main from '../Components/Main'
import { useEffect, useState } from 'react'
import Error from '../Components/Error'
import { getUser, updateName, updatePassword } from '../Services/api-service'
import Loading from '../Components/Loading'
import Page from '../Components/Page'
import 'react-circular-progressbar/dist/styles.css'
import ProgressionLevel from '../Components/ProgressionLevel'

const initialStatePasswords = {
  password1: '',
  password2: '',
}

const initalName = ''

export default function UserPage() {
  const { user, token, logout } = useAuth()
  const [actualUser, setActualUser] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [passwords, setPasswords] = useState(initialStatePasswords)
  const [name, setName] = useState(initalName)

  useEffect(() => {
    getUser(token, user.userName)
      .then(response => response.data)
      .then(setActualUser)
      .catch(e => setError(e))
  }, [token, user])

  const handlePasswordChange = event => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value })
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const changePassword = () => {
    setError()
    setLoading(true)
    updatePassword(token, passwords.password1)
      .then(logout)
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  const changeName = () => {
    setError()
    setLoading(true)
    updateName(token, name)
      .then(logout)
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  const passwordMatch =
    passwords.password2.length && passwords.password1 === passwords.password2

  if (!user) {
    return <Redirect to="/login" />
  }

  if (!actualUser) {
    return (
      <Page>
        <Loading />
      </Page>
    )
  }

  return (
    <PageHeader>
      <Typography variant="h4" color="textPrimary">
        Dein aktuelles Level
      </Typography>
      {loading && <Loading />}
      {!loading && (
        <Main>
          <ProgressionLevel
            level={`${Math.floor(actualUser.score / 100)}`}
            percent={actualUser.score % 100}
          />
          <TextField
            id="standard-basic"
            label="Neuer Username"
            name="newName"
            value={name}
            onChange={handleNameChange}
          />
          <Button
            disabled={name.length < 3}
            variant="outlined"
            color="primary"
            type="button"
            onClick={changeName}
          >
            Username ändern
          </Button>
          <TextField
            id="standard-password"
            label="Neues Passwort"
            name="password1"
            type="password"
            value={passwords.password1}
            onChange={handlePasswordChange}
          />
          <TextField
            id="standard-password2"
            label="Passwort wiederholen"
            name="password2"
            type="password"
            value={passwords.password2}
            onChange={handlePasswordChange}
          />
          <Button
            disabled={!passwordMatch}
            variant="outlined"
            color="primary"
            type="button"
            onClick={changePassword}
          >
            Passwort ändern
          </Button>
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
      <BottomNav />
    </PageHeader>
  )
}
