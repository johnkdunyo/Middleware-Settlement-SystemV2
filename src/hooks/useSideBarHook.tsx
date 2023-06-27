"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export const SideBarContext = createContext<{
  isOpen: boolean;
  toggleOpen: (status: boolean) => void;
}>({
  isOpen: false,
  toggleOpen: () => {},
});

type Props = {
  children?: ReactNode;
};

export const SideBarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (status: boolean) => setIsOpen(status);

  return (
    <SideBarContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

const useSideBarHook = () => useContext(SideBarContext);

export default useSideBarHook;
