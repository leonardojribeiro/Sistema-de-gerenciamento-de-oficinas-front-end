import React, { createContext, useState } from "react";

interface SwipeableContexValues {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface SwipeableContextProviderProps {
  initialIndexActive: number;
}

const SwipeableContext = createContext<SwipeableContexValues>({} as SwipeableContexValues);

export const SwipeableContextProvider: React.FC<SwipeableContextProviderProps> = ({ children, initialIndexActive }) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndexActive);
  return (
    <SwipeableContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </SwipeableContext.Provider>
  )
}

export default SwipeableContext