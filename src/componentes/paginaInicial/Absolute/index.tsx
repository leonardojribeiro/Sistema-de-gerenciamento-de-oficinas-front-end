import { makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import React, {  ReactElement } from 'react';

const useStyles = makeStyles((theme) => ({
  absolute: {
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
}));

const Absolute: React.FC<ReactElement<HTMLDivElement>> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <motion.div className={classes.absolute} >
      {children}
    </motion.div>
  );
}

export default Absolute;