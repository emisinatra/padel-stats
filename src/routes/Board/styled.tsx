import styled from "styled-components";

export const BoardWrapper = styled.div``;

export const BoardButtonGrid = styled.div`
  display: grid;
`;

export const BoardButton = styled("button")`
  color: ${(props) => props.theme.colors.lime[1200]};
`;
