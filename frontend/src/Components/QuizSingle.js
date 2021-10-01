import { Typography } from '@material-ui/core'
import ChooseFieldQuiz from './ChooseFieldQuiz'
import ChooseBoxQuiz from './ChooseBoxQuiz'
import AnswerButton from './AnswerButton'
import styled from 'styled-components/macro'
import { useState } from 'react'

export default function QuizSingle({
  currentQuestion,
  handleAnswer,
  submitAnswer,
  singleAnswer,
}) {
  const [first, setFirst] = useState(false)
  const [second, setSecond] = useState(false)
  const [third, setThird] = useState(false)
  const [fourth, setFourth] = useState(false)
  return (
    <WrapperQuestion>
      <Typography variant="h4" color="textPrimary" align="center">
        {currentQuestion.question}
      </Typography>
      <Typography
        variant="body1"
        color="textPrimary"
        align="center"
      >{`Fragen-Typ: ${currentQuestion.type}-Choice`}</Typography>
      <ChooseFieldQuiz>
        <ChooseBoxQuiz
          value={currentQuestion.answer1}
          type="submit"
          selected={first}
          onClick={e => {
            handleAnswer(e, currentQuestion.answer1, currentQuestion.type)
            if (first === false) {
              setFirst(true)
              setSecond(false)
              setThird(false)
              setFourth(false)
            }
          }}
        >
          {currentQuestion.answer1}
        </ChooseBoxQuiz>
        <ChooseBoxQuiz
          value={currentQuestion.answer2}
          type="submit"
          selected={second}
          onClick={e => {
            handleAnswer(e, currentQuestion.answer2, currentQuestion.type)
            if (second === false) {
              setFirst(false)
              setSecond(true)
              setThird(false)
              setFourth(false)
            }
          }}
        >
          {currentQuestion.answer2}
        </ChooseBoxQuiz>
        <ChooseBoxQuiz
          value={currentQuestion.answer3}
          type="submit"
          selected={third}
          onClick={e => {
            handleAnswer(e, currentQuestion.answer3, currentQuestion.type)
            if (third === false) {
              setFirst(false)
              setSecond(false)
              setThird(true)
              setFourth(false)
            }
          }}
        >
          {currentQuestion.answer3}
        </ChooseBoxQuiz>
        <ChooseBoxQuiz
          value={currentQuestion.answer4}
          type="submit"
          selected={fourth}
          onClick={e => {
            handleAnswer(e, currentQuestion.answer4, currentQuestion.type)
            if (fourth === false) {
              setFirst(false)
              setSecond(false)
              setThird(false)
              setFourth(true)
            }
          }}
        >
          {currentQuestion.answer4}
        </ChooseBoxQuiz>
        <div></div>
        <AnswerButton
          disabled={!singleAnswer}
          type="submit"
          onClick={e => {
            submitAnswer(e, currentQuestion.type)
            setFirst(false)
            setSecond(false)
            setThird(false)
            setFourth(false)
          }}
        >
          Bestätigen
        </AnswerButton>
      </ChooseFieldQuiz>
    </WrapperQuestion>
  )
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
  grid-template-rows: 20% 0.5fr 3fr;
`
