import * as React from "react";
import styled from "styled-components";

import { RowLine } from "timestamp";

interface YearsProps {
  currentYear: number;
  currentYearCompletePercent: number;
  startYear: number;
  showYears?: number;
}

export const Years: React.FC<YearsProps> = ({
  startYear,
  currentYear,
  currentYearCompletePercent = 0,
  showYears = 84,
}) => (
  <YearsGrid>
    <RowLine
      numbers={showYears}
      fillTo={currentYear + currentYearCompletePercent}
      from={startYear}
      current={currentYear}
      dataType="year"
    />
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

  & span:nth-last-child(8) {
    opacity: 0.7;
  }
  & span:nth-last-child(7) {
    opacity: 0.6;
  }
  & span:nth-last-child(6) {
    opacity: 0.5;
  }
  & span:nth-last-child(5) {
    opacity: 0.4;
  }
  & span:nth-last-child(4) {
    opacity: 0.3;
  }
  & span:nth-last-child(3) {
    opacity: 0.2;
  }
  & span:nth-last-child(2) {
    opacity: 0.1;
  }
  & span:nth-last-child(1) {
    opacity: 0.05;
  }
`;
