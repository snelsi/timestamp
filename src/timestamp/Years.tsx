import * as React from "react";
import styled from "styled-components";

import { RowLine } from "timestamp";

const YearsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1em;
  max-width: 1000px;
  overflow: auto;

  @media (min-width: 800px) {
    padding-right: 10em;
  }
`;

interface YearsProps {
  currentYear: number;
  currentYearCompletePercent: number;
  startYear: number;
  showYears?: number;
  hideFuture?: boolean;
}

export const Years: React.FC<YearsProps> = ({
  startYear,
  currentYear,
  currentYearCompletePercent = 0,
  showYears = 84,
  hideFuture = true,
}) => (
  <YearsGrid data-hide-future={hideFuture}>
    <RowLine
      numbers={showYears}
      fillTo={currentYear + currentYearCompletePercent}
      from={startYear}
      current={currentYear}
      dataType="year"
    />
  </YearsGrid>
);
