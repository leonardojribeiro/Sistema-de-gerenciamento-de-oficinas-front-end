import React, { memo, useCallback } from 'react';
import { Dialog as DialogMUI, DialogProps as DialogoPropsMUI, DialogTitle, IconButton, DialogContent, makeStyles, useTheme, useMediaQuery, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

interface DialogProps extends DialogoPropsMUI {
  open: boolean,
  title: string,
  fullHeight?: boolean;
  onClose?: () => void;
}

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

const Dialog: React.FC<DialogProps> = ({ open, title, children, onClose,...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const manipularFechamento = useCallback(() => {
    if(onClose){
      onClose();
    }
    else if (history.length > 2) {
      history.goBack();
    }
    else {
      history.replace("/")
    }
  }, [history, onClose]);

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