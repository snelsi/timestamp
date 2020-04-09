import * as React from "react";

import TimestampOverview from "TimestampOverview";
import { isValidDate } from "scripts";

const myBirthday = "2000-04-22";

const App: React.FC = () => {
  const { pathname } = window.location;

  const initialBirthday = React.useMemo(() => {
    if (!pathname || pathname === "/") return myBirthday;

    const pathNameString = pathname.slice(1);

    const pathNameTime = new Date(pathNameString);
    if (isValidDate(pathNameTime)) return pathNameString;

    return myBirthday;
  }, [pathname]);

  return <TimestampOverview initialBirthday={initialBirthday} />;
};

export default App;
