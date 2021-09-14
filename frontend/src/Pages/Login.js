import Page from '../Components/Page'
import TextField from '../Components/TextField'
import { useAuth } from '../Auth/AuthProvider'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Main from '../Components/Main'
import Loading from '../Components/Loading'
import Error from '../Components/Error'
import logo from '../img/headbage.jpg'

const initialState = {
  userName: '',
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
      <div>
        <br />
        <img src={logo} alt="logo" />
      </div>
      {loading && <Loading />}
      {!loading && (
        <Main as="form" onSubmit={handleSubmit}>
          <TextField
            title="Dein Name"
            name="userName"
            value={credentials.userName}
            onChange={handleCredentialsChange}
          />
          <TextField
            title="Password"
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
    </Page>
  )
}
