import * as React from "react";

interface Additional {
  isPaused: boolean;
  pauseTime: () => void;
  startTime: () => void;
}
export const useTime = (refreshCycle = 1000): [Date, Additional] => {
  const [now, setNow] = React.useState(() => new Date());

  const [isPaused, setIsPaused] = React.useState(false);
  const pauseTime = () => setIsPaused(true);
  const startTime = () => setIsPaused(false);

  React.useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => setNow(new Date()), refreshCycle);
      return () => clearInterval(intervalId);
    }
  }, [isPaused, refreshCycle]);

  return [now, { isPaused, pauseTime, startTime }];
};
