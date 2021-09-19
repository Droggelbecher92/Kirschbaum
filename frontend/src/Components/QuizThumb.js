import styled from 'styled-components/macro'
import ChooseField from './ChooseField'
import ChooseBoxQuiz from './ChooseBoxQuiz'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import { Typography } from '@material-ui/core'

export default function QuizThumb({ question, handler }) {
  return (
    <WrapperThumb>
      <Typography
        variant="body1"
        color="textPrimary"
        align="center"
      >{`Kategorie: ${question.categoryName}  // Topic: ${question.topicName}`}</Typography>
      <Typography variant="h3" color="textPrimary" align="center">
        {question.question}
      </Typography>
      <ChooseField>
        <ChooseBoxQuiz value="UP" type="submit" onClick={e => handler(e)}>
          <ThumbUp />
        </ChooseBoxQuiz>
        <ChooseBoxQuiz value="DOWN" type="submit" onClick={e => handler(e)}>
          <ThumbDown />
        </ChooseBoxQuiz>
      </ChooseField>
    </WrapperThumb>
  )
}
const WrapperThumb = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-light);
  color: var(--neutral-dark);
  display: grid;
  place-items: center;
  grid-template-rows: 1fr 2fr 2fr;
`
