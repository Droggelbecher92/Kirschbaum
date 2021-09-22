import styled from 'styled-components/macro'

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-light);
  color: var(--neutral-dark);

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100%;
`
