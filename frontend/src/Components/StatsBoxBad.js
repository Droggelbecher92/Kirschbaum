import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import ProgressionPercentBad from './ProgressionPercentBad'

export default function StatsBoxBad({ percent, text }) {
  return (
    <Wrapper>
      <Typography variant="body1" color="textPrimary">
        {text}
      </Typography>
      <ProgressionPercentBad percent={percent} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: lightskyblue;
  border-radius: 10px;
  text-align: center;
`
