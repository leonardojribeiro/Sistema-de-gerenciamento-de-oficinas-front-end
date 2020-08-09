import React, { useRef, useEffect, memo } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import useCampo from '../../Hooks/useCampo';

function CampoDeBusca({nome, desabilitarBusca, ...props }) {
  const ref = useRef();
  const { registrarCampo, nomeCampo } = useCampo(nome);
  useEffect(() => {
    registrarCampo({
      ref: ref.current,
      nome: nomeCampo,
      caminho: "value",
    });
  }, [nomeCampo, registrarCampo]);

  return (
    <TextField
      {
      ...props
      }
      inputRef={ref}
      InputProps={{
        endAdornment: !desabilitarBusca && (
          <InputAdornment position="end">
            <Tooltip title="Buscar">
              <IconButton type="submit" >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }} />
  );
}

CampoDeBusca.propTypes = {
  nome: PropTypes.string,
}

export default memo(CampoDeBusca);