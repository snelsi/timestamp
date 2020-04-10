import * as React from "react";
import styled from "styled-components";

import getDaysInYear from "date-fns/getDaysInYear";
import getDayOfYear from "date-fns/getDayOfYear";
import isValid from "date-fns/isValid";

import { dateToString, useTime } from "scripts";

import { DatePicker, TimeOverview, Stats, Weeks, Years, YearOverview } from "timestamp";

interface TimestampOverviewProps {
  initialBirthday: string;
}
const TimestampOverview: React.FC<TimestampOverviewProps> = ({ initialBirthday }) => {
  const [birthday, setBirthday] = React.useState(() => new Date(initialBirthday));

  const handleBirthdayChange = (newDate: Date) => {
    setBirthday(newDate);
  };

  const startOfTime = React.useMemo(() => {
    if (isValid(birthday)) {
      const newPathname = dateToString(birthday);
      window.history.replaceState({}, null, newPathname);
      return birthday;
    }

    return new Date();
  }, [birthday]);

  const now = useTime();

  return (
    <>
      <Container>
        <h1>{now.toLocaleTimeString()}</h1>

        <h3>Memento Mori</h3>
        <DatePicker onChange={handleBirthdayChange} value={birthday} />

        <Stats now={now} start={startOfTime} />
        <Years
          startYear={startOfTime.getFullYear()}
          currentYear={now.getFullYear()}
          currentYearCompletePercent={getDayOfYear(now) / getDaysInYear(now)}
        />
        <YearOverview date={now} />
        <h3>Carpe Diem</h3>
        <TimeOverview date={now} />
        <h3>Tempus fugit</h3>
        <Weeks birthday={startOfTime} date={now} />
      </Container>
    </>
  );
};

const Container = styled.main`
  margin: 1.5em;

  & > h1 {
    margin-bottom: 1em;
  }

  & > h3 {
    margin: 1.5em 0;
  }

  & > div {
    margin: 2rem 0;
  }

  @media (max-width: 640px) {
    margin: 1.5em auto;
    width: 87.5%;
  }
`;

export default TimestampOverview;
