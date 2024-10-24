// NavbarContext.js
import React, { createContext, useState } from 'react';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);

  const toggleNavbar = () => {
    setcollapsed(prev => !prev);
  };

  return (
    <NavbarContext.Provider value={{ collapsed, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  return React.useContext(NavbarContext);
};
