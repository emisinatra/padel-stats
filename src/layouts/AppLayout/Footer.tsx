import styled from "styled-components";

const FooterWrapper = styled.footer`
  align-items: center;
  color: ${({ theme }) => theme.colors.lime[1100]};
  display: flex;
  font-size: 0.8rem;
  justify-content: center;
  padding: 1.2rem;
`;

export const Footer = () => {
  return <FooterWrapper>Bubú Software - Mendoza, Argentina</FooterWrapper>;
};
