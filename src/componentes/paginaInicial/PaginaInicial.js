import React, { useEffect, useContext } from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';
import Slide from '../Slide/';
import ItemFuncionalidade from './itemFuncionalidade/ItemFuncionalidade';

import { Link as LinkScroll, Element, } from 'react-scroll';
import BarraSuperiorContext from '../BarraSuperiorContext';
import CustomIconButton from '../Button';

export default function PaginaInicial({ ...props }) {
  const { setItens } = useContext(BarraSuperiorContext);

  useEffect(() => {
    setItens({
      itens: {
        links: (
          <>
            <LinkScroll to="item" smooth="easeInQuad" duration={500}>
              Funcionalidades
            </LinkScroll>
            <LinkScroll to="cadastro" smooth="easeInQuad" duration={500}>
              Cadastro
            </LinkScroll>
          </>
        )
      }
    });
  }, [setItens]);


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
        <Container maxWidth="md">
          <Box className="h-total" display="flex" alignItems="center">
            <Grid container justify="center">
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" pb={6}>
                  <Typography variant="h4">Cadastro</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" p={2}>
                  Solicite o cadastro de sua oficina. Analisaremos as suas informações e entraremos em contato.
                </Box>
                <Box display="flex" justifyContent="center" p={2}>
                  <CustomIconButton component={Link} to="/oficina/cadastro" >
                    Solicitar cadastro
                  </CustomIconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Element>
    </>
  );
}
