import * as React from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";

import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import isSameWeek from "date-fns/isSameWeek";
import isBefore from "date-fns/isBefore";

import { dateToString, fancyWeek } from "scripts";

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
  const firstWeekString = dateToString(startWeek);
  const lastWeekString = dateToString(endWeek);
  const currentWeekString = dateToString(now);

  const weeks = React.useMemo(() => {
    const firstWeek = startOfISOWeek(new Date(firstWeekString));
    const lastWeek = endOfISOWeek(new Date(lastWeekString));
    const currentWeek = endOfISOWeek(new Date(currentWeekString));

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

    return weeks.map(({ label, status }) => (
      <Tippy content={label} key={label}>
        <Week data-status={status} />
      </Tippy>
    ));
  }, [firstWeekString, lastWeekString, currentWeekString]);

  return (
    <Container>
      <Grid data-hide-future={hideFuture}>{weeks}</Grid>
    </Container>
  );
};

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
  background-color: rgba(242, 244, 248, 1);
  border-radius: 3px;
  border: 1px solid rgba(77, 83, 88, 1);
  cursor: pointer;
  width: var(--cell-size);
  height: var(--cell-size);
  transition: var(--transition-ease);

  &[data-status="gone"] {
    background-color: rgba(75, 77, 79, 0.8);
  }
  &[data-status="current"] {
    background-color: rgba(249, 77, 86, 1);
  }
`;
