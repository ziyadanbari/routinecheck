/* eslint-disable react/prop-types */
/* eslint/disable react/prop-types */

import React from "react";

const DRContext = React.createContext(null);

function MyDRContext({ children }) {
  const [routines, setRoutines] = React.useState([]);

  return (
    <DRContext.Provider value={{ routines, setRoutines }}>
      {children}
    </DRContext.Provider>
  );
}

export { DRContext, MyDRContext };
