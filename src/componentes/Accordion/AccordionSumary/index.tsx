import { ButtonBase } from '@material-ui/core';
import { motion, useMotionValue } from 'framer-motion';
import React, { useContext } from 'react';
import AccordionContext from '../Context';

// import { Container } from './styles';

const AccordionSumary: React.FC = ({ children }) => {
  const { expanded } = useContext(AccordionContext);

  const margin = useMotionValue('0px')

  expanded.onChange((expanded) => {
    margin.set(expanded ? '16px 0' : '0 0px')
  })

  return (
    <motion.div onClick={() => expanded.set(!expanded.get())} style={{ margin: margin, transition: 'margin 0.3s', padding: '0px 16px' }}>
      <div className="MuiAccordionSummary-root">
        {children}
      </div>
    </motion.div>
  );
}

export default AccordionSumary;