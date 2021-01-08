import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Servico from '../../../Types/Servico';
import useListagem from '../../../hooks/useListagem';
import Formato from '../../../recursos/Formato';
import Listagem from '../../../componentes/Listagem';
import FormConsultaPessoa from '../../../componentes/FormConsultaPessoa';


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

  return (
    <>
      <FormConsultaPessoa onSubmit={handleSearch} filters={['descricao']} />
      <Listagem
        itens={itens}
        getPrimaryText={item => item.descricao}
        getSecondaryText={item => `${item.tempoDuracao} minutos | R$${Formato.formatarMoeda(item.valor)}`}
        page={page}
        total={total}
        getLinkToChange={item => `/servicos/alterarservico?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar o servico ${item.descricao}`}
        onPageChange={handlePageChange}
        linkToInsertTitle="Incluir serviço"
        linkToInsert="/servicos/incluirservico"
      />
    </>
  );
}

export default memo(ListagemServicos);