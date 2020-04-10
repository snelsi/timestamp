import * as React from "react";
import styled from "styled-components";

import getDaysInYear from "date-fns/getDaysInYear";
import getDayOfYear from "date-fns/getDayOfYear";
import isValid from "date-fns/isValid";
import addWeeks from "date-fns/addWeeks";

import { dateToString, round, useTime } from "scripts";

import { DatePicker, TimeOverview, Stats, Weeks, Years, YearOverview } from "timestamp";

interface TimestampOverviewProps {
  initialBirthday: string;
}
const TimestampOverview: React.FC<TimestampOverviewProps> = ({ initialBirthday }) => {
  const [birthday, setBirthday] = React.useState(() => new Date(initialBirthday));
  const [death, setDeath] = React.useState(null);

  const handleBirthdayChange = (newDate: Date) => setBirthday(newDate);
  const handleDeathChange = (newDate: Date) => setDeath(newDate);

  const startOfTime = React.useMemo(() => {
    if (isValid(birthday)) {
      const newPathname = dateToString(birthday);
      window.history.replaceState({}, null, newPathname);
      return birthday;
    }

    return new Date();
  }, [birthday]);

  const [now, { isPaused, pauseTime, startTime }] = useTime();

  React.useEffect(() => {
    if (death === null) {
      startTime();
    } else {
      pauseTime();
    }
  }, [death, pauseTime, startTime]);

  return (
    <Container>
      <h1 data-dead={isPaused}>{now.toLocaleTimeString()}</h1>

      <h3>Memento Mori</h3>
      <DatePicker
        onBirthdayChange={handleBirthdayChange}
        birthdayValue={birthday}
        onDeathChange={handleDeathChange}
        deathValue={death}
      />

      <Stats start={startOfTime} end={death || now} />
      <Years
        startYear={startOfTime.getFullYear()}
        currentYear={now.getFullYear()}
        currentYearCompletePercent={round(getDayOfYear(now) / getDaysInYear(now))}
        showYears={death ? death.getFullYear() - birthday.getFullYear() + 1 : 84}
        hideFuture={!death}
      />
      <YearOverview date={now} isDead={isPaused} />
      <h3>Carpe Diem</h3>
      <TimeOverview date={now} isDead={isPaused} />
      <h3>Tempus fugit</h3>
      <Weeks
        startWeek={startOfTime}
        endWeek={death || addWeeks(startOfTime, 4275)}
        now={now}
        hideFuture={!death}
      />
    </Container>
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
