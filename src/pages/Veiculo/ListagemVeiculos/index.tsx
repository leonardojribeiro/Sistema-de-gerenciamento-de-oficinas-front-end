import React, { memo, useEffect } from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Tooltip, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Veiculo from '../../../Types/Veiculo';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
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
    maxHeight: "78px",
    padding: 0,
    position: "relative",
  }
}));

interface ListagemVeiculosProps {
  veiculos: Veiculo[];
}

const ListagemVeiculos: React.FC<ListagemVeiculosProps> = ({ veiculos }) => {
  const classes = useStyles();
  const { handlePageChange, handleSearch, itens, listar, page, total, pagination } = useListagem<Veiculo>("veiculos", "veiculo");

  useEffect(() => {
    listar();
  },[listar]);

  return (
    <>
      <FormularioConsulta onSubmit={handleSearch} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
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
                itens?.map((veiculo, index) => (
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
                        <IconButton component={Link} to={`/veiculos/alterarveiculo?id=${veiculo._id}`}>
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
      <BotaoInserir titulo="Inserir veiculo" linkTo="/veiculos/inserirveiculo" />
    </>
  );
}

export default memo(ListagemVeiculos);