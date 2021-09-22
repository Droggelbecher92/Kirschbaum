import styled from 'styled-components/macro'
import ProgressionPercent from './ProgressionPercent'
import { Typography } from '@material-ui/core'

export default function StatsBox({ percent, level }) {
  return (
    <Wrapper>
      <Typography variant="body1" color="textPrimary">
        Insgesamt beantwortete Fragen
      </Typography>
      <ProgressionPercent percent={percent} level={level} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: lightskyblue;
  grid-column: span 2;
  border-radius: 10px;
  text-align: center;
`
