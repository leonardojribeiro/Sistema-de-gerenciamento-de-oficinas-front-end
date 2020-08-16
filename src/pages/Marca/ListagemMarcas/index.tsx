import React, { memo } from 'react';
import { IconButton, makeStyles, Box, Tooltip, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Marca from '../../../Types/Marca';

interface ListagemMarcasProps{
  marcas: Marca[],
}

const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
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

const ListagemMarcas: React.FC<ListagemMarcasProps> = ({ marcas }) =>{
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL as string;

  return (
    <Box mb={2}>
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
        !!marcas.length && marcas.map((marca, index) => (
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
                <IconButton component={Link} to={`/marcas/alterar?id=${marca._id}`}>
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

export default memo(ListagemMarcas);