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
