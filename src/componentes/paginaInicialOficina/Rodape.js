import React, { memo, useContext } from 'react';
import { AppBar, Toolbar, Grid, makeStyles } from '@material-ui/core';
import AuthContext from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "relative",
    backgroundColor: "#ccc"
  },
}));

function Rodape() {
  const classes = useStyles();
  const { usuario } = useContext(AuthContext);

  const oficina = usuario.idOficina;

  const endereco = oficina.endereco;
  return (
  <div className={classes.appBar}>
    <Toolbar>
      <Grid display="flex" justify="space-around" container >
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
    </Toolbar>
  </div>
  )
}

export default memo(Rodape);