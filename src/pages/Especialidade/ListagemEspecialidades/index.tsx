import React, { memo, useCallback, useEffect } from 'react';
import { IconButton, Box, Tooltip, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Especialidade from '../../../Types/Especialidade';
import BotaoIncluir from '../../../componentes/BotaoIncluir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';
import useListagem from '../../../hooks/useListagem';
import { Pagination } from '@material-ui/lab';


const ListagemEspecialidades: React.FC = () => {
  const { pathname } = useLocation();
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Especialidade>("especialidades", "especialidade");

  useEffect(() => {
    if (pathname === "/especialidades") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta }) => {
   // handleSearch(`descricao=${consulta}`);
  }, [handleSearch]);

  return (
    <>
      <FormularioConsulta onSubmit={manipularBusca} />
      <Box mb={2}>
        <List>
          {
            itens?.map((especialidade, index) => (
              <ListItem divider key={index} >
                <ListItemText primary={especialidade.descricao} />
                <ListItemSecondaryAction>
                  <Tooltip title={`Alterar a especialidade ${especialidade.descricao}`}>
                    <IconButton component={Link} to={`/especialidades/alterarespecialidade?id=${especialidade._id}`}>
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
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <BotaoIncluir titulo="Incluir especialidade" linkTo="/especialidades/incluirespecialidade" />
    </>
  );
}

export default memo(ListagemEspecialidades);