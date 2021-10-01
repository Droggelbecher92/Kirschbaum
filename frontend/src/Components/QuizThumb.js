import styled from 'styled-components/macro'
import ChooseBoxQuiz from './ChooseBoxQuiz'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import AnswerButton from './AnswerButton'
import { useState } from 'react'
import ChooseFieldThumb from './ChooseFieldThumb'

export default function QuizThumb({
  currentQuestion,
  handleAnswer,
  submitAnswer,
  thumbAnswer,
}) {
  const [first, setFirst] = useState(false)
  const [second, setSecond] = useState(false)
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
      <ChooseFieldThumb>
        <div></div>
        <div></div>
        <ChooseBoxQuiz
          value="UP"
          type="submit"
          selected={first}
          onClick={e => {
            handleAnswer(e, currentQuestion.answer1, currentQuestion.type)
            if (first === false) {
              setFirst(true)
              setSecond(false)
            }
          }}
        >
          <ThumbUp />
        </ChooseBoxQuiz>
        <ChooseBoxQuiz
          value="DOWN"
          type="submit"
          selected={second}
          onClick={e => {
            handleAnswer(e, currentQuestion.answer2, currentQuestion.type)
            if (second === false) {
              setFirst(false)
              setSecond(true)
            }
          }}
        >
          <ThumbDown />
        </ChooseBoxQuiz>
        <div></div>
        <div></div>
        <AnswerButton
          disabled={!thumbAnswer}
          type="submit"
          onClick={e => {
            submitAnswer(e, currentQuestion.type)
            setFirst(false)
            setSecond(false)
          }}
        >
          Bestätigen
        </AnswerButton>
      </ChooseFieldThumb>
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
