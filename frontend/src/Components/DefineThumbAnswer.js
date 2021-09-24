import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function DefineThumbAnswer({ handleChange, solution }) {
  return (
    <section>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="thumb-solution-label">Richtig/Falsch</InputLabel>
        <Select
          labelId="label-label"
          id="label-helper"
          value={solution}
          name="solution"
          label="Thumb-solution"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'UP'} name="solution">
            Ist richtig
          </MenuItem>
          <MenuItem value={'DOWN'} name="solution">
            Ist falsch
          </MenuItem>
        </Select>
        <FormHelperText>Richtig oder falsch?</FormHelperText>
      </FormControl>
    </section>
  )
}
