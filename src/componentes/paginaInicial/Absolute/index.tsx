import React, { ReactElement } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { motion } from 'framer-motion';

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