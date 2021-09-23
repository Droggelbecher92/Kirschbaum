import { TextField } from '@material-ui/core'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import * as React from 'react'
import styled from 'styled-components/macro'

export default function DefineSingleAnswer({ handleChange, credentials }) {
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
        name="answer$"
        value={credentials.answer4}
        onChange={handleChange}
      />
      <section>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="single-answer-label">Richtige Antwort</InputLabel>
          <Select
            labelId="label-label"
            id="label-helper"
            value={credentials.solution}
            name="solution"
            label="Solution"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={credentials.answer1} name="solution">
              {credentials.answer1}
            </MenuItem>
            <MenuItem value={credentials.answer2} name="solution">
              {credentials.answer2}
            </MenuItem>
            <MenuItem value={credentials.answer3} name="solution">
              {credentials.answer3}
            </MenuItem>
            <MenuItem value={credentials.answer4} name="solution">
              {credentials.answer4}
            </MenuItem>
          </Select>
          <FormHelperText>Wähle die richtige Antwort</FormHelperText>
        </FormControl>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: grid;
  grid-row-gap: var(--size-l);
`
