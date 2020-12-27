import { Box, Divider, Grid, IconButton, ListItem, makeStyles, Tooltip, Typography } from '@material-ui/core';
import React, { memo } from 'react';
import Veiculo from '../../../Types/Veiculo';
import HistoryIcon from '@material-ui/icons/History';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

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

  }
}));

interface VeiculoItemProps {
  veiculo: Veiculo;
}

const VeiculoItem: React.FC<VeiculoItemProps> = ({ veiculo }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem button>
        <Grid container className={classes.linhaTabela} justify="flex-end" alignItems="center">
          <Grid item xs={4} sm={3}>
            <Typography>{veiculo.placa.toLocaleUpperCase()}</Typography>
          </Grid>
          <Grid item xs={4} sm={6}>
            <Typography>{`${veiculo.modelo?.marca.descricao}/${veiculo.modelo?.descricao} `}</Typography>
          </Grid>
          <Grid item xs={4} sm={3}>
            <Box display="flex" justifyContent="flex-end">
              <Tooltip title={`Nova ordem de serviço para este veículo`}>
                <IconButton component={Link} to={`ordensdeservico/incluir?veiculo=${veiculo._id}`}>
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Ver histórico deste veículo`}>
                <IconButton component={Link} to={`/veiculos/historico?veiculo=${veiculo._id}`}>
                  <HistoryIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Alterar este veículo`}>
                <IconButton component={Link} to={`/veiculos/alterarveiculo?id=${veiculo._id}`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
}

export default memo(VeiculoItem);