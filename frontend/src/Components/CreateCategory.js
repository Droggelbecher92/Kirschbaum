import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import { saveCategory } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'

const initialState = {
  category: '',
}
export default function CreateCategory() {
  const { token } = useAuth()
  const [credentials, setCredentials] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [created, setCreated] = useState(false)

  const handleCredentialsChange = event => {
    setCredentials({ category: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setCreated(false)
    setError()
    saveCategory(token, credentials)
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
            label="Neue Kategorie"
            name="category"
            value={credentials.category}
            onChange={handleCredentialsChange}
          />
          {error && <Error>{error.message}</Error>}
          {created && <p>Hinzugefügt!</p>}
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
