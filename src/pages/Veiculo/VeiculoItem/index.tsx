import { Grid, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import React, { memo } from 'react';
import Veiculo from '../../../Types/Veiculo';
import HistoryIcon from '@material-ui/icons/History';
import { useHistory, Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

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

interface VeiculoItemProps {
  veiculo: Veiculo;
}

const VeiculoItem: React.FC<VeiculoItemProps> = ({ veiculo }) => {
  const classes = useStyles();
  const { push } = useHistory();

  return (
    <Grid container className={classes.linhaTabela} justify="space-between" alignItems="center">
      <Grid item xs={3} sm={3}>
        <Typography>{veiculo.placa.toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Typography>{`${veiculo.modelo?.marca.descricao}/${veiculo.modelo?.descricao} `}</Typography>
      </Grid>
      <Grid item>
        <Tooltip title={`Ver histórico deste veículo`}>
          <IconButton
            onClick={() => {
              push(`veiculos/historico?veiculo=${veiculo._id}`)
            }}>
            <HistoryIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Alterar este veículo`}>
          <IconButton component={Link} to={`/veiculos/alterarveiculo?id=${veiculo._id}`}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default memo(VeiculoItem);