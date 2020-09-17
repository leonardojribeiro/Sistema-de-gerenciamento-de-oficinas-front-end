import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import usePessoa from '../../hooks/usePessoa';
import Cliente from '../../Types/Cliente';
import Fornecedor from '../../Types/Fornecedor';
import Funcionario from '../../Types/Funcionario';
import BotaoInserir from '../BotaoInserir';
import FormConsultaPessoa from '../FormConsultaPessoa';
import PessoaItem from '../PessoaItem';

interface Pessoa extends Funcionario, Fornecedor, Cliente { };

interface ListagemPessoaProps {
  linkToChangeText: (pessoa: Pessoa) => string;
  linkToChangePath: (pessoa: Pessoa) => string;
  linkToInsertText: string;
  linkToInsertPath: string;
  dominio: "funcionario" | "cliente" | "fornecedor"
}

const ListagemPessoa: React.FC<ListagemPessoaProps> = ({ linkToChangePath, linkToChangeText, linkToInsertPath, linkToInsertText, dominio }) => {
  const { manipularBusca, handlePageChange, pessoas, total, page } = usePessoa<Pessoa>(dominio);

  return (
    <>
      <FormConsultaPessoa onSubmit={manipularBusca} />
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Box mb={2}>
        {
          pessoas?.map((pessoa, index) => (
            <PessoaItem
              key={index}
              {...pessoa}
              linkToChangeText={linkToChangeText(pessoa)}
              linkToChangePath={linkToChangePath(pessoa)}
            />
          ))
        }
      </Box>
      <Link to={linkToInsertPath}>
        <BotaoInserir titulo={linkToInsertText} />
      </Link>
      <Box display="flex" justifyContent="center">
        <Pagination count={Math.ceil(Number(total) / 100)} onChange={handlePageChange} page={page} />
      </Box>
    </>
  );
}

export default memo(ListagemPessoa);