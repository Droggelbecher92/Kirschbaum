import styled from 'styled-components/macro'
import ProgressionPercent from './ProgressionPercent'
import { Typography } from '@material-ui/core'

export default function StatsBoxGood({ percent, header, filter }) {
  return (
    <Wrapper>
      <Typography variant="body1" color="textSecondary">
        {header}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {filter}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Davon richtig beantwortet:
      </Typography>
      <ProgressionPercent percent={percent} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: lightskyblue;
  border-radius: 10px;
  text-align: center;
`
