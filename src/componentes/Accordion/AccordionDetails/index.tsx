import { makeStyles } from '@material-ui/core';
import { motion, useMotionValue } from 'framer-motion';
import React, { useContext, useRef } from 'react';
import AccordionContext from '../Context';

const useStyles = makeStyles((theme) => ({
  details: {
    padding: '8px 16px 16px',
    display: 'flex',
  }
}));

const AccordionDetails: React.FC = ({ children }) => {
  const classes = useStyles();
  const { expanded } = useContext(AccordionContext);
  const refElement = useRef<HTMLDivElement>({} as HTMLDivElement)

  const height = useMotionValue('0px')
  const minHeight = useMotionValue('0px') 
  const overflow = useMotionValue('hidden')

  expanded.onChange((expanded) => {
    height.set(expanded ? `${refElement.current.offsetHeight}px` : '0px')
    minHeight.set(expanded ? '64px' : '0px')
    overflow.set(expanded ? 'hidden' : 'hidden')
  })


  return (
    <motion.div style={{ height, overflow, transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <div role='region' ref={refElement}>
            <div className={classes.details}>
              {
                children
              }
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AccordionDetails;