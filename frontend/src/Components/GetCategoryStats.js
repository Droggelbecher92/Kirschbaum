import styled from 'styled-components/macro'
import { useEffect, useState } from 'react'
import Error from './Error'
import { getCategories, getCategoryAnswers } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import * as React from 'react'
import StatsBoxGood from './StatsBoxGood'

export default function GetCategoryStats() {
  const { token } = useAuth()
  const [error, setError] = useState()
  const [allCategories, setAllCategories] = useState([])
  const [category, setCategory] = useState('')
  const [answers, setAnswers] = useState([])
  const [correct, setCorrect] = useState(0)

  useEffect(() => {
    setupCategories(token).catch(error => setError(error.message))
  }, [token])

  useEffect(() => {
    if (category !== '') {
      setupAnswers(token, category).catch(error => console.log(error.message))
    }
  }, [token, category])

  useEffect(() => {
    const correctAnswers = answers.filter(answer => answer.score > 0)
    setCorrect(correctAnswers.length)
  }, [answers])

  const percent = (all, actual) => Math.round((actual * 100) / all)

  const setupCategories = token => getCategories(token).then(setAllCategories)
  const setupAnswers = (token, whichCategory) =>
    getCategoryAnswers(token, whichCategory).then(setAnswers)

  const handleChange = event => {
    setCategory(event.target.value)
  }

  return (
    <Wrapper>
      <section>
        <FormControl sx={{ width: '100%', height: 'min-content' }}>
          <InputLabel id="category-label">Kategorien</InputLabel>
          <Select
            labelId="label-label"
            id="label-helper"
            value={category}
            name="category"
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allCategories.map(category => (
              <MenuItem
                value={category.category}
                name="categoryName"
                key={category.category}
              >
                {category.category}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Für welche Kategorie Stats anzeigen?</FormHelperText>
        </FormControl>
      </section>
      {error && <Error>{error.message}</Error>}
      {category !== '' && (
        <StatsBoxGood
          header="Deine Auswahl"
          filter={category}
          percent={percent(answers.length, correct)}
        />
      )}
    </Wrapper>
  )
}
const Wrapper = styled.main`
  display: grid;
  grid-row-gap: var(--size-l);
`
