import styled from "styled-components";

type HelpTextProps = {
  variant: "info" | "error" | "warning" | "success";
};

export const HelpText = styled.p<HelpTextProps>``;
