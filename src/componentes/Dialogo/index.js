import React, { memo, useCallback } from 'react';
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
  dialogo: {
    [theme.breakpoints.down("xs")]: {
      padding: "8px"
    },
  },


}));

function Dialogo({ aberto, titulo, children, ...props }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const manipularFechamento = useCallback(() => {
    if(history.length > 1){
      history.goBack();
    }
    else{
      history.replace("/")
    }
  }, [history]);

  return (
    <Dialog fullScreen={fullScreen} open={aberto} disablePortal onClose={manipularFechamento} disableBackdropClick {...props}>
      <DialogTitle>
        <Typography id="dialogo-titulo">{titulo}</Typography>
        <IconButton aria-label="Fechar" className={classes.botaofechar} onClick={manipularFechamento}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogo}>
        {
          children
        }
      </DialogContent>
    </Dialog>
  );
}

export default memo(Dialogo);