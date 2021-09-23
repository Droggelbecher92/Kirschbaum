import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import Loading from './Loading'
import SelectTopic from './SelectTopic'
import SelectCategory from './SelectCategory'
import SelectType from './SelectType'
import DefineThumbAnswer from './DefineThumbAnswer'
import DefineSingleAnswer from './DefineSingleAnswer'
import { activateSubmitQuestion } from '../Services/activate-service'

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
  const [credentials, setCredentials] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)

  const handleCredentialsChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
    console.log(credentials)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setCreated(false)
    if (credentials.type === 'THUMB') {
      setCredentials({ ...credentials, answer1: 'UP', answer2: 'DOWN' })
    }
  }

  const active = activateSubmitQuestion(credentials)

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
          {credentials.type === 'THUMB' && (
            <DefineThumbAnswer
              handleChange={handleCredentialsChange}
              solution={credentials.solution}
            />
          )}
          {credentials.type === 'SINGLE' && (
            <DefineSingleAnswer
              handleChange={handleCredentialsChange}
              credentials={credentials}
            />
          )}

          {created && <p>Hinzugefügt!</p>}
          <Button
            disabled={active}
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
  overflow-y: scroll;
`
