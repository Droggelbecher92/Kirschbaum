import styled from 'styled-components/macro'
import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import { getAllUsers, resetPassword } from '../Services/api-service'
import { useAuth } from '../Auth/AuthProvider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import * as React from 'react'

export default function ResetPassword() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)
  const [error, setError] = useState()
  const [password, setPassword] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    setupUsers(token).catch(error => console.log(error.message))
  }, [token])

  const setupUsers = token => getAllUsers(token).then(setAllUsers)

  const active = user !== ''

  const handleChange = event => {
    setUser(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setCreated(false)
    resetPassword(token, user)
      .then(resetUser => setPassword(resetUser.password))
      .then(() => {
        setCreated(true)
        setLoading(false)
      })
      .catch(error => setError(error))
  }

  return (
    <Wrapper as="form" onSubmit={handleSubmit}>
      {loading && <Loading />}
      {!loading && (
        <Wrapper>
          <section>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="user-label">Alle User</InputLabel>
              <Select
                labelId="label-label"
                id="label-helper"
                value={user}
                name="userName"
                label="User"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allUsers.map(user => (
                  <MenuItem value={user.name} name="userName" key={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Für welchen User das Passwort zurücksetzen?
              </FormHelperText>
            </FormControl>
          </section>
          {error && <Error>{error.message}</Error>}
          {created && (
            <section>
              <p>{`Neues Passwort für Nutzer ${user} lautet:`}</p>
              <p>{password}</p>
            </section>
          )}
          <Button
            disabled={!active}
            variant="contained"
            color="primary"
            type="submit"
          >
            Zurücksetzen
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.main`
  display: grid;
  grid-row-gap: var(--size-l);
`
