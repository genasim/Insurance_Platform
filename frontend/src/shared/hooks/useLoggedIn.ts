import { createContext } from "react";

interface LoggedInContextProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const LoggedInContext = createContext<LoggedInContextProps>({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {},
});

export default LoggedInContext;
