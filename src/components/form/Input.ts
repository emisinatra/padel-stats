import styled from "styled-components";

export const Input = styled.input`
  border-color: ${({ theme }) => theme.colors.lime[600]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border-style: solid;
  border-width: 2px;

  padding: 0.8rem;
  width: 100%;
`;
