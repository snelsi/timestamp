import * as React from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";

import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import isSameWeek from "date-fns/isSameWeek";
import isBefore from "date-fns/isBefore";

import { fancyWeek } from "scripts";

const Container = styled.div`
  max-width: 920px;
`;

const Grid = styled.div`
  --cell-size: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--cell-size));
  gap: 2px;
`;

const Week = styled.span`
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid rgba(77, 83, 88, 1);
  cursor: pointer;
  width: var(--cell-size);
  height: var(--cell-size);
  transition: var(--transition-ease);

  &[data-status="gone"] {
    background-color: rgba(70, 72, 75, 0.8);
  }
  &[data-status="current"] {
    background-color: rgba(249, 77, 86, 1);
  }

  @media (prefers-color-scheme: dark) {
    border: 1px solid rgba(55, 57, 59, 1);

    &[data-status="current"] {
      background-color: rgba(255, 50, 50, 1);
    }
  }
`;

interface IWeek {
  label: string;
  status: "gone" | "current" | "future";
}
interface WeeksProps {
  startWeek: Date;
  endWeek: Date;
  now: Date;
  hideFuture?: boolean;
}

export const Weeks: React.FC<WeeksProps> = ({ startWeek, endWeek, now, hideFuture = true }) => {
  const firstWeek = startOfISOWeek(startWeek);
  const lastWeek = endOfISOWeek(endWeek);
  const currentWeek = endOfISOWeek(now);

  const weeks = React.useMemo(() => {
    try {
      const weeks: IWeek[] = eachWeekOfInterval({
        start: firstWeek,
        end: lastWeek,
      }).map((week) => {
        let status: "gone" | "current" | "future" = "future";
        if (isSameWeek(week, currentWeek)) {
          status = "current";
        } else if (isBefore(week, currentWeek)) {
          status = "gone";
        }
        return {
          label: fancyWeek(week),
          status,
        };
      });

      return weeks;
    } catch {
      return [];
    }
  }, [firstWeek, lastWeek, currentWeek]);

  return (
    <Container>
      <Grid data-hide-future={hideFuture}>
        {weeks.map(({ label, status }) => (
          <Tippy content={label} key={label}>
            <Week data-status={status} />
          </Tippy>
        ))}
      </Grid>
    </Container>
  );
};
