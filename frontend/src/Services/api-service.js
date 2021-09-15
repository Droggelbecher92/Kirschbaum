import axios from 'axios'

export const getToken = credentials =>
  axios
    .post('api/kirschbaum/auth/access_token', credentials)
    .then(response => response.data)
    .then(dto => dto.token)

const headers = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const updatePassword = (token, password) =>
  axios.put('api/kirschbaum/user/password', { password }, headers(token))

export const updateName = (token, username) =>
  axios.put('api/kirschbaum/user/username', { username }, headers(token))

export const getTopics = token =>
  axios.get('api/kirschbaum/topic', headers(token))

export const getCategories = token =>
  axios.get('api/kirschbaum/category', headers(token))
