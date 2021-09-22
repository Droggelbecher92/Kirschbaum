import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import ProgressionPercent from './ProgressionPercent'

export default function StatsBoxGlobal({ all, right }) {
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
      <ProgressionPercent percent={Math.round((right * 100) / all)} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: lightskyblue;
  margin: var(--size-xl);
  width: 95%;
  border-radius: 10px;
  place-items: center;
  text-align: center;
`
