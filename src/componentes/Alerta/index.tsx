import React, { useState, memo} from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';

export interface AlertaHandles {
  setAberto: React.Dispatch<React.SetStateAction<boolean>>,
  setMensagem: React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>,
  setTipo: React.Dispatch<React.SetStateAction<AlertProps["severity"]| undefined>>
}

const Alerta = forwardRef<AlertaHandles | undefined>((props, ref) => {
  const [aberto, setAberto] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<React.ReactNode | undefined>(undefined);
  const [tipo, setTipo] = useState<AlertProps["severity"]>("info");

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
        {mensagem}
      </Alert>
    </Snackbar>
  );
});

export default memo(Alerta);