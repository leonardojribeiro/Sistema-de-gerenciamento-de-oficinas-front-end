import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';


function ItemRodape({ usuario }) {
  const oficina = usuario.idOficina;
  const endereco = oficina.endereco;
  return (
    <Grid display="flex" justify="space-around" container spacing={3}>
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

function Rodape() {
  const { usuario } = useContext(AuthContext);
  return (
    <Container>
      {
        usuario && (
          <ItemRodape usuario={usuario} />
        )
      }
    </Container>
  )
}

export default Rodape;