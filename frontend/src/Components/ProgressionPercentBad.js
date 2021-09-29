import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import styled from 'styled-components/macro'

export default function ProgressionPercentBad({ percent }) {
  return (
    <Wrapper>
      <CircularProgressbar
        value={percent}
        text={percent + '%'}
        styles={buildStyles({
          pathColor: '#AD1E28',
          textColor: '#AD1E28',
          pathTransitionDuration: 0.5,
        })}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 75%;
  margin-left: 12.5%;
  justify-content: center;
  padding-bottom: 8%;
`
