import React, { memo, useCallback, useEffect } from 'react';
import Peca from '../../../Types/Peca';
import FormConsultaPeca from '../FormConsultaPeca';
import useListagem from '../../../hooks/useListagem';
import Listagem from '../../../componentes/Listagem';


const ListagemPecas: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { handlePageChange, handleSearch, listar, total, itens, page } = useListagem<Peca>("pecas", "peca");

  const handleSubmitSearch = useCallback(async (dados) => {
    //handleSearch(`descricao=${dados.consulta}&marca=${dados.marca}`)
  }, [handleSearch]);

  useEffect(() => {
    listar();
  }, [listar])

  return (
    <>
      <FormConsultaPeca onSubmit={handleSubmitSearch} />
      <Listagem
        itens={itens}
        getPrimaryText={item => item.descricao}
        getSecondaryText={item => item.marca.descricao}
        getURLAvatar={item => `${imagensUrl}/${item.marca.uriLogo}`}
        getAltAvatar={item => item.marca.descricao}
        page={page}
        total={total}
        getLinkToChange={item => `/pecas/alterarpeca?id=?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar a peça ${item.descricao}`}
        onPageChange={handlePageChange}
        linkToInsertTitle="Incluir peça"
        linkToInsert="/pecas/incluirpeca"
      />
    </>
  );
}

export default memo(ListagemPecas);