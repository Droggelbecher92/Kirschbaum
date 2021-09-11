import axios from 'axios'

export const getToken = credentials =>
  axios
    .post('api/kirschbaum/auth/access_token', credentials)
    .then(response => response.data)
    .then(dto => dto.token)
