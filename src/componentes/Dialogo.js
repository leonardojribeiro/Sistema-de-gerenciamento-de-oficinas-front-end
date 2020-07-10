import React from 'react';
import { Dialog, DialogTitle, IconButton, DialogContent, makeStyles, useTheme, useMediaQuery, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  botaofechar: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function Dialogo({ titulo, children }) {
  const classes = useStyles();
  const navigator = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  function handleClose() {
    navigator.goBack();
  }

  return (
    <Dialog fullScreen={fullScreen} maxWidth="lg" open onClose={handleClose} disableBackdropClick aria-labelledby="dialogo-titulo">
      <DialogTitle>
        <Typography id="dialogo-titulo">{titulo}</Typography>
        <IconButton aria-label="Fechar" className={classes.botaofechar} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {
          children
        }
      </DialogContent>
    </Dialog>
  );
}

export default Dialogo;