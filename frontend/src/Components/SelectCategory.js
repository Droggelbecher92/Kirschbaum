import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthProvider'
import { getCategories } from '../Services/api-service'

export default function SelectCategory({ handleChange, category }) {
  const { token } = useAuth()
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    setupCategories(token).catch(error => console.log(error.message))
  }, [token])

  const setupCategories = token => getCategories(token).then(setAllCategories)

  return (
    <section>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="category-label">Kategorie</InputLabel>
        <Select
          labelId="label-label"
          id="label-helper"
          value={category}
          name="categoryName"
          label="Kategorie"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {allCategories.map(category => (
            <MenuItem value={category.category} name="categoryName">
              {category.category}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Zu welcher Kategorie gehört deine Frage?
        </FormHelperText>
      </FormControl>
    </section>
  )
}
