import * as React from "react";
import isValid from "date-fns/isValid";

const myBirthday = new Date("2000-04-22");

export const usePathname = () => {
  const { pathname } = window.location;

  return React.useMemo(() => {
    if (!pathname || pathname === "/") {
      return {
        initialBirthday: myBirthday,
        initialDeath: null,
      };
    }

    const path = decodeURI(pathname.slice(1));
    const [birthdayString, deathString] = path.split(">");
    const newBirthday = new Date(birthdayString);

    if (!isValid(newBirthday)) {
      return {
        initialBirthday: myBirthday,
        initialDeath: null,
      };
    }

    const newDeath = new Date(deathString);

    return {
      initialBirthday: newBirthday,
      initialDeath: isValid(newDeath) ? newDeath : null,
    };
  }, [pathname]);
};
