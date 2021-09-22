import { useAuth } from '../Auth/AuthProvider'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import Main from '../Components/Main'
import Loading from '../Components/Loading'
import Error from '../Components/Error'
import logo from '../img/headbage.jpg'
import PageHeader from '../Components/PageHeader'

const initialState = {
  userName: '',
  password: '',
}

export default function LoginPage() {
  const { login, user } = useAuth()
  const [credentials, setCredentials] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleCredentialsChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setError()
    login(credentials).catch(error => {
      setError(error)
      setLoading(false)
    })
  }

  if (user) {
    return <Redirect exact to="/" />
  }

  return (
    <PageHeader>
      <div>
        <br />
        <img src={logo} alt="logo" />
      </div>
      {loading && <Loading />}
      {!loading && (
        <Main as="form" onSubmit={handleSubmit}>
          <TextField
            label="Dein Username"
            name="userName"
            value={credentials.userName}
            onChange={handleCredentialsChange}
          />
          <TextField
            label="Passwort"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleCredentialsChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </PageHeader>
  )
}
