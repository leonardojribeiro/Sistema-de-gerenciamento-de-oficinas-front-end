import React, { memo, useCallback, useEffect } from 'react';
import { IconButton, makeStyles, Box, Tooltip, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Especialidade from '../../../Types/Especialidade';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import useListagem from '../../../hooks/useListagem';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
  },
  imgLogomarca: {
    backgroundSize: "100%",
    maxHeight: "64px",
    maxWidth: "96px",
    objectFit: "scale-down"
  },
  linhaTabela: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    borderTop: `1px solid ${theme.palette.divider}`
  }
}));


const ListagemEspecialidades: React.FC = () => {
  const classes = useStyles();
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Especialidade>("especialidades", "especialidade");

  useEffect(() => {
    listar();
  }, [listar]);

  const manipularBusca = useCallback(async ({ consulta }) => {
    handleSearch(`descricao=${consulta}`);
  }, [handleSearch]);

  return (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Box mb={2}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography>Descrição</Typography>
          </Grid>
          <Grid item>
            <Typography>Alterar</Typography>
          </Grid>
        </Grid>
        {
          itens?.map((especialidade, index) => (
            <Grid container justify="space-between" alignItems="center" className={classes.linhaTabela} key={index} >
              <Grid item>
                <Typography>{especialidade.descricao}</Typography>
              </Grid>
              <Grid item>
                <Tooltip title={`Alterar a especialidade ${especialidade.descricao}`}>
                  <IconButton component={Link} to={`/especialidades/alterarespecialidade?id=${especialidade._id}`}>
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
      <BotaoInserir titulo="Inserir especialidade" linkTo="especialidades/inserirespecialidade" />
    </>
  );
}

export default memo(ListagemEspecialidades);