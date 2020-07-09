import React, { useRef, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useCampo from './Formulario/useCampo';
// import { Container } from './styles';

function CampoDeBusca({nome, ...props }) {

  const ref = useRef();

  const { registrarCampo, nomeCampo } = useCampo(nome);

  useEffect(() => {
    registrarCampo({
      ref: ref.current,
      nome: nomeCampo,
    });
  }, [nomeCampo, registrarCampo]);

  return (
    <TextField
      {
      ...props
      }
      ref={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Buscar">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }} />
  );
}

export default CampoDeBusca;