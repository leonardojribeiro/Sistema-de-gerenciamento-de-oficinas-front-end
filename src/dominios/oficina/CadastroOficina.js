import React, { useState, useEffect } from 'react';
import { Grid, Box, Container, Typography } from '@material-ui/core';
import Assistente from '../../componentes/Assistente';
import FormOficina from '../../componentes/FormOficina';
import FormEndereco from '../../componentes/FormEndereco';
import CustomIconButton from '../../componentes/IconButton';
import { Link } from 'react-router-dom';
import Home from '@material-ui/icons/Home';

export default function CadastroOficina( {setItensBarraNavegacao,}) {
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

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setEndereco({
          ...endereco,
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      })
    }
    setItensBarraNavegacao({
      itens: {
        botoes: (
          <CustomIconButton tooltip="Página Inicial" component={Link} to="/">
            <Home/>
          </CustomIconButton>
        )
      }
    });
  }, []);

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
  console.log(dadosOficina)

  const confirmaDados = (
    <Grid container>
      <Grid xs={12} item>
        <Typography>Nome Fantasia: {oficina.nomeFantasia}</Typography>
      </Grid>
    </Grid>
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
                dados: confirmaDados
              }]
            }
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};