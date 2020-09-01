import React, { memo } from 'react';
import { IconButton, makeStyles, Box, Tooltip, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Especialidade from '../../../Types/Especialidade';

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

interface ListagemEspecialidadesProps {
  especialidades: Especialidade[];
}

const ListagemEspecialidades: React.FC<ListagemEspecialidadesProps> = ({ especialidades }) => {
  const classes = useStyles();
  return (
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
        especialidades.map((especialidade, index) => (
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
  );
}

export default memo(ListagemEspecialidades);