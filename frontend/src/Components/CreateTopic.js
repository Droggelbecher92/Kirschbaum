import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import { saveTopic } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'

const initialState = {
  topic: '',
}
export default function CreateTopic() {
  const { token } = useAuth()
  const [credentials, setCredentials] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [created, setCreated] = useState(false)

  const active = credentials.topic.length > 2

  const handleCredentialsChange = event => {
    setCredentials({ topic: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setCreated(false)
    setError()
    saveTopic(token, credentials)
      .then(() => {
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
            label="Neues Topic"
            name="topic"
            value={credentials.topic}
            onChange={handleCredentialsChange}
          />
          {error && <Error>{error.message}</Error>}
          {created && <p>Hinzugefügt!</p>}
          <Button
            disabled={!active}
            variant="contained"
            color="primary"
            type="submit"
          >
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
