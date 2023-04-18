import React, { useState } from "react";
interface Props {
  children: React.ReactNode;
}
type UserAuthObj = {
  loggedIn: boolean;
  setLoggedIn: () => void;
};
const UserAuthContext = React.createContext<UserAuthObj>({
  loggedIn: false,
  setLoggedIn: () => {},
});
export const UserAuthContextProvider: React.FC<Props> = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const setLoggedInHandler = () => {
    if (loggedIn) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  };
  const contextValue: UserAuthObj = {
    loggedIn: loggedIn,
    setLoggedIn: setLoggedInHandler,
  };
  return (
    <UserAuthContext.Provider value={contextValue}>
      {props.children}
    </UserAuthContext.Provider>
  );
};
export default UserAuthContext;
