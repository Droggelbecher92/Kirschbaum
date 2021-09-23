import { CircularProgressbar } from 'react-circular-progressbar'
import styled from 'styled-components/macro'

export default function ProgressionPercent({ percent }) {
  return (
    <Wrapper>
      <CircularProgressbar value={percent} text={percent + '%'} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 75%;
  margin-left: 12.5%;
  justify-content: center;
  padding-bottom: 8%;
`
