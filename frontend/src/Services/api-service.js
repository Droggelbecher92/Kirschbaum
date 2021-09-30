import axios from 'axios'

export const getToken = credentials =>
  axios
    .post('/api/kirschbaum/auth/access_token', credentials)
    .then(response => response.data)
    .then(dto => dto.token)

const headers = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const updatePassword = (token, password) =>
  axios.put('/api/kirschbaum/user/password', { password }, headers(token))

export const resetPassword = (token, username) =>
  axios
    .put(`/api/kirschbaum/user/${username}/password`, null, headers(token))
    .then(response => response.data)

export const updateName = (token, username) =>
  axios.put('/api/kirschbaum/user/username', { username }, headers(token))

export const getTopics = token =>
  axios
    .get('/api/kirschbaum/topic', headers(token))
    .then(response => response.data)

export const getCategories = token =>
  axios
    .get('/api/kirschbaum/category', headers(token))
    .then(response => response.data)

export const getUser = (token, userName) =>
  axios
    .get(`/api/kirschbaum/user/${userName}`, headers(token))
    .then(response => response.data)

export const getAllUsers = token =>
  axios
    .get(`/api/kirschbaum/user`, headers(token))
    .then(response => response.data)

export const getRandomQuestions = token =>
  axios
    .get('/api/kirschbaum/question/random', headers(token))
    .then(response => response.data)

export const getTopicQuestions = (token, topic) =>
  axios
    .get(`/api/kirschbaum/question/topic/${topic}`, headers(token))
    .then(response => response.data)

export const getCategoryQuestions = (token, category) =>
  axios
    .get(`/api/kirschbaum/question/category/${category}`, headers(token))
    .then(response => response.data)

export const saveAnswers = (token, answer) =>
  axios.post(`/api/kirschbaum/answer`, answer, headers(token))

export const getStats = token =>
  axios
    .get(`/api/kirschbaum/answer`, headers(token))
    .then(response => response.data)

export const saveCategory = (token, category) =>
  axios.post(`/api/kirschbaum/category/new`, category, headers(token))

export const saveTopic = (token, topic) =>
  axios.post(`/api/kirschbaum/topic/new`, topic, headers(token))

export const saveUser = (token, user) =>
  axios
    .post(`/api/kirschbaum/user`, user, headers(token))
    .then(response => response.data)

export const saveQuestion = (token, question) =>
  axios
    .post(`/api/kirschbaum/question`, question, headers(token))
    .then(response => response.data)

export const getBestCategory = token =>
  axios
    .get(`/api/kirschbaum/answer/best/category`, headers(token))
    .then(response => response.data)

export const getWorstCategory = token =>
  axios
    .get(`/api/kirschbaum/answer/worst/category`, headers(token))
    .then(response => response.data)

export const getBestTopic = token =>
  axios
    .get(`/api/kirschbaum/answer/best/topic`, headers(token))
    .then(response => response.data)

export const getWorstTopic = token =>
  axios
    .get(`/api/kirschbaum/answer/worst/topic`, headers(token))
    .then(response => response.data)

export const getCategoryAnswers = (token, category) =>
  axios
    .get(`/api/kirschbaum/answer/category/${category}`, headers(token))
    .then(response => response.data)

export const getTopicAnswers = (token, topic) =>
  axios
    .get(`/api/kirschbaum/answer/topic/${topic}`, headers(token))
    .then(response => response.data)
