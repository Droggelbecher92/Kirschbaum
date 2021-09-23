import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import { saveUser } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'

const initialState = {
  name: '',
}
export default function CreateUser() {
  const { token } = useAuth()
  const [credentials, setCredentials] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [created, setCreated] = useState(false)
  const [password, setPassword] = useState('')

  const handleCredentialsChange = event => {
    setCredentials({ name: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setCreated(false)
    setError()
    saveUser(token, credentials)
      .then(user => {
        setPassword(user.password)
        setCreated(true)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  return (
    <Wrapper as="form" onSubmit={handleSubmit}>
      {loading && <Loading />}
      {!loading && (
        <Wrapper>
          <TextField
            label="Neuer Nutzer(Name)"
            name="name"
            value={credentials.name}
            onChange={handleCredentialsChange}
          />
          {error && <Error>{error.message}</Error>}
          {created && (
            <section>
              <p>Hinzugefügt!</p>
              <p>{`Passwort für Nutzer ${credentials.name} lautet:`}</p>
              <p>{password}</p>
            </section>
          )}
          <Button variant="contained" color="primary" type="submit">
            Hinzufügen
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.main`
  display: grid;
  grid-row-gap: var(--size-l);
`
