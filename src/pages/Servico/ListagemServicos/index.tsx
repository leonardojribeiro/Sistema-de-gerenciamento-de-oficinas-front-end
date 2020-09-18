import React, { memo, useCallback, useEffect } from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Tooltip, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Servico from '../../../Types/Servico';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import useListagem from '../../../hooks/useListagem';
import BotaoInserir from '../../../componentes/BotaoInserir';
import { Pagination } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
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

const ListagemServicos: React.FC = () => {
  const classes = useStyles();
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Servico>(
    "servicos",
    "servico",
  );

  useEffect(() => {
    listar();
  }, [listar]);
  return (
    <>
      <FormularioConsulta onSubmit={handleSearch} />
      <Box mb={2}>
        <TableContainer >
          <Table size="small">
            <TableHead>
              <TableRow >
                <TableCell padding="none">Descrição</TableCell>
                <TableCell padding="none">Tempo de Duração</TableCell>
                <TableCell padding="none">Valor</TableCell>
                <TableCell padding="none" align="center">Alterar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                itens?.map((servico, index) => (
                  <TableRow className={classes.linhaTabela} key={index} hover >
                    <TableCell padding="none">
                      <Typography>
                        {servico.descricao}
                      </Typography>
                    </TableCell>
                    <TableCell padding="none">
                      <Typography>{servico.tempoDuracao}</Typography>
                    </TableCell>
                    <TableCell padding="none">
                      <Typography>{servico.valor}</Typography>
                    </TableCell>
                    <TableCell padding="none" align="center">
                      <Tooltip title={`Alterar o serviço ${servico.descricao}`}>
                        <IconButton component={Link} to={`/servicos/alterarservico?id=${servico._id}`}>
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
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(total / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoInserir titulo="Inserir serviços" linkTo="/servicos/inserirservico" />
    </>
  );
}

export default memo(ListagemServicos);