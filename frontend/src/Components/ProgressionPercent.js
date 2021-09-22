import { CircularProgressbar } from 'react-circular-progressbar'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'

export default function ProgressionLevel({ level, percent }) {
  return (
    <Wrapper>
      <CircularProgressbar value={percent} text={level} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 75%;
  height: 75%;
  align-items: center;
  text-align: center;
  padding-bottom: 8%;
`
