import styled from "styled-components"

type FlexProps = {
  align?: string
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  gap?: number
  justify?: string
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  gap: ${({ gap = 0 }) => `${gap}rem`};
`
