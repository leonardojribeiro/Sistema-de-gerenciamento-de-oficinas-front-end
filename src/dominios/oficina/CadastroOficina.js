import React, { useState, useEffect } from 'react';
import { Grid, Box, Container } from '@material-ui/core';
import Assistente from '../../componentes/Assistente';
import FormOficina from '../../componentes/FormOficina';
import FormEndereco from '../../componentes/FormEndereco';

export default function CadastroOficina() {
  //oficina

  const [oficina, setOficina] = useState({
    nomeFantasia: "",
    razaoSocial: "",
    cpfCnpj: "",
    telefoneFixo: "",
    telefoneCelular: "",
    email: "",
    webSite: "",
    logomarca: "",
  });

  const dadosOficina = {
    oficina,
    setOficina
  }

  console.log(oficina);

  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    numero: "",
    cep: "",
    complemento: "",
    cidade: "",
    estado: "",
    latitude: "",
    longitude: ""
  });

  const dadosEndereco = {
    endereco,
    setEndereco
  }

  const formOficina = (
    <FormOficina dadosOficina={dadosOficina} />
  );

  const formEndereco = (
    <FormEndereco dadosEndereco={dadosEndereco} />
  );

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid xs={12} item>
          <Box display="flex" alignItems="center">
            <Assistente passos={
              [{
                label: "Dados",
                dados: formOficina
              },
              {
                label: "Endereço",
                dados: formEndereco
              },
              {
                label: "Confirmar",
                dados: ""
              }]
            }
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};