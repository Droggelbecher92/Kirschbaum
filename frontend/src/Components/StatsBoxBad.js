import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import ProgressionPercentBad from './ProgressionPercentBad'

export default function StatsBoxBad({ percent, header, filter }) {
  return (
    <Wrapper>
      <Typography variant="body1" color="textSecondary">
        {header}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {filter}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Davon falsch beantwortet:
      </Typography>
      <ProgressionPercentBad percent={percent} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: #b0dee8;
  border-radius: 10px;
  text-align: center;
`
