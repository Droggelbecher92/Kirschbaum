import styled from 'styled-components/macro'

export default styled.main`
  display: grid;
  grid-template-columns: 47% 47%;
  grid-auto-rows: 24%;
  grid-auto-columns: initial;
  grid-gap: var(--size-l);
  padding: var(--size-xl);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`
