import {  Paper } from '@material-ui/core';
import { motion, MotionValue, useMotionValue } from 'framer-motion';
import React, { createContext } from 'react';

interface AccordionContextValues {
  expanded: MotionValue<boolean>;
}

const AccordionContext = createContext<AccordionContextValues>({} as AccordionContextValues);
 
export const AccordionContextProvider: React.FC = ({ children }) => {
  const expanded = useMotionValue<boolean>(false);
  const margin = useMotionValue('0px');
  expanded.onChange((expanded) => {
    margin.set(expanded ? '16px 0' : '0 0px') 
  })

  return (
    <Paper style={{ position: 'relative', width:'100%',  }}>
      <motion.div style={{margin, transition: 'margin 0.3s'}}>
        <AccordionContext.Provider value={{ expanded }}>
          {children}
        </AccordionContext.Provider>
      </motion.div>
    </Paper>
  );
}

export default AccordionContext;