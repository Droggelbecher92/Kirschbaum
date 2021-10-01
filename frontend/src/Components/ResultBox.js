import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'

export default function ResultBox({ question, givenAnswer, correctAnswer }) {
  const [isRight, setIsRight] = useState(false)
  useEffect(() => {
    if (givenAnswer === correctAnswer) {
      setIsRight(true)
    }
  }, [correctAnswer, givenAnswer])
  return (
    <Wrapper>
      <Typography variant="h6" color="textPrimary">
        {question}
      </Typography>
      <br />
      <Typography variant="body1">{'Deine Antwort: ' + givenAnswer}</Typography>

      <Typography variant="body1">
        {'Richtige Antwort: ' + correctAnswer}
      </Typography>
      <br />
      {isRight && (
        <Typography variant="h4" color="textPrimary">
          Richtig!
        </Typography>
      )}
      {!isRight && (
        <Typography variant="h4" color="textSecondary">
          Leider Falsch
        </Typography>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: #b7e0ea;
  grid-column: span 2;
  border-radius: 10px;
  text-align: center;
  height: auto;
`
