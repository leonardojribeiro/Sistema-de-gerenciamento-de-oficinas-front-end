import React, { memo } from 'react';
import { Form, CampoDeBusca, CampoDeSelecao } from '../Form';
import { Grid, Box, MenuItem, Tooltip, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function FormularioConsulta({ onSubmit, filtros = [], }) {
  return (
    <Form onSubmit={onSubmit} initialData={{ tipo: "0" }}>
      <Grid container spacing={2} justify="space-between" alignItems="flex-end">
        <Grid item xs={12} sm={filtros.length ? 6 : 12}>
          <CampoDeBusca
            disableButtonSearch={filtros.length}
            fullWidth
            name="consulta"
            label="Consulta"
          />
        </Grid>
        {
          filtros && filtros.length > 0 &&
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="flex-end">
              <CampoDeSelecao
                name="tipo"
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
    </Form>
  );
}

export default memo(FormularioConsulta);