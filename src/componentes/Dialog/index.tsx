import React, { memo, useCallback } from 'react';
import { Dialog as DialogMUI, DialogProps as DialogoPropsMUI, DialogTitle, IconButton, DialogContent, makeStyles, useTheme, useMediaQuery, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

interface DialogProps extends DialogoPropsMUI {
  open: boolean,
  title: string,
  fullHeight?: boolean
}

const useStyles = makeStyles((theme) => ({
  botaofechar: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  fullHeight: {
    height: "100%",
  },
  dialogo: {
    [theme.breakpoints.down("xs")]: {
      padding: "8px"
    },
    height: "100%"
  },
}));

const Dialog: React.FC<DialogProps> = ({ open, title, children, ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const manipularFechamento = useCallback(() => {
    if (history.length > 1) {
      history.goBack();
    }
    else {
      history.replace("/")
    }
  }, [history]);

  return (
    <DialogMUI fullScreen={fullScreen} open={open} onClose={manipularFechamento} disableBackdropClick {...props}>
      <DialogTitle >
        <Typography id="dialogo-titulo" >{title}</Typography>
        <IconButton aria-label="Fechar" className={classes.botaofechar} onClick={manipularFechamento}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogo}>
        {
          children
        }
      </DialogContent>
    </DialogMUI>
  );
}

export default memo(Dialog);