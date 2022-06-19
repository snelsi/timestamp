import * as React from "react";

import getDaysInYear from "date-fns/getDaysInYear";
import getDayOfYear from "date-fns/getDayOfYear";
import addWeeks from "date-fns/addWeeks";

import { dateToString, round, useTime } from "scripts";

import { DatePicker, TimeOverview, Stats, Weeks, Years, YearOverview } from "timestamp";

interface TimestampOverviewProps {
  initialBirthday: Date;
  initialDeath?: Date;
}
const TimestampOverview: React.FC<TimestampOverviewProps> = ({
  initialBirthday,
  initialDeath = null,
}) => {
  const [birthday, setBirthday] = React.useState(initialBirthday);
  const [death, setDeath] = React.useState(initialDeath);

  React.useEffect(() => {
    const birthdayPart = dateToString(birthday);
    const deatPart = death ? `>${dateToString(death)}` : "";
    const newPathname = `${birthdayPart}${deatPart}`;
    window.history.replaceState({}, null, newPathname);
  }, [birthday, death]);

  const [now, { isPaused, pauseTime, startTime }] = useTime();

  React.useEffect(() => {
    if (death === null) {
      startTime();
    } else {
      pauseTime();
    }
  }, [death, pauseTime, startTime]);

  return (
    <main>
      <h1 data-dead={isPaused}>{now.toLocaleTimeString()}</h1>

      <h3>Memento Mori</h3>
      <DatePicker
        onBirthdayChange={setBirthday}
        birthdayValue={birthday}
        onDeathChange={setDeath}
        deathValue={death}
      />

      <Stats start={birthday} end={death || now} />
      <Years
        startYear={birthday.getFullYear()}
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
        startWeek={birthday}
        endWeek={death || addWeeks(birthday, 4275)}
        now={now}
        hideFuture={!death}
      />
    </main>
  );
};

export default TimestampOverview;
