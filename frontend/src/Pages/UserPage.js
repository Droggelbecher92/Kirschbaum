import { useAuth } from '../Auth/AuthProvider'
import { Redirect } from 'react-router-dom'
import Page from '../Components/Page'
import { Button, TextField, Typography } from '@material-ui/core'
import BottomNav from '../Components/BottomNav'
import Main from '../Components/Main'
import { useState } from 'react'
import Error from '../Components/Error'
import { updatePassword } from '../Services/api-service'
import Loading from '../Components/Loading'

const initialStatePasswords = {
  password1: '',
  password2: '',
}

const initalName = ''

export default function UserPage() {
  const { user, token, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [passwords, setPasswords] = useState(initialStatePasswords)
  const [name, setName] = useState(initalName)

  const handlePasswordChange = event => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value })
    console.log(passwords)
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

  const passwordMatch =
    passwords.password2.length && passwords.password1 === passwords.password2

  while (!user) {
    return <Redirect to="/login" />
  }

  return (
    <Page>
      <div>
        <Typography variant="h3" color="textSecondary">
          {'Moin ' + user.userName}
        </Typography>
        <Typography variant="h4" color="textSecondary">
          {'Your current score is: ' + user.score}
        </Typography>
      </div>
      {loading && <Loading />}
      {!loading && (
        <Main>
          <TextField
            id="standard-basic"
            label="Neuer Username"
            name="newName"
            value={name}
            onChange={handleNameChange}
          />
          <Button
            disabled={name.length < 5}
            variant="outlined"
            color="primary"
            type="button"
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
    </Page>
  )
}