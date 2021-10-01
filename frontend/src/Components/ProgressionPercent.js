import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import styled from 'styled-components/macro'

export default function ProgressionPercent({ percent }) {
  return (
    <Wrapper>
      <CircularProgressbar
        value={percent}
        text={percent + '%'}
        styles={buildStyles({
          pathColor: '#6082A7',
          textColor: '#6082A7',
          pathTransitionDuration: 0.5,
        })}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 75%;
  color: #5d7da3;
  margin-left: 12.5%;
  justify-content: center;
  padding-bottom: 8%;
`
