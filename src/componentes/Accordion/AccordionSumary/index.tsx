import { motion, useMotionValue } from 'framer-motion';
import React, { useContext } from 'react';
import AccordionContext from '../Context';

// import { Container } from './styles';

const AccordionSumary: React.FC = ({ children }) => {
  const { expanded } = useContext(AccordionContext);

  const minHeight = useMotionValue('48px')

  expanded.onChange((expanded) => { 
    minHeight.set(expanded ? '64px' : '48px')
  })

  return (
    <motion.div onClick={() => expanded.set(!expanded.get())} style={{minHeight, transition: 'all 0.3s', padding: '0px 16px',  display:'flex', alignItems: 'center' }}>
      <div style={{width:'100%', display:'flex', alignItems: 'center'}}>
        {children}
      </div>
    </motion.div>
  );
}

export default AccordionSumary;