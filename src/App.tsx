import * as React from "react";
import isValid from "date-fns/isValid";

import TimestampOverview from "TimestampOverview";

const myBirthday = "2000-04-22";

const App: React.FC = () => {
  const { pathname } = window.location;

  const initialBirthday = React.useMemo(() => {
    if (!pathname || pathname === "/") return myBirthday;

    const pathNameString = pathname.slice(1);

    if (isValid(new Date(pathNameString))) return pathNameString;

    return myBirthday;
  }, [pathname]);

  return <TimestampOverview initialBirthday={initialBirthday} />;
};

export default App;
