import React, { memo } from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Tooltip, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Veiculo from '../../../Types/Veiculo';
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
    maxHeight: "78px",
    padding: 0,
    position: "relative",
  }
}));

interface ListagemVeiculosProps{
  veiculos: Veiculo[];
}

const ListagemVeiculos: React.FC<ListagemVeiculosProps> = ({ veiculos }) => {
  const classes = useStyles();
  return (
    <Box mb={2}>
      <TableContainer >
        <Table size="small">
          <TableHead>
            <TableRow >
              <TableCell padding="none">Placa</TableCell>
              <TableCell padding="none">Modelo</TableCell>
              <TableCell padding="none">Marca</TableCell>
              <TableCell padding="none" align="center">Alterar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              veiculos.map((veiculo, index) => (
                <TableRow className={classes.linhaTabela} key={index} hover >
                  <TableCell padding="none">
                    <Typography>
                      {veiculo.placa}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none">
                    <Typography>
                      {veiculo.modelo?.descricao}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none">
                    <Typography>
                      {veiculo?.modelo?.marca?.descricao}
                    </Typography>
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Tooltip title={`Alterar o veículo ${veiculo.placa}`}>
                      <IconButton component={Link} to={`/veiculos/alterar?id=${veiculo._id}`}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(ListagemVeiculos);