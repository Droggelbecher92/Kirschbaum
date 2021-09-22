import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'

export default function StatsBoxGlobal({ all, right, wrong }) {
  return (
    <Wrapper>
      <Typography variant="body1" color="textPrimary">
        Insgesamt beantwortete Fragen
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {all}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Davon richtig beantwortet
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {right}
      </Typography>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: lightskyblue;
  margin: var(--size-xl);
  width: 95%;
  border-radius: 10px;
  text-align: center;
`
