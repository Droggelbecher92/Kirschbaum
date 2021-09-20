import styled from 'styled-components/macro'
import ChooseBoxQuiz from './ChooseBoxQuiz'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import ChooseFieldQuiz from './ChooseFieldQuiz'
import AnswerButton from './AnswerButton'

export default function QuizThumb({
  currentQuestion,
  handleAnswer,
  submitAnswer,
  thumbAnswer,
}) {
  return (
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
          onClick={e =>
            handleAnswer(e, currentQuestion.answer2, currentQuestion.type)
          }
        >
          <ThumbDown />
        </ChooseBoxQuiz>
        <div></div>
        <div></div>
        <div></div>
        <AnswerButton
          disabled={!thumbAnswer}
          type="submit"
          onClick={e => submitAnswer(e, currentQuestion.type)}
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
  grid-template-rows: 10% 1fr 3fr;
`
