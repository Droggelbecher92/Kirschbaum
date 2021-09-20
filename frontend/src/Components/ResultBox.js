import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { saveAnswers } from '../Services/api-service'

export default function ResultBox({
  question,
  givenAnswer,
  correctAnswer,
  user,
  token,
}) {
  const isRight = givenAnswer === correctAnswer
  const pointsMade = () => {
    if (isRight) {
      return 1
    } else {
      return 0
    }
  }
  const answer = {
    userName: user.userName,
    question: question,
    score: pointsMade(),
  }
  saveAnswers(token, answer).catch(e => console.log(e))
  return (
    <Wrapper>
      <Typography variant="h6" color="textPrimary">
        {question}
      </Typography>
      <Typography variant="body1">{'Deine Antwort: ' + givenAnswer}</Typography>
      <Typography variant="body1">
        {'Richtige Antwort: ' + correctAnswer}
      </Typography>
      {isRight && (
        <Typography variant="body1" color="textPrimary">
          Richtig!
        </Typography>
      )}
      {!isRight && (
        <Typography variant="body1" color="textSecondary">
          Leider Falsch
        </Typography>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: lightskyblue;
  grid-column: span 2;
  border-radius: 10px;
  text-align: center;
`
