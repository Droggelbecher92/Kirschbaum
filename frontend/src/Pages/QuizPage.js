import MainPage from '../Components/MainPage'
import { Redirect, useParams } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import { useEffect, useState } from 'react'
import Loading from '../Components/Loading'
import {
  getCategoryQuestions,
  getRandomQuestions,
  getTopicQuestions,
} from '../Services/api-service'
import QuizThumb from '../Components/QuizThumb'
import QuizSingle from '../Components/QuizSingle'
import QuizMulti from '../Components/QuizMulti'

const initialArray = []

export default function QuizPage() {
  const { user, token } = useAuth()
  const { firstFilter, secondFilter } = useParams()
  const [currentQuestionList, setCurrentQuestionList] = useState(initialArray)
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [counter, setCounter] = useState(0)
  const [thumbAnswer, setThumbAnswer] = useState('')
  const [singleAnswer, setSingleAnswer] = useState('')
  const [multiAnswer, setMultiAnswer] = useState(initialArray)

  useEffect(() => {
    setCurrentQuestion(currentQuestionList[counter])
  }, [currentQuestionList, counter])

  useEffect(() => {
    if (firstFilter === 'Category') {
      getCategoryQuestions(token, secondFilter)
        .then(response => response.data)
        .then(data => {
          setCurrentQuestionList(data)
          setCurrentQuestion(data[0])
        })
        .catch(error => console.log(error.message))
    } else if (firstFilter === 'Topic') {
      getTopicQuestions(token, secondFilter)
        .then(response => response.data)
        .then(data => {
          setCurrentQuestionList(data)
          setCurrentQuestion(data[0])
        })
        .catch(error => console.log(error.message))
    } else {
      getRandomQuestions(token)
        .then(response => response.data)
        .then(data => {
          setCurrentQuestionList(data)
          setCurrentQuestion(data[0])
        })
        .catch(error => console.log(error.message))
    }
  }, [firstFilter, secondFilter, token])

  const handleAnswer = (event, answer, questionKind) => {
    event.preventDefault()
    if (questionKind === 'THUMB') {
      setThumbAnswer(answer)
    } else if (questionKind === 'SINGLE') {
      setSingleAnswer(answer)
    } else if (questionKind === 'MULTI') {
      function findAnswer(currentAnswers) {
        return currentAnswers === answer
      }

      if (multiAnswer.length < 1 || !multiAnswer.find(findAnswer)) {
        setMultiAnswer([...multiAnswer, answer])
      } else {
        multiAnswer.splice(multiAnswer.indexOf(answer), 1)
        setMultiAnswer(multiAnswer)
      }
    }
  }

  const submitAnswer = event => {
    event.preventDefault()
    setSingleAnswer('')
    setMultiAnswer(initialArray)
    setThumbAnswer('')
    setCounter(counter + 1)
  }

  if (!user) {
    return <Redirect to="/login" />
  }
  if (!currentQuestion) {
    if (
      currentQuestionList.length > 0 &&
      currentQuestionList.length === counter
    ) {
      return <Redirect to="/" />
    } else {
      return (
        <MainPage>
          <Loading />
        </MainPage>
      )
    }
  }

  if (currentQuestion.type === 'THUMB') {
    return (
      <QuizThumb
        currentQuestion={currentQuestion}
        handleAnswer={handleAnswer}
        submitAnswer={submitAnswer}
        thumbAnswer={thumbAnswer}
      />
    )
  } else if (currentQuestion.type === 'SINGLE') {
    return (
      <QuizSingle
        currentQuestion={currentQuestion}
        handleAnswer={handleAnswer}
        submitAnswer={submitAnswer}
        singleAnswer={singleAnswer}
      />
    )
  } else if (currentQuestion.type === 'MULTI') {
    return (
      <QuizMulti
        currentQuestion={currentQuestion}
        handleAnswer={handleAnswer}
        submitAnswer={submitAnswer}
        multiAnswer={multiAnswer}
      />
    )
  } else {
    return <h1>Doof....</h1>
  }
}
