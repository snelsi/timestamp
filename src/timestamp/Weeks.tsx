import * as React from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import addWeeks from "date-fns/addWeeks";

import { dateToString, fancyWeek } from "scripts";

interface IWeek {
  label: string;
  status: "gone" | "current" | "future";
}
interface WeeksProps {
  birthday: Date;
  date: Date;
  showWeeks?: number;
}

export const Weeks: React.FC<WeeksProps> = ({ birthday, date, showWeeks = 4275 }) => {
  const currentWeekDay = dateToString(date);

  const weeks = React.useMemo(() => {
    const currentWeek = startOfISOWeek(new Date(currentWeekDay));
    const startWeek = endOfISOWeek(birthday);
    const endWeek = addWeeks(new Date(startWeek), showWeeks);

    const weeksBefore: IWeek[] = eachWeekOfInterval({
      start: startWeek,
      end: currentWeek,
    }).map((week) => ({
      label: fancyWeek(week),
      status: "gone",
    }));

    const currentWeekElem: IWeek = {
      label: fancyWeek(currentWeek),
      status: "current",
    };

    const weeksAfter: IWeek[] = eachWeekOfInterval({
      start: addWeeks(endOfISOWeek(currentWeek), 1),
      end: endWeek,
    }).map((week) => ({
      label: fancyWeek(week),
      status: "future",
    }));

    return [...weeksBefore, currentWeekElem, ...weeksAfter].map(({ label, status }) => (
      <Tippy content={label} key={label}>
        <Week data-status={status} />
      </Tippy>
    ));
  }, [birthday, currentWeekDay, showWeeks]);

  return (
    <Container>
      <Grid>{weeks}</Grid>
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
  grid-gap: 2px;

  & span:nth-last-child(9) {
    opacity: 0.7;
  }
  & span:nth-last-child(8) {
    opacity: 0.6;
  }
  & span:nth-last-child(7) {
    opacity: 0.5;
  }
  & span:nth-last-child(6) {
    opacity: 0.4;
  }
  & span:nth-last-child(5) {
    opacity: 0.3;
  }
  & span:nth-last-child(4) {
    opacity: 0.2;
  }
  & span:nth-last-child(3) {
    opacity: 0.1;
  }
  & span:nth-last-child(2) {
    opacity: 0.05;
  }
  & span:nth-last-child(1) {
    opacity: 0.02;
  }
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

  &:hover {
    transform: scale(1.1);
  }
`;
