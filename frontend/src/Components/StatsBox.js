import styled from 'styled-components/macro'
import ProgressionPercent from './ProgressionPercent'
import { Typography } from '@material-ui/core'

export default function StatsBox({ percent, text }) {
  return (
    <Wrapper>
      <Typography variant="body1" color="textPrimary">
        {text}
      </Typography>
      <ProgressionPercent percent={percent} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: lightskyblue;
  grid-column: span 2;
  border-radius: 10px;
  text-align: center;
`
