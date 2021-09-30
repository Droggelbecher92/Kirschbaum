import styled from 'styled-components/macro'
import SolutionCard from './SolutionCard'
import { Typography } from '@material-ui/core'

export default function MainSolutions() {
  return (
    <Wrapper>
      <Typography variant="h3">Aktueller Bedarf</Typography>
      <SolutionCard text={'Küche'} priotity={'HIGH'} />
      <SolutionCard text={'Betrieb'} priotity={'MEDIUM'} />
      <SolutionCard text={'Bier'} priotity={'LOW'} />
    </Wrapper>
  )
}
const Wrapper = styled.main`
  display: grid;
  grid-row-gap: var(--size-l);
  width: 95%;
`
