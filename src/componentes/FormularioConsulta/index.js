import React, { memo } from 'react';
import { Formulario, CampoDeBusca, CampoDeSelecao } from '../Formulario';
import { Grid, Box, MenuItem, Tooltip, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function FormularioConsulta({ aoEnviar, filtros = [] }) {
  return (
    <Formulario aoEnviar={aoEnviar} dadosIniciais={{ tipo: "0" }}>
      <Grid container spacing={2} justify="space-between" alignItems="flex-end">
        <Grid item xs={12} sm={filtros.length ? 6 : 12}>
          <CampoDeBusca
            desabilitarBusca={filtros.length}
            fullWidth
            nome="consulta"
            label="Consulta"
          />
        </Grid>
        {
          filtros && filtros.length > 0 &&
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="flex-end">
              <CampoDeSelecao
                nome="tipo"
                fullWidth
                label="Filtrar por"
                required
              >
                {
                  filtros.map((filtro, indice)=><MenuItem key={indice} value={indice}>{filtro}</MenuItem>)
                }
              </CampoDeSelecao>
              <Tooltip title="Consultar">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        }
      </Grid>
    </Formulario>
  );
}

export default memo(FormularioConsulta);