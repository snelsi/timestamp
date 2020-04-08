import * as React from "react";
import styled from "styled-components";

interface RowLineProps {
  numbers: number;
  fillTo: number;
}
export const RowLine: React.FC<RowLineProps> = ({ numbers, fillTo }) => (
  <>
    {[...Array(numbers)].map((_, index) => (
      <Cell key={index} fillTo={fillTo - index}>
        {index + 1}
      </Cell>
    ))}
  </>
);

interface CellProps {
  fillTo?: number;
}
const Cell = styled.span<CellProps>`
  display: inline-block;
  position: relative;

  font-size: inherit;
  line-height: 1.8em;
  text-align: center;

  height: 1.8em;
  width: 1.8em;

  &::before {
    content: "";
    border-bottom: 2px solid black;
    position: absolute;
    transition: var(--transition-ease);
    top: 45%;
    left: 0;
    right: ${({ fillTo = 100 }) => {
      if (fillTo <= 0) return 100;
      if (fillTo >= 1) return 0;
      return fillTo;
    }}%;
  }
`;
