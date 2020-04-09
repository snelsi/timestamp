import * as React from "react";
import styled from "styled-components";

import { Month, RowLine } from "timestamp";

import { isLeapYear } from "scripts";

const calculateFill = (month: number, days: number, date: Date) => {
  if (month < date.getMonth()) return days + 1;
  if (month > date.getMonth()) return 0;
  return date.getDate() + date.getHours() / 24;
};

interface YearOverviewProps {
  date: Date;
}
export const YearOverview: React.FC<YearOverviewProps> = ({ date }) => (
  <Container>
    <MonthOverview month="Jan" days={31} number={0} date={date} />
    <MonthOverview
      month="Feb"
      days={isLeapYear(date.getFullYear()) ? 29 : 28}
      number={1}
      date={date}
    />
    <MonthOverview month="Mar" days={31} number={2} date={date} />
    <MonthOverview month="Apr" days={30} number={3} date={date} />
    <MonthOverview month="May" days={31} number={4} date={date} />
    <MonthOverview month="Jun" days={30} number={5} date={date} />
    <MonthOverview month="Jul" days={31} number={6} date={date} />
    <MonthOverview month="Aug" days={31} number={7} date={date} />
    <MonthOverview month="Sep" days={30} number={8} date={date} />
    <MonthOverview month="Oct" days={31} number={9} date={date} />
    <MonthOverview month="Nov" days={30} number={10} date={date} />
    <MonthOverview month="Dec" days={31} number={11} date={date} />
  </Container>
);

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
  const current = date.getMonth() === number ? date.getDate() : -1;
  return (
    <Row>
      <h6 data-crossed={fillTo > 0}>{month}</h6>
      <RowLine numbers={days} fillTo={fillTo} current={current} />
    </Row>
  );
};

const Row = styled.div`
  position: relative;
  flex-wrap: nowrap;

  & h6 {
    display: inline-block;
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
