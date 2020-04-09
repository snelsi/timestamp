import * as React from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { dateToLocalString, getMonday, fancyWeek } from "scripts";

interface IWeek {
  label: string;
  status: "gone" | "current" | "future";
}
interface WeeksProps {
  birthday: Date;
  date: Date;
}

export const Weeks: React.FC<WeeksProps> = ({ birthday, date }) => {
  const currentWeekDay = dateToLocalString(date);

  const weeks = React.useMemo(() => {
    const currentWeek = new Date(currentWeekDay);
    const firstWeek = getMonday(birthday);

    const weeksArray = new Array<IWeek>(4275);
    const shiftedWeek = new Date(firstWeek);

    let i = 0;
    while (shiftedWeek < currentWeek) {
      weeksArray[i] = {
        label: fancyWeek(shiftedWeek),
        status: "gone",
      };
      shiftedWeek.setDate(shiftedWeek.getDate() + 7);
      i++;
    }
    weeksArray[i] = {
      label: fancyWeek(shiftedWeek),
      status: "current",
    };
    i++;

    for (; i < 4275; i++) {
      shiftedWeek.setDate(shiftedWeek.getDate() + 7);
      weeksArray[i] = {
        label: fancyWeek(shiftedWeek),
        status: "future",
      };
    }
    return weeksArray.map(({ label, status }) => (
      <Tippy content={label} key={label}>
        <Week data-status={status} />
      </Tippy>
    ));
  }, [birthday, currentWeekDay]);

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
