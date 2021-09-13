import styled from 'styled-components/macro'

export default styled.main`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-auto-rows: 24%;
  grid-auto-columns: initial;
  grid-gap: var(--size-l);
  padding: var(--size-xl);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`
