import styled from 'styled-components/macro'
import { useEffect, useState } from 'react'
import Error from './Error'
import { getTopicAnswers, getTopics } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import * as React from 'react'
import StatsBoxGood from './StatsBoxGood'

export default function GetTopicStats() {
  const { token } = useAuth()
  const [error, setError] = useState()
  const [allTopics, setAllTopics] = useState([])
  const [topic, setTopic] = useState('')
  const [answers, setAnswers] = useState([])
  const [correct, setCorrect] = useState(0)

  useEffect(() => {
    setupTopics(token).catch(error => setError(error.message))
  }, [token])

  useEffect(() => {
    if (topic !== '') {
      setupAnswers(token, topic).catch(error => console.log(error.message))
    }
  }, [token, topic])

  useEffect(() => {
    const correctAnswers = answers.filter(answer => answer.score > 0)
    setCorrect(correctAnswers.length)
  }, [answers])

  const percent = (all, actual) => Math.round((actual * 100) / all)

  const setupTopics = token => getTopics(token).then(setAllTopics)
  const setupAnswers = (token, whichTopic) =>
    getTopicAnswers(token, whichTopic).then(setAnswers)

  const handleChange = event => {
    setTopic(event.target.value)
  }

  return (
    <Wrapper>
      <Wrapper>
        <section>
          <FormControl sx={{ width: '100%', height: 'min-content' }}>
            <InputLabel id="topic-label">Topics</InputLabel>
            <Select
              labelId="label-label"
              id="label-helper"
              value={topic}
              name="topic"
              label="Tpoic"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allTopics.map(topic => (
                <MenuItem
                  value={topic.topic}
                  name="topicName"
                  key={topic.topic}
                >
                  {topic.topic}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Für welches Topic Stats anzeigen?</FormHelperText>
          </FormControl>
        </section>
        {error && <Error>{error.message}</Error>}
        {topic !== '' && (
          <StatsBoxGood
            header="Deine Auswahl"
            filter={topic}
            percent={percent(answers.length, correct)}
          />
        )}
      </Wrapper>
    </Wrapper>
  )
}
const Wrapper = styled.main`
  display: grid;
  grid-row-gap: var(--size-l);
`
