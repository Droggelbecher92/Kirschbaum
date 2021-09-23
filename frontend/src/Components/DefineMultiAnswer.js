import { TextField } from '@material-ui/core'
import * as React from 'react'
import styled from 'styled-components/macro'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

export default function DefineMultiAnswer({
  handleChange,
  handleSubmit,
  credentials,
}) {
  const [answers, setAnswers] = useState(() => [])

  const handleFormat = (event, newAnswers) => {
    setAnswers(newAnswers)
    handleSubmit(answers)
  }
  return (
    <Wrapper>
      <TextField
        label="Antwort 1"
        name="answer1"
        value={credentials.answer1}
        onChange={handleChange}
      />
      <TextField
        label="Antwort 2"
        name="answer2"
        value={credentials.answer2}
        onChange={handleChange}
      />
      <TextField
        label="Antwort 3"
        name="answer3"
        value={credentials.answer3}
        onChange={handleChange}
      />
      <TextField
        label="Anwort 4"
        name="answer4"
        value={credentials.answer4}
        onChange={handleChange}
      />

      <ToggleButtonGroup
        value={answers}
        onChange={handleFormat}
        aria-label="text formatting"
        size="large"
        sx={{ alignContent: 'center', paddingLeft: '22.5%' }}
      >
        <ToggleButton value={credentials.answer1} aria-label="answer1">
          1
        </ToggleButton>
        <ToggleButton value={credentials.answer2} aria-label="answer2">
          2
        </ToggleButton>
        <ToggleButton value={credentials.answer3} aria-label="answer3">
          3
        </ToggleButton>
        <ToggleButton value={credentials.answer4} aria-label="answer4">
          4
        </ToggleButton>
      </ToggleButtonGroup>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: grid;
  grid-row-gap: var(--size-l);
`
