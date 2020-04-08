import * as React from "react";
import styled from "styled-components";

interface YearsProps {
  date: Date;
}

export const Years: React.FC<YearsProps> = ({ date }) => (
  <YearsGrid>
    {[...Array(85)].map((_, index) => {
      const year = index + 2000;
      let status: "gone" | "current" | "future" = "future";
      if (year < date.getFullYear()) status = "gone";
      if (year === date.getFullYear()) status = "current";
      return (
        <Year data-status={status} key={year}>
          {year}
        </Year>
      );
    })}
  </YearsGrid>
);

const YearsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1em;
  max-width: 1000px;
  overflow: auto;

  @media (min-width: 800px) {
    padding-right: 10em;
  }

  & span:nth-last-child(9) {
    opacity: 0.7;
  }
  & span:nth-last-child(8) {
    opacity: 0.6;
  }
  & span:nth-last-child(7) {
    opacity: 0.5;
  }
  & span:nth-last-child(6) {
    opacity: 0.4;
  }
  & span:nth-last-child(5) {
    opacity: 0.3;
  }
  & span:nth-last-child(4) {
    opacity: 0.2;
  }
  & span:nth-last-child(3) {
    opacity: 0.1;
  }
  & span:nth-last-child(2) {
    opacity: 0.05;
  }
  & span:nth-last-child(1) {
    opacity: 0.02;
  }
`;

const Year = styled.span`
  display: inline-block;
  position: relative;

  font-size: inherit;
  font-weight: 500;
  line-height: 1.8em;
  text-align: center;

  height: 1.8em;
  width: 3em;

  &[data-status="gone"] {
    &::before {
      content: "";
      border-bottom: 2px solid black;
      position: absolute;
      transition: right var(--transition-ease);
      top: 45%;
      left: 0;
      right: 0;
    }
  }

  &[data-status="current"] {
    color: #ff0034;
    cursor: default;
  }
`;
