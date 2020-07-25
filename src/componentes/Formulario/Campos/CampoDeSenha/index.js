import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import { useEffect } from 'react';
import useCampo from '../../../../hooks/useCampo';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

function CampoDeSenha({ nome, ...props }) {
  const [valido, setValido] = useState(true);
  const [visivel, setVisivel] = useState(false);
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

  const manipularAlteracao = useCallback((evento) => {
    setValor(evento.target.value);
    if (!valido) {
      validar();
    }
  },[validar, valido])

  const manipularClique = useCallback(() => {
    setVisivel(!visivel);
  },[visivel]);

  return (
    <TextField
      onChange={manipularAlteracao}
      error={!valido}
      inputRef={ref}
      value={valor}
      autoComplete="current-password"
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
              <IconButton onClick={manipularClique}>
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

export default memo(CampoDeSenha);