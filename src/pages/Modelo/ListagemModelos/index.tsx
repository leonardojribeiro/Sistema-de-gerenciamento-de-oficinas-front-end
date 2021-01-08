import React, { useCallback, useEffect } from 'react';
import Modelo from '../../../Types/Modelo';
import FormConsultaPeca from '../../Peca/FormConsultaPeca';
import useListagem from '../../../hooks/useListagem';
import Listagem from '../../../componentes/Listagem';


const ListagemModelos: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { handlePageChange, handleSearch, itens, listar, page, total } = useListagem<Modelo>("modelos", "modelo");

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
        getLinkToChange={item => `/modelos/alterarmodelo?id=${item._id}`}
        getTitleLinkToChange={item => `Alterar o modelo ${item.descricao}`}
        onPageChange={handlePageChange}
        linkToInsertTitle="Incluir modelo"
        linkToInsert="/modelos/incluirmodelo"
      />
    </>
  );
}

export default ListagemModelos;