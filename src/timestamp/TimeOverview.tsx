import * as React from "react";
import styled from "styled-components";

import { RowLine } from "timestamp";

const Container = styled.div`
  display: grid;
  gap: 1em;
`;

const Row = styled.div`
  max-width: 44em;
  &[data-max-width="24"] {
    max-width: 44em;
  }
  &[data-max-width="30"] {
    max-width: 55em;
  }
`;

interface TimeOverviewProps {
  date: Date;
  isDead?: boolean;
}

export const TimeOverview: React.FC<TimeOverviewProps> = ({ date, isDead = false }) => (
  <Container data-dead={isDead}>
    <Row data-max-width={24}>
      <RowLine
        numbers={24}
        fillTo={date.getHours() + date.getMinutes() / 60}
        current={date.getHours()}
      />
    </Row>
    <Row data-max-width={30}>
      <RowLine
        numbers={60}
        fillTo={date.getMinutes() + date.getSeconds() / 60}
        current={date.getMinutes()}
      />
    </Row>
    <Row data-max-width={30}>
      <RowLine numbers={60} fillTo={date.getSeconds()} current={date.getSeconds()} />
    </Row>
  </Container>
);
