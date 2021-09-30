import { useAuth } from '../Auth/AuthProvider'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import Main from '../Components/Main'
import Loading from '../Components/Loading'
import Error from '../Components/Error'
import logo from '../img/logo.png'
import PageWithHeader from '../Components/PageWithHeader'
import styled from 'styled-components/macro'

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
    <PageWithHeader>
      <Logo src={logo} alt="logo" height="75%" />
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
    </PageWithHeader>
  )
}

const Logo = styled.img`
  padding-top: var(--size-xl);
`
