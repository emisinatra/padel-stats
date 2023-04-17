import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  position: relative;
  bottom: 0;
  text-align: center;
  min-height: 50px;
  width: 100%;
  margin-top: 40px;
`;

const Footer = () => {
  return <FooterWrapper>Bubú Software - Mendoza, Argentina.</FooterWrapper>;
};

export default Footer;
