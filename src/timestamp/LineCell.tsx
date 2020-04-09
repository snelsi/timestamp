import styled from "styled-components";

export interface LineCellProps {
  fillTo?: number;
}
export const LineCell = styled.span<LineCellProps>`
  display: inline-block;
  position: relative;

  font-size: inherit;
  line-height: 1.8em;
  text-align: center;

  height: 1.8em;
  width: 1.8em;

  &[data-type="year"] {
    font-weight: 500;
    width: 3em;
  }

  &::before {
    content: "";
    border-bottom: 2px solid black;
    position: absolute;
    transition: var(--transition-ease);
    top: 45%;
    left: 0;
    right: ${({ fillTo = 1 }) => {
      if (fillTo <= 0) return 100;
      if (fillTo >= 1) return 0;
      return 100 - fillTo * 100;
    }}%;
  }

  &[data-status="current"] {
    color: #ff0034;
    cursor: default;
  }
`;
