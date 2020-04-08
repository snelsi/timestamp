import * as React from "react";
import styled from "styled-components";

import { TimeOverview, Weeks, Years, YearOverview } from "timestamp";
import { useTime } from "useTime";

const myBirthday = new Date("April 22 2000");

const Timestamp: React.FC = () => {
  const { pathname } = window.location;

  const startOfTime = React.useMemo(() => {
    if (!pathname || pathname === "/") return myBirthday;

    const pathNameTime = new Date(pathname.slice(1));

    if (pathNameTime instanceof Date && !Number.isNaN(pathNameTime.getTime())) return pathNameTime;

    return myBirthday;
  }, [pathname]);

  const now = useTime();

  return (
    <Container>
      <h1 className="current-time">{now.toLocaleTimeString()}</h1>
      <h2>Memento Mori</h2>
      <Years startYear={startOfTime.getFullYear()} currentYear={now.getFullYear()} />
      <YearOverview date={now} />
      <h2>Carpe Diem</h2>
      <TimeOverview date={now} />
      <h2>Tempus fugit</h2>
      <Weeks birthday={startOfTime} date={now} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 2.5em;
  margin: 1.5em;
  @media (max-width: 640px) {
    margin: 1.5em auto;
    width: 87.5%;
  }
  & > .current-time {
    font-size: 3rem;
    font-weight: 600;
  }
`;
export default Timestamp;
