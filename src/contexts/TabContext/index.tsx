import React, { createContext, useState } from "react";

interface TabContexValues {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TabContext = createContext<TabContexValues>({} as TabContexValues);

export const TabContextProvider: React.FC = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabContext.Provider>
  )
}

export default TabContext