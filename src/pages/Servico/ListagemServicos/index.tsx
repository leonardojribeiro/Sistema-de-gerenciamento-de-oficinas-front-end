import React, { memo, useCallback, useEffect } from 'react';
import { Box, Tooltip, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link, useLocation } from 'react-router-dom';
import Servico from '../../../Types/Servico';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import useListagem from '../../../hooks/useListagem';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import { Pagination } from '@material-ui/lab';
import Formato from '../../../recursos/Formato';


const ListagemServicos: React.FC = () => {
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Servico>(
    "servicos",
    "servico",
  );

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/servicos") {
      listar();
    }
  }, [listar, pathname]);

  const handleSubmitSearch = useCallback((data) => {
   // handleSearch(`descricao=${data.consulta}`)
  }, [handleSearch]);

  return (
    <>
      <FormularioConsulta onSubmit={handleSubmitSearch} />
      <Box mb={2}>
        <List dense>
          {
            itens?.map((servico, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={servico.descricao}
                  secondary={`${servico.tempoDuracao} minutos | R$${Formato.formatarMoeda(servico.valor)}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip title={`Alterar o serviço ${servico.descricao}`}>
                    <IconButton component={Link} to={`/servicos/alterarservico?id=${servico._id}`}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(total / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoIncluir titulo="Incluir serviços" linkTo="/servicos/incluirservico" />
    </>
  );
}

export default memo(ListagemServicos);