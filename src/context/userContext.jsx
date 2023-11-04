/* eslint-disable react/prop-types */
import React from "react";

const UserContext = React.createContext(null);
export default function MyUserContext({ children }) {
  const [userData, setUserData] = React.useState({});
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, MyUserContext };
