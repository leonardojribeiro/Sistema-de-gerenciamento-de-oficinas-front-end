import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField } from '@material-ui/core';
import validacao from '../../../../recursos/Validacao';
import { useEffect } from 'react';
import useCampo from '../../../../hooks/useCampo';


function CampoDeEmail({ nome, ...props }) {
  const [valido, setValido] = useState(true);
  const [valor, setValor] = useState("");
  const ref = useRef();

  const { registrarCampo, nomeCampo, valorPadrao } = useCampo(nome);

  const validar = useCallback(() => {
    if (!props.required && !ref.current.value.length) {
      return true;
    }
    if (validacao.validarEmail(ref.current.value)) {
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
      setValor(valorPadrao)
    }
  }, [valorPadrao]);

  const manipularAlteracao = useCallback((evento) => {
    setValor(
     evento.target.value
    )
    if (!valido) {
      validar();
    }
  },[validar, valido]);

  return (
    <TextField
      onChange={manipularAlteracao}
      error={!valido}
      value={valor}
      inputRef={ref}
      helperText={
        ref.current ?
          props.required
            ? valido
              ? ""
              : ref.current.value.length
                ? "Campo inválido."
                : "Campo obrigatório."
            : ref.current.value.length
              ? valido
                ? null
                : "Campo inválido."
              : null
          : null
      }
      {...props}
    />
  );
}

export default memo(CampoDeEmail);