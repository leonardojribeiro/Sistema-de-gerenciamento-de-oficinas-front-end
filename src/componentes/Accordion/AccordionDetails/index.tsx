import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useContext } from 'react';
import AccordionContext from '../Context';


const AccordionDetails: React.FC = ({ children }) => {
  const { expanded } = useContext(AccordionContext);


  const height = useMotionValue('0px')
  const minHeight = useMotionValue('0px')
  const maxHeight = useMotionValue('0px')
  const overflow = useMotionValue('hidden')

  expanded.onChange((expanded) => {

    height.set(expanded ? '100%' : '0px')
    minHeight.set(expanded ? '64px' : '0px')
    overflow.set(expanded ? 'visible' : 'hidden')
  })


  return (
    <motion.div style={{ height,  overflow, transition: "min-height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", padding: '0px 16px' }}>
      <div><div className=".MuiAccordionDetails-root"> 
        {
          children
        }
        </div></div>
    </motion.div>
  );
}

export default AccordionDetails;