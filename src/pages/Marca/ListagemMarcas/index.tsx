import React, { memo, useEffect } from 'react';
import Marca from '../../../Types/Marca';
import useListagem from '../../../hooks/useListagem';
import Listagem from '../../../componentes/Listagem';
import FormConsultaPessoa from '../../../componentes/FormConsultaPessoa';


const ListagemMarcas: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL as string;
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Marca>("marcas", "marca");

  useEffect(() => {
    listar();
  }, [listar]);

  return (
    <>
      <FormConsultaPessoa onSubmit={handleSearch} filters={['descricao']}/>
      <Listagem
        itens={itens}
        getPrimaryText={item => item.descricao}
        getURLAvatar={item => `${imagensUrl}/${item.uriLogo}`}
        getAltAvatar={item => item.descricao}
        page={page}
        total={total}
        getLinkToChange={item => `/marcas/alterarmarca?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar a marca ${item.descricao}`}
        onPageChange={handlePageChange}
        linkToInsertTitle="Incluir marca"
        linkToInsert="/marcas/incluirmarca"
      />
    </>
  );
}

export default memo(ListagemMarcas);