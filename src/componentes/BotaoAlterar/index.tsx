import React, { memo } from 'react';
import { makeStyles, Tooltip, Fab, Box } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { Link } from 'react-router-dom';

interface BotaoAlterarProps {
  title: string;
  linkTo: string;
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  container: {
    height: "64px",
  }
}));

const BotaoAlterar: React.FC<BotaoAlterarProps> = ({ title, linkTo, ...props }) => {
  const classes = useStyles()
  const fab = (
    <Tooltip title={title}>
      <Fab {...props} className={classes.fab} color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  )
  return (
    <Box className={classes.container}>
      {
        linkTo ? <Link to={linkTo}>{fab}</Link> : fab
      }
    </Box>
  );
}

export default memo(BotaoAlterar);