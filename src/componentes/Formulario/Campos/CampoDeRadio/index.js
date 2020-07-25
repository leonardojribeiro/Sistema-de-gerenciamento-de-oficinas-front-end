import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormHelperText } from '@material-ui/core';
import useCampo from "../../../../hooks/useCampo"


function CampoDeRadio({ nome, ...props }) {
  const [valido, setValido] = useState(true);
  const [valor, setValor] = useState("");
  const ref = useRef({ value: "" });
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
      setValor(valorPadrao);
      ref.current.value = valorPadrao;
    }
  }, [valorPadrao]);

  const manipularAlteracao = useCallback((evento) => {
    setValor(evento.target.value);
    ref.current.value = evento.target.value;
    if (!valido) {
      validar();
    }
  },[validar, valido]);

  return (
    <FormControl component="fieldset">
      <FormLabel error={!valido} component="legend">{props.label}</FormLabel>
      <RadioGroup row value={valor} onChange={manipularAlteracao}>
        {props.children}
      </RadioGroup>
      <FormHelperText error={!valido}>{
        props.required
        && !valor.length
        && !valido
        && "Escolha uma opção."}
      </FormHelperText>
    </FormControl>
  );
}

export default memo(CampoDeRadio);