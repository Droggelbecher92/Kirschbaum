import styled from 'styled-components/macro'

export default styled.main`
  display: grid;
  grid-template-columns: 47% 47%;
  grid-auto-rows: 37% 37% min-content 20%;
  grid-auto-columns: initial;
  grid-gap: var(--size-l);
  padding: var(--size-xl);
  height: 100%;
  width: 100%;
`
