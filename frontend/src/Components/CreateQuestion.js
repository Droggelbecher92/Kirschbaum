import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import { saveTopic } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'
import SelectTopic from './SelectTopic'
import SelectCategory from './SelectCategory'
import SelectType from './SelectType'

const initialState = {
  type: '',
  categoryName: '',
  topicName: '',
  question: '',
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  solution: '',
}
export default function CreateQuestion() {
  const { token } = useAuth()
  const [credentials, setCredentials] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [created, setCreated] = useState(false)

  const handleCredentialsChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
    console.log(credentials)
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
            label="Frage"
            name="question"
            value={credentials.question}
            onChange={handleCredentialsChange}
          />
          <SelectTopic
            handleChange={handleCredentialsChange}
            topic={credentials.topicName}
          />
          <SelectCategory
            handleChange={handleCredentialsChange}
            topic={credentials.categoryName}
          />
          <SelectType
            handleChange={handleCredentialsChange}
            type={credentials.type}
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
