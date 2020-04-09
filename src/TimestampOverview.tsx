import * as React from "react";
import styled from "styled-components";

import { dateToString, dayOfYear, daysInYear, isValidDate, useTime } from "scripts";

import { DatePicker, TimeOverview, Weeks, Years, YearOverview } from "timestamp";

interface TimestampOverviewProps {
  initialBirthday: string;
}
const TimestampOverview: React.FC<TimestampOverviewProps> = ({ initialBirthday }) => {
  const [birthday, setBirthday] = React.useState(() => new Date(initialBirthday));

  const handleBirthdayChange = (newDate: Date) => {
    setBirthday(newDate);
  };

  const startOfTime = React.useMemo(() => {
    if (isValidDate(birthday)) {
      const newPathname = dateToString(birthday);
      window.history.replaceState({}, null, newPathname);
      return birthday;
    }

    return new Date();
  }, [birthday]);

  const now = useTime();

  return (
    <Container>
      <h1 className="current-time">{now.toLocaleTimeString()}</h1>

      <h2>Memento Mori</h2>
      <DatePicker onChange={handleBirthdayChange} value={birthday} />
      <Years
        startYear={startOfTime.getFullYear()}
        currentYear={now.getFullYear()}
        currentYearCompletePercent={dayOfYear(now) / daysInYear(now.getFullYear())}
      />
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

export default TimestampOverview;
