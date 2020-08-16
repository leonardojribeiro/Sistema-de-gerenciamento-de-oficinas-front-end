import React, { useContext, useCallback } from 'react';
import Dialogo from '../../componentes/Dialog';
import { Grid, Typography, Slider, FormControlLabel, Switch } from '@material-ui/core';
import TemaContexto from '../../contexts/TemaContext';


const DialogOpcoes: React.FC = () => {
  const { alterarTema, alterarTamanhoFonte, temaEscuro, tamanhoFonte } = useContext(TemaContexto);

  const manipularAlteracaoTamanhoFonte = useCallback((evento, valorNovo) => {
    alterarTamanhoFonte(valorNovo)
  }, [alterarTamanhoFonte])

  return (
    <Dialogo open fullWidth maxWidth={"xs"} title="Opções">
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(temaEscuro)}
                onChange={alterarTema}
                color="primary"
              />
            }
            label="Tema escuro"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>Alterar tamanho da fonte</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>

        </Grid>
        <Grid item xs={12}>
          <Slider
            value={tamanhoFonte}
            onChange={manipularAlteracaoTamanhoFonte}
            min={10}
            max={30}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </Dialogo >
  );
}

export default DialogOpcoes;