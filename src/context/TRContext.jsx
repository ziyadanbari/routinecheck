import React from "react";

const TRContext = React.createContext(null);

function MyTRContext({ children }) {
  const [routines, setRoutines] = React.useState([]);

  return (
    <TRContext.Provider value={{ routines, setRoutines }}>
      {children}
    </TRContext.Provider>
  );
}

export { TRContext, MyTRContext };
