import MainPage from './MainPage'
import BottomNav from './BottomNav'
import ResultBox from './ResultBox'
import styled from 'styled-components/macro'

export default function QuizResult({ answers, questions, user, token }) {
  return (
    <MainPage>
      <Wrapper>
        {answers.map(answer => (
          <ResultBox
            question={questions[answers.indexOf(answer)].question}
            givenAnswer={answer}
            correctAnswer={questions[answers.indexOf(answer)].solution}
            user={user}
            token={token}
            key={questions[answers.indexOf(answer)].question}
          />
        ))}
      </Wrapper>
      <BottomNav />
    </MainPage>
  )
}

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 47% 47%;
  grid-auto-rows: 30%;
  grid-auto-columns: initial;
  grid-gap: var(--size-l);
  padding: var(--size-xl);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`
