import styled from 'styled-components'

export const Divider = () => {
  return (
    <StyledDivider />
  )
}

export const StyledDivider = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.15);
    height: 1px;
    margin: 7px 0;
`