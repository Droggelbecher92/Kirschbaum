import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'

export default function SolutionCard({ text, priotity }) {
  return (
    <Wrapper>
      {priotity === 'HIGH' && (
        <div>
          <Typography variant="h4" color="error">
            Sehr Wichtig
          </Typography>
          <Typography variant="subtitle1">Im Wissensgebiet: {text}</Typography>
          <Typography variant="subtitle2">Hier Berater anfordern</Typography>
        </div>
      )}
      {priotity === 'MEDIUM' && (
        <div>
          <Typography variant="h4" color="textPrimary">
            Wichtig
          </Typography>
          <Typography variant="subtitle1">Im Wissensgebiet: {text}</Typography>
          <Typography variant="subtitle2">Hier Berater anfordern</Typography>
        </div>
      )}
      {priotity === 'LOW' && (
        <div>
          <Typography variant="h4" color="textSecondary">
            Sinnvoll
          </Typography>
          <Typography variant="subtitle1">Im Wissensgebiet: {text}</Typography>
          <Typography variant="subtitle2">Hier Berater anfordern</Typography>
        </div>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background-color: #b0dee8;
  height: min-content;
  width: 100%;
  border-radius: 15px;
  box-shadow: 5px 3px 3px grey;
`
