import React, { useState } from 'react';

const Context = React.createContext();

const Provider = ({ children }) => {
  const [active, setActive] = useState(true);

  const value = { active, setActive };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
