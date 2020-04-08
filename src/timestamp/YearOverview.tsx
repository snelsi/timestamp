import * as React from "react";
import styled from "styled-components";

import { Month, RowLine } from "timestamp";

const leapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const calculateFill = (month: number, days: number, date: Date) => {
  if (month < date.getMonth()) return days;
  if (month > date.getMonth()) return 0;
  return date.getDate() + date.getHours() / 24 - 1;
};

interface YearOverviewProps {
  date: Date;
}
export const YearOverview: React.FC<YearOverviewProps> = ({ date }) => {
  const Months: Month[] = [
    { month: "Jan", days: 31, number: 0 },
    { month: "Feb", days: leapYear(date.getFullYear()) ? 29 : 28, number: 1 },
    { month: "Mar", days: 31, number: 2 },
    { month: "Apr", days: 30, number: 3 },
    { month: "May", days: 31, number: 4 },
    { month: "Jun", days: 30, number: 5 },
    { month: "Jul", days: 31, number: 6 },
    { month: "Aug", days: 31, number: 7 },
    { month: "Sep", days: 30, number: 8 },
    { month: "Oct", days: 31, number: 9 },
    { month: "Nov", days: 30, number: 10 },
    { month: "Dec", days: 31, number: 11 },
  ];
  return (
    <Container>
      {Months.map(({ month, days, number }) => (
        <MonthOverview key={month} month={month} days={days} number={number} date={date} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;
  display: grid;

  @media (max-width: 1000px) {
    max-width: 28em;
  }

  @media (max-width: 420px) {
    grid-gap: 1.5em;
    font-size: 1.125rem;
  }
`;

interface MonthOverviewProps extends Month {
  date: Date;
}
export const MonthOverview: React.FC<MonthOverviewProps> = ({ month, number, days, date }) => {
  const fillTo = calculateFill(number, days, date);
  return (
    <Row>
      <h6 data-crossed={fillTo > 0}>{month}</h6>
      <RowLine numbers={days} fillTo={fillTo} />
    </Row>
  );
};

const Row = styled.div`
  font-size: 1em;
  position: relative;
  flex-wrap: nowrap;

  & h6 {
    display: inline-block;
    text-align: left;
    font-size: 1em;
    position: relative;
    width: 2em;
    height: 1.8em;
    line-height: 1.8em;
    text-align: center;

    &[data-crossed="true"] {
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
  }

  @media (max-width: 1000px) {
    & h6 {
      display: block;
    }
  }
  @media (max-width: 420px) {
    font-size: 1.125rem;
  }
`;
