import React, { useCallback, useEffect } from 'react';
import { Box, Tooltip, IconButton, makeStyles, Typography, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Modelo from '../../../Types/Modelo';
import { Pagination } from '@material-ui/lab';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import FormConsultaPeca from '../../Peca/FormConsultaPeca';
import useListagem from '../../../hooks/useListagem';
const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
  },
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "48px",
    maxWidth: "48px",
    objectFit: "scale-down",
  },
  linhaTabela: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    borderTop: `1px solid ${theme.palette.divider}`,
    height: "64px",
  }
}));

const ListagemModelos: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Modelo>("modelos", "modelo");

  const handleSubmitSearch = useCallback(async (dados) => {
    handleSearch(`descricao=${dados.consulta}&marca=${dados.marca}`)
  }, [handleSearch]);

  useEffect(() => {
    listar();
  }, [listar])

  return (
    <>
      <FormConsultaPeca onSubmit={handleSubmitSearch} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Box mb={2}>
        <Grid container justify="space-between">
          <Grid item xs={5}>
            <Typography>Descrição</Typography>
          </Grid>
          <Grid item>
            <Typography>Marca</Typography>
          </Grid>
          <Grid item>
            <Typography>Editar</Typography>
          </Grid>
        </Grid>
        {
          itens?.map((modelo, index) => (
            <Grid container alignItems="center" justify="space-between" className={classes.linhaTabela} key={index}>
              <Grid item xs={4}>
                <Typography>
                  {modelo.descricao}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item >
                    <Typography>
                      {modelo.marca.descricao}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img
                      className={classes.imgLogomarca}
                      src={modelo.marca && modelo.marca.uriLogo && `${imagensUrl}/${modelo.marca.uriLogo}`}
                      alt={`logomarca da marca ${modelo.marca ? modelo.marca.descricao : ""}`}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Tooltip title={`Alterar o modelo ${modelo.descricao}`}>
                  <IconButton component={Link} to={`/modelos/alterarmodelo?id=${modelo._id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid >
          ))
        }
      </Box >
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoIncluir titulo="incluir modelo" linkTo="modelos/incluirmodelo" />
    </>
  );
}

export default ListagemModelos;