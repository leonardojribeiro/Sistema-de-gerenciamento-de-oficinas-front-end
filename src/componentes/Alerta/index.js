import React, { useState, memo} from 'react';
import { Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';

// import { Container } from './styles';

const Alerta = forwardRef((props, ref) => {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState("info");

  useImperativeHandle(ref, ()=>({
    setAberto,
    setMensagem,
    setTipo,
  }))

  function manipularFechamento() {
    setAberto(false);
  }

  return (
    <Snackbar open={aberto} autoHideDuration={5000} onClose={manipularFechamento}>
      <Alert severity={tipo} onClose={manipularFechamento} closeText="Fechar">
        <Typography>{mensagem}</Typography>
      </Alert>
    </Snackbar>
  );
});

export default memo(Alerta);