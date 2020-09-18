import React, {  memo, useCallback, useEffect } from 'react';
import { Box, } from '@material-ui/core';
import Dialogo from '../../../componentes/Dialog';
import { Link, Route, Switch } from 'react-router-dom';
import DialogoInserirMarca from '../DialogInserirMarca';
import DialogAlterarMarca from '../DialogAlterarMarca';
import ListagemMarcas from '../ListagemMarcas';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Marca from '../../../Types/Marca';
import { Pagination } from '@material-ui/lab';
import FormConsultaMarca from '../FormConsultaMarca';
import useListagem from '../../../hooks/useListagem';

interface ListaMarcas {
  marcas: Marca[];
  total: number;
}

const DialogMarcas: React.FC = () => {
  const { handlePageChange, handleSearch, itens, total, listar, page, } = useListagem<Marca>("marcas", "marca");

  useEffect(() => {
    listar();
  }, [listar]);

  const handleSubmitFormSearch = useCallback((search)=>{
    handleSearch(`descricao=${search}`)
  },[handleSearch]);

  return (
    <Dialogo open fullWidth maxWidth="xs" title="Marcas">
      <FormConsultaMarca onSubmit={handleSubmitFormSearch} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemMarcas marcas={itens} />
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <Link to="marcas/inserirmarca" >
        <BotaoInserir titulo="Inserir marca" />
      </Link>
      <Switch>
        <Route path="/marcas/inserirmarca">
          <DialogoInserirMarca />
        </Route>
        <Route path="/marcas/alterarmarca">
          <DialogAlterarMarca />
        </Route>
      </Switch>
    </Dialogo>
  );
}

export default memo(DialogMarcas);