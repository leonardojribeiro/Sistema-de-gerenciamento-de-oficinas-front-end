import React, { memo } from 'react';
import { makeStyles, Tooltip, Fab, Box } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  container:{
    height: "64px",
  }
}));

function BotaoInserir({ titulo, ...props }) {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Tooltip title={titulo}>
        <Fab {...props} className={classes.fab} color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}

export default memo(BotaoInserir);