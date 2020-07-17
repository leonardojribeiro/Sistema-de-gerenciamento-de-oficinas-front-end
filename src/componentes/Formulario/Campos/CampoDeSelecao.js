import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import { Select, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import useCampo from "../../../hooks/useCampo"


function CampoDeSelecao({ nome, ...props }) {
  const [valido, setValido] = useState(true);
  const [valor, setValor] = useState("");
  const [aberto, setAberto] = useState(false);
  const ref = useRef();
  const { registrarCampo, nomeCampo, valorPadrao } = useCampo(nome);

  const validar = useCallback(() => {
    if (!props.required && !ref.current.node.value.length) {
      return true;
    }
    if (ref.current.node.value.length) {
      setValido(true);
      return (true);
    }
    else {
      if (ref) {
        ref.current.node.focus();
        setAberto(true);
      }
      setValido(false);
      return (false);
    }
  }, [props.required]);

  useEffect(() => {
    registrarCampo({
      validar,
      ref: ref.current.node,
      nome: nomeCampo,
      caminho: "value"
    });
  }, [nomeCampo, registrarCampo, validar]);

  useEffect(()=>{
    if(valorPadrao){
      setValor(valorPadrao);
    }
  },[valorPadrao]);

  function manipularAlteracao(evento) {
    if (!valido) {
      validar();
    }
    setValor(evento.target.value);
  }

  function manipularFechamento(){
    setAberto(false);
  }

  function manipularAbertura(){
    setAberto(true);
  }

  return (
    <FormControl {...props}>
      <InputLabel required={props.required}>{props.label}</InputLabel>
      <Select
        open={aberto}
        onClose={manipularFechamento}
        onOpen={manipularAbertura}
        inputRef={ref}
        error={!valido}
        onChange={manipularAlteracao}
        value={valor}
      >
        {props.children}
      </Select>
      <FormHelperText error={!valido}>{
        ref.current &&
        props.required
        && !ref.current.node.value.length
        && !valido
        && "Campo obrigatório."}
      </FormHelperText>
    </FormControl>
  );
}

export default memo(CampoDeSelecao);