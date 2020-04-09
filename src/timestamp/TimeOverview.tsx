import * as React from "react";
import styled from "styled-components";

import { RowLine } from "timestamp";

interface TimeOverviewProps {
  date: Date;
}

export const TimeOverview: React.FC<TimeOverviewProps> = ({ date }) => (
  <Container>
    <Row24>
      <RowLine numbers={24} fillTo={date.getHours()} />
    </Row24>
    <Row30>
      <RowLine numbers={60} fillTo={date.getMinutes()} />
    </Row30>
    <Row30>
      <RowLine numbers={60} fillTo={date.getSeconds()} />
    </Row30>
  </Container>
);

const Container = styled.div`
  display: grid;
  grid-gap: 1.25em;
  font-weight: 500;
`;

const Row24 = styled.div`
  max-width: 44em;
`;
const Row30 = styled.div`
  max-width: 55em;
`;
