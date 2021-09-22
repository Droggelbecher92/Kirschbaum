import Page from '../Components/Page'
import { Redirect, useParams } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import { useEffect, useState } from 'react'
import Loading from '../Components/Loading'
import {
  getCategoryQuestions,
  getRandomQuestions,
  getTopicQuestions,
  saveAnswers,
} from '../Services/api-service'
import QuizThumb from '../Components/QuizThumb'
import QuizSingle from '../Components/QuizSingle'
import QuizMulti from '../Components/QuizMulti'
import QuizResult from '../Components/QuizResult'

export default function QuizPage() {
  const { user, token } = useAuth()
  const { firstFilter, secondFilter } = useParams()
  const [currentQuestionList, setCurrentQuestionList] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [counter, setCounter] = useState(0)
  const [thumbAnswer, setThumbAnswer] = useState('')
  const [singleAnswer, setSingleAnswer] = useState('')
  const [multiAnswer, setMultiAnswer] = useState([])
  const [givenAnswers, setGivenAnswers] = useState([])

  useEffect(() => {
    setCurrentQuestion(currentQuestionList[counter])
  }, [currentQuestionList, counter])

  useEffect(() => {
    setGivenAnswers([])
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
      if (multiAnswer.length < 1) {
        const newArray = [answer]
        setMultiAnswer(newArray)
      } else if (multiAnswer.indexOf(answer) === -1) {
        let newArray = multiAnswer
        newArray.push(answer)
        setMultiAnswer(newArray)
      } else {
        let newArray = multiAnswer
        newArray.splice(multiAnswer.indexOf(answer), 1)
        setMultiAnswer(newArray)
      }
    } else {
      console.log('doof')
    }
  }

  const submitAnswer = (event, questionKind) => {
    event.preventDefault()
    let score = 0
    if (questionKind === 'SINGLE') {
      if (singleAnswer === currentQuestion.solution) {
        score += 1
      }
      const newArray = givenAnswers
      newArray.push(singleAnswer)
      setGivenAnswers(newArray)
    } else if (questionKind === 'MULTI') {
      const possibleAnswersInOrder = [
        currentQuestion.answer1,
        currentQuestion.answer2,
        currentQuestion.answer3,
        currentQuestion.answer4,
      ]
      let multistring = ''
      for (let i = 0; i < possibleAnswersInOrder.length; i++) {
        for (let k = 0; k < multiAnswer.length; k++) {
          if (possibleAnswersInOrder[i] === multiAnswer[k]) {
            multistring += multiAnswer[k] + ' '
          }
        }
      }
      if (multistring === currentQuestion.solution) {
        score += 1
      }
      const newArray = givenAnswers
      newArray.push(multistring)
      setGivenAnswers(newArray)
    } else {
      if (thumbAnswer === currentQuestion.solution) {
        score += 1
      }
      const newArray = givenAnswers
      newArray.push(thumbAnswer)
      setGivenAnswers(newArray)
    }

    const answer = {
      userName: user.userName,
      question: currentQuestion.question,
      score: score,
    }
    saveAnswers(token, answer).catch(e => console.log(e))
    setSingleAnswer('')
    setMultiAnswer([])
    setThumbAnswer('')
    setCounter(counter + 1)
  }

  const resetAnswers = () => {
    return <Redirect to="/" />
  }

  if (!user) {
    return <Redirect to="/login" />
  }
  if (!currentQuestion) {
    if (
      currentQuestionList.length > 0 &&
      currentQuestionList.length === counter
    ) {
      return (
        <QuizResult
          answers={givenAnswers}
          questions={currentQuestionList}
          resetAnswers={resetAnswers}
          user={user}
          token={token}
        />
      )
    } else {
      return (
        <Page>
          <Loading />
        </Page>
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
