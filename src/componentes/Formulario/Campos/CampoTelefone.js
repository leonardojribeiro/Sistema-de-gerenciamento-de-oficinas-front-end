import React, { useState, useCallback, useRef, memo} from 'react';
import { TextField } from '@material-ui/core';
import MascaraNumererica from '../../../recursos/MascaraNumerica';
import validacao from '../../../recursos/Validacao';
import { useEffect } from 'react';
import useCampos from '../useCampo';


function CampoTelefone({ nome, ...props }) {
  const [valido, setValido] = useState(true);

  const ref = useRef();

  const { registrarCampo, nomeCampo, valorPadrao } = useCampos(nome);

  const validar = useCallback(() => {
    if (!props.required && !ref.current.value.length) {
      return true;
    }
    if (validacao.validarTelefone(ref.current.value)) {
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
  }, [nomeCampo, registrarCampo,  validar]);

  function handleChange() {
    ref.current.value =
      MascaraNumererica(
        ref.current.value,
        tamanho =>
          tamanho < 11
            ? "(00) 0000-0000"
            : "(00) 00000-0000"
      )
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
      defaultValue={valorPadrao}
      {...props}
    />
  );
}

export default memo(CampoTelefone);