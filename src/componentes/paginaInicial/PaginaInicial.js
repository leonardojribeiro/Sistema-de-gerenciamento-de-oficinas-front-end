import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Paper, Typography } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import Botao from '../IconButton';
import { Link } from 'react-router-dom';
import Slide from '../Slide/';
import ItemFuncionalidade from './itemFuncionalidade/ItemFuncionalidade';
import useInterval from '../../recursos/useInterval';
import { Link as LinkScroll, Element, } from 'react-scroll';

export default function PaginaInicial({ setItensBarraNavegacao, ...props }) {
  useEffect(() => {
    setItensBarraNavegacao({
      itens: {
        links: (
          <>
            <LinkScroll to="item" smooth="easeInQuad"  duration={500}>
              Funcionalidades
            </LinkScroll>
            <LinkScroll to="cadastro" smooth="easeInQuad" duration={500}>
              Cadastro
            </LinkScroll>
          </>
        )
      }
    });
  }, []);


  const funcionalidades = [
    "Gestão de veículos",
    "Gestão de clientes",
    "Gestão de peças",
    "Gestão de fonecedores",
    "Gestão de funcionários",
    "Gestão de serviços",
    "Gestão de ordens de serviço",
  ]

  return (
    <>
      <Box display="flex" className="h-min-barra" alignItems="center" justifyContent="center">
        <Slide />
      </Box>
      <Element name="item">
        <Box className="h-total" display="flex" alignItems="center" >
          <Container maxWidth="md">
            <Box display="flex" justifyContent="center" p={2} pb={6}>
              <Typography variant="h4">Funcionalidades</Typography>
            </Box>
            <Grid container spacing={6} justify="center">
              {
                funcionalidades.map((funcionalidade, key) =>
                  <ItemFuncionalidade key={key} titulo={funcionalidade} descricao="Permite cadastrar, editar, visualizar..." />
                )
              }
            </Grid>
          </Container>
        </Box>
      </Element>
      <Element name="cadastro">
        <Box className="h-total" display="flex" alignItems="center" >
          <Container maxWidth="md">
            <Box display="flex" justifyContent="center" p={2} pb={6}>
              <Typography variant="h4">Cadastro</Typography>
            </Box>
            <Grid container spacing={6} justify="center">
              <Link to="/oficina/cadastro" >Cadastrar</Link>
            </Grid>
          </Container>
        </Box>
      </Element>
    </>
  );
}
