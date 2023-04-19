import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1``;

export const StyledTitle = ({
  order = 1,
  ...rest
}: {
  order?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.ComponentPropsWithoutRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>) => {
  return <Title {...rest} as={`h${order}` as const} />;
};

export { StyledTitle as Title };

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.lime[900]};
  border-radius: 1.6rem;
  color: ${({ theme }) => theme.colors.lime[1200]};
  padding: 0.8rem 1.6rem;
`;

export const Input = styled.input`
  border-color: ${({ theme }) => theme.colors.lime[600]};
  border-radius: 1.6rem;
  border-style: solid;
  border-width: 2px;
  padding: 0.4rem 0.8rem;
  width: 100%;
`;

export const Select = styled.select`
  border-color: ${({ theme }) => theme.colors.lime[600]};
  border-radius: 1.6rem;
  border-style: solid;
  border-width: 2px;
  padding: 0.4rem 0.8rem;
  width: 100%;
`;

const StyledLink = styled(Link)``;
export { StyledLink as Link };

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HStack = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.olive[1100]};
`;
