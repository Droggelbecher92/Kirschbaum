import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import logo from '../img/headbage.jpg'

export default function Onboarding() {
  return (
    <Wrapper>
      <Logo src={logo} alt="logo" />
      <Typography variant="h3">Willkommen bei Lowani!</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, architecto
        corporis dicta dolore hic incidunt magni nisi nulla quibusdam sequi?
        Accusamus aliquam excepturi fugiat laboriosam molestiae provident quos
        recusandae suscipit.
      </Typography>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  grid-column: span 2;
  grid-row: span 3;
  border-radius: 10px;
`

const Logo = styled.img`
  padding-top: var(--size-xl);
`
