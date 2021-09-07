import Page from '../Components/Page'
import TextField from '../Components/TextField'
import { useAuth } from '../Auth/AuthProvider'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import Main from '../Components/Main'
import Loading from '../Components/Loading'
import Error from '../Components/Error'

const initialState = {
  username: '',
  password: '',
}

export default function Login() {
  const { login, user } = useAuth()
  const [credentials, setCredentials] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleCredentialsChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
    console.log(credentials)
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
    return <Redirect to="/" />
  }

  return (
    <Page>
      <Typography color="primary" variant="h2">
        Kirschbaum
      </Typography>
      {loading && <Loading />}
      {!loading && (
        <Main as="form" onSubmit={handleSubmit}>
          <TextField
            title="Username"
            name="username"
            value={credentials.username}
            onChange={handleCredentialsChange}
          />
          <TextField
            title="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleCredentialsChange}
          />
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
