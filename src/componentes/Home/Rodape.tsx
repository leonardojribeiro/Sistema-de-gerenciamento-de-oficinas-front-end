import React, { memo, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import AuthContext from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    zIndex: theme.zIndex.drawer + 1,
    minHeight: "64px",
    background: theme.palette.background.default,
  },
}));

const Rodape: React.FC = () => {
  const classes = useStyles();
  const { usuario } = useContext(AuthContext);

  const oficina = usuario.oficina;

  const endereco = oficina.endereco;
  return (
    <Grid alignItems="center" justify="space-around" container className={classes.appBar} >
      <Grid item>
        {`Telefone celular: ${oficina.telefoneCelular}`}
      </Grid>
      <Grid item>
        {`E-mail: ${oficina.email}`}
      </Grid>
      <Grid item>
        {`${endereco.logradouro}, N ${endereco.numero}, ${endereco.bairro}, ${endereco.complemento}, ${endereco.cep}, ${endereco.cidade}, ${endereco.estado}`}
      </Grid>
    </Grid>
  )
}

export default memo(Rodape);