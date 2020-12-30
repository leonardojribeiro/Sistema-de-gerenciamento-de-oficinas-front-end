import React, { memo, useCallback, useEffect } from 'react';
import { IconButton, makeStyles, Box, Tooltip, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Marca from '../../../Types/Marca';
import FormConsultaMarca from '../FormConsultaMarca';
import { Pagination } from '@material-ui/lab';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import useListagem from '../../../hooks/useListagem';

const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
    overflow: "hidden"
  },
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "48px",
    maxWidth: "64px",
    borderRadius: "5px",
  },
  linhaTabela: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    borderTop: `1px solid ${theme.palette.divider}`,
    height: "64px",
  }
}));

const ListagemMarcas: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL as string;
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Marca>("marcas", "marca");

  useEffect(() => {
    listar();
  }, [listar]);

  const handleSubmitFormSearch = useCallback((search) => {
    handleSearch(`descricao=${search}`)
  }, [handleSearch]);

  return (
    <>
      <FormConsultaMarca onSubmit={handleSubmitFormSearch} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Box mb={3}>
        <Grid container justify="space-between">
          <Grid item xs={6}>
            <Typography>Descrição</Typography>
          </Grid>
          <Grid item>
            <Typography>Logomarca</Typography>
          </Grid>
          <Grid item>
            <Typography>Alterar</Typography>
          </Grid>
        </Grid>
        {
          itens?.map((marca, index) => (
            <Grid container justify="space-between" alignItems="center" className={classes.linhaTabela} key={index} >
              <Grid item xs={6}>
                <Typography>{marca.descricao}</Typography>
              </Grid>
              <Grid item>
                <img
                  className={classes.imgLogomarca}
                  src={marca.uriLogo && `${imagensUrl}/${marca.uriLogo}`}
                  alt={`logomarca da marca ${marca.descricao}`}
                />
              </Grid>
              <Grid item>
                <Tooltip title={`Alterar a marca ${marca.descricao}`}>
                  <IconButton component={Link} to={`/marcas/alterarmarca?id=${marca._id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          ))
        }
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <Link to="marcas/incluirmarca" >
        <BotaoIncluir titulo="Incluir marca" />
      </Link>
    </>
  );
}

export default memo(ListagemMarcas);