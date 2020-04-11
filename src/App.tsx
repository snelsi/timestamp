import * as React from "react";

import TimestampOverview from "TimestampOverview";
import { usePathname } from "scripts";

const App: React.FC = () => {
  const { initialBirthday, initialDeath } = usePathname();
  return <TimestampOverview initialBirthday={initialBirthday} initialDeath={initialDeath} />;
};

export default App;
