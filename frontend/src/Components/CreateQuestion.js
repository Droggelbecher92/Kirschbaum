import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
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
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    setCredentials({ ...credentials, solution: setMultiSolution(answers) })
  }, [answers])

  const handleCredentialsChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const setBasicThumb = () => {
    setCredentials({ ...credentials, answer1: 'UP', answer2: 'DOWN' })
  }

  const setMultiSolution = () => {
    const solutionString = orderMultiAnswers(answers, [
      credentials.answer1,
      credentials.answer2,
      credentials.answer3,
      credentials.answer4,
    ])
    return solutionString
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
    if (credentials.type === 'MULTI') {
      const multiSolution = setMultiSolution()
      setCredentials({ ...credentials, solution: multiSolution })
    }
    saveQuestion(token, credentials).catch(e => console.log(e.message))
    setCredentials(initialState)
    setCreated(true)
    setLoading(false)
  }

  const handleFormat = (event, newAnswers) => {
    setAnswers(newAnswers)
  }

  const active = activateSubmitQuestion(credentials, answers)

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
              answers={answers}
              handleChange={handleCredentialsChange}
              handleFormat={handleFormat}
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
