import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function SelectType({ handleChange, type }) {
  return (
    <section>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="type-label">Typ</InputLabel>
        <Select
          labelId="label-label"
          id="label-helper"
          value={type}
          name="type"
          label="Typ"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'MULTI'} name="type">
            Multiple Choice
          </MenuItem>
          <MenuItem value={'SINGLE'} name="type">
            Single Choice
          </MenuItem>
          <MenuItem value={'THUMB'} name="type">
            Ja/Nein Frage
          </MenuItem>
        </Select>
        <FormHelperText>Welche Art von Frage?</FormHelperText>
      </FormControl>
    </section>
  )
}
