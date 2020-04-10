import * as React from "react";
import styled from "styled-components";

import differenceInSeconds from "date-fns/differenceInSeconds";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

interface StatsProps {
  now: Date;
  start: Date;
}

export const Stats: React.FC<StatsProps> = ({ now, start }) => (
  <Container>
    <span>{differenceInCalendarDays(now, start)}</span> <span>Days</span>
    <span>{differenceInHours(now, start)}</span> <span>Hours</span>
    <span>{differenceInMinutes(now, start)}</span> <span>Minutes</span>
    <span>{differenceInSeconds(now, start)}</span> <span>Seconds</span>
  </Container>
);

const Container = styled.div`
  width: 40rem;
  width: fit-content;
  font-size: 1.25em;
  font-weight: 400;

  display: grid;
  gap: 0 1rem;
  grid-template-columns: 1fr auto;

  & > *:nth-child(odd) {
    text-align: right;
  }
  & > *:nth-child(even) {
    text-align: left;
  }

  border-left: 1px solid black;

  padding: 0 1.5rem;

  @media (min-width: 1181px) {
    border-right: 1px solid black;
    border-left: none;

    position: absolute;
    top: 8rem;
    right: 1rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
`;
