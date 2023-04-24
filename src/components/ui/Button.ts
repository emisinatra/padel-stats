import styled from "styled-components"

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.lime[300]};
  border-color: ${({ theme }) => theme.colors.lime[700]};
  border-radius: 0.4rem;
  border-style: solid;
  border-width: 2px;
  color: ${({ theme }) => theme.colors.lime[1200]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: 0.8rem;
  text-align: center;
  transition: all 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lime[400]};
    border-color: ${({ theme }) => theme.colors.lime[800]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.lime[500]};
  }
`
