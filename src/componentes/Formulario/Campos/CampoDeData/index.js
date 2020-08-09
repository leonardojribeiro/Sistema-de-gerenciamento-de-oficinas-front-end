import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import {  TextField } from '@material-ui/core';
import useCampo from '../../Hooks/useCampo';


function CampoDeData({ nome, ...props }) {
  const [valido, setValido] = useState(true);
  const [valor, setValor] = useState("");
  const ref = useRef();
  const { registrarCampo, nomeCampo, valorPadrao } = useCampo(nome);

  const validar = useCallback(() => {
    if (!props.required && !ref.currentvalue.length) {
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
      limpar
    });
  }, [limpar, nomeCampo, registrarCampo, validar]);

  useEffect(() => {
    if (valorPadrao) {
      setValor(valorPadrao.split('T')[0]);
    }
  }, [valorPadrao]);

  const manipularAlteracao = useCallback((evento) => {
    if (!valido) {
      validar();
    }
    setValor(evento.target.value);
  },[validar, valido]);

  return (
    <TextField
      inputRef={ref}
      type="date"
      value={valor}
      onChange={manipularAlteracao}
      error={!valido}
      helperText={
        ref.current &&
        props.required
        && !ref.current.value.length
        && !valido
        && "Campo obrigatório."
      }
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
}

export default memo(CampoDeData);