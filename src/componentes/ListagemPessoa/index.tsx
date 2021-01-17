import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useListagem from '../../hooks/useListagem';
import Cliente from '../../Types/Cliente';
import Fornecedor from '../../Types/Fornecedor';
import Funcionario from '../../Types/Funcionario';
import BotaoIncluir from '../BotaoIncluir';
import FormConsultaPessoa from '../FormConsultaPessoa';
import PessoaItem from '../PessoaItem';

interface Pessoa extends Funcionario, Fornecedor, Cliente { };

interface ListagemPessoaProps {
  linkToChangeText: (pessoa: Pessoa) => string;
  linkToChangePath: (pessoa: Pessoa) => string;
  linkToInsertText: string;
  linkToInsertPath: string;
  dominio: "funcionario" | "cliente" | "fornecedor";
  pathToItens: "funcionarios" | "clientes" | "fornecedores";
  listar?: boolean;
}

const ListagemPessoa: React.FC<ListagemPessoaProps> = ({ linkToChangePath, linkToChangeText, linkToInsertPath, linkToInsertText, dominio, pathToItens, ...props }) => {
  const { handleSearch, handlePageChange, itens, listar, total, page } = useListagem(dominio);

  useEffect(() => {
    if (props.listar) {
      listar();
    }
  }, [props.listar, listar])

  return (
    <>
      <FormConsultaPessoa onSubmit={handleSearch} filters={['nome', 'cpf',]} />
      <Box mb={2}>
        {
          itens?.map((pessoa, index) => (
            <PessoaItem
              key={index}
              {...pessoa}
              linkToChangeText={linkToChangeText(pessoa)}
              linkToChangePath={linkToChangePath(pessoa)}
            />
          ))
        }
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
      <Link to={linkToInsertPath}>
        <BotaoIncluir titulo={linkToInsertText} />
      </Link>
    </>
  );
}

export default memo(ListagemPessoa);