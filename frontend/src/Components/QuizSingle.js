import { Typography } from '@material-ui/core'
import ChooseFieldQuiz from './ChooseFieldQuiz'
import ChooseBoxQuiz from './ChooseBoxQuiz'
import AnswerButton from './AnswerButton'
import styled from 'styled-components/macro'

export default function QuizSingle({
  currentQuestion,
  handleAnswer,
  submitAnswer,
  singleAnswer,
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
          disabled={!singleAnswer}
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
