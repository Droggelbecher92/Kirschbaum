import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthProvider'
import { getTopics } from '../Services/api-service'

export default function SelectTopic({ handleChange, topic }) {
  const { token } = useAuth()
  const [allTopics, setAllTopics] = useState([])

  useEffect(() => {
    setupTopics(token).catch(error => console.log(error.message))
  }, [token])

  const setupTopics = token => getTopics(token).then(setAllTopics)

  return (
    <section>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="topic-label">Topic</InputLabel>
        <Select
          labelId="label-label"
          id="label-helper"
          value={topic}
          name="topicName"
          label="Topic"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {allTopics.map(topic => (
            <MenuItem value={topic.topic} name="topicName" key={topic.topic}>
              {topic.topic}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Welches Topic hat deine Frage?</FormHelperText>
      </FormControl>
    </section>
  )
}
