import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import ProgressionPercent from './ProgressionPercent'

export default function StatsBoxGlobal({ all, rightPercent }) {
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
      <ProgressionPercent percent={rightPercent} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: #b0dee8;
  border-radius: 10px;
  text-align: center;
`
