import { makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  sticky: {
    height: "100vh",
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
}));

const Sticky: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <motion.div className={classes.sticky}>
      {children}
    </motion.div>
  );
}

export default Sticky;