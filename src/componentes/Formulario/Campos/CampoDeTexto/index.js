import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useEffect } from 'react';
import useCampo from '../../../../hooks/useCampo';


function CampoTexto({ nome, ...props }) {
  const [valido, setValido] = useState(true);
  const [valor, setValor] = useState("");
  const ref = useRef();
  const { registrarCampo, nomeCampo, valorPadrao } = useCampo(nome);

  const validar = useCallback(() => {
    if (!props.required && !ref.current.value.length) {
      return true;
    }
    if (ref.current.value.length) {
      setValido(true);
      return (true);
    }
    else {
      if (ref) {
        ref.current.focus();
      }
      setValido(false);
      return (false);
    }
  }, [props.required]);

  const limpar = useCallback(()=>{
    setValor("");
    setValido(true);
  },[])

  useEffect(() => {
    registrarCampo({
      validar,
      ref: ref.current,
      nome: nomeCampo,
      caminho: "value",
      limpar,
    });
  }, [limpar, nomeCampo, registrarCampo, validar]);

  useEffect(() => {
    if (valorPadrao) {
      setValor(valorPadrao);
    }
  }, [valorPadrao]);

  const manipularAlteracao = useCallback((evento) => {
    setValor(evento.target.value)
    if (!valido) {
      validar();
    }
  },[validar, valido]);

  return (
    <TextField
      onChange={manipularAlteracao}
      value={valor}
      error={!valido}
      inputRef={ref}
      helperText={
        ref.current &&
        props.required
        && !ref.current.value.length
        && !valido
        && "Campo obrigatório."
      }
      {...props}
    />
  );
}

export default memo(CampoTexto);