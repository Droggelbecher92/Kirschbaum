import styled from 'styled-components/macro'

export default styled.main`
  display: grid;
  grid-template-columns: 46% 46%;
  grid-auto-rows: 17%;
  grid-auto-columns: initial;
  grid-gap: var(--size-xl);
  padding: var(--size-l);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`
