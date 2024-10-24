// NavbarContext.js
import React, { createContext, useState, useContext } from 'react';

const NavbarContext = createContext();

export const useNavbar = () => {
  return useContext(NavbarContext);
};

export const NavbarProvider = ({ children }) => {
  const [collapsed, setSidebarCollapsed] = useState(false);

  const toggleNavbar = () => {
    setSidebarCollapsed(prevState => !prevState);
  };

  return (
    <NavbarContext.Provider value={{ collapsed, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};
