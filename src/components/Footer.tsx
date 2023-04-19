import styled from "styled-components";

const FooterWrapper = styled.footer`
  bottom: 0;
  font-size: 14px;
  margin-top: 40px;
  min-height: 50px;
  position: relative;
  text-align: center;
  width: 100%;
`;

export const Footer = () => {
  return <FooterWrapper>Bubú Software - Mendoza, Argentina.</FooterWrapper>;
};
