import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Especialidade from '../../../Types/Especialidade';
import FormConsultaPessoa from '../../../componentes/FormConsultaPessoa';
import useListagem from '../../../hooks/useListagem';
import Listagem from '../../../componentes/Listagem';


const ListagemEspecialidades: React.FC = () => {
  const { pathname } = useLocation();
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Especialidade>("especialidades", "especialidade");

  useEffect(() => {
    if (pathname === "/especialidades") {
      listar();
    }
  }, [listar, pathname]);


  return (
    <>
      <FormConsultaPessoa onSubmit={handleSearch} filters={['descricao']} />
      <Listagem
        itens={itens}
        getPrimaryText={item => item.descricao}
        page={page}
        total={total}
        getLinkToChange={item => `/especialidades/alterarespecialidade?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar a especialidade ${item.descricao}`}
        onPageChange={handlePageChange}
        linkToInsertTitle="Incluir especialidade"
        linkToInsert="/especialidades/incluirespecialidade"
      />
    </>
  );
}

export default memo(ListagemEspecialidades);