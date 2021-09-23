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
import DefineMultiAnswer from './DefineMultiAnswer'
import { orderMultiAnswers } from '../Services/order-service'
import { saveQuestion } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'

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
  const [created, setCreated] = useState(false)

  const handleCredentialsChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
    console.log(credentials)
  }

  const setBasicThumb = () => {
    setCredentials({ ...credentials, answer1: 'UP', answer2: 'DOWN' })
  }

  const setMultiSolution = solutionArray => {
    const solutionString = orderMultiAnswers(solutionArray, [
      credentials.answer1,
      credentials.answer2,
      credentials.answer3,
      credentials.answer4,
    ])
    setCredentials({ ...credentials, solution: solutionString })
    console.log(credentials)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setCreated(false)
    if (credentials.type === 'THUMB') {
      let question = credentials
      question.answer1 = 'UP'
      question.answer2 = 'DOWN'
      saveQuestion(token, question).catch(e => console.log(e.message))
    }
    saveQuestion(token, credentials).catch(e => console.log(e.message))
    setCredentials(initialState)
    setCreated(true)
    setLoading(false)
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
            category={credentials.categoryName}
          />
          <SelectType
            handleChange={handleCredentialsChange}
            type={credentials.type}
          />
          {credentials.type === 'THUMB' && (
            <DefineThumbAnswer
              handleChange={handleCredentialsChange}
              solution={credentials.solution}
              setAnswers={setBasicThumb}
            />
          )}
          {credentials.type === 'SINGLE' && (
            <DefineSingleAnswer
              handleChange={handleCredentialsChange}
              credentials={credentials}
            />
          )}
          {credentials.type === 'MULTI' && (
            <DefineMultiAnswer
              handleChange={handleCredentialsChange}
              handleSubmit={setMultiSolution}
              credentials={credentials}
            />
          )}

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
  overflow-y: scroll;
`
