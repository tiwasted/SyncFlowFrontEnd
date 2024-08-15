import React, { createContext, useContext, useState } from "react";

const SidebarVisibilityContext = createContext();

export const useSidebarVisibility = () => useContext(SidebarVisibilityContext);

export const SidebarProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SidebarVisibilityContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </SidebarVisibilityContext.Provider>
  );
};
