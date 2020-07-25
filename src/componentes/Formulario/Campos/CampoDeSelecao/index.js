import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import { Select, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import useCampo from "../../../../hooks/useCampo"


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

  const limpar = useCallback(() => {
    setValor("");
    setValido(true);
  }, [])

  useEffect(() => {
    registrarCampo({
      validar,
      ref: ref.current.node,
      nome: nomeCampo,
      caminho: "value",
      limpar
    });
  }, [limpar, nomeCampo, registrarCampo, validar]);

  useEffect(() => {
    if (valorPadrao) {
      setValor(valorPadrao);
    }
  }, [valorPadrao]);

  const manipularAlteracao = useCallback((evento) => {
    setValor(evento.target.value);
    setAberto(false);
    if (!valido) {
      validar();
    }
  }, [validar, valido])

  const manipularFechamento = useCallback(() => {
    setAberto(false);
  }, [])

  const manipularAbertura = useCallback(() => {
    setAberto(true);
  }, []);

  return (
    <FormControl {...props} fullWidth>
      <InputLabel error={!valido} required={props.required}>{props.label}</InputLabel>
      <Select
        {...props}
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
      {
        !valido &&
        <FormHelperText error={!valido}>{
          props.required
          && !valor.length
          && !valido
          && "Campo obrigatório."}
        </FormHelperText>
      }
    </FormControl>
  );
}

export default memo(CampoDeSelecao);