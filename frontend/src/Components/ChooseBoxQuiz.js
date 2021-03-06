import styled from 'styled-components/macro'

export default styled.button`
  border-radius: 10px;
  background-color: ${props => (props.selected ? '#5f7ea4' : '#ADDCE6')};
  box-shadow: 5px 3px 3px grey;
  border: none;
  font-size: large;
`
