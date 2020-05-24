import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Paper, Typography } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import Botao from '../IconButton';
import { Link } from 'react-router-dom';
import Slide from '../Slide/';
import ItemFuncionalidade from './itemFuncionalidade/ItemFuncionalidade';


export default function PaginaInicial({ setItensBarraNavegacao, ...props }) {
  useEffect(() => {
    setItensBarraNavegacao({
      itens: {
        botoes: (
          <Botao tooltip="Cadastrar Oficina" component={Link} to="/oficina/cadastro/">
            <AddCircle />
          </Botao>
        )
      }
    });
  }, []);

  const funcionalidades = [
    "Gestão de veículos",
    "Gestão de clientes",
    "Gestão de peças",
    "Gestão de fonecedores",
    "Gestão de serviços",
    "Gestão de ordens de serviço",
  ]

  return (
    <>
      <Box display="flex" className="h-min-barra" alignItems="center" justifyContent="center">
        <Slide />
      </Box>
      <Box className="h-total" display="flex" alignItems="center" >
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center" p={2} pb={6}>
            <Typography variant="h4">Funcionalidades</Typography>
          </Box>
          <Grid container spacing={6}>
            {
              funcionalidades.map((funcionalidade,key) =>
                <ItemFuncionalidade key={key} titulo={funcionalidade} descricao="Permite cadastrar, editar, visualizar..." />
              )
            }
          </Grid>
        </Container>
      </Box>
    </>
  );
}
