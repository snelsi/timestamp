import * as React from "react";
import styled from "styled-components";

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function fancyWeek(d: Date) {
  const date = new Date(d);
  const weekStart = date.toLocaleString().slice(0, 10);
  date.setDate(date.getDate() + 6);
  const weekEnd = date.toLocaleString().slice(0, 10);
  return `${weekStart} - ${weekEnd}`;
}

interface IWeek {
  label: string;
  status: "gone" | "current" | "future";
}
interface WeeksProps {
  birthday: Date;
  date: Date;
}

export const Weeks: React.FC<WeeksProps> = ({ birthday, date }) => {
  const currentWeekDay = date.toLocaleString().slice(0, 10);

  const weeks = React.useMemo(() => {
    const currentWeek = getMonday(date);
    const firstWeek = getMonday(birthday);

    const weeks = new Array<IWeek>(4275);
    const shiftedWeek = new Date(firstWeek);

    let i = 0;
    while (shiftedWeek < currentWeek) {
      weeks[i] = {
        label: fancyWeek(shiftedWeek),
        status: "gone",
      };
      shiftedWeek.setDate(shiftedWeek.getDate() + 7);
      i++;
    }
    weeks[i] = {
      label: fancyWeek(shiftedWeek),
      status: "current",
    };
    i++;

    for (; i < 4275; i++) {
      shiftedWeek.setDate(shiftedWeek.getDate() + 7);
      weeks[i] = {
        label: fancyWeek(shiftedWeek),
        status: "future",
      };
    }
    return weeks.map(({ label, status }) => (
      <Week key={label} title={label} data-status={status} />
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
