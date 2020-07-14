import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField } from '@material-ui/core';
import { useEffect } from 'react';
import useCampo from '../../../hooks/useCampo';


function CampoTexto({ nome, ...props }) {
  const [valido, setValido] = useState(true);

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

  useEffect(() => {
    registrarCampo({
      validar,
      ref: ref.current,
      nome: nomeCampo,
      caminho: "value"
    });
  }, [nomeCampo, registrarCampo, validar]);

  useEffect(() => {
    ref.current.value = valorPadrao ? valorPadrao : ""
  }, [valorPadrao]);

  function handleChange(e) {
    if (!valido) {
      validar();
    }
  }

  return (
    <TextField
      onChange={handleChange}
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
      defaultValue={valorPadrao}
      
    />
  );
}

export default memo(CampoTexto);