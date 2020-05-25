import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import './itemFuncionalidade.css';

function ItemFuncionalidade({ titulo, descricao }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={4} className="cartao">
        <div className="cartao-titulo">
          {titulo}
        </div>
        <div className="cartao-descricao">
          {descricao}
        </div>
      </Paper>
    </Grid>
  );
}

export default ItemFuncionalidade;