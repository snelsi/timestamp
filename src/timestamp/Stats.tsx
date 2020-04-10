import * as React from "react";
import styled from "styled-components";

import differenceInSeconds from "date-fns/differenceInSeconds";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import differenceInDays from "date-fns/differenceInDays";
import differenceInYears from "date-fns/differenceInYears";

interface StatsProps {
  start: Date;
  end: Date;
}

export const Stats: React.FC<StatsProps> = ({ start, end }) => (
  <Container>
    <span>{differenceInYears(end, start)}</span> <span>Years</span>
    <span>{differenceInDays(end, start)}</span> <span>Days</span>
    <span>{differenceInHours(end, start)}</span> <span>Hours</span>
    <span>{differenceInMinutes(end, start)}</span> <span>Minutes</span>
    <span>{differenceInSeconds(end, start)}</span> <span>Seconds</span>
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

  border-left: 1px solid var(--border-color, black);

  padding: 0 1.5rem;

  @media (min-width: 1181px) {
    border-right: 1px solid var(--border-color, black);
    border-left: none;

    position: absolute;
    top: 10rem;
    right: 1rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
`;
