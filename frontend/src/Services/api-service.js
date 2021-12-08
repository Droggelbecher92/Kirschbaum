import axios from 'axios'

export const getToken = credentials =>
  axios
    .post('/api/auth/access_token', credentials)
    .then(response => response.data)
    .then(dto => dto.token)

const headers = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const updatePassword = (token, password) =>
  axios.put('/api/user/password', { password }, headers(token))

export const resetPassword = (token, username) =>
  axios
    .put(`/api/user/${username}/password`, null, headers(token))
    .then(response => response.data)

export const updateName = (token, username) =>
  axios.put('/api/user/username', { username }, headers(token))

export const getTopics = token =>
  axios.get('/api/topic', headers(token)).then(response => response.data)

export const getCategories = token =>
  axios.get('/api/category', headers(token)).then(response => response.data)

export const getUser = (token, userName) =>
  axios
    .get(`/api/user/${userName}`, headers(token))
    .then(response => response.data)

export const getAllUsers = token =>
  axios.get(`/api/user`, headers(token)).then(response => response.data)

export const getRandomQuestions = token =>
  axios
    .get('/api/question/random', headers(token))
    .then(response => response.data)

export const getTopicQuestions = (token, topic) =>
  axios
    .get(`/api/question/topic/${topic}`, headers(token))
    .then(response => response.data)

export const getCategoryQuestions = (token, category) =>
  axios
    .get(`/api/question/category/${category}`, headers(token))
    .then(response => response.data)

export const saveAnswers = (token, answer) =>
  axios.post(`/api/answer`, answer, headers(token))

export const getStats = token =>
  axios.get(`/api/answer`, headers(token)).then(response => response.data)

export const saveCategory = (token, category) =>
  axios.post(`/api/category/new`, category, headers(token))

export const saveTopic = (token, topic) =>
  axios.post(`/api/topic/new`, topic, headers(token))

export const saveUser = (token, user) =>
  axios.post(`/api/user`, user, headers(token)).then(response => response.data)

export const saveQuestion = (token, question) =>
  axios
    .post(`/api/question`, question, headers(token))
    .then(response => response.data)

export const getBestCategory = token =>
  axios
    .get(`/api/answer/best/category`, headers(token))
    .then(response => response.data)

export const getWorstCategory = token =>
  axios
    .get(`/api/answer/worst/category`, headers(token))
    .then(response => response.data)

export const getBestTopic = token =>
  axios
    .get(`/api/answer/best/topic`, headers(token))
    .then(response => response.data)

export const getWorstTopic = token =>
  axios
    .get(`/api/answer/worst/topic`, headers(token))
    .then(response => response.data)

export const getCategoryAnswers = (token, category) =>
  axios
    .get(`/api/answer/category/${category}`, headers(token))
    .then(response => response.data)

export const getTopicAnswers = (token, topic) =>
  axios
    .get(`/api/answer/topic/${topic}`, headers(token))
    .then(response => response.data)
