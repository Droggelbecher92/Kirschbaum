import styled from 'styled-components/macro'

export default styled.button`
  border-radius: 10px;
  background-color: ${props => (props.selected ? '#FFF077' : '#87CEFA')};
`
