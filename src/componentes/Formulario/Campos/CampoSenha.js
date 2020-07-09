import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import { useEffect } from 'react';
import useCampo from '../useCampo';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

function CampoTexto({ nome, ...props }) {
  const [valido, setValido] = useState(true);
  const [visivel, setVisivel] = useState(false);
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

  function handleChange() {
    if (!valido) {
      validar();
    }
  }

  function handleClick() {
    setVisivel(!visivel);
  }

  return (
    <TextField
      onChange={handleChange}
      error={!valido}
      inputRef={ref}
      defaultValue={valorPadrao}
      helperText={
        ref.current &&
        props.required
        && !valido
        && "Campo obrigatório."
      }
      type={visivel ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={visivel ? "Esconder senha": "Exibir senha"}>
              <IconButton onClick={handleClick}>
                {visivel ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export default memo(CampoTexto);