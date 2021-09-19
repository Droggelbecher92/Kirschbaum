import MainPage from '../Components/MainPage'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'
import { useEffect, useState } from 'react'
import Loading from '../Components/Loading'
import { Typography } from '@material-ui/core'
import ChooseBoxQuiz from '../Components/ChooseBoxQuiz'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import styled from 'styled-components/macro'
import ChooseFieldQuiz from '../Components/ChooseFieldQuiz'
import AnswerButton from '../Components/AnswerButton'

const initialArray = []
const initalQuestions = [
  {
    id: 5,
    type: 'THUMB',
    categoryName: 'Bar',
    topicName: 'Gin',
    question: 'Das Tonic Water zum Gin Tonic wird seperat serviert.',
    answer1: 'UP',
    answer2: 'DOWN',
    answer3: null,
    answer4: null,
    solution: 'UP',
  },
  {
    id: 28,
    type: 'SINGLE',
    categoryName: 'Bar',
    topicName: 'Bier',
    question: 'Was bedeutet SHIPA?',
    answer1: 'Sour Hopped Indian Pale Ale',
    answer2: 'Sweet Hopped Indian Pale Ale',
    answer3: 'Soft Hopped India Pale Ale',
    answer4: 'Single Hopped India Pale Ale',
    solution: 'Single Hopped India Pale Ale',
  },
  {
    id: 25,
    type: 'MULTI',
    categoryName: 'Bar',
    topicName: 'Bier',
    question:
      'Was darf nach dem bayerischen Reinheitsgebot von 1516 in Bier sein? ',
    answer1: 'Wasser',
    answer2: 'Hopfen',
    answer3: 'Hefe',
    answer4: 'Malz',
    solution: 'Wasser Hopfen Hefe Malz ',
  },
]

export default function QuizPage() {
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [counter, setCounter] = useState(0)
  const [thumbAnswer, setThumbAnswer] = useState('')
  const [singleAnswer, setSingleAnswer] = useState('')
  const [multiAnswer, setMultiAnswer] = useState(initialArray)

  useEffect(() => setCurrentQuestion(initalQuestions[counter]), [counter])

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

  console.log(multiAnswer)

  const submitAnswer = event => {
    event.preventDefault()
    setCounter(counter + 1)
  }

  if (!user) {
    return <Redirect to="/login" />
  }
  if (counter === initalQuestions.length) {
    return <Redirect to="/" />
  }
  while (!currentQuestion) {
    return (
      <MainPage>
        <Loading />
      </MainPage>
    )
  }
  if (currentQuestion.type === 'THUMB') {
    return (
      //Component: QuizThumb
      <WrapperQuestion>
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
        >{`Kategorie: ${currentQuestion.categoryName}  // Topic: ${currentQuestion.topicName} // Typ: ${currentQuestion.type}`}</Typography>
        <Typography variant="h4" color="textPrimary" align="center">
          {currentQuestion.question}
        </Typography>
        <ChooseFieldQuiz>
          <ChooseBoxQuiz
            value="UP"
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer1, currentQuestion.type)
            }
          >
            <ThumbUp />
          </ChooseBoxQuiz>
          <ChooseBoxQuiz
            value="DOWN"
            type="submit"
            onClick={e => handleAnswer(e, currentQuestion.type)}
          >
            <ThumbDown />
          </ChooseBoxQuiz>
          <div></div>
          <div></div>
          <div></div>
          <AnswerButton disabled={!thumbAnswer} onClick={e => submitAnswer(e)}>
            Bestätigen
          </AnswerButton>
        </ChooseFieldQuiz>
      </WrapperQuestion>
    )
  } else if (currentQuestion.type === 'SINGLE') {
    return (
      //Component: QuizSingle
      <WrapperQuestion>
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
        >{`Kategorie: ${currentQuestion.categoryName}  // Topic: ${currentQuestion.topicName} // Typ: ${currentQuestion.type}`}</Typography>
        <Typography variant="h4" color="textPrimary" align="center">
          {currentQuestion.question}
        </Typography>
        <ChooseFieldQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer1}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer1, currentQuestion.type)
            }
          >
            {currentQuestion.answer1}
          </ChooseBoxQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer2}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer2, currentQuestion.type)
            }
          >
            {currentQuestion.answer2}
          </ChooseBoxQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer3}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer3, currentQuestion.type)
            }
          >
            {currentQuestion.answer3}
          </ChooseBoxQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer4}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer4, currentQuestion.type)
            }
          >
            {currentQuestion.answer4}
          </ChooseBoxQuiz>
          <div></div>
          <AnswerButton disabled={!singleAnswer} onClick={e => submitAnswer(e)}>
            Bestätigen
          </AnswerButton>
        </ChooseFieldQuiz>
      </WrapperQuestion>
    )
  } else if (currentQuestion.type === 'MULTI') {
    return (
      //Component: QuizMulti
      <WrapperQuestion>
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
        >{`Kategorie: ${currentQuestion.categoryName}  // Topic: ${currentQuestion.topicName} // Typ: ${currentQuestion.type}`}</Typography>
        <Typography variant="h4" color="textPrimary" align="center">
          {currentQuestion.question}
        </Typography>
        <ChooseFieldQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer1}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer1, currentQuestion.type)
            }
          >
            {currentQuestion.answer1}
          </ChooseBoxQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer2}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer2, currentQuestion.type)
            }
          >
            {currentQuestion.answer2}
          </ChooseBoxQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer3}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer3, currentQuestion.type)
            }
          >
            {currentQuestion.answer3}
          </ChooseBoxQuiz>
          <ChooseBoxQuiz
            value={currentQuestion.answer4}
            type="submit"
            onClick={e =>
              handleAnswer(e, currentQuestion.answer4, currentQuestion.type)
            }
          >
            {currentQuestion.answer4}
          </ChooseBoxQuiz>
          <div></div>
          <AnswerButton
            disabled={multiAnswer.length < 1}
            onClick={e => submitAnswer(e)}
          >
            {`Aktuelle Auswahl: ${multiAnswer}`}
          </AnswerButton>
        </ChooseFieldQuiz>
      </WrapperQuestion>
    )
  } else {
    return <h1>Doof....</h1>
  }
}
const WrapperQuestion = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-light);
  color: var(--neutral-dark);
  display: grid;
  place-items: center;
  grid-template-rows: 10% 1fr 3fr;
`
